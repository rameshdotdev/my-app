import Image from "next/image";
import Verified from "./verified";

type SocialHoverCardProps = {
  left?: number;
  top?: number;
};

export default function XHoverCard({
  left = 568,
  top = 152,
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
        <div className="w-90 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden select-none">
          {/* Header */}
          <div
            className="h-32 bg-linear-to-r from-blue-400 to-purple-500"
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
              Software Engineer. Building cool stuff on the web
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
      </div>
    </div>
  );
}
