"use client"

import { useState } from "react"
import { IconDashboard, IconLanguage } from "@tabler/icons-react"

import { SiteHeader } from "@/components/site-header"
import { AnimatedCard } from "@/components/ui/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english")

  return (
    <>
      <SiteHeader>
        <div className="flex items-center gap-2">
          <IconDashboard className="h-5 w-5" />
          <h1 className="text-xl font-semibold">
            {language === "english" ? "Dashboard" : "대시보드"}
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
      </SiteHeader>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AnimatedCard>
          <CardHeader>
            <CardTitle>
              {language === "english" ? "Manage Chatbot" : "챗봇 관리"}
            </CardTitle>
            <CardDescription>
              {language === "english" 
                ? "Administer your AI-based chatbot" 
                : "AI 기반 챗봇 관리"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "english"
                ? "Configure your AI coach assistant, train it with your coaching style, and monitor its performance."
                : "AI 코치 어시스턴트를 구성하고, 귀하의 코칭 스타일로 학습시키고, 성능을 모니터링하세요."}
            </p>
            <Button>
              {language === "english" ? "View" : "보기"}
            </Button>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard>
          <CardHeader>
            <CardTitle>
              {language === "english" ? "Interactions" : "상호작용"}
            </CardTitle>
            <CardDescription>
              {language === "english" 
                ? "Monitor and analyze interactions" 
                : "상호작용 모니터링 및 분석"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "english"
                ? "Track how users are engaging with your AI coach, review conversation histories, and analyze user behavior patterns."
                : "사용자가 AI 코치와 어떻게 상호작용하는지 추적하고, 대화 기록을 검토하고, 사용자 행동 패턴을 분석하세요."}
            </p>
            <Button>
              {language === "english" ? "View" : "보기"}
            </Button>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard>
          <CardHeader>
            <CardTitle>
              {language === "english" ? "Knowledge Base" : "지식 베이스"}
            </CardTitle>
            <CardDescription>
              {language === "english" 
                ? "Organize information and resources" 
                : "정보 및 리소스 구성"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "english"
                ? "Create and manage the knowledge base that powers your AI coach. Upload documents, create articles, and organize content."
                : "AI 코치를 지원하는 지식 베이스를 생성하고 관리하세요. 문서 업로드, 아티클 작성 및 콘텐츠 구성이 가능합니다."}
            </p>
            <Button>
              {language === "english" ? "View" : "보기"}
            </Button>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard>
          <CardHeader>
            <CardTitle>
              {language === "english" ? "Users" : "사용자"}
            </CardTitle>
            <CardDescription>
              {language === "english" 
                ? "Manage users and access" 
                : "사용자 및 액세스 관리"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "english"
                ? "Add, edit, and remove users from your platform. Set permissions and manage access controls."
                : "플랫폼에서 사용자를 추가, 편집 및 제거합니다. 권한을 설정하고 액세스 제어를 관리하세요."}
            </p>
            <Button>
              {language === "english" ? "View" : "보기"}
            </Button>
          </CardContent>
        </AnimatedCard>
      </div>
    </>
  )
} 