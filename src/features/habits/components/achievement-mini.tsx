import { cn } from "@/lib/utils";
import type { Achievement, AchievementColor } from "../lib/habit-display";

const ICON_GRADIENT: Record<AchievementColor, string> = {
  gold: "linear-gradient(135deg, oklch(0.86 0.14 85) 0%, oklch(0.7 0.18 60) 100%)",
  coral: "linear-gradient(135deg, oklch(0.78 0.16 40) 0%, var(--coral) 100%)",
  mint: "linear-gradient(135deg, oklch(0.78 0.14 165) 0%, var(--mint) 100%)",
  violet: "linear-gradient(135deg, oklch(0.74 0.14 285) 0%, var(--violet) 100%)",
  sky: "linear-gradient(135deg, oklch(0.78 0.12 235) 0%, var(--sky) 100%)",
  rose: "linear-gradient(135deg, oklch(0.78 0.16 15) 0%, var(--rose) 100%)",
  amber: "linear-gradient(135deg, oklch(0.86 0.14 85) 0%, var(--amber) 100%)",
  locked: "var(--surface-2)",
};

interface AchievementMiniProps {
  achievement: Achievement;
}

export const AchievementMini = ({ achievement }: AchievementMiniProps) => {
  const locked = !achievement.earned;
  return (
    <div
      className={cn(
        "rounded-card border p-3.5 flex items-center gap-3 transition-all duration-150 ease-out cursor-default",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow)]",
        locked && "opacity-55"
      )}
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="grid place-items-center w-[42px] h-[42px] rounded-xl text-[22px] shrink-0 text-white"
        style={{ background: ICON_GRADIENT[achievement.color] }}
      >
        {achievement.icon}
      </div>
      <div className="min-w-0">
        <div className="text-[13.5px] font-bold tracking-[-0.01em] truncate">
          {achievement.name}
        </div>
        <div className="text-[11.5px]" style={{ color: "var(--text-3)" }}>
          <span className="mono font-semibold">+{achievement.xp}</span> XP
        </div>
      </div>
    </div>
  );
};
