import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type ContribLevel = 0 | 1 | 2 | 3 | 4;

export interface ContribCell {
  /** Calendar day in local `YYYY-MM-DD`. */
  date: string;
  level: ContribLevel;
  /** Optional tooltip detail, e.g. "12 km". */
  label?: string;
  /** Padding day outside the rendered year — kept so every column has 7 rows. */
  pad?: boolean;
}

/** Local `YYYY-MM-DD` (avoids UTC off-by-one that `toISOString` introduces). */
export const toDateKey = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const parseDateKey = (key: string): Date => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

/**
 * Full calendar-year grid, Sunday-aligned like GitHub. `lookup(dateKey)` returns
 * a cell's level/label, or `null` for days with no activity. Days that fall
 * outside `year` are emitted as hidden padding so each column keeps 7 rows.
 */
export const buildYearGrid = (
  year: number,
  lookup: (dateKey: string) => { level: ContribLevel; label?: string } | null,
): ContribCell[] => {
  const start = new Date(year, 0, 1);
  start.setDate(start.getDate() - start.getDay()); // back to the Sunday on/before Jan 1
  const end = new Date(year, 11, 31);
  end.setDate(end.getDate() + (6 - end.getDay())); // forward to the Saturday on/after Dec 31

  const out: ContribCell[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = toDateKey(d);
    const inYear = d.getFullYear() === year;
    const info = inYear ? lookup(key) : null;
    out.push({
      date: key,
      level: info ? info.level : 0,
      label: info?.label,
      pad: !inYear,
    });
  }
  return out;
};

const cellStyleByLevel: Record<ContribLevel, CSSProperties> = {
  0: { background: "var(--bg-2)", borderColor: "var(--border)" },
  1: { background: "var(--coral-soft)", borderColor: "var(--coral-soft-2)" },
  2: { background: "var(--coral-soft-2)", borderColor: "var(--coral-soft-2)" },
  3: { background: "oklch(0.78 0.15 35)", borderColor: "var(--coral)" },
  4: { background: "var(--coral)", borderColor: "var(--coral-hover)" },
};

const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

interface ContribGridProps {
  cells: ContribCell[];
  className?: string;
}

export const ContribGrid = ({ cells, className }: ContribGridProps) => {
  // The sequence is already Sunday-aligned — chunk it into 7-day columns.
  const cols: ContribCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) cols.push(cells.slice(i, i + 7));

  // A month label sits above the column that holds the 1st of that month.
  const monthSlots = cols.map((col) => {
    const first = col.find(
      (c) => !c.pad && parseDateKey(c.date).getDate() === 1,
    );
    return first
      ? parseDateKey(first.date).toLocaleDateString("en-US", { month: "short" })
      : "";
  });

  return (
    <div className={cn("flex items-stretch gap-2", className)}>
      {/* Weekday rail */}
      <div
        className="grid w-6 shrink-0 mt-[17px] text-[9px] font-semibold"
        style={{
          gridTemplateRows: "repeat(7, 1fr)",
          gap: "3px",
          color: "var(--text-3)",
        }}
      >
        {WEEKDAYS.map((w, i) => (
          <span key={i} className="flex items-center leading-none">
            {w}
          </span>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        {/* Month labels */}
        <div
          className="grid grid-flow-col auto-cols-fr mb-[5px] text-[10px] font-semibold"
          style={{ gap: "3px", color: "var(--text-3)" }}
        >
          {monthSlots.map((m, i) => (
            <span key={i} className="h-3 whitespace-nowrap leading-none">
              {m}
            </span>
          ))}
        </div>

        {/* Day cells */}
        <div
          className="grid grid-flow-col auto-cols-fr"
          style={{ gap: "3px" }}
        >
          {cols.map((col, ci) => (
            <div
              key={ci}
              className="grid"
              style={{ gridTemplateRows: "repeat(7, 1fr)", gap: "3px" }}
            >
              {col.map((c, ri) => (
                <div
                  key={ri}
                  className={cn(
                    "relative aspect-square w-full rounded-[2px] border transition-transform duration-100 ease-out hover:z-10 hover:scale-[1.35]",
                    c.pad && "invisible",
                  )}
                  style={cellStyleByLevel[c.level]}
                  data-lvl={c.level}
                  title={c.pad ? "" : `${c.date}${c.label ? `: ${c.label}` : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ContribLegend = () => (
  <div className="flex items-center gap-1" style={{ color: "var(--text-3)" }}>
    <span>Less</span>
    {([0, 1, 2, 3, 4] as ContribLevel[]).map((lvl) => (
      <span
        key={lvl}
        className="h-[10px] w-[10px] rounded-[2px] border"
        style={cellStyleByLevel[lvl]}
      />
    ))}
    <span>More</span>
  </div>
);
