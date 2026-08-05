import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="explore" options={{ title: "Explore" }} />
      <Stack.Screen name="list" options={{ title: "List" }} />
    </Stack>
  );
}
