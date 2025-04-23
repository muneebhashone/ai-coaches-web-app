"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react"

interface MetricCardProps {
  title: string
  value: string | number
  description: string
  change?: {
    value: number
    isPositive: boolean
  }
}

export function MetricCard({ title, value, description, change }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-3xl font-semibold">{value}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {change && (
            <>
              {change.isPositive ? (
                <IconArrowUpRight className="h-3 w-3 text-green-500" />
              ) : (
                <IconArrowDownRight className="h-3 w-3 text-red-500" />
              )}
              <span 
                className={change.isPositive ? "text-green-500" : "text-red-500"}
              >
                {change.value}%
              </span>
            </>
          )}
          <span>{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function AdminMetricsCards({ 
  metrics 
}: { 
  metrics: Array<MetricCardProps>
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          description={metric.description}
          change={metric.change}
        />
      ))}
    </div>
  )
}