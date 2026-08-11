import { Foundation } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import { RouteGaurd } from "../_layout";

export default function Tab() {
  return (
    <RouteGaurd>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#6200ee",
          tabBarStyle: {
            backgroundColor: "#f5f5f5",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Feather name="home" size={22} color={color} />
              ) : (
                <Foundation name="home" size={22} color={color} />
              ),
          }}
        />
      </Tabs>
    </RouteGaurd>
  );
}
