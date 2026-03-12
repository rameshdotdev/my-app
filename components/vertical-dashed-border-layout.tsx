import { borderWidth } from "@/constant";
import { cn } from "@/lib/utils";

interface VerticalDashedBorderProps {
  children: React.ReactNode;
  className?: string;
}

function VerticalDashedBorderLayout({
  children,
  className,
}: VerticalDashedBorderProps) {
  return (
    <div
      className={cn(
        "max-w-215 mx-2 sm:mx-8 md:mx-auto relative p-4",
        className,
      )}
      style={{
        backgroundImage: `
		  repeating-linear-gradient(to bottom, var(--border) 0px, var(--border) 6px, transparent 6px, transparent 14px),
		  repeating-linear-gradient(to bottom, var(--border) 0px, var(--border) 6px, transparent 6px, transparent 14px)`,
        backgroundSize: `${borderWidth}px 100%, ${borderWidth}px 100%`,
        backgroundPosition: "left top, right top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
}

export default VerticalDashedBorderLayout;
