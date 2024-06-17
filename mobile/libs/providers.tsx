import { ClerkProvider } from "@clerk/clerk-expo";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";
import { ThemeProvider, createTheme, lightColors } from '@rneui/themed';
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export interface ProvidersProps {
    children: React.ReactNode
}

const theme = createTheme({
    lightColors: {
        ...Platform.select({
            default: lightColors.platform.android,
            ios: lightColors.platform.ios,
        }),
    },
});

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

    return (
        <ClerkProvider
            tokenCache={tokenCache as TokenCache}
            publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
        >
            <SafeAreaProvider style={styles.container}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </SafeAreaProvider>
        </ClerkProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});