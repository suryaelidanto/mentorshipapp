import { useOAuth } from '@clerk/clerk-expo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Text } from '@rneui/themed';
import { Button } from '@rneui/themed';
import * as WebBrowser from 'expo-web-browser';
import { View } from 'react-native';
import { useWarmUpBrowser } from '../hooks/use-warm-up-browser';
import { useCallback } from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', JSON.stringify(err));
    }
  };

  return (
    <View style={{ padding: 10, flex: 1, justifyContent: 'center' }}>
      <Text>Mentorship App</Text>
      <Button onPress={onPress}>
        <AntDesign
          name="google"
          size={24}
          color="white"
          style={{ marginRight: 5 }}
        />
        Sign in with Google
      </Button>
    </View>
  );
}
