"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressRing } from "@/components/shared/progress-ring";
import type { Habit } from "../types";
import { getHabitDisplay } from "../lib/habit-display";
import { CategoryChip, DifficultyChip } from "./habit-chips";

interface HabitCardProps {
  habit: Habit;
  /** Today's progress override. Falls back to the display stub. */
  progressToday?: number;
  onOpen?: (habit: Habit) => void;
  onLog?: (habit: Habit) => void;
}

export const HabitCard = ({
  habit,
  progressToday,
  onOpen,
  onLog,
}: HabitCardProps) => {
  const display = getHabitDisplay(habit);
  const progress = progressToday ?? habit.today_log?.completed_count ?? 0;
  const target = habit.daily_target;
  const done = progress >= target;

  return (
    <button
      type="button"
      onClick={() => onOpen?.(habit)}
      className={cn(
        "group text-left relative flex flex-col gap-3 overflow-hidden p-5 rounded-card-lg border cursor-pointer transition-all duration-150 ease-out",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]",
        done
          ? "border-mint"
          : "border-border hover:border-[var(--border-strong)]"
      )}
      style={
        done
          ? {
              background:
                "linear-gradient(135deg, var(--mint-soft) 0%, var(--card) 65%)",
            }
          : { background: "var(--card)" }
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5">
            <CategoryChip category={display.category} />
            <DifficultyChip difficulty={display.difficulty} />
          </div>
          <div className="text-[17px] font-bold leading-tight tracking-[-0.015em] truncate">
            {habit.name}
          </div>
        </div>
        <ProgressRing
          value={progress}
          target={target}
          color={done ? "var(--mint)" : "var(--coral)"}
        />
      </div>

      <div className="flex items-baseline gap-2">
        <span className="mono text-[26px] font-bold tracking-[-0.025em]">
          {formatValue(progress)}
        </span>
        <span className="mono text-[14px]" style={{ color: "var(--text-3)" }}>
          / {formatValue(target)} {habit.unit}
        </span>
        {done && (
          <span
            className="ml-1 inline-grid place-items-center w-[22px] h-[22px] rounded-full text-white font-bold text-[12px]"
            style={{ background: "var(--mint)" }}
          >
            <Check size={13} strokeWidth={3} />
          </span>
        )}
      </div>

      <div
        className="flex items-center justify-between gap-2 pt-3 border-t border-dashed"
        style={{ borderColor: "var(--border)" }}
      >
        <span
          className={cn(
            "inline-flex items-center gap-1 mono text-[12px] font-bold px-2.5 py-1 rounded-full",
            done
              ? "bg-mint-soft text-[oklch(0.38_0.13_165)] dark:text-[oklch(0.88_0.13_165)]"
              : "bg-violet-soft text-[oklch(0.42_0.18_285)] dark:text-[oklch(0.86_0.14_285)]"
          )}
        >
          +{habit.exp_reward} XP
        </span>
        <span
          role="button"
          aria-disabled={done}
          tabIndex={done ? -1 : 0}
          onClick={(e) => {
            e.stopPropagation();
            if (!done) onLog?.(habit);
          }}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !done) {
              e.preventDefault();
              e.stopPropagation();
              onLog?.(habit);
            }
          }}
          className={cn(
            "text-[12.5px] font-semibold px-3 py-1.5 rounded-[8px] border transition-colors",
            done
              ? "cursor-default pointer-events-none bg-mint text-white border-mint"
              : "cursor-pointer bg-surface-2 text-foreground border-border hover:bg-coral hover:text-white hover:border-coral"
          )}
        >
          {done ? "Completed" : "Log progress"}
        </span>
      </div>
    </button>
  );
};

const formatValue = (n: number) => {
  if (Number.isInteger(n)) return n.toString();
  return n.toFixed(1);
};
