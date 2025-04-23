"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { IconCheck, IconAlertTriangle, IconInfoCircle, IconX } from "@tabler/icons-react"

type AlertPriority = "high" | "medium" | "low" | "info"
type AlertStatus = "new" | "acknowledged" | "resolved"

interface Alert {
  id: string
  message: string
  timestamp: string
  priority: AlertPriority
  status: AlertStatus
  coachName?: string
  userId?: string
}

const mockAlerts: Alert[] = [
  {
    id: "alert-1",
    message: "User reported distress in conversation",
    timestamp: "2023-06-12T10:23:45",
    priority: "high",
    status: "new",
    coachName: "Sarah Kim",
    userId: "user-542",
  },
  {
    id: "alert-2",
    message: "Multiple failed login attempts detected",
    timestamp: "2023-06-12T09:15:30",
    priority: "medium",
    status: "acknowledged",
    userId: "user-178",
  },
  {
    id: "alert-3",
    message: "Coach has not responded to flagged conversation",
    timestamp: "2023-06-11T16:42:12",
    priority: "medium",
    status: "new",
    coachName: "Jessica Lee",
    userId: "user-391",
  },
  {
    id: "alert-4",
    message: "System update completed successfully",
    timestamp: "2023-06-11T14:30:00",
    priority: "info",
    status: "resolved",
  },
  {
    id: "alert-5",
    message: "New coach training completed",
    timestamp: "2023-06-11T11:20:15",
    priority: "low",
    status: "resolved",
    coachName: "Michael Jung",
  },
  {
    id: "alert-6",
    message: "User reported inappropriate content",
    timestamp: "2023-06-10T22:15:45",
    priority: "high",
    status: "acknowledged",
    coachName: "David Park",
    userId: "user-287",
  },
]

export function AlertMonitoringFeed() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  
  const handleAcknowledge = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, status: "acknowledged" } : alert
      )
    )
  }
  
  const handleResolve = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, status: "resolved" } : alert
      )
    )
  }

  const priorityClasses = {
    high: "bg-red-500",
    medium: "bg-orange-500",
    low: "bg-blue-500",
    info: "bg-gray-500",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert Monitoring</CardTitle>
        <CardDescription>System and user alerts that require attention</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className="flex flex-col p-3 border rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {alert.priority === "high" ? (
                      <IconAlertTriangle className="h-5 w-5 text-red-500" />
                    ) : alert.priority === "info" ? (
                      <IconInfoCircle className="h-5 w-5 text-blue-500" />
                    ) : (
                      <IconAlertTriangle className="h-5 w-5 text-orange-500" />
                    )}
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <div className="flex gap-2 items-center mt-1">
                        <Badge className={priorityClasses[alert.priority]}>
                          {alert.priority}
                        </Badge>
                        {alert.status === "new" ? (
                          <Badge variant="outline" className="border-red-500 text-red-500">
                            New
                          </Badge>
                        ) : alert.status === "acknowledged" ? (
                          <Badge variant="outline" className="border-orange-500 text-orange-500">
                            Acknowledged
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-green-500 text-green-500">
                            Resolved
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleString()}
                  </div>
                </div>
                
                <div className="mt-2 text-sm">
                  {alert.coachName && (
                    <span className="mr-2">Coach: <strong>{alert.coachName}</strong></span>
                  )}
                  {alert.userId && (
                    <span>User ID: <strong>{alert.userId}</strong></span>
                  )}
                </div>
                
                {alert.status !== "resolved" && (
                  <div className="flex gap-2 mt-3 justify-end">
                    {alert.status === "new" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => handleAcknowledge(alert.id)}
                      >
                        <IconCheck className="mr-1 h-3 w-3" />
                        Acknowledge
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => handleResolve(alert.id)}
                    >
                      <IconX className="mr-1 h-3 w-3" />
                      Resolve
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}