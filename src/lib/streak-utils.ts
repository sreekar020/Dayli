// making daily habit to midnight 12:00
// weekly habit to sunday
// and montly habit to 1st for every month

import { Habits } from "../../database.type";

type Frequency = "Daily" | "Weekly" | "Monthly";

export function getPeriodStart(date: Date, frequency: Frequency): Date {
  const now = new Date(date);
  now.setHours(0, 0, 0, 0);

  if (frequency === "Daily") {
    return now;
  }

  if (frequency === "Weekly") {
    const day = now.getDay();
    now.setDate(now.getDate() - day);
    return now;
  }

  if (frequency === "Monthly") {
    now.setDate(1);
    return now;
  }

  return now;
}

export function isStreakBroken(habit: Habits): boolean {
  if (!habit.last_completed || habit.streak_count === 0) {
    return false;
  }

  const now = new Date();
  const lastCompleted = new Date(habit.last_completed);

  const currentPeriod = getPeriodStart(now, habit.frequency as Frequency);

  const lastCompletedPeriod = getPeriodStart(
    lastCompleted,
    habit.frequency as Frequency,
  );

  const previousPeriod = new Date(currentPeriod);

  if (habit.frequency === "Daily") {
    previousPeriod.setDate(previousPeriod.getDate() - 1);
  }

  if (habit.frequency === "Weekly") {
    previousPeriod.setDate(previousPeriod.getDate() - 7);
  }

  if (habit.frequency === "Monthly") {
    previousPeriod.setMonth(previousPeriod.getMonth() - 1);
  }
  //   last completed in previous period

  if (lastCompletedPeriod.getTime() === previousPeriod.getTime()) {
    return false;
  }
  //   last completed during currentperiod

  if (lastCompleted.getTime() === currentPeriod.getTime()) {
    return false;
  }

  return true;
}
