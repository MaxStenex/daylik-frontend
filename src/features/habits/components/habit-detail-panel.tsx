"use client";

import { X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  DIFFICULTY_STYLES,
  STUB_LOGS,
  type Habit,
} from "../types";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, string> = {
  health: "🏃",
  learning: "📚",
  mindfulness: "🧘",
  productivity: "✍️",
};

const STAT_CARDS = [
  { label: "Streak", value: "14", color: "text-accent-3" },
  { label: "EXP earned", value: "4.2k", color: "text-primary" },
];

interface HabitDetailPanelProps {
  habit: Habit;
  onClose: () => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
}

export const HabitDetailPanel = ({
  habit,
  onClose,
  onEdit,
  onDelete,
}: HabitDetailPanelProps) => {
  const diff = DIFFICULTY_STYLES[habit.difficulty];

  return (
    <aside className="w-80 xl:w-96 shrink-0 flex flex-col h-full border-l border-border bg-surface overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-surface z-10">
        <h2 className="text-lg font-extrabold text-foreground truncate pr-2">
          {habit.name}
        </h2>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg border border-border bg-surface-2 flex items-center justify-center hover:bg-surface-3 transition-colors shrink-0 cursor-pointer"
        >
          <X size={15} className="text-text-2" />
        </button>
      </div>

      <div className="flex flex-col gap-4 px-5 py-4">
        {/* Hero card */}
        <div className="bg-surface-2 rounded-2xl border border-border p-4 text-center">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl",
              `${CATEGORY_COLORS[habit.category]}/15`
            )}
          >
            {CATEGORY_ICONS[habit.category]}
          </div>
          <p className="text-base font-extrabold text-foreground mb-1">
            {habit.name}
          </p>
          <p className="text-sm text-text-2">
            {CATEGORY_LABELS[habit.category]} · {diff.label} · {habit.exp_reward} XP/day
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2">
          {STAT_CARDS.map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-surface-2 rounded-xl border border-border py-3 px-2 text-center"
            >
              <span className={cn("text-lg font-extrabold block", color)}>
                {value}
              </span>
              <span className="text-xs text-text-2 block mt-0.5">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Recent logs */}
        <div>
          <p className="text-xs font-bold text-text-3 tracking-widest uppercase mb-2">
            Recent logs
          </p>
          <div className="flex flex-col gap-1.5">
            {STUB_LOGS.map((log) => (
              <div
                key={log.date}
                className="flex items-center gap-3 px-3 py-2.5 bg-surface-2 rounded-xl border border-border"
              >
                <span className="text-sm text-text-2 flex-1">{log.date}</span>
                <span className="text-sm font-bold text-foreground">
                  {log.value} {habit.unit}
                </span>
                {log.completed ? (
                  <span className="w-5 h-5 rounded-full bg-accent-2/15 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5 4-4"
                        stroke="#5dcaa5"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full bg-danger/10 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M3 3l4 4M7 3L3 7"
                        stroke="#e24b4a"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <Button
            variant="outline"
            className="w-full border-primary/30 bg-primary/8 text-primary hover:bg-primary/15 font-bold cursor-pointer"
            onClick={() => onEdit(habit)}
          >
            <Edit2 size={14} className="mr-2" />
            Edit habit
          </Button>
          <Button
            variant="ghost"
            className="w-full text-danger hover:bg-danger/10 hover:text-danger font-bold cursor-pointer"
            onClick={() => onDelete(habit)}
          >
            Delete habit
          </Button>
        </div>
      </div>
    </aside>
  );
};
