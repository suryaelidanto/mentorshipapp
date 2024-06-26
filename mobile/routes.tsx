import { useAuth } from '@clerk/clerk-react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@rneui/themed';
import { useContext } from 'react';
import { UserContext } from './context/user';
import BecomeMentorScreen from './screens/become-mentor';
import HomeScreen from './screens/home';
import ProfileScreen from './screens/profile';
import SignInScreen from './screens/sign-in';

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
  const { isSignedIn } = useAuth();
  const { theme } = useTheme();
  const { isMentor } = useContext(UserContext);

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
              let iconName = '';

              if (route.name === 'Explore Mentors') {
                iconName = focused ? 'people-circle' : 'people-circle-outline';
              }

              if (route.name === 'My Profile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              }

              if (route.name === 'Become Mentor') {
                iconName = focused ? 'star' : 'star-outline';
              }

              return (
                <Ionicons
                  name={iconName as unknown as any}
                  size={size}
                  color={color}
                />
              );
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.secondary,
          })}
        >
          <Tab.Screen
            name="Explore Mentors"
            component={MainStack}
            options={{ headerShown: false, unmountOnBlur: true }}
          />
          {!isMentor && (
            <Tab.Screen
              name="Become Mentor"
              component={BecomeMentorScreen}
              options={{ headerShown: false, unmountOnBlur: true }}
            />
          )}
          <Tab.Screen
            name="My Profile"
            component={ProfileScreen}
            options={{ headerShown: false, unmountOnBlur: true }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
