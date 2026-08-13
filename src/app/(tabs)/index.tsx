import { databases, DB_ID, HABIT_DB_ID } from "@/lib/appwrite";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button } from "react-native-paper";
import { Habits } from "../../../database.type";
import { useAuth } from "../../lib/auth-context";
import { styles } from "@/app/components/habitsCard";


export default function HomeScreen() {
  const { Logout } = useAuth();
  const { user } = useAuth();

  const [habits, setHabits] = useState<Habits[] | []>([]);

  useEffect(() => {
    fetchHabits();
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
                <Text style={styles.streakText}>{habit.streak_count} Day Streak </Text>
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
