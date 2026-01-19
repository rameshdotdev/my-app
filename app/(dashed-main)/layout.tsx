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
import { setSkills } from "@/store/features/skillSlice";
import { setWorksData } from "@/store/features/workSlice";
import React, { useEffect } from "react";
import VisitorTracker from "../visitors-tracker";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useMaindQuery();
  useEffect(() => {
    if (!data) return;
    dispatch(setHeroData(data.hero));
    dispatch(setSkills(data.skills));
    dispatch(setProjects(data.projects));
    dispatch(setContactData(data.contact));
    dispatch(setWorksData(data.works));
  }, [data, dispatch]);
  return (
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
  );
}
