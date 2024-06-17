import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import React from "react";
import { Text } from "react-native";
import { Providers } from "./libs/providers";
import SignIn from "./screens/sign-in";
import { SignOutButton } from "./components/sign-out-button";

export default function App() {
  return (
    <Providers>
      <SignedIn>
        <Text>You are Signed in</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </Providers>
  );
}

