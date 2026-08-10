import { AuthProvider } from "@/lib/auth-context";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/lib/auth-context";

export function RouteGaurd({ children }: { children: React.ReactNode }) {
  const { user } = useAuth(); // 👈 Check real user state

  if (!user) {
    return <Redirect href="/authentication/auth" />;
  }
  return <>{children}</>;
}

export default function Layout() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
