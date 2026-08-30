"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import DashboardSkeleton from "./loading";

import { useAppDispatch } from "@/hooks/hooks";
import { setUser } from "@/store/features/userSlice";
import { useDashboardQuery } from "@/hooks/use-dashboard-query";
import { setHeroData } from "@/store/features/heroSlice";
import { setSkillCategories } from "@/store/features/skillCategorySlice";
import { setSkills } from "@/store/features/skillSlice";
import { setProjects } from "@/store/features/projectSlice";
import { setMessage } from "@/store/features/messageSlice";
import { setContactData } from "@/store/features/contactSlice";
import { setWorksData } from "@/store/features/workSlice";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useDashboardQuery({
    enabled: true,
  });

  useEffect(() => {
    if (!data) return;

    if (data.user) dispatch(setUser(data.user));
    if (data.hero) dispatch(setHeroData(data.hero));
    if (data.skillCategory) dispatch(setSkillCategories(data.skillCategory));
    if (data.skills) dispatch(setSkills(data.skills));
    if (data.projects) dispatch(setProjects(data.projects));
    if (data.messages) dispatch(setMessage(data.messages));
    if (data.contact) dispatch(setContactData(data.contact));
    if (data.works) dispatch(setWorksData(data.works));
  }, [data, dispatch]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
