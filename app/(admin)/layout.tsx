"use client";

import { ReactNode, useEffect } from "react";
import { useAuthGuard } from "@/hooks/use-auth-guard";
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

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, loading } = useAuthGuard();
  const { data } = useDashboardQuery();

  useEffect(() => {
    if (!data) return;
    dispatch(setHeroData(data.hero));
    dispatch(setSkillCategories(data.skillCategory));
    dispatch(setSkills(data.skills));
    dispatch(setProjects(data.projects));
    dispatch(setMessage(data.contacts));
  }, [data, dispatch]);
  if (loading) {
    return <DashboardSkeleton />;
  }
  if (user) {
    dispatch(setUser(user));
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
        <SiteHeader name={user?.name || ""} avatar={user?.avatar} />
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
