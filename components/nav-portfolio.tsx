"use client";

import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavMain({
  navTitle,
  items,
}: {
  navTitle?: string;
  items: {
    title: string;
    url: string;
    icon: Icon;
    isActive?: boolean;
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {navTitle && <SidebarGroupLabel>{navTitle}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={item.isActive && pathname === item.url}
              tooltip={item.title}
            >
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
