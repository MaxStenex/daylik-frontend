export type Difficulty = "easy" | "medium" | "hard";
export type Category = "health" | "learning" | "mindfulness" | "productivity";

export interface Habit {
  id: string;
  name: string;
  exp_reward: number;
  daily_target: number;
  unit: string;
  category: Category;
  difficulty: Difficulty;
  created_at: string;
  archived_at: string | null;
}

export interface LogEntry {
  date: string;
  value: number;
  completed: boolean;
}

export const STUB_HABITS: Habit[] = [
  {
    id: "1",
    name: "Run 5 km",
    exp_reward: 300,
    daily_target: 5,
    unit: "km",
    category: "health",
    difficulty: "hard",
    created_at: "2026-03-01T00:00:00Z",
    archived_at: null,
  },
  {
    id: "2",
    name: "Read 30 min",
    exp_reward: 150,
    daily_target: 30,
    unit: "min",
    category: "learning",
    difficulty: "medium",
    created_at: "2026-03-01T00:00:00Z",
    archived_at: null,
  },
  {
    id: "3",
    name: "Meditate 10 min",
    exp_reward: 100,
    daily_target: 10,
    unit: "min",
    category: "mindfulness",
    difficulty: "easy",
    created_at: "2026-03-01T00:00:00Z",
    archived_at: null,
  },
  {
    id: "4",
    name: "Write 500 words",
    exp_reward: 200,
    daily_target: 500,
    unit: "words",
    category: "productivity",
    difficulty: "medium",
    created_at: "2026-03-01T00:00:00Z",
    archived_at: null,
  },
  {
    id: "5",
    name: "Cold shower",
    exp_reward: 150,
    daily_target: 1,
    unit: "session",
    category: "health",
    difficulty: "hard",
    created_at: "2026-02-01T00:00:00Z",
    archived_at: "2026-04-01T00:00:00Z",
  },
];

export interface UserProgression {
  level: number;
  rank_title: string;
  current_xp: number;
  xp_to_next_level: number;
  current_streak: number;
  best_streak: number;
  total_xp: number;
  today_completed: number;
  today_total: number;
}

export const STUB_PROGRESSION: UserProgression = {
  level: 4,
  rank_title: "Habit Master",
  current_xp: 2450,
  xp_to_next_level: 4000,
  current_streak: 14,
  best_streak: 21,
  total_xp: 12450,
  today_completed: 2,
  today_total: 4,
};

export const STUB_TODAY_PROGRESS: Record<string, number> = {
  "1": 3.2,
  "2": 30,
  "3": 0,
  "4": 250,
};

export const STUB_LOGS: LogEntry[] = [
  { date: "Today, Apr 4", value: 3.2, completed: false },
  { date: "Yesterday, Apr 3", value: 5.1, completed: true },
  { date: "Wed, Apr 2", value: 6.0, completed: true },
  { date: "Tue, Apr 1", value: 4.8, completed: true },
];

export const CATEGORY_COLORS: Record<Category, string> = {
  health: "bg-accent-2",
  learning: "bg-primary",
  mindfulness: "bg-accent-3",
  productivity: "bg-pink-500",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  health: "Health",
  learning: "Learning",
  mindfulness: "Mindfulness",
  productivity: "Productivity",
};

export const DIFFICULTY_STYLES: Record<
  Difficulty,
  { label: string; className: string }
> = {
  easy: {
    label: "Easy",
    className: "bg-accent-2/15 text-accent-2 border-accent-2/30",
  },
  medium: {
    label: "Medium",
    className: "bg-accent-3/15 text-accent-3 border-accent-3/30",
  },
  hard: {
    label: "Hard",
    className: "bg-primary/15 text-primary border-primary/30",
  },
};
