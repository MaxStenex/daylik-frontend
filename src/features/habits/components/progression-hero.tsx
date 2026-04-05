import { Flame, Target, Zap, Crown } from "lucide-react";
import { type UserProgression } from "../types";
import { cn } from "@/lib/utils";

interface ProgressionHeroProps {
  progression: UserProgression;
}

const STAT_CARDS = [
  { key: "streak", icon: Flame, color: "text-accent-3", bgColor: "bg-accent-3/15" },
  { key: "today", icon: Target, color: "text-accent-2", bgColor: "bg-accent-2/15" },
  { key: "xp", icon: Zap, color: "text-primary", bgColor: "bg-primary/15" },
  { key: "best", icon: Crown, color: "text-accent-3", bgColor: "bg-accent-3/15" },
] as const;

export const ProgressionHero = ({ progression }: ProgressionHeroProps) => {
  const xpPercent = Math.round(
    (progression.current_xp / progression.xp_to_next_level) * 100
  );
  const xpRemaining = progression.xp_to_next_level - progression.current_xp;

  const statValues: Record<string, { value: string; label: string }> = {
    streak: { value: String(progression.current_streak), label: "Streak" },
    today: {
      value: `${progression.today_completed}/${progression.today_total}`,
      label: "Today",
    },
    xp: {
      value:
        progression.total_xp >= 1000
          ? `${(progression.total_xp / 1000).toFixed(1)}k`
          : String(progression.total_xp),
      label: "Total XP",
    },
    best: { value: String(progression.best_streak), label: "Best" },
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Level / XP bar */}
      <div className="flex items-center gap-4 bg-surface rounded-xl border border-border p-4">
        {/* Level badge */}
        <div className="relative w-14 h-14 shrink-0">
          <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-surface-3"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${(xpPercent / 100) * 150.8} 150.8`}
              className="text-primary"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-lg font-extrabold text-foreground">
            {progression.level}
          </span>
        </div>

        {/* XP info */}
        <div className="flex-1 min-w-0">
          <p className="text-base font-extrabold text-foreground mb-0.5">
            Level {progression.level}{" "}
            <span className="font-medium text-text-2">
              · {progression.rank_title}
            </span>
          </p>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-surface-3 mt-1.5 mb-1">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${xpPercent}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-text-2">
              {progression.current_xp.toLocaleString()} /{" "}
              {progression.xp_to_next_level.toLocaleString()} XP
            </span>
            <span className="text-xs text-text-3">
              {xpRemaining.toLocaleString()} XP to Level{" "}
              {progression.level + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {STAT_CARDS.map(({ key, icon: Icon, color, bgColor }) => {
          const stat = statValues[key];
          return (
            <div
              key={key}
              className="bg-surface rounded-xl border border-border py-2.5 px-2.5 text-center"
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-2",
                  bgColor
                )}
              >
                <Icon size={16} className={color} />
              </div>
              <span
                className={cn("text-xl font-extrabold block leading-none", color)}
              >
                {stat.value}
              </span>
              <span className="text-xs text-text-3 block mt-1 tracking-wide">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
