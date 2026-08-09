import { Foundation } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { RouteGaurd } from "../_layout";

export default function Tab() {
  return (
    <RouteGaurd>
      <Tabs screenOptions={{ tabBarActiveTintColor: "red" }}>
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
        <Tabs.Screen
          name="books"
          options={{
            title: "books",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="bookshelf"
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </RouteGaurd>
  );
}
