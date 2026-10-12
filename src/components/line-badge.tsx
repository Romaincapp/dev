import { cn } from "@/lib/utils";
import type { Line } from "@/data/lines";

/** Metro-style roundel carrying the line number. */
export function LineBadge({
  line,
  size = "md",
  className,
}: {
  line: Line;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "size-6 text-[0.8rem]",
    md: "size-8 text-base",
    lg: "size-12 text-2xl",
    xl: "size-20 text-5xl",
  };
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-black leading-none tabular",
        sizes[size],
        className,
      )}
      style={{ background: line.color, color: line.onColor }}
    >
      <span className="translate-y-[0.06em]">{line.number}</span>
    </span>
  );
}
