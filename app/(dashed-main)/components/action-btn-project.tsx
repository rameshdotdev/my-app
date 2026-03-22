import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import VerticalDashedBorder from "@/components/virtical-dashed-border";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Globe } from "lucide-react";
import Link from "next/link";
import { BsGithub, BsPostcard } from "react-icons/bs";
import React from "react";

type ActionsUrl = {
  githubUrl?: string;
  websiteUrl?: string;
  postUrl?: string;
};

type ActionItem = {
  key: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
};

function ProjectActionsBtn({ githubUrl, websiteUrl, postUrl }: ActionsUrl) {
  const actions: ActionItem[] = [
    {
      key: "github",
      label: "Github",
      href: githubUrl,
      icon: <BsGithub className="size-4 md:size-5" />,
    },
    {
      key: "website",
      label: "Website",
      href: websiteUrl,
      icon: <Globe className="size-4 md:size-5" />,
    },
    {
      key: "post",
      label: "Post",
      href: postUrl,
      icon: <BsPostcard className="size-4 md:size-5" />,
    },
  ];

  return (
    <div className="w-full">
      <HorizontalDashedBorder />

      <div className="relative flex items-stretch justify-between w-full">
        {actions.map((action, index) => {
          const isDisabled = !action.href;

          return (
            <React.Fragment key={action.key}>
              {/* Action Button */}
              {isDisabled ? (
                <div
                  className={cn(
                    "py-3 flex text-[1.05rem] text-foreground w-full items-center justify-center",
                    "opacity-40 cursor-not-allowed select-none",
                  )}
                >
                  {action.icon}
                  <div className="relative ml-1.5 ">
                    <span>{action.label}</span>
                  </div>
                </div>
              ) : (
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={action.href ?? "#"}
                  className={cn(
                    "group flex text-[1.05rem] text-foreground w-full items-center justify-center",
                    "hover:text-title transition-all duration-300 hover:bg-muted/50",
                  )}
                >
                  {action.icon}
                  <div
                    className="relative ml-1.5 transition-colors hover:text-foreground
                after:absolute after:-bottom-1 after:left-0
                after:h-0.5 after:w-0 after:bg-primary
                after:transition-all hover:after:w-full"
                  >
                    <span>{action.label}</span>
                    <span className="absolute left-0 bottom-0 w-full h-px bg-title origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </div>

                  <ArrowUpRight className="size-5 text-muted-foreground opacity-0 hidden lg:block group-hover:opacity-100 transition-all duration-300 group-hover:text-foreground" />
                </Link>
              )}

              {/* Vertical Divider between items (not after last) */}
              {index !== actions.length - 1 && (
                <div>
                  <VerticalDashedBorder />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <HorizontalDashedBorder />
    </div>
  );
}

export default ProjectActionsBtn;
