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
          tabBarActiveTintColor: "#000000ff",
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
            tabBarInactiveTintColor: "black",
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
          name="add-habit"
          options={{
            title: "Habits",
            tabBarActiveTintColor: "#8B5CF6",
            tabBarInactiveTintColor: "black",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Entypo name="add-to-list" size={24} color="#8B5CF6" />
              ) : (
                <Entypo name="add-to-list" size={24} color="black" />
              ),
          }}
        />
        <Tabs.Screen
          name="streaks"
          options={{
            tabBarActiveTintColor: "#F73718",
            tabBarInactiveTintColor: "black",
            title: "Streak",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <SimpleLineIcons name="fire" size={24} color="#F73718" />
              ) : (
                <SimpleLineIcons name="fire" size={24} color="black" />
              ),
          }}
        />
      </Tabs>
    </RouteGaurd>
  );
}
