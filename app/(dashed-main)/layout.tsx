"use client";
import BgDotGrid from "@/components/bg-dot-grid";
import HorizontalDashedBorder from "@/components/horizontal-dashed-border";
import VerticalDashedBorderLayout from "@/components/vertical-dashed-border-layout";
import { useAppDispatch } from "@/hooks/hooks";
import { useMaindQuery } from "@/hooks/use-main-query";
import { SoundProvider } from "@/providers/sound-provider";
import { setContactData } from "@/store/features/contactSlice";
import { setHeroData } from "@/store/features/heroSlice";
import { setProjects } from "@/store/features/projectSlice";
import { setWorksData } from "@/store/features/workSlice";
import React, { useEffect } from "react";
import VisitorTracker from "../visitors-tracker";
import BackToTop from "./components/back-to-top";
import { setLoading } from "@/store/features/loadingSlice";
import { setYesterdayWorks } from "@/store/features/wakatimeSlice";
import { setVisitorCounts } from "@/store/features/visitorSlice";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useMaindQuery();
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);
  useEffect(() => {
    if (!data) return;
    dispatch(setHeroData(data.hero));
    dispatch(setContactData(data.contact));
    dispatch(setYesterdayWorks(data.yesterday));
    dispatch(setVisitorCounts(data.visitor));
    dispatch(setWorksData(data.works));
    dispatch(setProjects(data.projects));
  }, [data, dispatch]);
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
        <BackToTop/>
      </TooltipProvider>
    </div>
  );
}
