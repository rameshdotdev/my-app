"use client";
import React from "react";
import BgDotGrid from "@/components/bg-dot-grid";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import { SoundProvider } from "@/providers/sound-provider";
import BackToTop from "./components/back-to-top";
import { TooltipProvider } from "@/components/ui/tooltip";
import VisitorTracker from "../visitors-tracker";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TooltipProvider delayDuration={120}>
        <SoundProvider>
          <VisitorTracker />
          <VerticalDashedBorderLayout>
            <BgDotGrid />
          </VerticalDashedBorderLayout>
          <HorizontalDashedBorder />
          {children}
          <HorizontalDashedBorder />
          <VerticalDashedBorderLayout>
            <BgDotGrid />
          </VerticalDashedBorderLayout>
        </SoundProvider>
        <BackToTop />
      </TooltipProvider>
    </div>
  );
}
