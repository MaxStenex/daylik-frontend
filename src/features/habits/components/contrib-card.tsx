import { ContribGrid, type ContribCell } from "@/components/shared/contrib-grid";

interface ContribCardProps {
  cells: ContribCell[];
  weeks?: number;
}

export const ContribCard = ({ cells, weeks = 18 }: ContribCardProps) => (
  <div
    className="rounded-card-lg border p-6 mt-5"
    style={{ background: "var(--card)", borderColor: "var(--border)" }}
  >
    <div className="flex items-baseline justify-between gap-3 mb-2">
      <h3 className="text-[16px] font-bold tracking-[-0.01em]">Your year so far</h3>
      <span className="text-[12px]" style={{ color: "var(--text-3)" }}>
        Last <span className="mono font-semibold">{weeks}</span> weeks
      </span>
    </div>
    <ContribGrid cells={cells} />
  </div>
);
