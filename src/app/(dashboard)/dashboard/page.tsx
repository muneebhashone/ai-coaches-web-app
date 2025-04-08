"use client"

import { useState } from "react"
import { IconDashboard, IconLanguage } from "@tabler/icons-react"
import Link from "next/link"

import { AnimatedCard } from "@/components/ui/animated-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { MetricDetailsDialog } from "@/components/dashboard/metric-details-dialog"

export default function DashboardPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english")

  return (
    <>
      <div className="flex items-center gap-2">
        <IconDashboard className="h-5 w-5 page-heading-icon" />
        <h1 className="page-heading-text">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricDetailsDialog
          title={language === "english" ? "Total Users" : "전체 사용자"}
          value={42}
          description={language === "english" ? "Detailed user statistics and demographics" : "상세 사용자 통계 및 인구 통계"}
          language={language}
          progressMetrics={{
            sessions: {
              label: language === "english" ? "Active users this week" : "이번 주 활성 사용자",
              value: 75,
              change: 12
            },
            goals: {
              label: language === "english" ? "User retention rate" : "사용자 유지율",
              value: 82,
              change: 8
            }
          }}
        >
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
        </MetricDetailsDialog>

        <MetricDetailsDialog
          title={language === "english" ? "Active Sessions" : "활성 세션"}
          value={18}
          description={language === "english" ? "Current active session details and engagement metrics" : "현재 활성 세션 세부 정보 및 참여 지표"}
          language={language}
          progressMetrics={{
            sessions: {
              label: language === "english" ? "Session completion rate" : "세션 완료율",
              value: 68,
              change: 5
            },
            goals: {
              label: language === "english" ? "Goal achievement rate" : "목표 달성률",
              value: 72,
              change: 15
            }
          }}
        >
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
        </MetricDetailsDialog>

        <MetricDetailsDialog
          title={language === "english" ? "Completed Sessions" : "완료된 세션"}
          value={156}
          description={language === "english" ? "Historical session data and completion analytics" : "과거 세션 데이터 및 완료 분석"}
          language={language}
          progressMetrics={{
            sessions: {
              label: language === "english" ? "Average session duration" : "평균 세션 시간",
              value: 85,
              change: 24
            },
            goals: {
              label: language === "english" ? "Success rate" : "성공률",
              value: 78,
              change: 10
            }
          }}
        >
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
        </MetricDetailsDialog>

        <MetricDetailsDialog
          title={language === "english" ? "Average Progress" : "평균 진행률"}
          value="68%"
          description={language === "english" ? "Overall progress metrics and goal achievement statistics" : "전체 진행 지표 및 목표 달성 통계"}
          language={language}
          progressMetrics={{
            sessions: {
              label: language === "english" ? "Session progress rate" : "세션 진행률",
              value: 68,
              change: 8
            },
            goals: {
              label: language === "english" ? "Goal completion rate" : "목표 완료율",
              value: 75,
              change: 12
            }
          }}
        >
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
        </MetricDetailsDialog>
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
            <Button asChild>
              <Link href="/chatbot">
                {language === "english" ? "View" : "보기"}
              </Link>
            </Button>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard>
          <CardHeader>
            <CardTitle>
              {language === "english" ? "Sessions" : "세션"}
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
            <Button asChild>
              <Link href="/sessions">
                {language === "english" ? "View" : "보기"}
              </Link>
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
            <Button asChild>
              <Link href="/knowledge-base">
                {language === "english" ? "View" : "보기"}
              </Link>
            </Button>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard>
          <CardHeader>
            <CardTitle>
              {language === "english" ? "Integrations" : "통합"}
            </CardTitle>
            <CardDescription>
              {language === "english"
                ? "Manage external connections"
                : "외부 연결 관리"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "english"
                ? "Connect your AI coach with external tools and services. Set up data sources and manage API integrations."
                : "AI 코치를 외부 도구 및 서비스와 연결하세요. 데이터 소스를 설정하고 API 통합을 관리하세요."}
            </p>
            <Button asChild>
              <Link href="/integrations">
                {language === "english" ? "View" : "보기"}
              </Link>
            </Button>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard>
          <CardHeader>
            <CardTitle>
              {language === "english" ? "Settings" : "설정"}
            </CardTitle>
            <CardDescription>
              {language === "english"
                ? "Configure platform settings"
                : "플랫폼 설정 구성"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "english"
                ? "Customize your AI coaching platform settings, manage preferences, and configure system options."
                : "AI 코칭 플랫폼 설정을 사용자 지정하고, 환경 설정을 관리하고, 시스템 옵션을 구성하세요."}
            </p>
            <Button asChild>
              <Link href="/settings">
                {language === "english" ? "View" : "보기"}
              </Link>
            </Button>
          </CardContent>
        </AnimatedCard>
      </div>
    </>
  )
}