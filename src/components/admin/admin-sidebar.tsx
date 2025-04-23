"use client";

import Link from "next/link";
import { IconDashboard, IconUsers, IconBook, IconMessageForward, IconSettings } from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
      isActive: true,
    },
    {
      title: "User Management",
      url: "/admin/users",
      icon: IconUsers,
    },
    {
      title: "Clone Coach Training",
      url: "/admin/clone-coach-training",
      icon: IconBook,
    },
    {
      title: "Messenger Management",
      url: "/admin/messenger-management",
      icon: IconMessageForward,
    },
  ],
};

export function AdminSidebar({
  variant = "sidebar",
}: {
  variant?: "sidebar" | "floating" | "inset";
}) {
  const pathname = usePathname();

  return (
    <Sidebar variant={variant}>
      <SidebarHeader className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                className="data-[active=true]:bg-red-500/10 data-[active=true]:text-red-500 hover:bg-red-500/5 transition-all duration-200"
              >
                <Link href={item.url}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}