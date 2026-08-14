import { Foundation } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Tabs } from "expo-router";
import { RouteGaurd } from "../_layout";
export default function Tab() {
  return (
    <RouteGaurd>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#8B5CF6",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#F3E8FF",
            elevation: 4,
            height: 60,
            paddingBottom: 8,
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
                <Feather name="home" size={22} color="#8B5CF6" />
              ) : (
                <Foundation name="home" size={22} color="#9CA3AF" />
              ),
          }}
        />
        <Tabs.Screen
          name="add-habit"
          options={{
            title: "Habits",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Entypo name="add-to-list" size={24} color="#8B5CF6" />
              ) : (
                <Entypo name="add-to-list" size={24} color="#9CA3AF" />
              ),
          }}
        />
        <Tabs.Screen
          name="streaks"
          options={{
            title: "Streak",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <SimpleLineIcons name="fire" size={24} color="#8B5CF6" />
              ) : (
                <SimpleLineIcons name="fire" size={24} color="#9CA3AF" />
              ),
          }}
        />
      </Tabs>
    </RouteGaurd>
  );
}
