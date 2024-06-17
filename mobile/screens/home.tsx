import { Button, Text, useTheme } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import api from "../libs/api";

import { useAuth } from "@clerk/clerk-react";
import { Card } from '@rneui/themed';
import { useEffect } from "react";
import { MentorshipEntity } from "../types/entities/mentorship";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Ionicons from '@expo/vector-icons/Ionicons';

import * as WebBrowser from "expo-web-browser";

import Octicons from '@expo/vector-icons/Octicons';
import { truncateString } from "../utils/functions";


export default function HomeScreen() {
    const { theme } = useTheme()
    const { getToken } = useAuth()

    const { data, isFetching } = useQuery<MentorshipEntity[]>({
        queryKey: ['mentorships'],
        queryFn: async () => {
            const response = await api.get('/mentorships')
            return response.data
        },
    })

    async function checkToken() {
        console.log(await getToken())
    }

    useEffect(() => {
        checkToken()
    }, [])

    if (isFetching) {
        return <ActivityIndicator />
    }

    return (
        <ScrollView>
            <Text style={{ fontWeight: "bold", fontSize: 24 }}>Explore mentors</Text>
            {data?.map((item) => (
                <Card key={item.id} wrapperStyle={{ gap: 10 }}>
                    <Image source={{ uri: item.userInfo.imageUrl ?? "" }} style={{ borderRadius: 5, aspectRatio: 1, objectFit: "cover" }} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {`${item.userInfo.firstName ?? ""} ${item.userInfo.lastName ?? ""}`}
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="briefcase" color={theme.colors.black} size={16} style={{ marginRight: 5 }} />
                        <Text style={{ fontWeight: 'bold', flex: 1 }}>{truncateString(item.position!, 40)}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Octicons name="organization" color={theme.colors.black} size={16} style={{ marginRight: 5 }} />
                        <Text style={{ fontWeight: 'bold', flex: 1 }}>{truncateString(item.institution!, 40)}</Text>
                    </View>
                    <Button onPress={async () => { await WebBrowser.openBrowserAsync(item.meetingLink!); }}>
                        <MaterialIcons name="meeting-room" size={24} color="white" style={{ marginRight: 5 }} />
                        Go to meeting room
                    </Button>
                    <Button onPress={async () => { await WebBrowser.openBrowserAsync(item.contactLink!); }}>
                        <MaterialIcons name="message" size={24} color="white" style={{ marginRight: 5 }} />
                        Message
                    </Button>
                </Card>
            ))}
        </ScrollView>
    )
}