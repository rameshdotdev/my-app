import { borderWidth } from "@/constant";
import { cn } from "@/lib/utils";

interface VerticalDashedBorderProps {
  className?: string;
}

function VerticalDashedBorder({ className }: VerticalDashedBorderProps) {
  return (
    <div
      className={cn("h-full w-px", className)}
      style={{
        backgroundImage: `
      repeating-linear-gradient(to bottom, var(--border) 0px, var(--border) 6px, transparent 6px, transparent 14px),
      repeating-linear-gradient(to bottom, var(--border) 0px, var(--border) 6px, transparent 6px, transparent 14px)`,
        backgroundSize: `${borderWidth}px 100%`,
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

export default VerticalDashedBorder;
