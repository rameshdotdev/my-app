import BgDotGrid from "@/components/bg-dot-grid";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <>
      <VerticalDashedBorderLayout>
        <BgDotGrid />
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder />
      <VerticalDashedBorderLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center select-none">
          <h1 className="text-8xl font-bold text-muted-foreground">404</h1>

          <h2 className="mt-4 text-2xl font-bold text-foreground">
            Page Not Found
          </h2>

          <p className="mt-2 max-w-md text-muted-foreground">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>

          <Link
            href="/"
            className="mt-6 w-fit rounded-[8px] border border-border bg-background p-[2px] transition duration-300 hover:bg-muted"
          >
            <div className="flex items-center justify-center rounded-[6px] border border-border bg-foreground px-2.5 py-1 text-background transition duration-300 hover:bg-foreground/90">
              <span className="text-[0.95rem] font-medium">Go Back Home</span>
            </div>
          </Link>
        </div>
      </VerticalDashedBorderLayout>
      <HorizontalDashedBorder />
      <VerticalDashedBorderLayout>
        <BgDotGrid />
      </VerticalDashedBorderLayout>
    </>
  );
}
