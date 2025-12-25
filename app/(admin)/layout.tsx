"use client";

import { ReactNode } from "react";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import DashboardSkeleton from "./loading";
import { useAppDispatch } from "@/hooks/hooks";
import { setUser } from "@/store/features/userSlice";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuthGuard();
  const dispatch = useAppDispatch();
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
