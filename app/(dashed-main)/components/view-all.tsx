import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ViewAllButton({ href }: { href: string }) {
  return (
    <div className="flex items-center justify-center select-none">
      <Link
        href={href}
        className="group w-fit rounded border border-border p-0.5"
      >
        <div className="flex h-full w-full items-center justify-center gap-1 rounded border border-border bg-foreground px-2.5 py-1 text-background transition duration-300 group-hover:bg-foreground/90">
          <span className="text-[0.95rem] font-medium">View All</span>

          <span className="flex items-center transition-transform duration-300 group-hover:scale-125">
            <ArrowUpRight className="h-[17.5px] w-[17.5px]" />
          </span>
        </div>
      </Link>
    </div>
  );
}
