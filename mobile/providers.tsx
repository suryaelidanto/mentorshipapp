import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { TokenCache } from '@clerk/clerk-expo/dist/cache';
import { LezzServerProviderWithClerk, LezzServerReactClient } from '@lezzserver/react';
import { ThemeProvider } from '@rneui/themed';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import {
  ActivityIndicator,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './context/user';
import { loadFonts } from './libs/fonts';
import { RNETheme } from './libs/theme';

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const fontsLoaded = loadFonts();

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  const tokenCache = {
    getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return null;
      }
    },
  };

  const queryClient = new QueryClient();
  const LSClient = new LezzServerReactClient(Constants.expoConfig?.extra?.EXPO_PUBLIC_LEZZSERVER_DEPLOYMENT_URL);

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        tokenCache={tokenCache as TokenCache}
        publishableKey={
          Constants.expoConfig?.extra?.clerkPublishableKey
        }
      >
        <SafeAreaProvider style={styles.safeArea}>
          <ThemeProvider theme={RNETheme}>
            <UserProvider>
              <LezzServerProviderWithClerk client={LSClient} useAuth={useAuth}>
                {children}
              </LezzServerProviderWithClerk>
            </UserProvider>
          </ThemeProvider>
          <StatusBar translucent />
        </SafeAreaProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
