import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function UseAuthExample() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [test, setTest] = useState<string | null>("")

    // In case the user signs out while on the page.
    if (!isLoaded || !userId) {
        return null;
    }

    console.log("userId", userId);
    console.log("sessionId", sessionId);

    async function justGetToken() {
        setTest(await getToken())
        console.log(await getToken())
    }

    useEffect(() => {
        justGetToken()
    }, [])

    return (
        <Text>
            Hello, {userId} your current active session is {sessionId}
            Your token : {test}
        </Text>
    );
}