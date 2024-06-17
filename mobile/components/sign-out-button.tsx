import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { Button, View } from "react-native";

export function SignOutButton() {
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
