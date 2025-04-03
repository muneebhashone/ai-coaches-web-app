"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconDashboard,
  IconMessageChatbot,
  IconHistory,
  IconSettings,
  IconPlugConnected,
  IconBook,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Note: The NavMain component will need to be modified to support nested menu items
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      isActive: true,
    },
    {
      title: "Knowledge Base",
      url: "/knowledge-base",
      icon: IconBook,
    },
    {
      title: "Sessions",
      url: "/sessions",
      icon: IconHistory,
    },
    {
      title: "Integrations",
      url: "/integrations",
      icon: IconPlugConnected,
    },
    {
      title: "Chatbot",
      url: "/chatbot",
      icon: IconMessageChatbot,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-3.5 bg-primary/10 hover:bg-primary/20 transition-all duration-200"
            >
              <Link href="/dashboard" className="flex items-center gap-3">
                <IconMessageChatbot className="size-8 text-primary" />
                <span className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Coach</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}
