"use client";

import { useState } from "react";
import {
  IconDashboard,
  IconSettings,
  IconUsers,
  IconBooks,
  IconChartBar,
  IconLanguage,
} from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CoachOverviewTable } from "@/components/admin/coach-overview-table";
import { EngagementGraphs } from "@/components/admin/engagement-graphs";
import { AlertMonitoringFeed } from "@/components/admin/alert-monitoring-feed";
import { UserReassignmentTool } from "@/components/admin/user-reassignment-tool";
import { AuditLogs } from "@/components/admin/audit-logs";
import { AdminMetricsCards } from "@/components/admin/admin-metrics-cards";
import { ProgramManagement } from "@/components/admin/program-management";
import { PlatformUsageAnalytics } from "@/components/admin/platform-usage-analytics";
import { GlobalTemplateManagement } from "@/components/admin/global-template-management";

export default function AdminDashboardPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english");

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <IconDashboard className="h-5 w-5 text-red-500" />
          <h1 className="text-2xl font-semibold tracking-tight">
            {language === "english" ? "Admin Dashboard" : "관리자 대시보드"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Toggle
            aria-label="Toggle language"
            pressed={language === "korean"}
            onPressedChange={(pressed) =>
              setLanguage(pressed ? "korean" : "english")
            }
          >
            <IconLanguage className="h-4 w-4 mr-2" />
            {language === "english" ? "English" : "한국어"}
          </Toggle>
        </div>
      </div>

      <Tabs defaultValue="coaches">
        <TabsList className="mb-4">
          <TabsTrigger value="coaches" className="flex items-center gap-1">
            <IconUsers className="h-4 w-4" />
            <span>{language === "english" ? "Coaches" : "코치"}</span>
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center gap-1">
            <IconBooks className="h-4 w-4" />
            <span>{language === "english" ? "Programs" : "프로그램"}</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <IconChartBar className="h-4 w-4" />
            <span>{language === "english" ? "Analytics" : "분석"}</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <IconSettings className="h-4 w-4" />
            <span>{language === "english" ? "Settings" : "설정"}</span>
          </TabsTrigger>
        </TabsList>

        {/* Coaches Tab */}
        <TabsContent value="coaches" className="space-y-6">
          <AdminMetricsCards
            metrics={[
              {
                title: "Total Coaches",
                value: 4,
                description: "Managing 120 users",
              },
              {
                title: "Active Coaches",
                value: 3,
                description: "75% of total",
              },
              {
                title: "Avg. Check-in Rate",
                value: "82%",
                description: "from last month",
                change: { value: 5, isPositive: true },
              },
              {
                title: "Flagged Users",
                value: 15,
                description: "Requires attention",
              },
            ]}
          />

          <CoachOverviewTable />

          <UserReassignmentTool />
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs" className="space-y-6">
          <AdminMetricsCards
            metrics={[
              {
                title: "Total Programs",
                value: 8,
                description: "3 active, 5 draft",
              },
              {
                title: "Active Users",
                value: 102,
                description: "85% of total users",
              },
              {
                title: "Completion Rate",
                value: "78%",
                description: "from last quarter",
                change: { value: 12, isPositive: true },
              },
              {
                title: "User Satisfaction",
                value: "4.7",
                description: "out of 5.0",
                change: { value: 3, isPositive: true },
              },
            ]}
          />

          <Card>
            <CardHeader>
              <CardTitle>Program Overview</CardTitle>
              <CardDescription>
                Status and engagement metrics across all programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProgramManagement language={language} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EngagementGraphs />
            <AlertMonitoringFeed />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform Usage</CardTitle>
              <CardDescription>
                Detailed metrics on system-wide performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PlatformUsageAnalytics language={language} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Message Templates</CardTitle>
              <CardDescription>
                Manage templates available to all coaches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GlobalTemplateManagement language={language} />
            </CardContent>
          </Card>

          <AuditLogs />
        </TabsContent>
      </Tabs>
    </>
  );
}
