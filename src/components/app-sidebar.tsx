"use client"

import Link from "next/link"
import {
  IconDashboard,
  IconMessageChatbot,
  IconHistory,
  IconSettings,
  IconPlugConnected,
  IconBook,
  IconMessageForward,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { usePathname } from "next/navigation"

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
      title: "Feedback Messaging",
      url: "/feedback-messaging",
      icon: IconMessageForward,
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

export function AppSidebar({ variant = "sidebar" }: { variant?: "sidebar" | "floating" | "inset" }) {
  const pathname = usePathname()

  return (
    <Sidebar variant={variant}>
      <SidebarHeader className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">AI Coaches</span>
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
  )
}
