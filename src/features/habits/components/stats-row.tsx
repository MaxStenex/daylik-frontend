import type { UserProgression } from "../types";

interface StatsRowProps {
  progression: UserProgression;
  achievementsEarned: number;
  achievementsTotal: number;
  /** This-week ratio (e.g. { done: 18, total: 21 }). Stubbed until backend ships weekly data. */
  weekStats?: { done: number; total: number };
}

const formatXp = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};

interface StatProps {
  label: string;
  value: string;
  meta: string;
  color: string;
}

const Stat = ({ label, value, meta, color }: StatProps) => (
  <div
    className="rounded-card border px-[18px] py-4 flex flex-col gap-1.5"
    style={{ background: "var(--card)", borderColor: "var(--border)" }}
  >
    <div
      className="text-[11px] uppercase tracking-[0.08em] font-semibold"
      style={{ color: "var(--text-3)" }}
    >
      {label}
    </div>
    <div
      className="mono text-[28px] font-bold leading-none tracking-[-0.03em]"
      style={{ color }}
    >
      {value}
    </div>
    <div className="text-[11.5px]" style={{ color: "var(--text-2)" }}>
      {meta}
    </div>
  </div>
);

export const StatsRow = ({
  progression,
  achievementsEarned,
  achievementsTotal,
  weekStats = { done: 18, total: 21 },
}: StatsRowProps) => {
  const weekPct = weekStats.total
    ? Math.round((weekStats.done / weekStats.total) * 100)
    : 0;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
      <Stat
        label="Current streak"
        value={`${progression.current_streak}`}
        meta="🔥 days in a row"
        color="var(--coral)"
      />
      <Stat
        label="Total XP"
        value={formatXp(progression.total_xp)}
        meta="all-time"
        color="var(--violet)"
      />
      <Stat
        label="This week"
        value={`${weekStats.done}/${weekStats.total}`}
        meta={`${weekPct}% completion`}
        color="var(--mint)"
      />
      <Stat
        label="Achievements"
        value={`${achievementsEarned}/${achievementsTotal}`}
        meta="unlocked"
        color="var(--amber)"
      />
    </div>
  );
};
