import SplashScreen from "@/components/SplashScreen";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Redirect, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function RouteGaurd({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
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
