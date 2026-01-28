import Image from "next/image";
import { StatusDot } from "../components/status-dot";
import { ArrowUpRight } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="hidden sm:block">
      <div className="relative z-10 p-3">
        <div className="relative flex flex-col gap-2 w-full group">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/rameshdotdev"
            className="absolute inset-0 z-20 flex items-center justify-center bg-background/95 group-hover:opacity-100 opacity-0 transition-opacity duration-300 rounded-[12px]"
          >
            <div className="flex flex-col items-center gap-2 text-center px-4">
              <span className="text-lg font-bold text-foreground">
                Coming Soon
              </span>
              <span className="text-xs text-mutedForeground flex items-center gap-1">
                Check my GitHub for more
                <ArrowUpRight size={14} />
              </span>
            </div>
          </a>

          <div className="flex flex-col gap-2 w-full blur-[3px] pointer-events-none select-none">
            <div className="p-[4px] rounded-[12px] border border-border">
              <div className="relative w-full bg-mutedBackground rounded-[8px] border border-border h-[200px] md:h-[200px] sm:h-[170px] overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-30" />
                <h1 className="absolute top-2 left-2 text-xs text-mutedForeground font-medium">
                  Coming Soon
                </h1>

                <div className="bg-background rounded-t-[10px] absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[75%] p-[2px] pb-0">
                  <div className="relative w-full h-full rounded-t-[8px] overflow-hidden">
                    <Image
                      src="/soon.webp"
                      alt="Coming Soon"
                      fill
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-2 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="text-[1.10rem] leading-[1.10] text-title font-bold">
                  Coming Soon
                </h3>

                <StatusDot status="live" hotspot />
              </div>

              <p className="text-sm text-mutedForeground">
                A project is coming soon! Stay tuned for updates!
              </p>

              <div className="flex items-center gap-1 text-mutedForeground">
                <p className="text-sm">View Project</p>
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
