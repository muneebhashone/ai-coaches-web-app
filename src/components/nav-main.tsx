"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { type Icon } from "@tabler/icons-react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    isActive?: boolean
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-3">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                tooltip={item.title}
                isActive={item.isActive}
                className="transition-all py-7 duration-200 hover:translate-x-1 hover:bg-primary/10 active:bg-primary/20 data-[active=true]:bg-primary/15 data-[active=true]:border-l-4 data-[active=true]:border-primary"
              >
                {item.icon && <item.icon className="text-primary/80 size-6" />}
                <span className="text-xl font-normal">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
