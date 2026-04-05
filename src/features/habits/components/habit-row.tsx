import { Check } from "lucide-react";
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  DIFFICULTY_STYLES,
  type Habit,
} from "../types";
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
  const diff = DIFFICULTY_STYLES[habit.difficulty];
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
              : "border-border bg-surface-3 hover:bg-surface-2"
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
        <div className="flex items-center gap-2.5">
          <span
            className={cn("w-2 h-2 rounded-full shrink-0", CATEGORY_COLORS[habit.category])}
          />
          <span className="text-sm font-semibold text-foreground truncate">{habit.name}</span>
        </div>
      </td>

      {/* Target */}
      <td className="px-4 py-3 text-sm text-text-2 whitespace-nowrap">
        {habit.daily_target} {habit.unit}/day
      </td>

      {/* Category */}
      <td className="px-4 py-3 text-sm text-text-2 whitespace-nowrap">
        {CATEGORY_LABELS[habit.category]}
      </td>

      {/* XP */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full border", diff.className)}>
          {habit.exp_reward} XP
        </span>
      </td>

    </tr>
  );
};
