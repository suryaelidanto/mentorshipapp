import { useAuth } from "@clerk/clerk-react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./screens/home";
import SignInScreen from "./screens/sign-in";
import { IconProps } from "react-native-vector-icons/Icon";
import ProfileScreen from "./screens/profile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

export default function Route() {
    const { isSignedIn } = useAuth()

    return (
        <NavigationContainer>
            {!isSignedIn ? (
                <Stack.Navigator initialRouteName="SignIn">
                    <Stack.Screen
                        name="SignIn"
                        component={SignInScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            ) : (
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName = ""

                            if (route.name === 'Explore mentors') {
                                iconName = focused ? 'people-circle' : 'people-circle-outline';
                            } else if (route.name === 'Profile') {
                                iconName = focused ? 'person-circle' : 'person-circle-outline';
                            }

                            return <Ionicons name={iconName as unknown as any} size={size} color={color} />;
                        },
                    })}
                >
                    <Tab.Screen
                        name="Explore mentors"
                        component={MainStack}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{ headerShown: false }}
                    />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    )
}
