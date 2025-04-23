"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Mock data for user activity
const userActivityData = [
  { date: "2023-01", activeUsers: 85, sessions: 412, messagesSent: 2150 },
  { date: "2023-02", activeUsers: 92, sessions: 438, messagesSent: 2280 },
  { date: "2023-03", activeUsers: 98, sessions: 455, messagesSent: 2370 },
  { date: "2023-04", activeUsers: 105, sessions: 480, messagesSent: 2480 },
  { date: "2023-05", activeUsers: 112, sessions: 512, messagesSent: 2650 },
  { date: "2023-06", activeUsers: 120, sessions: 550, messagesSent: 2840 },
];

// Mock data for coaching usage
const coachingUsageData = [
  { name: "Stress Management", users: 48, percentage: 40 },
  { name: "Sleep Improvement", users: 32, percentage: 26.67 },
  { name: "Weight Management", users: 24, percentage: 20 },
  { name: "Other Programs", users: 16, percentage: 13.33 },
];

// Mock data for platform performance
const performanceData = [
  {
    metric: "Response Time",
    value: 1.2,
    unit: "seconds",
    change: -0.3,
    isPositive: true,
  },
  {
    metric: "API Latency",
    value: 0.8,
    unit: "seconds",
    change: -0.2,
    isPositive: true,
  },
  {
    metric: "Error Rate",
    value: 0.5,
    unit: "%",
    change: 0.1,
    isPositive: false,
  },
  { metric: "Uptime", value: 99.98, unit: "%", change: 0.01, isPositive: true },
  {
    metric: "User Satisfaction",
    value: 4.8,
    unit: "/5",
    change: 0.2,
    isPositive: true,
  },
];

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function PlatformUsageAnalytics({
  language = "english",
}: {
  language?: "english" | "korean";
}) {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <div className="space-y-6 h-[650px] max-h-[650px]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          {language === "english" ? "Platform Analytics" : "플랫폼 분석"}
        </h3>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue
              placeholder={language === "english" ? "Time range" : "시간 범위"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">
              {language === "english" ? "Last month" : "지난 달"}
            </SelectItem>
            <SelectItem value="3m">
              {language === "english" ? "Last 3 months" : "지난 3개월"}
            </SelectItem>
            <SelectItem value="6m">
              {language === "english" ? "Last 6 months" : "지난 6개월"}
            </SelectItem>
            <SelectItem value="1y">
              {language === "english" ? "Last year" : "지난 해"}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="activity" className="flex flex-col h-[580px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">
            {language === "english" ? "User Activity" : "사용자 활동"}
          </TabsTrigger>
          <TabsTrigger value="coaching">
            {language === "english" ? "Coaching Programs" : "코칭 프로그램"}
          </TabsTrigger>
          <TabsTrigger value="performance">
            {language === "english" ? "System Performance" : "시스템 성능"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="flex-1 pt-4 overflow-hidden">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={userActivityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="activeUsers"
                  name={language === "english" ? "Active Users" : "활성 사용자"}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sessions"
                  name={language === "english" ? "Sessions" : "세션"}
                  stroke="#82ca9d"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="messagesSent"
                  name={
                    language === "english" ? "Messages Sent" : "보낸 메시지"
                  }
                  stroke="#ffc658"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="rounded-lg border p-3">
              <div className="text-sm text-muted-foreground">
                {language === "english" ? "Active Users" : "활성 사용자"}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-semibold">120</span>
                <Badge className="bg-green-500">+12%</Badge>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="text-sm text-muted-foreground">
                {language === "english" ? "Sessions" : "세션"}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-semibold">550</span>
                <Badge className="bg-green-500">+8%</Badge>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <div className="text-sm text-muted-foreground">
                {language === "english" ? "Messages" : "메시지"}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-semibold">2,840</span>
                <Badge className="bg-green-500">+7%</Badge>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="coaching" className="flex-1 pt-4 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-full">
              <h4 className="text-sm font-medium mb-4 text-center">
                {language === "english"
                  ? "Program Distribution"
                  : "프로그램 분포"}
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={coachingUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="users"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {coachingUsageData.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} users`, "Users"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="h-full">
              <h4 className="text-sm font-medium mb-4 text-center">
                {language === "english"
                  ? "Completion Rates by Program"
                  : "프로그램별 완료율"}
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Stress", completion: 75 },
                    { name: "Sleep", completion: 68 },
                    { name: "Weight", completion: 82 },
                    { name: "Other", completion: 62 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Completion Rate"]}
                  />
                  <Bar dataKey="completion" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-4">
              {language === "english"
                ? "Program Performance Summary"
                : "프로그램 성과 요약"}
            </h4>
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "english" ? "Program" : "프로그램"}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "english" ? "Users" : "사용자"}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "english" ? "Completion" : "완료율"}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === "english" ? "Satisfaction" : "만족도"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {coachingUsageData.map((program, index) => (
                    <tr key={index.toString()}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {program.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        {program.users}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        {[75, 68, 82, 62][index]}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        {[4.7, 4.5, 4.8, 4.2][index]}/5.0
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent
          value="performance"
          className="flex-1 pt-4 overflow-hidden"
        >
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={[
                  {
                    month: "Jan",
                    responseTime: 1.5,
                    errorRate: 0.8,
                    apiLatency: 1.0,
                  },
                  {
                    month: "Feb",
                    responseTime: 1.4,
                    errorRate: 0.7,
                    apiLatency: 0.9,
                  },
                  {
                    month: "Mar",
                    responseTime: 1.3,
                    errorRate: 0.6,
                    apiLatency: 0.9,
                  },
                  {
                    month: "Apr",
                    responseTime: 1.2,
                    errorRate: 0.5,
                    apiLatency: 0.8,
                  },
                  {
                    month: "May",
                    responseTime: 1.2,
                    errorRate: 0.5,
                    apiLatency: 0.8,
                  },
                  {
                    month: "Jun",
                    responseTime: 1.2,
                    errorRate: 0.5,
                    apiLatency: 0.8,
                  },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  name={
                    language === "english"
                      ? "Response Time (s)"
                      : "응답 시간 (초)"
                  }
                  stroke="#8884d8"
                />
                <Line
                  type="monotone"
                  dataKey="errorRate"
                  name={
                    language === "english" ? "Error Rate (%)" : "오류율 (%)"
                  }
                  stroke="#ff0000"
                />
                <Line
                  type="monotone"
                  dataKey="apiLatency"
                  name={
                    language === "english"
                      ? "API Latency (s)"
                      : "API 지연 시간 (초)"
                  }
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-4">
              {language === "english" ? "Performance Metrics" : "성능 지표"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {performanceData.map((metric, index) => (
                <div key={index.toString()} className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">
                    {language === "english" ? metric.metric : metric.metric}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-2xl font-semibold">
                      {metric.value}
                      {metric.unit}
                    </span>
                    <Badge
                      className={
                        metric.isPositive ? "bg-green-500" : "bg-red-500"
                      }
                    >
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}
                      {metric.unit}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
