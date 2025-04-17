"use client";

import Link from "next/link";
import { IconBook, IconMessageForward, IconUsers } from "@tabler/icons-react";

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

// Updated navigation with only the 3 required items
const data = {
  navMain: [
    {
      title: "User Management",
      url: "/users",
      icon: IconUsers,
      isActive: true,
    },
    {
      title: "Clone Coach Training",
      url: "/clone-coach-training",
      icon: IconBook,
    },
    {
      title: "Messenger Management",
      url: "/messenger",
      icon: IconMessageForward,
    },
  ],
};

export function AppSidebar({
  variant = "sidebar",
}: {
  variant?: "sidebar" | "floating" | "inset";
}) {
  const pathname = usePathname();

  return (
    <Sidebar variant={variant}>
      <SidebarHeader className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            AI Coaches
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
                className="data-[active=true]:bg-primary/10 data-[active=true]:text-primary hover:bg-primary/5 transition-all duration-200"
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
