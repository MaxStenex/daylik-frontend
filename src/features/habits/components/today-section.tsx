"use client";

import type { Habit } from "../types";
import { HabitCard } from "./habit-card";

interface TodaySectionProps {
  habits: Habit[];
  progressByHabitId?: Record<string, number>;
  onOpenHabit?: (habit: Habit) => void;
  onLogHabit?: (habit: Habit) => void;
}

const motivation = (done: number, total: number): string => {
  if (total === 0) return "Add your first habit to get started.";
  if (done === total) return "Day complete — every habit knocked out. Nice.";
  if (done === 0) return "Fresh slate. Pick one and start the chain.";
  if (done / total >= 0.5) return "Halfway there — keep the momentum.";
  return "Solid start. One down, more to go.";
};

export const TodaySection = ({
  habits,
  progressByHabitId,
  onOpenHabit,
  onLogHabit,
}: TodaySectionProps) => {
  const total = habits.length;
  const done = habits.reduce((acc, h) => {
    const prog = progressByHabitId?.[h.id] ?? 0;
    return prog >= h.daily_target ? acc + 1 : acc;
  }, 0);
  const xpEarned = habits.reduce((acc, h) => {
    const prog = progressByHabitId?.[h.id] ?? 0;
    return prog >= h.daily_target ? acc + h.exp_reward : acc;
  }, 0);
  const xpRemaining = habits.reduce((acc, h) => {
    const prog = progressByHabitId?.[h.id] ?? 0;
    return prog >= h.daily_target ? acc : acc + h.exp_reward;
  }, 0);

  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between gap-3 mb-3.5">
        <h2 className="text-[16px] font-bold tracking-[-0.01em]">Today</h2>
        <div className="text-[12px]" style={{ color: "var(--text-3)" }}>
          <strong className="text-foreground font-bold">
            {done}/{total}
          </strong>{" "}
          habits done ·{" "}
          <strong className="text-foreground font-bold">
            <span className="mono">{xpEarned}</span>
          </strong>{" "}
          XP earned ·{" "}
          <strong className="text-foreground font-bold">
            <span className="mono">{xpRemaining}</span>
          </strong>{" "}
          XP left on the table
        </div>
      </div>
      <p className="text-[13px] mb-3.5" style={{ color: "var(--text-2)" }}>
        {motivation(done, total)}
      </p>
      {total === 0 ? (
        <div
          className="rounded-card-lg border p-8 text-center"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-3)" }}>
            No habits yet. Create your first one to start earning XP.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              progressToday={progressByHabitId?.[habit.id]}
              onOpen={onOpenHabit}
              onLog={onLogHabit}
            />
          ))}
        </div>
      )}
    </section>
  );
};
