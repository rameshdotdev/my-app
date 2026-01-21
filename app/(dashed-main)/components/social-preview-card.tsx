import Image from "next/image";
import Verified from "./verified";

type SocialType =
  | "x"
  | "github"
  | "linkedin-default"
  | "medium"
  | "leetcode"
  | "youtube";

type SocialPreviewCardProps = {
  type: SocialType;
  left: number;
  top: number;
};

function Wrapper({
  left,
  top,
  children,
}: {
  left: number;
  top: number;
  children: React.ReactNode;
}) {
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
        {children}
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
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
  );
}

export default function SocialPreviewCard({
  type,
  left,
  top,
}: SocialPreviewCardProps) {
  // ✅ UPDATED X CARD (your latest version)
  if (type === "x") {
    return (
      <Wrapper left={left} top={top}>
        <div className="w-90 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden select-none">
          {/* Header */}
          <div
            className="h-20 bg-linear-to-r from-blue-400 to-purple-500"
            style={{
              backgroundImage: `url("/images/socials/x-header.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Body */}
          <div className="px-4 pb-4 -mt-8">
            {/* Avatar */}
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-full border-4 border-background flex items-center justify-center overflow-hidden">
              <Image
                alt="Profile"
                src="/images/socials/x-photo.jpg"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name + handle */}
            <div className="mt-3">
              <h3 className="text-title font-bold text-base flex items-center gap-1">
                Aryan Goswami
                <Verified className="text-blue-500" />
              </h3>

              <p className="text-mutedForeground text-sm">@rameshdotin</p>
            </div>

            {/* Bio */}
            <p className="text-foreground text-sm mt-3 leading-relaxed">
              Software Engineer: working remotely. Cricket Enthusiast
            </p>

            {/* Stats */}
            <div className="flex gap-4 mt-3 text-sm">
              <div>
                <span className="font-semibold text-title">400</span>
                <span className="text-mutedForeground ml-1">Following</span>
              </div>

              <div>
                <span className="font-semibold text-title">9K</span>
                <span className="text-mutedForeground ml-1">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // GitHub style card
  if (type === "github") {
    return (
      <Wrapper left={left} top={top}>
        <div className="w-[320px] bg-background border border-border rounded-[8px] p-4 shadow-2xl select-none">
          <div className="flex items-start gap-3">
            <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                alt="Profile"
                src="/images/socials/mark.jpg"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-title font-semibold text-base">
                Ramesh Kumar
              </h3>
              <p className="text-mutedForeground text-sm">rameshdotin</p>
            </div>
          </div>

          <p className="text-foreground text-sm mt-3 leading-relaxed">
            If I can imagine it, I can build it.
          </p>

          <div className="flex items-center mt-3 text-mutedForeground text-xs">
            <div className="flex items-center gap-1">
              <LocationIcon />
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
      </Wrapper>
    );
  }

  // LinkedIn default preview
  if (type === "linkedin-default") {
    return (
      <Wrapper left={left} top={top}>
        <div className="w-[340px] bg-background border border-border rounded-lg shadow-2xl overflow-hidden select-none">
          <div className="relative">
            <div
              className="h-[72px] bg-linear-to-r from-[#8ab4cd] to-[#a8c5d8]"
              style={{
                backgroundImage: `url("/images/socials/defaultLinkedHeader.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div className="absolute left-4 -bottom-10">
              <div className="w-[72px] h-[72px] rounded-full border-2 border-background bg-background overflow-hidden">
                <Image
                  alt="Profile"
                  src="/images/socials/defaultLinked.jpg"
                  width={72}
                  height={72}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="pt-12 px-4 pb-4">
            <div className="mb-3">
              <h2 className="text-[18px] font-semibold text-title leading-tight">
                Ramesh Kumar
              </h2>
              <p className="text-sm text-mutedForeground mt-1 leading-tight">
                Software Engineer. Building cool stuff on the web
              </p>
            </div>

            <div className="text-sm text-mutedForeground leading-relaxed">
              <div className="mb-1">Delhi, India</div>
              <div className="text-[#0073b1] font-semibold">
                500+ connections
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // Medium card
  if (type === "medium") {
    return (
      <Wrapper left={left} top={top}>
        <div className="w-[340px] bg-background border border-border rounded-lg shadow-2xl p-5 select-none">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-linear-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                alt="Profile"
                src="/images/socials/midium.jpg"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-title font-bold text-base">Ramesh Kumar</h3>
              <p className="text-mutedForeground text-sm">@rameshdotin</p>
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
      </Wrapper>
    );
  }

  // LeetCode card
  if (type === "leetcode") {
    return (
      <Wrapper left={left} top={top}>
        <div className="w-[340px] bg-background border border-border rounded-[8px] shadow-2xl p-4 select-none">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-linear-to-br from-yellow-500 to-orange-600 rounded-[8px] flex items-center justify-center shrink-0 overflow-hidden">
              <Image
                alt="Profile"
                src="/images/socials/mark.jpg"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-title font-bold text-base">Ramesh Kumar</h3>
              <p className="text-mutedForeground text-sm">rameshdotin</p>
            </div>
          </div>

          <div className="mt-4 bg-mutedBackground rounded-lg p-3 border border-border">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-green-600 font-bold text-base">93</div>
                <div className="text-mutedForeground text-xs mt-0.5">Easy</div>
              </div>
              <div>
                <div className="text-yellow-600 font-bold text-base">64</div>
                <div className="text-mutedForeground text-xs mt-0.5">
                  Medium
                </div>
              </div>
              <div>
                <div className="text-red-600 font-bold text-base">9</div>
                <div className="text-mutedForeground text-xs mt-0.5">Hard</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-mutedForeground">Rank</span>
                <span className="text-title font-semibold">863,655</span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-mutedForeground">Contest Rating</span>
                <span className="text-yellow-600 font-semibold">1,424</span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-mutedForeground">Total Solved</span>
                <span className="text-title font-semibold">166</span>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // YouTube card
  if (type === "youtube") {
    return (
      <Wrapper left={left} top={top}>
        <div className="w-[360px] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden select-none">
          <div
            className="h-24"
            style={{
              backgroundImage: `url("/images/socials/youtube-banner.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="px-4 pb-4 -mt-10">
            <div className="w-20 h-20 rounded-full border-4 border-background bg-background overflow-hidden">
              <Image
                alt="YouTube Profile"
                src="/images/socials/youtube-avatar.jpg"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-2">
              <h3 className="text-title font-bold text-base flex items-center gap-2">
                Bais Yards
              </h3>

              <p className="text-mutedForeground text-sm">@BaisYards</p>
            </div>

            <div className="mt-2 flex flex-wrap gap-2 text-xs text-mutedForeground">
              <span className="px-2 py-1 rounded-md bg-muted">
                8 subscribers
              </span>
              <span className="px-2 py-1 rounded-md bg-muted">7 videos</span>
            </div>

            <p className="text-foreground text-sm mt-2 leading-relaxed">
              Inside the 22 yards of the game.
            </p>
          </div>
        </div>
      </Wrapper>
    );
  }

  return null;
}
