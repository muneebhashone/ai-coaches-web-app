"use client"

import { useState } from "react"
import { 
  IconBrandKakoTalk,
 
  IconBrandTelegram, 
  IconBrandWhatsapp, 
  IconLanguage, 
  IconLayoutDashboard 
} from "@tabler/icons-react"

import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SessionHistoryTable } from "@/components/session-history-table"
import { SessionNotesForm } from "@/components/session-notes-form"
import { SessionScheduler } from "@/components/session-scheduler"
import { UserProgressChart } from "@/components/user-progress-chart"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"

// Import session data
import sessionData from "@/app/data.json"


export default function HomePage() {
  const [language, setLanguage] = useState<"english" | "korean">("english")

  return (
    <AdminLayout language={language} onLanguageChange={setLanguage}> 
   
      
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatedCard>
            <CardHeader className="pb-2">
              <CardDescription>
                {language === "english" ? "Total Users" : "전체 사용자"}
              </CardDescription>
              <CardTitle className="text-2xl">42</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {language === "english" ? "+12% from last month" : "지난 달 대비 +12%"}
              </div>
            </CardContent>
          </AnimatedCard>
          
          <AnimatedCard>
            <CardHeader className="pb-2">
              <CardDescription>
                {language === "english" ? "Active Sessions" : "활성 세션"}
              </CardDescription>
              <CardTitle className="text-2xl">18</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {language === "english" ? "5 sessions today" : "오늘 5개 세션"}
              </div>
            </CardContent>
          </AnimatedCard>
          
          <AnimatedCard>
            <CardHeader className="pb-2">
              <CardDescription>
                {language === "english" ? "Completed Sessions" : "완료된 세션"}
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
                {language === "english" ? "Avg. Progress" : "평균 진행률"}
              </CardDescription>
              <CardTitle className="text-2xl">68%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {language === "english" ? "+8% from last month" : "지난 달 대비 +8%"}
              </div>
            </CardContent>
          </AnimatedCard>
        </div>
        
        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-4">
            <TabsTrigger value="sessions">
              {language === "english" ? "Session Management" : "세션 관리"}
            </TabsTrigger>
            <TabsTrigger value="progress">
              {language === "english" ? "User Progress" : "사용자 진행 상황"}
            </TabsTrigger>
            <TabsTrigger value="schedule">
              {language === "english" ? "Session Scheduling" : "세션 일정"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sessions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SessionNotesForm />
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>
                    {language === "english" ? "Chatbot Integration" : "챗봇 통합"}
                  </CardTitle>
                  <CardDescription>
                    {language === "english"
                      ? "Connect your AI coach with popular messaging platforms"
                      : "AI 코치를 인기 있는 메시징 플랫폼과 연결하세요"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconBrandKakoTalk className="size-5 text-primary" />
                        <span>KakaoTalk</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {language === "english" ? "Connected" : "연결됨"}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconBrandWhatsapp className="size-5 text-muted-foreground" />
                        <span>WhatsApp</span>
                      </div>
                      <Button variant="outline" size="sm">
                        {language === "english" ? "Connect" : "연결"}
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconBrandTelegram className="size-5 text-muted-foreground" />
                        <span>Telegram</span>
                      </div>
                      <Button variant="outline" size="sm">
                        {language === "english" ? "Connect" : "연결"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <SessionHistoryTable data={sessionData} />
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>
                    {language === "english" ? "User Progress Chart" : "사용자 진행 차트"}
                  </CardTitle>
                  <CardDescription>
                    {language === "english"
                      ? "Track user progress over time"
                      : "시간 경과에 따른 사용자 진행 상황 추적"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserProgressChart />
                </CardContent>
              </AnimatedCard>
              
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>
                    {language === "english" ? "Progress Metrics" : "진행 지표"}
                  </CardTitle>
                  <CardDescription>
                    {language === "english"
                      ? "Key performance indicators for user progress"
                      : "사용자 진행 상황에 대한 주요 성과 지표"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">
                          {language === "english" ? "Completion Rate" : "완료율"}
                        </div>
                        <div className="text-2xl font-bold">78%</div>
                        <div className="text-xs text-muted-foreground">
                          {language === "english" ? "+5% from last month" : "지난 달 대비 +5%"}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">
                          {language === "english" ? "Engagement" : "참여도"}
                        </div>
                        <div className="text-2xl font-bold">92%</div>
                        <div className="text-xs text-muted-foreground">
                          {language === "english" ? "+8% from last month" : "지난 달 대비 +8%"}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>
                    {language === "english" ? "Session Scheduler" : "세션 스케줄러"}
                  </CardTitle>
                  <CardDescription>
                    {language === "english"
                      ? "Schedule and manage coaching sessions"
                      : "코칭 세션 예약 및 관리"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SessionScheduler />
                </CardContent>
              </AnimatedCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
