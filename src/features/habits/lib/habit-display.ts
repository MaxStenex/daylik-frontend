/**
 * Display-stub layer for fields the redesign needs but the backend doesn't expose yet.
 *
 * When the backend grows `category` / `difficulty` / today-progress / achievements /
 * contribution history, this is the single file to replace. The real `Habit` type
 * stays as-is.
 */

import type { Habit } from "../types";
import type { ContribCell, ContribLevel } from "@/components/shared/contrib-grid";

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
// Stub contribution-grid data
// ---------------------------------------------------------------------------

export const buildStubContribCells = (weeks: number = 18): ContribCell[] => {
  const out: ContribCell[] = [];
  const today = new Date();
  // Start at the Sunday `weeks * 7 - 1` days back so the grid ends on today's column.
  const totalDays = weeks * 7;
  let seed = 1337;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const r = rnd();
    let level: ContribLevel = 0;
    if (r > 0.85) level = 4;
    else if (r > 0.65) level = 3;
    else if (r > 0.4) level = 2;
    else if (r > 0.18) level = 1;
    out.push({ date: d.toISOString().slice(0, 10), level });
  }
  return out;
};
