"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconChartBar,
  IconDashboard,
  IconHistory,
  IconMessageChatbot,
  IconNotebook,
  IconUsers,
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
import { usePathname } from "next/navigation"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: IconDashboard,
        isActive: usePathname() === "/",
      },
      {
        title: "Knowledge Base",
        url: "/knowledge-base",
        icon: IconNotebook,
        isActive: usePathname() === "/knowledge-base",
      },
      {
        title: "Sessions",
        url: "/sessions",
        icon: IconHistory,
        isActive: usePathname() === "/sessions",
      },
      {
        title: "Integrations",
        url: "/integrations",
        icon: IconChartBar,
        isActive: usePathname() === "/integrations",
      },
      {
        title: "Settings",
        url: "/settings",
        icon: IconUsers,
        isActive: usePathname() === "/settings",
      },
    ],
  }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-3.5 bg-primary/10 hover:bg-primary/20 transition-all duration-200"
            >
              <Link href="/" className="flex items-center gap-3">
                <IconMessageChatbot className="size-8 text-primary" />
                <span className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">AI Coach</span>
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
