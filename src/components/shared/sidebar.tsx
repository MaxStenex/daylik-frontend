"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Medal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { STUB_PROGRESSION } from "@/features/habits/types";

interface NavLink {
  href: string;
  label: string;
  icon: typeof Home;
  /** Routes that haven't been built yet — render but don't navigate. */
  comingSoon?: boolean;
}

const navItems: NavLink[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/achievements", label: "Achievements", icon: Medal, comingSoon: true },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy, comingSoon: true },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const user = {
    name: "Maxim",
    level: STUB_PROGRESSION.level,
    totalXp: STUB_PROGRESSION.total_xp,
  };

  return (
    <aside
      className="w-60 shrink-0 sticky top-0 h-screen flex flex-col gap-1 px-4 py-6 border-r"
      style={{
        background: "var(--bg-2)",
        borderColor: "var(--border)",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-2 mb-6">
        <div
          className="grid place-items-center w-8 h-8 rounded-[10px] text-white font-extrabold text-[18px]"
          style={{
            background:
              "linear-gradient(135deg, var(--coral) 0%, oklch(0.72 0.15 60) 100%)",
            boxShadow: "0 4px 12px oklch(0.68 0.16 35 / 0.35)",
          }}
        >
          D
        </div>
        <span className="font-bold text-[17px] tracking-[-0.02em]">Daylik</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon, comingSoon }) => {
          const active = pathname === href;
          const className = cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors",
            active
              ? "shadow-[var(--shadow-sm)]"
              : comingSoon
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-[var(--surface-hover)]"
          );
          const style: React.CSSProperties = active
            ? {
                background: "var(--card)",
                color: "var(--foreground)",
              }
            : {
                color: comingSoon ? "var(--text-3)" : "var(--text-2)",
              };
          if (comingSoon) {
            return (
              <span
                key={href}
                className={cn(className, "select-none")}
                style={style}
                title="Coming soon"
              >
                <Icon size={18} className="shrink-0" />
                {label}
              </span>
            );
          }
          return (
            <Link key={href} href={href} className={className} style={style}>
              <Icon size={18} className="shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div
        className="mt-auto p-3 rounded-card flex items-center gap-2.5 shadow-[var(--shadow-sm)]"
        style={{ background: "var(--card)" }}
      >
        <div
          className="grid place-items-center w-9 h-9 rounded-full text-white font-bold text-[14px] shrink-0"
          style={{
            background:
              "linear-gradient(135deg, var(--violet) 0%, var(--coral) 100%)",
          }}
        >
          {user.name[0]?.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[13px] truncate">{user.name}</div>
          <div
            className="text-[11px] truncate mono"
            style={{ color: "var(--text-3)" }}
          >
            Lvl {user.level} · {user.totalXp.toLocaleString()} XP
          </div>
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
};
