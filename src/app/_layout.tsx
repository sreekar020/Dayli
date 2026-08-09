import { Redirect, Stack } from "expo-router";

export function RouteGaurd({ children }: { children: React.ReactNode }) {
  const isAuth = false;

  if (!isAuth) {
    return <Redirect href="/authentication/auth" />;
  }
  return <>{children}</>;
}

export default function Layout() {
  return (
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
  );
}
