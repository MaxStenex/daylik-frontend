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
    <div>
      <p className="text-xs font-bold text-text-3 tracking-widest uppercase mb-3">
        Active · {active.length} habit{active.length !== 1 ? "s" : ""}
      </p>

      {active.length === 0 ? (
        <p className="text-sm text-text-3 py-4 text-center">
          No active habits yet. Create one to get started.
        </p>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="w-12 px-4 py-2.5" />
                <th className="px-4 py-2.5 text-left text-xs font-bold text-text-3 tracking-wide uppercase">
                  Habit
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-text-3 tracking-wide uppercase">
                  Target
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-text-3 tracking-wide uppercase">
                  Category
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-bold text-text-3 tracking-wide uppercase">
                  XP
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface">
              {active.map((habit) => (
                <HabitRow
                  key={habit.id}
                  habit={habit}
                  todayProgress={todayProgress?.[habit.id] ?? 0}
                  onSelect={onSelect}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
