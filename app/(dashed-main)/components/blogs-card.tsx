import Link from "next/link";
import { CalendarDays, Flame, ArrowUpRight } from "lucide-react";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";

export default function BlogCard() {
  return (
    <div>
      <div className="m-1">
        <Link
          href="https://medium.com/@rinkitadhana/jwt-authentication-apis-with-typescript-node-js-and-mongodb-b05a8a3cb062"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between p-3 transition-colors duration-300 hover:bg-muted/50"
        >
          <div className="flex flex-col gap-2.5">
            <h3 className="text-[1rem] font-bold text-foreground sm:leading-[0.80] leading-[1.60]">
              JWT Authentication APIs with TypeScript, Node.js, and MongoDB.
            </h3>

            {/* Date */}
            <div className="flex items-center gap-1 text-muted-foreground select-none">
              <CalendarDays className="h-[14px] w-[14px]" />
              <p className="text-xs font-medium">Feb 2025</p>
            </div>

            {/* Reads + Tags */}
            <div className="flex items-center gap-1 select-none">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Flame className="h-[14px] w-[14px]" />
                <p className="text-xs font-medium">52</p>
              </div>

              <span
                className="mx-1.5 inline-block h-4 w-px bg-border align-middle"
                aria-hidden="true"
              />

              <div className="flex gap-1.5">
                {["Authentication", "TypeScript", "MongoDB"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[4px] border border-border bg-muted/40 px-1.5 py-0.5 text-xs text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow icon */}
          <div className="hidden sm:block">
            <ArrowUpRight className="h-[18px] w-[18px] text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground" />
          </div>
        </Link>
      </div>
      <HorizontalDashedBorder height={2} />
    </div>
  );
}
