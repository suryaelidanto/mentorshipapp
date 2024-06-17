import { useUser } from '@clerk/clerk-react';
import { Button, Image, Text, useTheme } from '@rneui/themed';
import { ScrollView, View } from 'react-native';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { user } = useUser();

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
          <Button>
            <Text style={{ color: theme.colors.background }}>
              Become a mentor
            </Text>
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
