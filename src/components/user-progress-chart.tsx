"use client"

import * as React from "react"
import { useState } from "react"
import { IconLanguage } from "@tabler/icons-react"
import { format } from "date-fns"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"

// Sample progress data for demonstration
const progressData = [
  {
    date: "2025-02-01",
    progress: 20,
    engagement: 30,
    interactions: 5,
  },
  {
    date: "2025-02-08",
    progress: 25,
    engagement: 40,
    interactions: 8,
  },
  {
    date: "2025-02-15",
    progress: 35,
    engagement: 45,
    interactions: 12,
  },
  {
    date: "2025-02-22",
    progress: 40,
    engagement: 50,
    interactions: 15,
  },
  {
    date: "2025-03-01",
    progress: 55,
    engagement: 60,
    interactions: 18,
  },
  {
    date: "2025-03-08",
    progress: 65,
    engagement: 70,
    interactions: 22,
  },
  {
    date: "2025-03-15",
    progress: 75,
    engagement: 75,
    interactions: 25,
  },
  {
    date: "2025-03-22",
    progress: 85,
    engagement: 80,
    interactions: 30,
  },
]

// Sample skill data for demonstration
const skillsData = [
  {
    name: "Communication",
    initial: 30,
    current: 75,
  },
  {
    name: "Leadership",
    initial: 45,
    current: 65,
  },
  {
    name: "Time Management",
    initial: 20,
    current: 80,
  },
  {
    name: "Problem Solving",
    initial: 50,
    current: 70,
  },
  {
    name: "Networking",
    initial: 25,
    current: 60,
  },
]

// Korean translations for skill names
const skillTranslations: Record<string, string> = {
  "Communication": "의사소통",
  "Leadership": "리더십",
  "Time Management": "시간 관리",
  "Problem Solving": "문제 해결",
  "Networking": "네트워킹",
}

export function UserProgressChart() {
  const [language, setLanguage] = useState<"english" | "korean">("english")
  const [selectedUser, setSelectedUser] = useState<string>("user123")
  const [timeRange, setTimeRange] = useState<string>("3months")

  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM d")
  }

  // Translate skill names based on selected language
  const getSkillName = (name: string) => {
    if (language === "korean" && skillTranslations[name]) {
      return skillTranslations[name]
    }
    return name
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {language === "english" ? "User Progress Insights" : "사용자 진행 상황 인사이트"}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === "english" ? "Select user" : "사용자 선택"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user123">John Doe</SelectItem>
              <SelectItem value="user456">Jane Smith</SelectItem>
              <SelectItem value="user789">David Johnson</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={language === "english" ? "Time range" : "시간 범위"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">
                {language === "english" ? "Last Month" : "지난 달"}
              </SelectItem>
              <SelectItem value="3months">
                {language === "english" ? "Last 3 Months" : "지난 3개월"}
              </SelectItem>
              <SelectItem value="6months">
                {language === "english" ? "Last 6 Months" : "지난 6개월"}
              </SelectItem>
              <SelectItem value="1year">
                {language === "english" ? "Last Year" : "지난 해"}
              </SelectItem>
            </SelectContent>
          </Select>
          <Toggle
            aria-label="Toggle language"
            pressed={language === "korean"}
            onPressedChange={(pressed) => setLanguage(pressed ? "korean" : "english")}
          >
            <IconLanguage className="h-4 w-4 mr-2" />
            {language === "english" ? "English" : "한국어"}
          </Toggle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="progress">
              {language === "english" ? "Progress Over Time" : "시간에 따른 진행 상황"}
            </TabsTrigger>
            <TabsTrigger value="skills">
              {language === "english" ? "Skills Development" : "기술 개발"}
            </TabsTrigger>
            <TabsTrigger value="engagement">
              {language === "english" ? "Engagement Metrics" : "참여 지표"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={progressData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, language === "english" ? "Progress" : "진행 상황"]}
                    labelFormatter={(label) => format(new Date(label), "PPP")}
                  />
                  <Area
                    type="monotone"
                    dataKey="progress"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorProgress)"
                    name={language === "english" ? "Progress" : "진행 상황"}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === "english"
                ? "This chart shows the user's overall progress over time based on coaching session assessments."
                : "이 차트는 코칭 세션 평가를 기반으로 시간에 따른 사용자의 전반적인 진행 상황을 보여줍니다."}
            </p>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={skillsData.map(skill => ({
                    ...skill,
                    name: getSkillName(skill.name)
                  }))}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`]}
                  />
                  <Legend />
                  <Bar
                    dataKey="initial"
                    fill="#8884d8"
                    name={language === "english" ? "Initial Assessment" : "초기 평가"}
                  />
                  <Bar
                    dataKey="current"
                    fill="#82ca9d"
                    name={language === "english" ? "Current Level" : "현재 수준"}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === "english"
                ? "This chart compares the user's initial skill levels with their current development."
                : "이 차트는 사용자의 초기 기술 수준과 현재 발전 상황을 비교합니다."}
            </p>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-4">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={progressData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 12 }}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12 }}
                    domain={[0, 40]}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip
                    formatter={(value: number, name: string) => {
                      if (name === "engagement") {
                        return [`${value}%`, language === "english" ? "Engagement" : "참여도"]
                      }
                      return [value, language === "english" ? "Interactions" : "상호작용"]
                    }}
                    labelFormatter={(label) => format(new Date(label), "PPP")}
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="engagement"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorEngagement)"
                    name={language === "english" ? "Engagement" : "참여도"}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="interactions"
                    stroke="#ffc658"
                    fillOpacity={1}
                    fill="url(#colorInteractions)"
                    name={language === "english" ? "Interactions" : "상호작용"}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === "english"
                ? "This chart shows the user's engagement level and number of interactions with the chatbot over time."
                : "이 차트는 시간에 따른 사용자의 참여 수준과 챗봇과의 상호작용 횟수를 보여줍니다."}
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
