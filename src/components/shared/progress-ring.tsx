import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  target: number;
  size?: number;
  stroke?: number;
  /** Override the foreground stroke color. Defaults to `--coral`, switches to `--mint` at 100%. */
  color?: string;
  /** Hide the centered percentage label. */
  hideLabel?: boolean;
  className?: string;
}

export const ProgressRing = ({
  value,
  target,
  size = 56,
  stroke = 5,
  color,
  hideLabel = false,
  className,
}: ProgressRingProps) => {
  const safeTarget = target > 0 ? target : 1;
  const pct = Math.min(Math.max(value / safeTarget, 0), 1);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct);
  const done = pct >= 1;
  const fgColor = color ?? (done ? "var(--mint)" : "var(--coral)");

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={fgColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 500ms cubic-bezier(.22,.61,.36,1)",
          }}
        />
      </svg>
      {!hideLabel && (
        <div className="absolute inset-0 grid place-items-center mono text-[13px] font-bold">
          {Math.round(pct * 100)}%
        </div>
      )}
    </div>
  );
};
