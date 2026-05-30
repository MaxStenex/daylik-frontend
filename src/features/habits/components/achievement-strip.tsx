import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Achievement } from "../lib/habit-display";
import { AchievementMini } from "./achievement-mini";

interface AchievementStripProps {
  items: Achievement[];
}

export const AchievementStrip = ({ items }: AchievementStripProps) => (
  <section className="mt-7">
    <div className="flex items-baseline justify-between gap-3 mb-3.5">
      <h3 className="text-[16px] font-bold tracking-[-0.01em]">
        Recent achievements
      </h3>
      <Link
        href="/achievements"
        className="inline-flex items-center gap-1 text-[12px] font-semibold transition-colors hover:text-foreground"
        style={{ color: "var(--text-2)" }}
      >
        View all
        <ChevronRight size={14} />
      </Link>
    </div>
    {items.length === 0 ? (
      <div
        className="rounded-card border p-6 text-center"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <p className="text-sm" style={{ color: "var(--text-3)" }}>
          No achievements yet. Keep logging — they unlock as you go.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <AchievementMini key={item.id} achievement={item} />
        ))}
      </div>
    )}
  </section>
);
