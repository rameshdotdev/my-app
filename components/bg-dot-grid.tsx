import { cn } from "@/lib/utils";

export default function BgDotGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-full sm:min-h-68 min-h-[100px] bg-dot-grid",
        className,
      )}
    />
  );
}
