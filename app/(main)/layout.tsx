"use client";
import { useAppDispatch } from "@/hooks/hooks";
import { useMaindQuery } from "@/hooks/use-main-query";
import { setHeroData } from "@/store/features/heroSlice";
import { setProjects } from "@/store/features/projectSlice";
import { setSkills } from "@/store/features/skillSlice";
import { ReactNode, useEffect } from "react";
import Navbar from "./Heade";
import { ScrollProgress } from "@/components/scroll-progress";
import { MeteorsBackground } from "@/components/meteors-background";
export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const { data } = useMaindQuery();
  useEffect(() => {
    if (!data) return;
    dispatch(setHeroData(data.hero));
    dispatch(setSkills(data.skills));
    dispatch(setProjects(data.projects));
  }, [data, dispatch]);
  return (
    <div className="relative">
      <ScrollProgress />
      <MeteorsBackground />
      {children}
      <Navbar />
    </div>
  );
}
