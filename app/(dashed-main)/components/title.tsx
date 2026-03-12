"use client";

import { useRouter } from "next/navigation";

import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import { ThemeToggle } from "@/components/theme-toggle";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import BackBtn from "./back-btn";

function Title({
  title,
  isSubPage = false,
}: {
  title: string;
  isSubPage?: boolean;
}) {
  return (
    <>
      {!isSubPage && <HorizontalDashedBorder />}

      <VerticalDashedBorderLayout className={"py-2 sm:py-3"}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isSubPage ? <BackBtn /> : null}

            <h1 className="text-[16px] sm:text-[20px] font-bold leading-tight text-foreground">
              {title}
            </h1>
          </div>

          {isSubPage ? (
            <ThemeToggle className="relative z-10 cursor-pointer p-1.5 rounded-[6px] hover:bg-muted/60 border border-transparent hover:border-border text-muted-foreground hover:text-foreground transition-colors duration-300" />
          ) : null}
        </div>
      </VerticalDashedBorderLayout>

      <HorizontalDashedBorder />
    </>
  );
}

export default Title;
