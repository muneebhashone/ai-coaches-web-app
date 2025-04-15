"use client";

import { useState } from "react";
import { IconDashboard, IconLanguage } from "@tabler/icons-react";
import Link from "next/link";

import { AnimatedCard } from "@/components/ui/animated-card";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MetricDetailsDialog } from "@/components/dashboard/metric-details-dialog";
import { UserActivityChart } from "@/components/dashboard/user-activity-chart";
import { UserInsightsTable } from "@/components/dashboard/user-insights-table";
import { UserSegmentation } from "@/components/dashboard/user-segmentation";
import { ChatbotFeedback } from "@/components/dashboard/chatbot-feedback";
import { SessionRecommendations } from "@/components/dashboard/session-recommendations";

export default function DashboardPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english");

  // Sample feedback metrics data - would be replaced with real data in production
  const feedbackMetrics = [
    {
      id: "feedback-1",
      question:
        language === "english"
          ? "Action plan follow-through"
          : "실행 계획 이행",
      average: 4.2,
      responseRate: 85,
    },
    {
      id: "feedback-2",
      question:
        language === "english"
          ? "Emotional state improvement"
          : "감정 상태 개선",
      average: 3.8,
      responseRate: 78,
    },
    {
      id: "feedback-3",
      question:
        language === "english"
          ? "Goal progress satisfaction"
          : "목표 진행 만족도",
      average: 4.5,
      responseRate: 90,
    },
  ];

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
          onPressedChange={(pressed) =>
            setLanguage(pressed ? "korean" : "english")
          }
        >
          <IconLanguage className="h-4 w-4 mr-2" />
          {language === "english" ? "English" : "한국어"}
        </Toggle>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Link href="/users" className="block">
          <AnimatedCard className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
            <CardHeader className="pb-1">
              <CardTitle className="text-base font-medium">
                {language === "english" ? "Total Users" : "전체 사용자"}
              </CardTitle>
              <CardDescription className="text-3xl font-semibold pt-1">
                42
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {language === "english"
                  ? "+12% from last month"
                  : "지난 달 대비 +12%"}
              </div>
            </CardContent>
          </AnimatedCard>
        </Link>

        <MetricDetailsDialog
          title={
            language === "english" ? "Profile Completion" : "프로필 완성도"
          }
          value="85%"
          description={
            language === "english"
              ? "User profile collection statistics"
              : "사용자 프로필 수집 통계"
          }
          language={language}
          progressMetrics={{
            sessions: {
              label:
                language === "english"
                  ? "Profile completion rate"
                  : "프로필 완성률",
              value: 85,
              change: 15,
            },
            goals: {
              label:
                language === "english"
                  ? "Data quality score"
                  : "데이터 품질 점수",
              value: 92,
              change: 5,
            },
          }}
          feedbackMetrics={feedbackMetrics}
        >
          <AnimatedCard>
            <CardHeader className="pb-1">
              <CardTitle className="text-base font-medium">
                {language === "english"
                  ? "Profile Completion"
                  : "프로필 완성도"}
              </CardTitle>
              <CardDescription className="text-3xl font-semibold pt-1">
                85%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {language === "english"
                  ? "+15% from last month"
                  : "지난 달 대비 +15%"}
              </div>
            </CardContent>
          </AnimatedCard>
        </MetricDetailsDialog>

        <MetricDetailsDialog
          title={language === "english" ? "Goal Progress" : "목표 진행도"}
          value="72%"
          description={
            language === "english"
              ? "Combined progress metrics for sessions and goals"
              : "세션 및 목표에 대한 통합 진행 지표"
          }
          language={language}
          progressMetrics={{
            sessions: {
              label:
                language === "english"
                  ? "Session completion rate"
                  : "세션 완료율",
              value: 68,
              change: 8,
            },
            goals: {
              label:
                language === "english"
                  ? "Goal achievement rate"
                  : "목표 달성률",
              value: 75,
              change: 12,
            },
          }}
          feedbackMetrics={feedbackMetrics}
        >
          <AnimatedCard>
            <CardHeader className="pb-1">
              <CardTitle className="text-base font-medium">
                {language === "english" ? "Goal Progress" : "목표 진행도"}
              </CardTitle>
              <CardDescription className="text-3xl font-semibold pt-1">
                72%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {language === "english" ? "Combined progress" : "통합 진행도"}
              </div>
            </CardContent>
          </AnimatedCard>
        </MetricDetailsDialog>

        <MetricDetailsDialog
          title={language === "english" ? "Session Feedback" : "세션 피드백"}
          value="4.5"
          description={
            language === "english"
              ? "Post-session satisfaction scores and trends"
              : "세션 후 만족도 점수 및 동향"
          }
          language={language}
          progressMetrics={{
            sessions: {
              label:
                language === "english" ? "Average satisfaction" : "평균 만족도",
              value: 90,
              change: 5,
            },
            goals: {
              label: language === "english" ? "Response rate" : "응답률",
              value: 88,
              change: 10,
            },
          }}
          feedbackMetrics={feedbackMetrics}
        >
          <AnimatedCard>
            <CardHeader className="pb-1">
              <CardTitle className="text-base font-medium">
                {language === "english" ? "Session Feedback" : "세션 피드백"}
              </CardTitle>
              <CardDescription className="text-3xl font-semibold pt-1">
                4.5
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                {language === "english" ? "Out of 5.0" : "5.0 만점"}
              </div>
            </CardContent>
          </AnimatedCard>
        </MetricDetailsDialog>
      </div>

      {/* Added User Activity Chart */}
      <div className="mt-6">
        <UserActivityChart language={language} />
      </div>

      {/* Added User Insights Table */}
      <div className="mt-6">
        <UserInsightsTable language={language} />
      </div>

      {/* User Auto-Segmentation, Chatbot Feedback, and Session Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <UserSegmentation language={language} />
        <ChatbotFeedback language={language} />
        <SessionRecommendations language={language} />
      </div>

      <Separator className="my-6" />

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
                ? "Connect with other platforms"
                : "다른 플랫폼과 연결"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "english"
                ? "Connect your AI coach with third-party services and platforms to expand its capabilities and reach."
                : "AI 코치를 타사 서비스 및 플랫폼과 연결하여 기능과 범위를 확장하세요."}
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
  );
}
