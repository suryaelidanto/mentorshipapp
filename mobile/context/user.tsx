import { createContext, useContext, ReactNode } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import api from '../libs/api';

interface UserContextType {
  isMentor: boolean | undefined;
  refetchIsMentor: (options?: RefetchOptions) => any;
}

export const UserContext = createContext<UserContextType>({
  isMentor: false,
  refetchIsMentor: () => {},
});

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const { data: isMentor, refetch: refetchIsMentor } = useQuery<
    boolean,
    AxiosError,
    boolean
  >({
    queryKey: ['isMentor', user?.id],
    queryFn: async () => {
      const token = await getToken();
      const response = await api.get('/user-infos/check', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  return (
    <UserContext.Provider value={{ isMentor, refetchIsMentor }}>
      {children}
    </UserContext.Provider>
  );
};
