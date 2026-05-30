import type { UserProgression } from "../types";

const LEVEL_TITLES: Record<number, string> = {
  1: "Newcomer",
  2: "Sprout",
  3: "Seedling",
  4: "Habit Apprentice",
  5: "Routine Builder",
  6: "Steady Climber",
  7: "Disciplined",
  8: "Veteran",
  9: "Master",
  10: "Legendary",
};

const levelTitle = (lvl: number) => LEVEL_TITLES[lvl] ?? "Habit Master";

interface LevelCardProps {
  progression: UserProgression;
}

export const LevelCard = ({ progression }: LevelCardProps) => {
  const { level, current_xp, xp_to_next_level } = progression;
  const pct = Math.min((current_xp / Math.max(xp_to_next_level, 1)) * 100, 100);

  return (
    <div
      className="relative overflow-hidden rounded-card-lg border p-6 sm:p-7"
      style={{
        background:
          "linear-gradient(135deg, var(--violet-soft) 0%, var(--coral-soft) 100%)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 200px at -10% 110%, oklch(0.68 0.16 35 / 0.15), transparent 70%)",
        }}
      />
      <div className="relative flex items-center justify-between gap-4 mb-4">
        <div>
          <div
            className="text-[11px] font-bold uppercase tracking-[0.08em]"
            style={{ color: "var(--text-3)" }}
          >
            Level
          </div>
          <div className="flex items-baseline gap-3 mt-1">
            <div
              className="mono text-[56px] font-bold leading-none tracking-[-0.04em]"
              style={{ color: "var(--foreground)" }}
            >
              {level}
            </div>
            <div className="text-[18px] font-bold tracking-tight">
              {levelTitle(level)}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div
            className="text-[11px] font-bold uppercase tracking-[0.08em]"
            style={{ color: "var(--text-3)" }}
          >
            Next level
          </div>
          <div className="mono text-[18px] font-bold mt-1">
            {xp_to_next_level.toLocaleString()} XP
          </div>
        </div>
      </div>
      <div className="relative">
        <div
          className="h-3 rounded-full overflow-hidden border"
          style={{
            background: "oklch(1 0 0 / 0.5)",
            borderColor: "oklch(0.2 0.02 40 / 0.08)",
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, var(--violet) 0%, var(--coral) 100%)",
              transition: "width 600ms cubic-bezier(.22,.61,.36,1)",
            }}
          />
        </div>
        <div
          className="flex justify-between mt-2 text-[12px]"
          style={{ color: "var(--text-2)" }}
        >
          <span className="mono font-semibold">
            {current_xp.toLocaleString()} / {xp_to_next_level.toLocaleString()} XP
          </span>
          <span>{Math.round(pct)}%</span>
        </div>
      </div>
    </div>
  );
};
