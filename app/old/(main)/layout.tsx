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
import { setContactData } from "@/store/features/contactSlice";
import HeroSkeleton from "./components/hero-skeleton";
import { setWorksData } from "@/store/features/workSlice";
import { SoundProvider } from "@/providers/sound-provider";
export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
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
    <div className="relative z-50">
      <SoundProvider>
        <ScrollProgress />
        <MeteorsBackground />
        {isLoading ? <HeroSkeleton /> : children}
        {/*<HeroSkeleton />*/}
        <Navbar />
      </SoundProvider>
    </div>
  );
}
