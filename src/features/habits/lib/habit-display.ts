/**
 * Display-stub layer for fields the redesign needs but the backend doesn't expose yet.
 *
 * When the backend grows `category` / `difficulty` / today-progress / achievements /
 * contribution history, this is the single file to replace. The real `Habit` type
 * stays as-is.
 */

import type { Habit, HabitLog } from "../types";
import {
  buildYearGrid,
  toDateKey,
  type ContribCell,
  type ContribLevel,
} from "@/components/shared/contrib-grid";

export type HabitCategory =
  | "health"
  | "learning"
  | "mindfulness"
  | "productivity";

export type HabitDifficulty = "easy" | "medium" | "hard";

export interface HabitDisplay {
  category: HabitCategory;
  difficulty: HabitDifficulty;
  /** Today's logged progress toward `daily_target`. Stubbed at 0 until backend ships an endpoint. */
  progressToday: number;
}

const CATEGORIES: HabitCategory[] = [
  "health",
  "learning",
  "mindfulness",
  "productivity",
];
const DIFFICULTIES: HabitDifficulty[] = ["easy", "medium", "hard"];

const hashString = (s: string): number => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (h * 33) ^ s.charCodeAt(i);
  }
  return h >>> 0;
};

export const getHabitDisplay = (habit: Habit): HabitDisplay => {
  const h = hashString(habit.id);
  return {
    category: CATEGORIES[h % CATEGORIES.length],
    difficulty: DIFFICULTIES[(h >> 4) % DIFFICULTIES.length],
    progressToday: 0,
  };
};

// ---------------------------------------------------------------------------
// Stub achievements (copied verbatim from design_handoff_daylik/data.jsx)
// ---------------------------------------------------------------------------

export type AchievementColor =
  | "mint"
  | "coral"
  | "sky"
  | "violet"
  | "amber"
  | "rose"
  | "gold"
  | "locked";

export interface Achievement {
  id: string;
  name: string;
  desc: string;
  icon: string;
  color: AchievementColor;
  xp: number;
  earned?: string;
  progress?: number;
  total?: number;
}

export const STUB_ACHIEVEMENTS: Achievement[] = [
  { id: "a-first", name: "First Step", desc: "Complete a habit for the very first time.", icon: "👣", color: "mint", xp: 100, earned: "2026-01-12" },
  { id: "a-roll", name: "On a Roll", desc: "Hit a 5-day streak.", icon: "🔥", color: "coral", xp: 200, earned: "2026-01-17" },
  { id: "a-week", name: "Full Week", desc: "Complete all habits every day for a full week.", icon: "📅", color: "sky", xp: 300, earned: "2026-04-05" },
  { id: "a-early", name: "Early Bird", desc: "Log a habit before 7am, 5 days in a row.", icon: "🌅", color: "amber", xp: 250, earned: "2026-02-22" },
  { id: "a-zen", name: "Zen Mode", desc: "Complete 25 mindfulness habits.", icon: "🧘", color: "violet", xp: 300, earned: "2026-04-18" },
  { id: "a-night", name: "Night Owl", desc: "Log a habit after 11pm, 5 days in a row.", icon: "🌙", color: "violet", xp: 250, progress: 2, total: 5 },
  { id: "a-unstop", name: "Unstoppable", desc: "Reach a 30-day streak.", icon: "⚡", color: "amber", xp: 500, progress: 14, total: 30 },
  { id: "a-century", name: "Century", desc: "Complete 100 habits total.", icon: "💯", color: "coral", xp: 500, progress: 37, total: 100 },
  { id: "a-health", name: "Health Nut", desc: "Complete 10 habits in the Health category.", icon: "🥗", color: "mint", xp: 300, progress: 6, total: 10 },
  { id: "a-marathon", name: "Marathon", desc: "Run a total of 42km across logged sessions.", icon: "🏃", color: "rose", xp: 400, progress: 28, total: 42 },
  { id: "a-bookworm", name: "Bookworm", desc: "Read 500 pages total.", icon: "📚", color: "sky", xp: 400, progress: 215, total: 500 },
  { id: "a-legend", name: "Legend", desc: "Reach a 100-day streak.", icon: "👑", color: "gold", xp: 1000, progress: 14, total: 100 },
];

// ---------------------------------------------------------------------------
// Real per-habit aggregation (driven by habit logs)
// ---------------------------------------------------------------------------

export interface HabitStats {
  /** Consecutive completed days ending today (or yesterday if today isn't logged yet). */
  currentStreak: number;
  /** Share of logged days that met the target, 0–100. */
  completionRate: number;
  /** Number of days the target was met. */
  daysDone: number;
  /** EXP earned across all completed days. */
  xpEarned: number;
  /** Best logged count for today. */
  todayCompleted: number;
  /** Whether today already meets the target. */
  doneToday: boolean;
}

const levelForRatio = (ratio: number): ContribLevel =>
  ratio <= 0 ? 0 : ratio >= 1 ? 4 : ratio >= 0.75 ? 3 : ratio >= 0.4 ? 2 : 1;

/** Best (highest) logged count per calendar day — log counts are absolute, not increments. */
const dailyTotals = (logs: HabitLog[]): Map<string, number> => {
  const totals = new Map<string, number>();
  for (const log of logs) {
    const key = toDateKey(new Date(log.created_at));
    totals.set(key, Math.max(totals.get(key) ?? 0, log.completed_count));
  }
  return totals;
};

export const computeHabitStats = (habit: Habit, logs: HabitLog[]): HabitStats => {
  const totals = dailyTotals(logs);
  const target = habit.daily_target;

  let daysDone = 0;
  for (const value of totals.values()) if (target > 0 && value >= target) daysDone++;

  const totalDays = totals.size;
  const completionRate = totalDays
    ? Math.round((daysDone / totalDays) * 100)
    : 0;

  const today = new Date();
  const todayCompleted = totals.get(toDateKey(today)) ?? 0;
  const doneToday = target > 0 && todayCompleted >= target;

  // Walk backwards day by day; today not being logged yet doesn't break the streak.
  let currentStreak = 0;
  const cursor = new Date(today);
  if (!doneToday) cursor.setDate(cursor.getDate() - 1);
  while (target > 0 && (totals.get(toDateKey(cursor)) ?? 0) >= target) {
    currentStreak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return {
    currentStreak,
    completionRate,
    daysDone,
    xpEarned: daysDone * habit.exp_reward,
    todayCompleted,
    doneToday,
  };
};

export const buildHabitYearGrid = (
  habit: Habit,
  logs: HabitLog[],
  year: number,
): ContribCell[] => {
  const totals = dailyTotals(logs);
  return buildYearGrid(year, (key) => {
    const value = totals.get(key);
    if (value === undefined) return null;
    const ratio = habit.daily_target > 0 ? value / habit.daily_target : 0;
    return { level: levelForRatio(ratio), label: `${value} ${habit.unit}` };
  });
};

// ---------------------------------------------------------------------------
// Stub contribution-grid data (dashboard "Your year so far" — until the
// backend exposes an aggregate-across-habits endpoint)
// ---------------------------------------------------------------------------

export const buildStubContribCells = (
  year: number = new Date().getFullYear(),
): ContribCell[] => {
  let seed = 1337;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const today = toDateKey(new Date());
  return buildYearGrid(year, (key) => {
    // Don't invent activity in the future.
    if (key > today) return null;
    const r = rnd();
    let level: ContribLevel = 0;
    if (r > 0.85) level = 4;
    else if (r > 0.65) level = 3;
    else if (r > 0.4) level = 2;
    else if (r > 0.18) level = 1;
    return level === 0 ? null : { level };
  });
};
