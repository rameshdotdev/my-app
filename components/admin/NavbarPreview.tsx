import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export function NavbarPreview({ socials }: { socials: [string, any][] }) {
  return (
    <div className="rounded-[8px] border bg-muted/30 p-4">
      <p className="mb-3 text-sm font-medium text-muted-foreground">
        Navbar Preview
      </p>

      <div className="flex gap-3">
        {socials
          .filter(([_, s]) => s.navbar)
          .map(([key, social]) => {
            const Icon = Icons[social.icon as keyof typeof Icons];
            if (!Icon) return null;

            return (
              <div
                key={key}
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full border bg-background
                  shadow-sm
                "
              >
                <Icon className="h-4 w-4" />
              </div>
            );
          })}
      </div>
    </div>
  );
}
