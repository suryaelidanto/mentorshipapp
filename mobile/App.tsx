import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import SignInWithOAuth from "./components/sign-in-with-oauth";
import UseAuthExample from "./components/auth-example";
import UseUserExample from "./components/user-example";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default function App() {
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

  return (
    <ClerkProvider
      tokenCache={tokenCache as TokenCache}
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
    >
      <SafeAreaView style={styles.container}>
        <SignedIn>
          <Text>You are Signed in</Text>
          <UseAuthExample />
          <SignOut />
        </SignedIn>
        <SignedOut>
          <SignInWithOAuth />
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});