import { styles } from "@/components/habitsCard";
import {
  client,
  databases,
  DB_ID,
  HABIT_COMPLETION,
  HABIT_DB_ID,
  realtimeResponse,
} from "@/lib/appwrite";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ID, Query } from "react-native-appwrite";
import { Swipeable } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { HabitCompletion, Habits } from "../../../database.type";
import { useAuth } from "../../lib/auth-context";
import { getPeriodStart } from "../../lib/streak-utils";

export default function HomeScreen() {
  const { Logout, user } = useAuth();

  const [habits, setHabits] = useState<Habits[]>([]);
  const [completeHabits, setCompleteHabits] = useState<HabitCompletion[]>([]);

  const SwipeableRef = useRef<{ [key: string]: Swipeable | null }>({});

  const fetchHabits = useCallback(async () => {
    if (!user) return;
    try {
      const response = await databases.listDocuments<Habits>(
        DB_ID!,
        HABIT_DB_ID!,
        [Query.equal("userId", user.$id)],
      );
      setHabits(response.documents);
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  }, [user]);

  const fetchTodaysCompletion = useCallback(async () => {
    if (!user) return;
    try {
      const monthStart = getPeriodStart(new Date(), "Monthly");
      const response = await databases.listDocuments<HabitCompletion>(
        DB_ID!,
        HABIT_COMPLETION!,
        [
          Query.equal("user_id", user.$id),
          Query.greaterThan("$createdAt", monthStart.toISOString()),
        ],
      );
      setCompleteHabits(response.documents);
    } catch (error) {
      console.error("Error fetching completions:", error);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
      fetchTodaysCompletion();
    }, [fetchHabits, fetchTodaysCompletion]),
  );

  useEffect(() => {
    if (user) {
      const habitChannel = `databases.${DB_ID}.collections.${HABIT_DB_ID}.documents`;
      const habitsSubscription = client.subscribe(
        habitChannel,
        (response: realtimeResponse) => {
          if (
            response.events.some(
              (event) =>
                event.includes("documents.*.create") ||
                event.includes("documents.*.update") ||
                event.includes("documents.*.delete"),
            )
          ) {
            fetchHabits();
          }
        },
      );

      const completionChannel = `databases.${DB_ID}.collections.${HABIT_COMPLETION}.documents`;
      const completionSubscription = client.subscribe(
        completionChannel,
        (response: realtimeResponse) => {
          if (
            response.events.some((event) =>
              event.includes("documents.*.create"),
            )
          ) {
            fetchTodaysCompletion();
          }
        },
      );

      fetchHabits();
      fetchTodaysCompletion();

      return () => {
        habitsSubscription();
        completionSubscription();
      };
    }
  }, [user, fetchHabits, fetchTodaysCompletion]);

  const handeDelete = async (id: string) => {
    setHabits((prevHabits) => prevHabits.filter((h) => h.$id !== id));

    try {
      await databases.deleteDocument(DB_ID!, HABIT_DB_ID!, id);
    } catch (error) {
      console.error("Failed to delete habit:", error);
      fetchHabits();
    }
  };

  const markComplete = async (habit: Habits) => {
    if (!user || isHabitCompleted(habit)) return;

    try {
      const newCompletion = await databases.createDocument<HabitCompletion>(
        DB_ID!,
        HABIT_COMPLETION!,
        ID.unique(),
        {
          habits_id: habit.$id,
          user_id: user.$id,
        }
      );

      setCompleteHabits((prev) => [...prev, newCompletion]);

      const newCount = habit.streak_count + 1;
      await databases.updateDocument(DB_ID!, HABIT_DB_ID!, habit.$id, {
        streak_count: newCount,
        last_completed: new Date().toISOString(),
      });

      fetchHabits();
    } catch (error) {
      console.error("Failed to mark complete:", error);
      fetchTodaysCompletion();
    }
  };

  const renderLeftActions = () => (
    <View style={styles.leftaction}>
      <MaterialCommunityIcons
        name="trash-can-outline"
        size={24}
        color="#ffffff"
      />
    </View>
  );

  const renderRightActions = (habit: Habits) => (
    <View style={styles.rightaction}>
      {isHabitCompleted(habit) ? (
        <Text style={{ color: "#ffffff", fontWeight: "600" }}>Completed</Text>
      ) : (
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={28}
          color="#ffffffff"
        />
      )}
    </View>
  );

  const isHabitCompleted = (habit: Habits) => {
    const periodStart = getPeriodStart(new Date(), habit.frequency as any);
    return completeHabits.some(
      (c) => c.habits_id === habit.$id && new Date(c.$createdAt) >= periodStart
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Button style={styles.homebutton} icon="logout" onPress={Logout}>
        Log out
      </Button>
      <ScrollView showsVerticalScrollIndicator={false}>
        {habits.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No habits found! Add new Habit</Text>
          </View>
        ) : (
          habits.map((habit, key) => (
            <Swipeable
              ref={(ref) => {
                SwipeableRef.current[habit.$id] = ref;
              }}
              key={key}
              overshootRight={false}
              overshootLeft={false}
              renderLeftActions={renderLeftActions}
              renderRightActions={() => renderRightActions(habit)}
              onSwipeableOpen={(direction) => {
                if (direction === "left") {
                  handeDelete(habit.$id);
                } else if (direction === "right") {
                  markComplete(habit);
                }
                SwipeableRef.current[habit.$id]?.close();
              }}
            >
              <View
                style={[
                  styles.cardContent,
                  isHabitCompleted(habit) && styles.completedCard,
                ]}
              >
                <Text style={styles.cardTitle}>{habit.title}</Text>
                <Text style={styles.cardDescription}>{habit.description}</Text>
                <View style={styles.cardFooter}>
                  <View style={styles.streakBadge}>
                    <MaterialCommunityIcons
                      name="fire"
                      size={18}
                      color="#ff9800"
                    />
                    <Text style={styles.streakText}>
                      {habit.streak_count} Day Streak{" "}
                    </Text>
                  </View>
                  <View style={styles.frequencyBadge}>
                    <Text style={styles.frequencyText}>{habit.frequency}</Text>
                  </View>
                </View>
              </View>
            </Swipeable>
          ))
        )}
      </ScrollView>
    </View>
  );
}
