"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AnimatedCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode
  glowColor?: string
}

export function AnimatedCard({ 
  children, 
  className, 
  glowColor = "rgba(100, 150, 255, 0.5)",
  ...props 
}: AnimatedCardProps) {
  return (
    <div className="group relative">
      <div 
        className={cn(
          "absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 opacity-0 transition-all duration-700 group-hover:from-primary/40 group-hover:via-primary/60 group-hover:to-primary/40 group-hover:opacity-100 group-hover:animate-pulse",
          className
        )}
        style={{ 
          "--card-glow-color": glowColor 
        } as React.CSSProperties}
      />
      <Card className="relative z-10 transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-lg" {...props}>
        {children}
      </Card>
    </div>
  )
}

export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
