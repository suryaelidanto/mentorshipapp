import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button } from "@rneui/themed";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/use-warm-up-browser";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setActive?.({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    return (
        <Button
            title="Sign in with Google"
            onPress={onPress}
        />
    );
}