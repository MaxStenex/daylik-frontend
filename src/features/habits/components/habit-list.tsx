import { type Habit } from "../types";
import { HabitRow } from "./habit-row";

interface HabitListProps {
  habits: Habit[];
  todayProgress?: Record<string, number>;
  onSelect: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
}

export const HabitList = ({ habits, todayProgress, onSelect, onDelete }: HabitListProps) => {
  const active = habits.filter((h) => h.archived_at === null);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-bold text-text-3 tracking-widest uppercase mb-2">
        Active · {active.length} habit{active.length !== 1 ? "s" : ""}
      </p>
      {active.map((habit) => (
        <HabitRow
          key={habit.id}
          habit={habit}
          todayProgress={todayProgress?.[habit.id] ?? 0}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
      {active.length === 0 && (
        <p className="text-sm text-text-3 py-4 text-center">
          No active habits yet. Create one to get started.
        </p>
      )}
    </div>
  );
};
