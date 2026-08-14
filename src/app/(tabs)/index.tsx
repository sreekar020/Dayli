import { styles } from "@/app/components/habitsCard";
import {
  client,
  databases,
  DB_ID,
  HABIT_DB_ID,
  realtimeResponse,
} from "@/lib/appwrite";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState,useCallback } from "react";
import { Text, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button } from "react-native-paper";
import { Habits } from "../../../database.type";
import { useAuth } from "../../lib/auth-context";
import { useFocusEffect ,} from "expo-router";

export default function HomeScreen() {
  const { Logout } = useAuth();
  const { user } = useAuth();

  const [habits, setHabits] = useState<Habits[] | []>([]);

    useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [user])
  );

  useEffect(() => {
    if (user){   
    const channel = `databases.${DB_ID}.collections.${HABIT_DB_ID}.documents`

    const habitsSubscription = client.subscribe(
      channel,
      (response:realtimeResponse) => {
        if (
          response.events.includes("databases.*.collections.*.documents.*.create")
        ) {
          fetchHabits();
        }
        else if (
          response.events.includes("databases.*.collections.*.documents.*.update")
        ) {
          fetchHabits();
        }
        else if (
          response.events.includes("databases.*.collections.*.documents.*.delete")
        ) {
          fetchHabits();
        }
      },
    );
    fetchHabits();
    return()=>{
      habitsSubscription();
    };
  }
  }, [user]);

  const fetchHabits = async () => {
    try {
      const response = await databases.listDocuments<Habits>(
        DB_ID!,
        HABIT_DB_ID!,
        [Query.equal("userId", user?.$id ?? "")],
      );
      setHabits(response.documents);

      setHabits(response.documents as Habits[]);
      console.log(response.documents);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todays Habits</Text>
      </View>
      <Button style={styles.homebutton} icon="logout" onPress={Logout}>
        Log out
      </Button>
      {habits.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No habits found! Add new Habit</Text>
        </View>
      ) : (
        habits.map((habit, key) => (
          <View key={key} style={styles.cardContent}>
            <Text style={styles.cardTitle}>{habit.title}</Text>
            <Text style={styles.cardDescription}>{habit.description}</Text>
            <View style={styles.cardFooter}>
              <View style={styles.streakBadge}>
                <MaterialCommunityIcons name="fire" size={18} color="#ff9800" />
                <Text style={styles.streakText}>
                  {habit.streak_count} Day Streak{" "}
                </Text>
              </View>
              <View style={styles.frequencyBadge}>
                <Text style={styles.frequencyText}>{habit.frequency}</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </View>
  );
}
