import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Redirect, Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export function RouteGaurd({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Redirect href="/authentication/auth" />;
  }

  return <>{children}</>;
}

export default function Layout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="authentication/auth"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="authentication/login"
              options={{ headerShown: false }}
            />
          </Stack>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
