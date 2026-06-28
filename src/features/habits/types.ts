export interface Habit {
  id: string;
  name: string;
  exp_reward: number;
  daily_target: number;
  unit: string;
  created_at: string;
  /** Today's log entry for this habit, when the backend includes it. */
  today_log?: HabitLog;
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

export interface HabitLog {
  id: string;
  habit_id: string;
  completed_count: number;
  created_at: string;
}

export interface CreateHabitLogPayload {
  habit_id: string;
  completed_count: number;
}

export interface UpdateHabitLogPayload {
  completed_count: number;
}

export interface ListHabitLogsResponse {
  logs: HabitLog[];
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
