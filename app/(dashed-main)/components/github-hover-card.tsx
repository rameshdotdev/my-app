import Image from "next/image";

type SocialHoverCardProps = {
  left?: number;
  top?: number;
};

export default function GithubHoverCard({
  left = 461,
  top = 144,
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
        <div className="w-[320px] bg-background border border-border rounded-[8px] p-4 shadow-2xl select-none">
          <div className="flex items-start gap-3">
            <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                alt="Profile"
                src="/images/logo/mark.jpeg"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-title font-semibold text-base">
                Rinkit Adhana
              </h3>
              <p className="text-mutedForeground text-sm">rinkitadhana</p>
            </div>
          </div>

          <p className="text-foreground text-sm mt-3 leading-relaxed">
            If I can imagine it, I can build it.
          </p>

          <div className="flex items-center mt-3 text-mutedForeground text-xs">
            <div className="flex items-center gap-1">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-sm"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>

              <span>Delhi, India</span>
            </div>
          </div>

          <div className="flex gap-6 mt-4 text-sm">
            <div>
              <span className="font-semibold text-title">60</span>
              <span className="text-mutedForeground ml-1">Repositories</span>
            </div>

            <div>
              <span className="font-semibold text-title">180</span>
              <span className="text-mutedForeground ml-1">Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
