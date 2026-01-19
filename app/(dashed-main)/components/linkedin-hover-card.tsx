import Image from "next/image";

type SocialHoverCardProps = {
  left?: number;
  top?: number;
};

export default function LinkedInHoverCard({
  left = 652,
  top = 148,
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
        <div className="w-[340px] bg-background border border-border rounded-lg shadow-2xl overflow-hidden select-none">
          <div className="relative">
            {/* Header */}
            <div
              className="h-[72px] bg-linear-to-r from-[#8ab4cd] to-[#a8c5d8]"
              style={{
                backgroundImage: `url("/images/socials/defaultLinkedHeader.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Avatar */}
            <div className="absolute left-4 -bottom-10">
              <div className="w-[72px] h-[72px] rounded-full border-2 border-background bg-background overflow-hidden">
                <Image
                  alt="Profile"
                  src="/images/socials/defaultLinked.png"
                  width={72}
                  height={72}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-12 px-4 pb-4">
            <div className="mb-3">
              <h2 className="text-[18px] font-semibold text-title leading-tight">
                Rinkit Adhana
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
      </div>
    </div>
  );
}
