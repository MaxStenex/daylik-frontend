import { cn } from "@/lib/utils";

export type ContribLevel = 0 | 1 | 2 | 3 | 4;

export interface ContribCell {
  date: string;
  level: ContribLevel;
}

interface ContribGridProps {
  cells: ContribCell[];
  className?: string;
}

const cellStyleByLevel: Record<ContribLevel, React.CSSProperties> = {
  0: { background: "var(--bg-2)", borderColor: "var(--border)" },
  1: { background: "var(--coral-soft)", borderColor: "var(--coral-soft-2)" },
  2: { background: "var(--coral-soft-2)", borderColor: "var(--coral-soft-2)" },
  3: {
    background: "oklch(0.78 0.15 35)",
    borderColor: "var(--coral)",
  },
  4: { background: "var(--coral)", borderColor: "var(--coral-hover)" },
};

const Cell = ({ level, date }: { level: ContribLevel; date: string }) => (
  <div
    className="w-[14px] h-[14px] rounded-[4px] border transition-transform duration-100 ease-out hover:scale-[1.4] hover:z-10 relative"
    style={cellStyleByLevel[level]}
    title={date}
    data-lvl={level}
  />
);

export const ContribGrid = ({ cells, className }: ContribGridProps) => {
  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className="grid grid-flow-col gap-[4px] overflow-x-auto pb-1"
        style={{ gridTemplateRows: "repeat(7, 1fr)" }}
      >
        {cells.map((cell) => (
          <Cell key={cell.date} level={cell.level} date={cell.date} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 text-[11px]" style={{ color: "var(--text-3)" }}>
        <span>Hover for date</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as ContribLevel[]).map((lvl) => (
            <div
              key={lvl}
              className="w-[10px] h-[10px] rounded-[2px] border"
              style={cellStyleByLevel[lvl]}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
