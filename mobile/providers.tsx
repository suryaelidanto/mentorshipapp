import { ClerkProvider } from "@clerk/clerk-expo";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import { ThemeProvider } from '@rneui/themed';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RNETheme } from "./libs/theme";

export interface ProvidersProps {
    children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
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

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <ClerkProvider
                tokenCache={tokenCache as TokenCache}
                publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
            >
                <SafeAreaProvider style={styles.safeArea}>
                    <ThemeProvider theme={RNETheme}>
                        {children}
                    </ThemeProvider>
                    <StatusBar translucent />
                </SafeAreaProvider>
            </ClerkProvider>
        </QueryClientProvider>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: "center",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
});
