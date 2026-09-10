import {
  databases,
  DB_ID,
  HABIT_COMPLETION,
  HABIT_DB_ID,
} from "@/lib/appwrite";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Query } from "react-native-appwrite";
import { HabitCompletion, Habits } from "../../../database.type";
import { useAuth } from "../../lib/auth-context";
import { isStreakBroken } from "../../lib/streak-utils";

export default function StreaksScreen() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habits[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchStreakData = useCallback(async () => {
    if (!user) return;
    try {
      const habitsRes = await databases.listDocuments<Habits>(
        DB_ID!,
        HABIT_DB_ID!,
        [Query.equal("userId", user.$id)]
      );

      const completionsRes = await databases.listDocuments<HabitCompletion>(
        DB_ID!,
        HABIT_COMPLETION!,
        [Query.equal("user_id", user.$id)]
      );

      const updatedHabits = await Promise.all(
        habitsRes.documents.map(async (habit) => {
          if (isStreakBroken(habit)) {
          await databases.updateDocument(
            DB_ID!,
            HABIT_DB_ID!,
            habit.$id,
            {
              streak_count: 0,
            }
      );
      return {
            ...habit,
            streak_count: 0,
          };
        }

        return habit;
      })
    );
    setHabits(updatedHabits)
      setCompletions(completionsRes.documents);
    } catch (error) {
      console.error("Error fetching streak data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchStreakData();
    }, [fetchStreakData])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchStreakData();
  };


  

  const completionCounts: { [key: string]: number } = {};
  completions.forEach((c) => {
    if (c.habits_id) {
      completionCounts[c.habits_id] = (completionCounts[c.habits_id] || 0) + 1;
    }
  });

  const sortedHabits = [...habits].sort(
    (a, b) => (b.streak_count || 0) - (a.streak_count || 0)
  );

  const topThree = sortedHabits.slice(0, 3);


  

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#8B5CF6"]} />
      }
    >
      {/* Spacer for transparent header */}
      <View style={styles.headerSpacer} />

      {/* Top Streaks Card */}
      <View style={styles.topStreaksCard}>
        <View style={styles.topStreaksHeader}>
          <Text style={styles.medalEmoji}>🥇</Text>
          <Text style={styles.topStreaksTitle}>Top Streaks</Text>
        </View>

        {topThree.length === 0 ? (
          <Text style={styles.emptyText}>No habits created yet</Text>
        ) : (
          topThree.map((habit, index) => (
            <View
              key={habit.$id}
              style={[
                styles.topStreakRow,
                index === topThree.length - 1 && styles.lastRow,
              ]}
            >
              <View style={styles.rankCircle}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>
              <Text style={styles.topStreakHabitTitle}>{habit.title}</Text>
              {habit.streak_count > 0 ? (
                <Text style={styles.topStreakCount}>🔥 {habit.streak_count}</Text>
              ) : null}
            </View>
          ))
        )}
      </View>

      {/* Individual Habit Cards */}
      {habits.map((habit, index) => {
        const total = completionCounts[habit.$id] || 0;
        const current = habit.streak_count || 0;
        const best = habit.streak_count || 0;

        return (
          <View
            key={habit.$id}
            style={[
              styles.habitCard,
              index === 0 ? styles.featuredCard : styles.standardCard,
            ]}
          >
            <Text style={styles.cardTitle}>{habit.title}</Text>
            {habit.description ? (
              <Text style={styles.cardDescription}>{habit.description}</Text>
            ) : null}

            <View style={styles.badgesRow}>
              {/* Current Streak */}
              <View style={styles.badgeBoxPeach}>
                <View style={styles.badgeHeader}>
                  <Text style={styles.badgeIcon}>🔥</Text>
                  <Text style={styles.badgeNumber}>{current}</Text>
                </View>
                <Text style={styles.badgeLabel}>Current</Text>
              </View>

              {/* Best Streak */}
              <View style={styles.badgeBoxYellow}>
                <View style={styles.badgeHeader}>
                  <Text style={styles.badgeIcon}>🏆</Text>
                  <Text style={styles.badgeNumber}>{best}</Text>
                </View>
                <Text style={styles.badgeLabel}>Best</Text>
              </View>

              {/* Total Completions */}
              <View style={styles.badgeBoxGreen}>
                <View style={styles.badgeHeader}>
                  <Text style={styles.badgeIcon}>✅</Text>
                  <Text style={styles.badgeNumber}>{total}</Text>
                </View>
                <Text style={styles.badgeLabel}>Total</Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  headerSpacer: {
    height: 70,
    marginBottom: 35,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 16,
    marginTop: 4,
  },

  /* Top Streaks Card */
  topStreaksCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  topStreaksHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  medalEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  topStreaksTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7C3AED",
  },
  topStreakRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  lastRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  rankCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4B5563",
  },
  topStreakHabitTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  topStreakCount: {
    fontWeight: "600",
    color: "#4B5563",
  },
  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    paddingVertical: 12,
  },

  /* Habit Cards */
  habitCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featuredCard: {
    borderWidth: 1.5,
    borderColor: "#8B5CF6",
  },
  standardCard: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
    lineHeight: 19,
  },

  /* Badges Row */
  badgesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  badgeBoxPeach: {
    flex: 1,
    backgroundColor: "#FFF7ED",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  badgeBoxYellow: {
    flex: 1,
    backgroundColor: "#FEFCE8",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  badgeBoxGreen: {
    flex: 1,
    backgroundColor: "#DCFCE7",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  badgeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeIcon: {
    fontSize: 15,
  },
  badgeNumber: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2937",
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 2,
  },
});

