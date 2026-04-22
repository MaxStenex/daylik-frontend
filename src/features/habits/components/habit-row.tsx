import { Check } from "lucide-react";
import { type Habit } from "../types";
import { cn } from "@/lib/utils";

interface HabitRowProps {
  habit: Habit;
  todayProgress?: number;
  onSelect: (habit: Habit) => void;
}

export const HabitRow = ({
  habit,
  todayProgress = 0,
  onSelect,
}: HabitRowProps) => {
  const isCompleted = todayProgress >= habit.daily_target;

  return (
    <tr
      className="border-b border-border last:border-0 hover:bg-surface-2 cursor-pointer transition-colors"
      onClick={() => onSelect(habit)}
    >
      {/* Checker */}
      <td className="w-12 px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
        <button
          className={cn(
            "w-7 h-7 rounded-lg border flex items-center justify-center transition-colors cursor-pointer mx-auto",
            isCompleted
              ? "border-accent-2/40 bg-accent-2/20 hover:bg-accent-2/10"
              : "border-border-2 bg-transparent hover:bg-surface-2"
          )}
          title={isCompleted ? "Mark incomplete" : "Mark done"}
        >
          <Check
            size={13}
            className={cn(isCompleted ? "text-accent-2" : "text-text-3")}
          />
        </button>
      </td>

      {/* Habit name */}
      <td className="px-4 py-3 min-w-0">
        <span className="text-sm font-semibold text-foreground truncate">{habit.name}</span>
      </td>

      {/* Target */}
      <td className="px-4 py-3 text-sm text-text-2 whitespace-nowrap">
        {habit.daily_target} {habit.unit}/day
      </td>

      {/* XP */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-xs font-bold px-2 py-0.5 rounded-full border bg-primary/15 text-primary border-primary/30">
          {habit.exp_reward} XP
        </span>
      </td>
    </tr>
  );
};
