export interface Habit {
  id: string;
  name: string;
  exp_reward: number;
  daily_target: number;
  unit: string;
  created_at: string;
}

export interface HabitPayload {
  name: string;
  exp_reward: number;
  daily_target: number;
  unit: string;
}

export interface ListHabitsResponse {
  habits: Habit[];
}

export interface LogEntry {
  date: string;
  value: number;
  completed: boolean;
}

export interface UserProgression {
  level: number;
  current_xp: number;
  xp_to_next_level: number;
  current_streak: number;
  best_streak: number;
  total_xp: number;
  today_completed: number;
  today_total: number;
}

// TODO: replace with real API once backend exposes progression/logs endpoints.
export const STUB_PROGRESSION: UserProgression = {
  level: 4,
  current_xp: 2450,
  xp_to_next_level: 4000,
  current_streak: 14,
  best_streak: 21,
  total_xp: 12450,
  today_completed: 2,
  today_total: 4,
};

// TODO: replace with real per-habit progress once backend exposes log endpoints.
export const STUB_TODAY_PROGRESS: Record<string, number> = {};

// TODO: replace with real log fetch once backend exposes it.
export const STUB_LOGS: LogEntry[] = [
  { date: "Today, Apr 4", value: 3.2, completed: false },
  { date: "Yesterday, Apr 3", value: 5.1, completed: true },
  { date: "Wed, Apr 2", value: 6.0, completed: true },
  { date: "Tue, Apr 1", value: 4.8, completed: true },
];
