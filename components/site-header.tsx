import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./theme-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/hooks/hooks";
import { getUser } from "@/store/features/userSlice";

export function SiteHeader() {
  const user = useAppSelector(getUser);
  function getInitials(name?: string) {
    if (!name) return "U";

    const parts = name.trim().split(" ").filter(Boolean);

    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }

    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
  }

  return (
    <header className="bg-background/40 sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) md:rounded-tl-xl md:rounded-tr-xl">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        {/* <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1> */}
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Avatar className="ring-1 ring-border">
            <AvatarImage
              src={user.avatar?.url}
              alt={`${user?.name ?? "User"} avatar`}
            />
            <AvatarFallback className="font-medium">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
