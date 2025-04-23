"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts"

const userActivityData = [
  { date: "2023-01", active: 120, inactive: 20, new: 15 },
  { date: "2023-02", active: 135, inactive: 15, new: 22 },
  { date: "2023-03", active: 148, inactive: 12, new: 18 },
  { date: "2023-04", active: 160, inactive: 10, new: 25 },
  { date: "2023-05", active: 175, inactive: 8, new: 30 },
  { date: "2023-06", active: 190, inactive: 8, new: 20 },
]

const coachPerformanceData = [
  { name: "Sarah Kim", messageRate: 92, responseTime: 85, userSatisfaction: 95 },
  { name: "David Park", messageRate: 85, responseTime: 78, userSatisfaction: 88 },
  { name: "Jessica Lee", messageRate: 65, responseTime: 60, userSatisfaction: 70 },
  { name: "Michael Jung", messageRate: 95, responseTime: 90, userSatisfaction: 92 },
]

export function EngagementGraphs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Engagement</CardTitle>
        <CardDescription>User activity and coach performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="user-activity">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user-activity">User Activity</TabsTrigger>
            <TabsTrigger value="coach-performance">Coach Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user-activity" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={userActivityData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="active" stackId="1" stroke="#4ade80" fill="#4ade80" />
                  <Area type="monotone" dataKey="inactive" stackId="1" stroke="#fb7185" fill="#fb7185" />
                  <Area type="monotone" dataKey="new" stackId="1" stroke="#60a5fa" fill="#60a5fa" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#4ade80] rounded-full"></div>
                <span className="text-sm">Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#fb7185] rounded-full"></div>
                <span className="text-sm">Inactive Users</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#60a5fa] rounded-full"></div>
                <span className="text-sm">New Users</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="coach-performance">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={coachPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="messageRate" name="Message Rate" fill="#60a5fa" />
                  <Bar dataKey="responseTime" name="Response Time" fill="#4ade80" />
                  <Bar dataKey="userSatisfaction" name="User Satisfaction" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}