import {
  ContribGrid,
  ContribLegend,
  type ContribCell,
} from "@/components/shared/contrib-grid";

interface ContribCardProps {
  cells: ContribCell[];
  year?: number;
}

export const ContribCard = ({
  cells,
  year = new Date().getFullYear(),
}: ContribCardProps) => {
  const onTargetDays = cells.filter((c) => !c.pad && c.level >= 3).length;

  return (
    <div
      className="rounded-card-lg border p-6 mt-5"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="flex items-end justify-between gap-3 mb-1">
        <div>
          <h3 className="text-[16px] font-bold tracking-[-0.01em]">
            Your year so far
          </h3>
          <p className="text-[12px] mt-1" style={{ color: "var(--text-3)" }}>
            Each cell is one day, colored by how many habits you completed.
          </p>
        </div>
        <span className="text-[12px]" style={{ color: "var(--text-3)" }}>
          {year}
        </span>
      </div>
      <ContribGrid cells={cells} className="mt-3.5" />
      <div
        className="flex items-center justify-between mt-3.5 text-[11px]"
        style={{ color: "var(--text-3)" }}
      >
        <span>
          <span className="mono font-semibold">{onTargetDays}</span> fully-on days
          this year
        </span>
        <ContribLegend />
      </div>
    </div>
  );
};
