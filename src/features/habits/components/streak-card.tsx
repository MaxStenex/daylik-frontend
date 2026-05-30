import type { UserProgression } from "../types";

interface StreakCardProps {
  progression: UserProgression;
  freezesLeft?: number;
}

export const StreakCard = ({ progression, freezesLeft = 1 }: StreakCardProps) => {
  const { current_streak, best_streak } = progression;
  return (
    <div
      className="relative overflow-hidden rounded-card-lg border p-6 sm:p-7 flex items-center gap-5"
      style={{
        background:
          "linear-gradient(135deg, var(--amber-soft) 0%, var(--coral-soft-2) 100%)",
        borderColor: "var(--border)",
      }}
    >
      <div className="relative grid place-items-center w-[76px] h-[76px] shrink-0">
        <div
          className="absolute"
          style={{
            inset: "-4px",
            background:
              "radial-gradient(circle, oklch(0.78 0.18 50 / 0.5) 0%, transparent 65%)",
            filter: "blur(8px)",
            animation: "pulse-glow 2.4s ease-in-out infinite",
          }}
        />
        <span
          className="relative text-[56px] leading-none"
          style={{
            animation: "flame-float 2.4s ease-in-out infinite",
            filter: "drop-shadow(0 4px 12px oklch(0.78 0.18 50 / 0.4))",
          }}
        >
          🔥
        </span>
      </div>
      <div className="min-w-0">
        <div className="mono text-[44px] font-bold leading-none tracking-[-0.04em]">
          {current_streak}
        </div>
        <div className="text-[13px] mt-1" style={{ color: "var(--text-2)" }}>
          {current_streak === 1 ? "day streak" : "day streak"} · {freezesLeft} ❄️ left
        </div>
      </div>
      <div className="ml-auto text-right">
        <div className="mono text-[22px] font-bold">{best_streak}</div>
        <div
          className="text-[11px] uppercase tracking-[0.06em] font-semibold mt-1"
          style={{ color: "var(--text-3)" }}
        >
          Best ever
        </div>
      </div>
    </div>
  );
};
