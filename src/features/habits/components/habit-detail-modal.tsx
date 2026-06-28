"use client";

import { useMemo } from "react";
import { Check, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContribGrid, ContribLegend } from "@/components/shared/contrib-grid";
import { cn } from "@/lib/utils";
import { useHabitLogs } from "../hooks/use-habit-logs";
import {
  buildHabitYearGrid,
  computeHabitStats,
  getHabitDisplay,
} from "../lib/habit-display";
import { CategoryChip, DifficultyChip } from "./habit-chips";
import { type Habit } from "../types";

const formatXp = (n: number): string =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

interface DetailChipProps {
  children: React.ReactNode;
}

const InfoChip = ({ children }: DetailChipProps) => (
  <span
    className="inline-flex items-center gap-1 rounded-full px-[9px] py-[3px] text-[11px] font-semibold"
    style={{ background: "var(--surface-2)", color: "var(--text-2)" }}
  >
    {children}
  </span>
);

interface HabitDetailModalProps {
  habit: Habit | null;
  open: boolean;
  onClose: () => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
  onLog: (habit: Habit) => void;
}

export const HabitDetailModal = ({
  habit,
  open,
  onClose,
  onEdit,
  onDelete,
  onLog,
}: HabitDetailModalProps) => {
  const { data: logs } = useHabitLogs(open ? habit?.id : null);

  const year = new Date().getFullYear();
  const stats = useMemo(
    () => (habit ? computeHabitStats(habit, logs ?? []) : null),
    [habit, logs],
  );
  const cells = useMemo(
    () => (habit ? buildHabitYearGrid(habit, logs ?? [], year) : []),
    [habit, logs, year],
  );

  const display = habit ? getHabitDisplay(habit) : null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="flex max-h-[90vh] flex-col gap-0 overflow-hidden border-border bg-surface p-0 sm:max-w-[720px]"
      >
        {habit && stats && display && (
          <>
            {/* Head */}
            <div className="border-b border-border px-6 pt-[22px] pb-4 pr-12">
              <DialogTitle className="text-[24px] font-bold tracking-[-0.025em] text-foreground">
                {habit.name}
              </DialogTitle>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <CategoryChip category={display.category} />
                <DifficultyChip difficulty={display.difficulty} />
                <InfoChip>
                  Target: {habit.daily_target} {habit.unit}/day
                </InfoChip>
                <InfoChip>
                  Reward: <span className="mono">{habit.exp_reward}</span> XP
                </InfoChip>
              </div>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-6 py-[18px]">
              {/* Stats */}
              <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                <StatCell
                  value={String(stats.currentStreak)}
                  label="Current streak"
                  color="var(--coral)"
                />
                <StatCell
                  value={`${stats.completionRate}%`}
                  label="Completion"
                  color="var(--mint)"
                />
                <StatCell value={String(stats.daysDone)} label="Days done" />
                <StatCell
                  value={formatXp(stats.xpEarned)}
                  label="XP earned"
                  color="var(--violet)"
                />
              </div>

              {/* Activity */}
              <div
                className="rounded-card-lg border p-[18px_20px]"
                style={{
                  background: "var(--surface-2)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-end justify-between">
                  <h3 className="text-[14px] font-bold tracking-[-0.01em]">
                    Activity
                  </h3>
                  <span
                    className="text-[12px]"
                    style={{ color: "var(--text-3)" }}
                  >
                    {year}
                  </span>
                </div>
                <ContribGrid cells={cells} className="mt-3.5" />
                <div
                  className="mt-3.5 flex items-center justify-between text-[11px]"
                  style={{ color: "var(--text-3)" }}
                >
                  <span>
                    <span className="mono font-semibold">{stats.daysDone}</span>{" "}
                    days on target
                  </span>
                  <ContribLegend />
                </div>
              </div>
            </div>

            {/* Foot */}
            <div
              className="flex items-center justify-between gap-2.5 border-t border-border px-[22px] py-3.5"
              style={{ background: "var(--surface-2)" }}
            >
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="gap-1.5 font-bold text-text-2 cursor-pointer"
                  onClick={() => onEdit(habit)}
                >
                  <Pencil size={14} />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="gap-1.5 font-bold text-danger hover:text-danger cursor-pointer"
                  onClick={() => onDelete(habit)}
                >
                  <Trash2 size={14} />
                  Delete
                </Button>
              </div>
              <Button
                disabled={stats.doneToday}
                onClick={() => onLog(habit)}
                className={cn(
                  "gap-1.5 font-bold text-primary-foreground cursor-pointer",
                  "bg-primary hover:bg-primary/90",
                )}
              >
                {stats.doneToday && <Check size={14} />}
                {stats.doneToday ? "Completed today" : "Log progress"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

interface StatCellProps {
  value: string;
  label: string;
  color?: string;
}

const StatCell = ({ value, label, color }: StatCellProps) => (
  <div
    className="rounded-[14px] border px-4 py-3.5"
    style={{ background: "var(--surface)", borderColor: "var(--border)" }}
  >
    <div
      className="mono text-[26px] font-bold leading-none tracking-[-0.03em]"
      style={color ? { color } : { color: "var(--foreground)" }}
    >
      {value}
    </div>
    <div
      className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.05em]"
      style={{ color: "var(--text-3)" }}
    >
      {label}
    </div>
  </div>
);
