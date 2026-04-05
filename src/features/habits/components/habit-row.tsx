import { Trash2, Check } from "lucide-react";
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
  onDelete: (habit: Habit) => void;
}

export const HabitRow = ({
  habit,
  todayProgress = 0,
  onSelect,
  onDelete,
}: HabitRowProps) => {
  const diff = DIFFICULTY_STYLES[habit.difficulty];
  const isCompleted = todayProgress >= habit.daily_target;

  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border bg-surface hover:bg-surface-2 cursor-pointer transition-colors"
      onClick={() => onSelect(habit)}
    >
      {/* Color dot */}
      <span
        className={cn(
          "w-3 h-3 rounded-full shrink-0",
          CATEGORY_COLORS[habit.category]
        )}
      />

      {/* Name + meta */}
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold text-foreground truncate">
          {habit.name}
        </p>
        <p className="text-sm text-text-2 truncate">
          {CATEGORY_LABELS[habit.category]} · {habit.daily_target} {habit.unit}/day
        </p>
      </div>

      {/* XP badge (replaces difficulty pill) */}
      <span
        className={cn(
          "text-xs font-bold px-2.5 py-1 rounded-full border shrink-0",
          diff.className
        )}
      >
        {habit.exp_reward} XP
      </span>

      {/* Actions */}
      <div className="flex gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
        <button
          className={cn(
            "w-8 h-8 rounded-lg border flex items-center justify-center transition-colors cursor-pointer",
            isCompleted
              ? "border-accent-2/40 bg-accent-2/20 hover:bg-accent-2/10"
              : "border-accent-2/25 bg-accent-2/8 hover:bg-accent-2/15"
          )}
          title={isCompleted ? "Mark incomplete" : "Mark done"}
        >
          <Check size={14} className="text-accent-2" />
        </button>
        <button
          className="w-8 h-8 rounded-lg border border-danger/25 bg-danger/8 flex items-center justify-center hover:bg-danger/15 transition-colors cursor-pointer"
          onClick={() => onDelete(habit)}
          title="Delete"
        >
          <Trash2 size={14} className="text-danger" />
        </button>
      </div>
    </div>
  );
};
