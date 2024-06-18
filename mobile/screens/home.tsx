import { Button, Text, useTheme } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Image, ScrollView, View } from 'react-native';
import api from '../libs/api';

import { Card } from '@rneui/themed';
import { MentorshipEntity } from '../types/entities/mentorship';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Ionicons from '@expo/vector-icons/Ionicons';

import * as WebBrowser from 'expo-web-browser';

import Octicons from '@expo/vector-icons/Octicons';
import { truncateString } from '../utils/functions';

export default function HomeScreen() {
  const { theme } = useTheme();

  const { data, isFetching } = useQuery<MentorshipEntity[]>({
    queryKey: ['mentorships'],
    queryFn: async () => {
      const response = await api.get('/mentorships');
      return response.data;
    },
  });

  if (isFetching) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {Array.isArray(data) && data.length <= 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <Text style={{ textAlign: 'center', color: theme.colors.primary }}>
            There's nothing here yet, hey, it's still new. Let's be the first
            mentor on our platform! 👻
          </Text>
        </View>
      ) : (
        data?.map(item => (
          <Card key={item.id} wrapperStyle={{ gap: 10 }}>
            <Image
              source={{ uri: item.userInfo.imageUrl ?? '' }}
              style={{ borderRadius: 5, aspectRatio: 1, objectFit: 'cover' }}
            />
            <Text style={{ fontSize: 20 }}>
              {`${item.userInfo.firstName ?? ''} ${item.userInfo.lastName ?? ''}`}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name="briefcase"
                color={theme.colors.black}
                size={16}
                style={{ marginRight: 5 }}
              />
              <Text style={{ flex: 1 }}>
                {truncateString(item.position!, 40)}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Octicons
                name="organization"
                color={theme.colors.black}
                size={16}
                style={{ marginRight: 5 }}
              />
              <Text style={{ flex: 1 }}>
                {truncateString(item.institution!, 40)}
              </Text>
            </View>
            <Button
              color={'black'}
              onPress={async () => {
                await WebBrowser.openBrowserAsync(item.meetingLink!);
              }}
            >
              <MaterialIcons
                name="meeting-room"
                size={24}
                color="white"
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: theme.colors.background }}>
                Go to meeting room
              </Text>
            </Button>
            <Button
              onPress={async () => {
                await WebBrowser.openBrowserAsync(item.contactLink!);
              }}
            >
              <MaterialIcons
                name="message"
                size={24}
                color="white"
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: theme.colors.background }}>Message</Text>
            </Button>
          </Card>
        ))
      )}
    </ScrollView>
  );
}
