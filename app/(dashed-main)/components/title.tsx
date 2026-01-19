"use client";

import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import { ThemeToggle } from "@/components/theme-toggle";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";

function Title({
  title,
  isSubPage = false,
}: {
  title: string;
  isSubPage?: boolean;
}) {
  const router = useRouter();

  return (
    <>
      {!isSubPage && <HorizontalDashedBorder />}

      <VerticalDashedBorderLayout className={isSubPage ? "p-2.25" : ""}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isSubPage ? (
              <button
                type="button"
                onClick={() => router.back()}
                className="relative z-10 cursor-pointer p-1 border border-transparent hover:border-border rounded-[6px] hover:bg-muted/60 transition-colors duration-300"
                aria-label="Go back"
                title="Go back"
              >
                <IoChevronBack size={18} className="text-foreground" />
              </button>
            ) : null}

            <h1 className="text-[1.15rem] sm:text-[23px] font-bold leading-tight text-foreground">
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
