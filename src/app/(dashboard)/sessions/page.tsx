"use client"

import { useState } from "react"
import {
  IconHistory,
  IconLanguage,
  IconChartBar,
  IconMessageCircle,
  IconSearch,
  IconUserCircle,
  IconStar
} from "@tabler/icons-react"

import { UserProgressChart } from "@/components/user-progress-chart"
import { AnimatedCard } from "@/components/ui/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import { Badge } from "@/components/ui/badge"

// Mock feedback data
const feedbackItems = [
  {
    id: 1,
    user: "Sarah Kim",
    date: "April 2, 2023",
    rating: 5,
    message: "The AI coaching sessions have been tremendously helpful. I feel like I'm making real progress.",
    type: "User Feedback",
  },
  {
    id: 2,
    user: "James Wong",
    date: "April 1, 2023",
    rating: 4,
    message: "Good experience overall. The AI coach could use more variety in its responses, but the guidance is solid.",
    type: "User Feedback",
  },
  {
    id: 3,
    user: "Minho Park",
    date: "March 30, 2023",
    rating: 5,
    message: "I'm impressed with how personalized the coaching feels. The AI remembered details from our previous sessions.",
    type: "User Feedback",
  },
  {
    id: 4,
    user: "System",
    date: "March 29, 2023",
    rating: null,
    message: "Performance report: 93% user engagement rate, average session duration 8.5 minutes, 87% completion rate.",
    type: "System Analytics",
  },
]

// Define status badge variants
const statusVariants = {
  'Completed': 'default',
  'In Progress': 'outline',
  'Scheduled': 'secondary'
} as const;

// Instead of using SessionHistoryTable with mock data, we'll render a simpler table
export default function SessionsPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <div className="flex items-center gap-2">
        <IconHistory className="h-5 w-5" />
        <h1 className="text-xl font-semibold">
          {language === "english" ? "Sessions" : "세션"}
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Toggle
          aria-label="Toggle language"
          pressed={language === "korean"}
          onPressedChange={(pressed) => setLanguage(pressed ? "korean" : "english")}
        >
          <IconLanguage className="h-4 w-4 mr-2" />
          {language === "english" ? "English" : "한국어"}
        </Toggle>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="history">
            <IconHistory className="h-4 w-4 mr-2" />
            {language === "english" ? "History" : "히스토리"}
          </TabsTrigger>
          <TabsTrigger value="analysis">
            <IconChartBar className="h-4 w-4 mr-2" />
            {language === "english" ? "Session Analysis" : "세션 분석"}
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <IconMessageCircle className="h-4 w-4 mr-2" />
            {language === "english" ? "Feedback" : "피드백"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === "english" ? "Search sessions..." : "세션 검색..."}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Session History" : "세션 기록"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "View and manage all coaching sessions"
                  : "모든 코칭 세션 보기 및 관리"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-medium">
                        {language === "english" ? "User" : "사용자"}
                      </th>
                      <th className="p-3 text-left font-medium">
                        {language === "english" ? "Date" : "날짜"}
                      </th>
                      <th className="p-3 text-left font-medium">
                        {language === "english" ? "Duration" : "기간"}
                      </th>
                      <th className="p-3 text-left font-medium">
                        {language === "english" ? "Status" : "상태"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array(6).fill(null).map((_, i) => {
                      const status = ["Completed", "In Progress", "Scheduled"][i % 3] as keyof typeof statusVariants;
                      return (
                        <tr key={i} className="border-b">
                          <td className="p-3">User {i + 1}</td>
                          <td className="p-3">{new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toLocaleDateString()}</td>
                          <td className="p-3">{`${Math.floor(Math.random() * 20) + 5} min`}</td>
                          <td className="p-3">
                            <Badge variant={statusVariants[status]}>
                              {status}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <AnimatedCard>
              <CardHeader className="pb-2">
                <CardDescription>
                  {language === "english" ? "Total Sessions" : "전체 세션"}
                </CardDescription>
                <CardTitle className="text-2xl">156</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {language === "english" ? "+24% from last month" : "지난 달 대비 +24%"}
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard>
              <CardHeader className="pb-2">
                <CardDescription>
                  {language === "english" ? "Avg. Duration" : "평균 기간"}
                </CardDescription>
                <CardTitle className="text-2xl">8.5 min</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {language === "english" ? "+2.1 min from last month" : "지난 달 대비 +2.1분"}
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard>
              <CardHeader className="pb-2">
                <CardDescription>
                  {language === "english" ? "Satisfaction" : "만족도"}
                </CardDescription>
                <CardTitle className="text-2xl">4.7/5.0</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {language === "english" ? "+0.3 from last month" : "지난 달 대비 +0.3"}
                </div>
              </CardContent>
            </AnimatedCard>
          </div>

          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Session Metrics" : "세션 지표"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Performance analysis over time"
                  : "시간에 따른 성능 분석"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserProgressChart />
            </CardContent>
          </AnimatedCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedCard>
              <CardHeader>
                <CardTitle>
                  {language === "english" ? "Session Types" : "세션 유형"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                      <span>AI Coaching</span>
                    </div>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span>Human Coaching</span>
                    </div>
                    <span className="font-medium">22%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span>Combined</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard>
              <CardHeader>
                <CardTitle>
                  {language === "english" ? "Platform Distribution" : "플랫폼 분포"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                      <span>KakaoTalk</span>
                    </div>
                    <span className="font-medium">62%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>Web Dashboard</span>
                    </div>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span>Other</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "User Feedback" : "사용자 피드백"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Feedback from users about their coaching experience"
                  : "코칭 경험에 대한 사용자의 피드백"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {feedbackItems.map((item) => (
                  <div key={item.id} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <IconUserCircle className="h-10 w-10 text-muted-foreground mr-3" />
                        <div>
                          <div className="font-medium">{item.user}</div>
                          <div className="text-xs text-muted-foreground">{item.date}</div>
                        </div>
                      </div>
                      <Badge variant={item.type === "System Analytics" ? "outline" : "default"}>
                        {item.type}
                      </Badge>
                    </div>

                    {item.rating && (
                      <div className="flex mb-2">
                        {Array(5).fill(0).map((_, i) => (
                          <IconStar
                            key={i}
                            className={`h-4 w-4 ${i < item.rating ? "text-yellow-500" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                    )}

                    <p className="text-sm">{item.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </>
  )
} 