import Image from "next/image";

type SocialHoverCardProps = {
  left?: number;
  top?: number;
};

export default function MediumHoverCard({
  left = 769,
  top = 146,
}: SocialHoverCardProps) {
  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left,
        top,
        transform: "translate3d(0px, 0px, 0px)",
        willChange: "transform",
      }}
    >
      <div className="animate-in fade-in zoom-in-95 duration-200">
        <div className="w-[340px] bg-background border border-border rounded-lg shadow-2xl p-5 select-none">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-linear-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                alt="Profile"
                src="/images/logo/mark.jpeg"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-title font-bold text-base">Rinkit Adhana</h3>
              <p className="text-mutedForeground text-sm">@rinkitadhana</p>
            </div>
          </div>

          <p className="text-foreground text-sm mt-4 leading-relaxed">
            Writing about web development, programming, and tech.
          </p>

          <div className="flex gap-6 mt-4 text-sm">
            <div>
              <span className="font-semibold text-title">6</span>
              <span className="text-mutedForeground ml-1">Stories</span>
            </div>

            <div>
              <span className="font-semibold text-title">100</span>
              <span className="text-mutedForeground ml-1">Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
