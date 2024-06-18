import { useAuth, useUser } from '@clerk/clerk-react';
import { NavigationProp } from '@react-navigation/native';
import { Button, Image, Text, useTheme } from '@rneui/themed';
import { useContext } from 'react';
import { ScrollView, View, ViewProps } from 'react-native';
import { UserContext } from '../context/user';

export interface ProfileScreenProps extends ViewProps {
  navigation?: any;
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { theme } = useTheme();
  const { user } = useUser();
  const { signOut } = useAuth();
  const { isMentor } = useContext(UserContext);

  const onSignOut = async () => {
    signOut();
  };

  const onBecomeMentor = async () => {
    navigation.navigate('Become Mentor');
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        paddingBottom: 20,
        flex: 1,
      }}
    >
      <ScrollView style={{ padding: 50 }}>
        <Image
          source={{ uri: user?.imageUrl ?? '' }}
          style={{ borderRadius: 5, aspectRatio: 1, objectFit: 'cover' }}
        />
        <View style={{ marginTop: 50, gap: 20 }}>
          <Button onPress={onBecomeMentor} disabled={isMentor}>
            <Text style={{ color: theme.colors.background }}>
              {!isMentor ? 'Become a Mentor' : 'You are a mentor now 🥳'}
            </Text>
          </Button>
          <Button onPress={onSignOut} color={'error'}>
            <Text style={{ color: theme.colors.background }}>Sign Out</Text>
          </Button>
          <View>
            <Text style={{ color: theme.colors.primary, fontSize: 15 }}>
              Your Name :
            </Text>
            <Text style={{ color: theme.colors.black, fontSize: 15 }}>
              {user?.firstName ?? ''} {user?.lastName ?? ''}
            </Text>
          </View>
          <View>
            <Text style={{ color: theme.colors.primary, fontSize: 15 }}>
              Your Email :
            </Text>
            <Text style={{ color: theme.colors.black, fontSize: 15 }}>
              {user?.primaryEmailAddress?.emailAddress ?? ''}
            </Text>
          </View>
          <View>
            <Text style={{ color: theme.colors.primary, fontSize: 15 }}>
              Joined At :
            </Text>
            <Text style={{ color: theme.colors.black, fontSize: 15 }}>
              {user?.createdAt?.toLocaleString() ?? ''}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
