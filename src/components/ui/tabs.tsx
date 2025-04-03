"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  "aria-label": ariaLabel = "Tabs",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
  "aria-label"?: string
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      aria-label={ariaLabel}
      className={cn(
        "bg-muted/80 backdrop-blur-sm text-muted-foreground inline-flex h-12 w-fit items-center justify-center rounded-xl p-1.5 premium-shadow gap-2",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative overflow-visible text-foreground/80 dark:text-foreground/70 inline-flex h-[calc(100%-3px)] items-center justify-center gap-1.5 rounded-lg border border-transparent px-4 py-1.5 text-sm font-medium transition-all duration-200 ease-in-out focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "hover:bg-background/80 hover:text-foreground hover:shadow-sm",
        "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
        "data-[state=active]:text-primary-foreground data-[state=active]:bg-primary data-[state=active]:shadow-md data-[state=active]:scale-[1.02]",
        "data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-[3px] data-[state=active]:after:bg-primary-foreground/20",
        "data-[state=active]:aria-selected:text-primary-foreground",
        "mx-0.5 min-w-max", // Add horizontal margin for gap and ensure minimum width
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-none transition-all duration-300 ease-in-out data-[state=inactive]:opacity-0 data-[state=inactive]:translate-y-1 data-[state=active]:opacity-100 data-[state=active]:translate-y-0",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
