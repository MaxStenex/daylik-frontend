import Link from "next/link";
import { Home, Trophy } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy, disabled: true },
];

export const Sidebar = () => {
  return (
    <aside className="w-60 shrink-0 flex flex-col h-screen sticky top-0 border-r border-border bg-surface">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <span className="text-xl font-extrabold text-foreground tracking-tight">
          Daylik
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon, disabled }) =>
          disabled ? (
            <span
              key={href}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-base font-medium text-text-3 cursor-not-allowed select-none"
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </span>
          ) : (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-base font-medium text-text-2 hover:bg-surface-2 hover:text-foreground transition-colors cursor-pointer"
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </Link>
          )
        )}
      </nav>

      {/* Footer placeholder */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-2 border border-border-2 flex items-center justify-center">
            <span className="text-xs font-bold text-text-2">M</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Maxim</p>
            <p className="text-sm text-text-3 truncate">Level 4</p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};
