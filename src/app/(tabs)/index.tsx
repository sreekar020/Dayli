import { styles } from "@/app/components/habitsCard";
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
import { Habits } from "../../../database.type";
import { useAuth } from "../../lib/auth-context";

export default function HomeScreen() {
  const { Logout } = useAuth();
  const { user } = useAuth();

  const [habits, setHabits] = useState<Habits[] | []>([]);

  const SwipeableRef = useRef<{ [key: string]: Swipeable | null }>({});

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, [user]),
  );

  useEffect(() => {
    if (user) {
      const channel = `databases.${DB_ID}.collections.${HABIT_DB_ID}.documents`;

      const habitsSubscription = client.subscribe(
        channel,
        (response: realtimeResponse) => {
          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.create",
            )
          ) {
            fetchHabits();
          } else if (
            response.events.includes(
              "databases.*.collections.*.documents.*.update",
            )
          ) {
            fetchHabits();
          } else if (
            response.events.includes(
              "databases.*.collections.*.documents.*.delete",
            )
          ) {
            fetchHabits();
          }
        },
      );
      fetchHabits();
      return () => {
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
    } catch (error) {
      console.error(error);
    }
  };
  const handeDelete = async (id: string) => {
    // Optimistic Update: Immediately remove from UI for 0ms delay
    setHabits((prevHabits) => prevHabits.filter((h) => h.$id !== id));

    try {
      await databases.deleteDocument(DB_ID!, HABIT_DB_ID!, id);
    } catch (error) {
      console.error("Failed to delete habit:", error);
      // Rollback on failure
      fetchHabits();
    }
  };
  const markComplete = async (id: string) => {
    if (!user) return;
    try {
      await databases.createDocument(DB_ID!, HABIT_COMPLETION!, ID.unique(), {
        habits_id: id,
        user_id: user.$id,
      });
      const habit = habits?.find((h) => h.$id === id);
      if (!habit) return;
      const newCount = habit.streak_count + 1;
      await databases.updateDocument(DB_ID!, HABIT_DB_ID!, id, {
        streak_count: newCount,
        last_completed: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to mark complete:", error);
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

  const renderRightActions = () => (
    <View style={styles.rightaction}>
      <MaterialCommunityIcons
        name="check-circle-outline"
        size={28}
        color="#ffffffff"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todays Habits</Text>
      </View>
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
              renderRightActions={renderRightActions}
              onSwipeableOpen={(direction) => {
                if (direction === "left") {
                  handeDelete(habit.$id);
                } else if (direction === "right") {
                  markComplete(habit.$id);
                }
                SwipeableRef.current[habit.$id]?.close();
              }}
            >
              <View style={styles.cardContent}>
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
