"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  IconUserCircle,
  IconArrowLeft,
  IconLanguage,
  IconNotes,
  IconMessageCircle,
  IconChartLine,
  IconListCheck,
  IconFileText,
  IconMicrophone,
  IconCalendarEvent,
  IconSend,
  IconDownload,
  IconChevronDown,
  IconRobot,
  IconUser,
  IconMoodSmile,
  IconMoodSad,
  IconMoodNeutral,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedCard } from "@/components/ui/animated-card";
import { SessionSchedulerPanel } from "@/components/sessions/session-scheduler-panel";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

// Mock user data (would be fetched from API in a real application)
const MOCK_USERS = [
  {
    id: "1",
    name: "Sara Johnson",
    age: 32,
    occupation: "Marketing Manager",
    program: "Stress Reduction Program",
    status: "active",
    progress: 72,
    lastActivity: "2025-04-10T10:30:00",
    email: "sara.johnson@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2025-01-15",
    sessions: [
      {
        id: "s1",
        date: "2025-04-10T10:30:00",
        type: "human",
        title: "Initial Assessment",
        summary: "Discussed stress triggers and established baseline goals.",
        emotionalState: "anxious",
      },
      {
        id: "s2",
        date: "2025-04-03T14:45:00",
        type: "chatbot",
        title: "Daily Check-in",
        summary: "Reported improved sleep and reduced anxiety.",
        emotionalState: "calm",
      },
      {
        id: "s3",
        date: "2025-03-27T09:15:00",
        type: "human",
        title: "Progress Review",
        summary:
          "Reviewed mindfulness techniques and adjusted practice schedule.",
        emotionalState: "positive",
      },
    ],
    goals: [
      { id: "g1", title: "Reduce daily stress levels", progress: 65 },
      { id: "g2", title: "Improve sleep quality", progress: 80 },
      { id: "g3", title: "Practice mindfulness daily", progress: 50 },
    ],
    emotionalAnalysis: {
      weekly: {
        positive: 45,
        neutral: 30,
        negative: 25,
      },
      trend: "improving",
    },
    notes:
      "Sara has been making consistent progress. Focus on work-related stressors in upcoming sessions.",
    chatbotInstructions:
      "Ask about sleep quality daily. Remind about mindfulness practice in morning check-ins.",
    timezone: "America/New_York",
    scheduledSessions: {
      chatbot: {
        time: "08:00",
        days: ["Monday", "Wednesday", "Friday"],
        enabled: true,
      },
      human: {
        upcoming: [
          {
            date: "2025-04-17T15:00:00",
            title: "Weekly Progress Review",
          },
          {
            date: "2025-04-24T15:00:00",
            title: "Stress Management Techniques",
          },
        ],
      },
    },
  },
  // Other mock users...
];

// Function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id as string;
  const [language, setLanguage] = useState<"english" | "korean">("english");
  const [notes, setNotes] = useState("");
  const [chatbotInstructions, setChatbotInstructions] = useState("");
  const [expandedSessions, setExpandedSessions] = useState<string[]>([]);

  // Function to toggle session expansion
  const toggleSessionExpansion = (sessionId: string) => {
    setExpandedSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  // Find user by ID (in a real app, this would be fetched from API)
  const user = MOCK_USERS.find((u) => u.id === userId);

  // Set initial values for notes and instructions when user is loaded
  useEffect(() => {
    if (user) {
      setNotes(user.notes);
      setChatbotInstructions(user.chatbotInstructions);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <p>
          {language === "english"
            ? "User not found"
            : "사용자를 찾을 수 없습니다"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-7 w-7 rounded-full"
          >
            <Link href="/users">
              <IconArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <IconUserCircle className="h-5 w-5 page-heading-icon" />
          <h1 className="page-heading-text">{user.name}</h1>
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

      <Separator className="my-6" />

      {/* Current Program Banner */}
      <AnimatedCard className="mb-6 bg-primary/5 border-primary/20">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <IconChartLine className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-primary/70 font-medium">
                {language === "english" ? "Active Program" : "활성 프로그램"}
              </p>
              <h2 className="text-lg font-medium text-primary">
                {user.program}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {language === "english" ? "Progress" : "진행도"}
              </p>
              <p className="font-medium">{user.progress}%</p>
            </div>
            <Progress value={user.progress} className="h-2 w-24" />
            <Button variant="outline" size="sm" className="ml-2">
              {language === "english" ? "View Details" : "세부 정보 보기"}
            </Button>
          </div>
        </div>
      </AnimatedCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* User Info Card */}
        <AnimatedCard>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>
                {language === "english" ? "User Information" : "사용자 정보"}
              </CardTitle>
              <Badge
                variant={user.status === "active" ? "default" : "secondary"}
                className="px-2 py-1"
              >
                {user.status === "active"
                  ? language === "english"
                    ? "Active"
                    : "활성"
                  : language === "english"
                  ? "Inactive"
                  : "비활성"}
              </Badge>
            </div>
            <CardDescription>
              {language === "english"
                ? "Personal & Contact Details"
                : "개인 및 연락처 정보"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-2 rounded-md bg-muted/30">
                <div className="bg-primary/10 p-2 rounded-full">
                  <IconUser className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {language === "english"
                      ? "Name & Occupation"
                      : "이름 및 직업"}
                  </p>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.occupation}, {user.age}{" "}
                    {language === "english" ? "years old" : "세"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded-md p-2">
                  <p className="text-xs text-muted-foreground">
                    {language === "english" ? "Email" : "이메일"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <IconMessageCircle className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-sm font-medium truncate">{user.email}</p>
                  </div>
                </div>
                <div className="border rounded-md p-2">
                  <p className="text-xs text-muted-foreground">
                    {language === "english" ? "Phone" : "전화번호"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <IconMicrophone className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-sm font-medium">{user.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-3 mt-1">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {language === "english" ? "Member Since" : "가입일"}
                  </p>
                  <p className="text-sm font-medium">
                    {formatDate(user.joinDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground text-right">
                    {language === "english" ? "Timezone" : "시간대"}
                  </p>
                  <div className="flex items-center gap-1">
                    <IconCalendarEvent className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      {user.timezone.replace("_", " ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Goal Progress Card */}
        <AnimatedCard>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>
                {language === "english" ? "Goal Progress" : "목표 진행도"}
              </CardTitle>
              <Badge variant="outline" className="px-2 py-0.5">
                {language === "english" ? "3 Goals" : "3개 목표"}
              </Badge>
            </div>
            <CardDescription>
              {language === "english"
                ? "Personal development objectives"
                : "개인 발전 목표"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.goals.map((goal, index) => {
                // Determine status and color based on progress
                const getStatusInfo = (progress: number) => {
                  if (progress < 30)
                    return {
                      status: language === "english" ? "At Risk" : "위험",
                      color: "text-destructive",
                      bgColor: "bg-destructive/10",
                    };
                  if (progress < 70)
                    return {
                      status:
                        language === "english" ? "In Progress" : "진행 중",
                      color: "text-amber-500",
                      bgColor: "bg-amber-100/50",
                    };
                  return {
                    status: language === "english" ? "On Track" : "정상",
                    color: "text-green-600",
                    bgColor: "bg-green-100/50",
                  };
                };

                const { status, color, bgColor } = getStatusInfo(goal.progress);

                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${bgColor}`}
                        >
                          <span className="text-xs font-medium">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          {goal.title}
                        </span>
                      </div>
                      <span className={`text-sm font-medium ${color}`}>
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="relative">
                      <Progress
                        value={goal.progress}
                        className={`h-2 ${
                          goal.progress < 30
                            ? "bg-destructive/20"
                            : goal.progress < 70
                            ? "bg-amber-100"
                            : "bg-green-100"
                        }`}
                      />
                      <span
                        className={`absolute right-0 -bottom-4 text-xs ${color}`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-3 border-t flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">
                  {language === "english"
                    ? "Overall Completion"
                    : "전체 완료율"}
                </p>
                <p className="text-sm font-medium">{user.progress}%</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs h-8">
                <IconListCheck className="h-3.5 w-3.5 mr-1" />
                {language === "english" ? "Manage Goals" : "목표 관리"}
              </Button>
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Last Session Card */}
        <AnimatedCard>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>
                {language === "english" ? "Last Session" : "마지막 세션"}
              </CardTitle>
              {user.sessions.length > 0 && (
                <div className="flex items-center gap-1">
                  <IconCalendarEvent className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {formatDate(user.sessions[0].date)}
                  </span>
                </div>
              )}
            </div>
            <CardDescription>
              {language === "english"
                ? "Most recent coaching interaction"
                : "가장 최근 코칭 상호작용"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.sessions.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      user.sessions[0].type === "human"
                        ? "bg-blue-100"
                        : "bg-purple-100"
                    }`}
                  >
                    {user.sessions[0].type === "human" ? (
                      <IconUser
                        className={`h-5 w-5 ${
                          user.sessions[0].type === "human"
                            ? "text-blue-600"
                            : "text-purple-600"
                        }`}
                      />
                    ) : (
                      <IconRobot
                        className={`h-5 w-5 ${
                          user.sessions[0].type === "human"
                            ? "text-blue-600"
                            : "text-purple-600"
                        }`}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{user.sessions[0].title}</h3>
                    <Badge variant="outline" className="mt-1">
                      {user.sessions[0].type === "human"
                        ? language === "english"
                          ? "Human Coach"
                          : "인간 코치"
                        : language === "english"
                        ? "Chatbot"
                        : "챗봇"}
                    </Badge>
                  </div>
                </div>

                <div className="bg-muted/30 p-3 rounded-md border border-muted mt-2">
                  <div className="flex items-start gap-2 mb-2">
                    <div
                      className={`mt-0.5 p-1 rounded-full ${
                        user.sessions[0].emotionalState === "anxious"
                          ? "bg-red-100"
                          : user.sessions[0].emotionalState === "calm"
                          ? "bg-green-100"
                          : "bg-blue-100"
                      }`}
                    >
                      {user.sessions[0].emotionalState === "anxious" ? (
                        <IconMoodSad className="h-3 w-3 text-red-500" />
                      ) : user.sessions[0].emotionalState === "calm" ? (
                        <IconMoodNeutral className="h-3 w-3 text-green-500" />
                      ) : (
                        <IconMoodSmile className="h-3 w-3 text-blue-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Emotional State: "
                        : "감정 상태: "}
                      <span className="font-medium">
                        {user.sessions[0].emotionalState === "anxious"
                          ? language === "english"
                            ? "Anxious"
                            : "불안"
                          : user.sessions[0].emotionalState === "calm"
                          ? language === "english"
                            ? "Calm"
                            : "평온"
                          : language === "english"
                          ? "Positive"
                          : "긍정적"}
                      </span>
                    </p>
                  </div>
                  <p className="text-sm">{user.sessions[0].summary}</p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8 px-2"
                  >
                    <IconFileText className="h-3.5 w-3.5 mr-1" />
                    {language === "english"
                      ? "View Full Notes"
                      : "전체 노트 보기"}
                  </Button>
                  <Link
                    href={`/sessions/${user.sessions[0].id}`}
                    className="text-xs text-primary hover:underline flex items-center"
                  >
                    {language === "english"
                      ? "Session Details"
                      : "세션 세부 정보"}
                    <IconArrowLeft className="h-3.5 w-3.5 ml-1 rotate-180" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="bg-muted/30 p-3 rounded-full mb-2">
                  <IconCalendarEvent className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "english"
                    ? "No sessions recorded yet"
                    : "아직 기록된 세션이 없습니다"}
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  {language === "english"
                    ? "Schedule First Session"
                    : "첫 세션 예약"}
                </Button>
              </div>
            )}
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="sessions" className="mt-6">
        <TabsList>
          <TabsTrigger value="sessions">
            <IconMessageCircle className="h-4 w-4 mr-2" />
            {language === "english" ? "Sessions" : "세션"}
          </TabsTrigger>
          <TabsTrigger value="scheduling">
            <IconCalendarEvent className="h-4 w-4 mr-2" />
            {language === "english" ? "Scheduling" : "일정"}
          </TabsTrigger>
          <TabsTrigger value="progress">
            <IconChartLine className="h-4 w-4 mr-2" />
            {language === "english" ? "Progress" : "진행도"}
          </TabsTrigger>
          <TabsTrigger value="notes">
            <IconNotes className="h-4 w-4 mr-2" />
            {language === "english" ? "Notes" : "노트"}
          </TabsTrigger>
          <TabsTrigger value="chatbot">
            <IconListCheck className="h-4 w-4 mr-2" />
            {language === "english" ? "Chatbot Instructions" : "챗봇 지시사항"}
          </TabsTrigger>
        </TabsList>

        {/* Sessions Tab */}
        <TabsContent value="sessions" className="mt-4">
          <div className="grid grid-cols-1 gap-6">
            {/* Session Type Filter */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">
                {language === "english" ? "Filter by:" : "필터:"}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => {
                  console.log("Filter by all sessions");
                }}
              >
                <IconMessageCircle className="h-4 w-4" />
                {language === "english" ? "All" : "전체"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => {
                  console.log("Filter by human sessions");
                }}
              >
                <IconUser className="h-4 w-4" />
                {language === "english" ? "Human" : "인간 코치"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => {
                  console.log("Filter by AI sessions");
                }}
              >
                <IconRobot className="h-4 w-4" />
                {language === "english" ? "AI" : "챗봇"}
              </Button>
            </div>

            {/* Session Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <AnimatedCard>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    {language === "english" ? "Weekly Summary" : "주간 요약"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <p className="mb-2">
                      {language === "english"
                        ? "Sessions completed this week: 3/5"
                        : "이번 주 완료된 세션: 3/5"}
                    </p>
                    <p className="mb-2">
                      {language === "english"
                        ? "Average engagement score: 8.5/10"
                        : "평균 참여 점수: 8.5/10"}
                    </p>
                    <p>
                      {language === "english"
                        ? "Mood trend: Improving"
                        : "기분 추세: 개선 중"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 flex items-center gap-1"
                    onClick={() => {
                      console.log("Generate weekly report");
                    }}
                  >
                    <IconDownload className="h-4 w-4" />
                    {language === "english"
                      ? "Generate Weekly Report"
                      : "주간 보고서 생성"}
                  </Button>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    {language === "english" ? "Overall Summary" : "전체 요약"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <p className="mb-2">
                      {language === "english"
                        ? `Total sessions: ${user.sessions.length}`
                        : `총 세션: ${user.sessions.length}`}
                    </p>
                    <p className="mb-2">
                      {language === "english"
                        ? `Program completion: ${user.progress}%`
                        : `프로그램 완료: ${user.progress}%`}
                    </p>
                    <p>
                      {language === "english"
                        ? "Overall engagement: High"
                        : "전체 참여도: 높음"}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 flex items-center gap-1"
                    onClick={() => {
                      console.log("Generate final report");
                    }}
                  >
                    <IconDownload className="h-4 w-4" />
                    {language === "english"
                      ? "Generate Final Report"
                      : "최종 보고서 생성"}
                  </Button>
                </CardContent>
              </AnimatedCard>
            </div>

            {/* Emotional Analysis Card */}
            <AnimatedCard className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle>
                  {language === "english" ? "Emotional Analysis" : "감정 분석"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-2">
                      <IconMoodSmile className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="text-sm font-medium">
                      {language === "english" ? "Positive" : "긍정적"}
                    </p>
                    <p className="text-2xl font-bold">
                      {user.emotionalAnalysis.weekly.positive}%
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-2">
                      <IconMoodNeutral className="h-8 w-8 text-gray-500" />
                    </div>
                    <p className="text-sm font-medium">
                      {language === "english" ? "Neutral" : "중립적"}
                    </p>
                    <p className="text-2xl font-bold">
                      {user.emotionalAnalysis.weekly.neutral}%
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-2">
                      <IconMoodSad className="h-8 w-8 text-red-500" />
                    </div>
                    <p className="text-sm font-medium">
                      {language === "english" ? "Negative" : "부정적"}
                    </p>
                    <p className="text-2xl font-bold">
                      {user.emotionalAnalysis.weekly.negative}%
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Badge
                    variant={
                      user.emotionalAnalysis.trend === "improving"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {language === "english"
                      ? user.emotionalAnalysis.trend === "improving"
                        ? "Improving"
                        : "Declining"
                      : user.emotionalAnalysis.trend === "improving"
                      ? "개선 중"
                      : "악화 중"}
                  </Badge>
                </div>
              </CardContent>
            </AnimatedCard>

            {/* Manual Message Sender */}
            <AnimatedCard className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle>
                  {language === "english" ? "Send Message" : "메시지 보내기"}
                </CardTitle>
                <CardDescription>
                  {language === "english"
                    ? "Send a direct message to this user"
                    : "이 사용자에게 직접 메시지 보내기"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={
                    language === "english"
                      ? "Type your message here..."
                      : "여기에 메시지를 입력하세요..."
                  }
                  className="min-h-[100px] mb-4"
                />
                <Button className="flex items-center gap-1">
                  <IconSend className="h-4 w-4" />
                  {language === "english" ? "Send Message" : "메시지 보내기"}
                </Button>
              </CardContent>
            </AnimatedCard>

            {/* Expandable Session Cards */}
            <AnimatedCard>
              <CardHeader>
                <CardTitle>
                  {language === "english" ? "Session History" : "세션 기록"}
                </CardTitle>
                <CardDescription>
                  {language === "english"
                    ? "View all sessions for this user"
                    : "이 사용자의 모든 세션 보기"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.sessions.map((session) => (
                    <div
                      key={session.id}
                      className="border rounded-md overflow-hidden"
                    >
                      <button
                        type="button"
                        className="flex items-center w-full justify-between p-3 bg-muted/30 cursor-pointer"
                        onClick={() => toggleSessionExpansion(session.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleSessionExpansion(session.id);
                          }
                        }}
                        tabIndex={0}
                        aria-expanded={expandedSessions.includes(session.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                            {session.type === "human" ? (
                              <IconUser className="h-4 w-4 text-primary" />
                            ) : (
                              <IconRobot className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{session.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {session.type === "human"
                                  ? language === "english"
                                    ? "Human Coach"
                                    : "인간 코치"
                                  : language === "english"
                                  ? "Chatbot"
                                  : "챗봇"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(session.date)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <IconChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform ${
                            expandedSessions.includes(session.id)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      {/* Session Details (conditionally shown based on expanded state) */}
                      {expandedSessions.includes(session.id) && (
                        <div className="p-3 border-t">
                          <p className="text-sm mb-4">{session.summary}</p>
                          <div className="flex items-center gap-2 mb-4">
                            <Badge variant="outline" className="text-xs">
                              {language === "english"
                                ? "Emotional State"
                                : "감정 상태"}
                              :
                              {session.emotionalState === "anxious"
                                ? language === "english"
                                  ? " Anxious"
                                  : " 불안"
                                : session.emotionalState === "calm"
                                ? language === "english"
                                  ? " Calm"
                                  : " 평온"
                                : language === "english"
                                ? " Positive"
                                : " 긍정적"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/sessions/${session.id}?language=${language}`}
                              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                            >
                              <IconFileText className="h-4 w-4" />
                              {language === "english"
                                ? "View logs"
                                : "로그 보기"}
                            </Link>
                            {session.type === "human" && (
                              <label className="cursor-pointer text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                                <IconMicrophone className="h-4 w-4" />
                                {language === "english"
                                  ? "Upload audio"
                                  : "오디오 업로드"}
                                <input
                                  type="file"
                                  accept="audio/*"
                                  className="hidden"
                                  onChange={(event) => {
                                    console.log(
                                      `Uploading audio for session ${session.id}:`,
                                      event.target.files?.[0]
                                    );
                                  }}
                                />
                              </label>
                            )}
                            {session.type === "chatbot" && (
                              <button
                                type="button"
                                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                                onClick={() => {
                                  console.log(
                                    `View chatbot reaction for session ${session.id}`
                                  );
                                }}
                              >
                                <IconRobot className="h-4 w-4" />
                                {language === "english"
                                  ? "Chatbot reaction"
                                  : "챗봇 반응"}
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </AnimatedCard>
          </div>
        </TabsContent>

        {/* Scheduling Tab */}
        <TabsContent value="scheduling" className="mt-4">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Session Scheduling" : "세션 일정"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Manage chatbot check-ins and human coaching sessions"
                  : "챗봇 체크인 및 인간 코칭 세션 일정 관리"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SessionSchedulerPanel
                language={language}
                timezone={user.timezone}
                chatbotSchedule={user.scheduledSessions.chatbot}
                upcomingSessions={user.scheduledSessions.human.upcoming.map(
                  (session, index) => ({
                    id: `upcoming-${index}`,
                    date: session.date,
                    title: session.title,
                  })
                )}
                onChatbotScheduleChange={(schedule) => {
                  console.log("Chatbot schedule updated:", schedule);
                  // In a real app, this would update the user's data
                }}
                onAddHumanSession={(session) => {
                  console.log("Human session added:", session);
                  // In a real app, this would add to the user's upcoming sessions
                }}
                onRemoveHumanSession={(sessionId) => {
                  console.log("Human session removed:", sessionId);
                  // In a real app, this would remove from the user's upcoming sessions
                }}
              />
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Goal Progress Card */}
            <AnimatedCard>
              <CardHeader>
                <CardTitle>
                  {language === "english" ? "Goal Progress" : "목표 진행도"}
                </CardTitle>
                <CardDescription>
                  {language === "english"
                    ? "Track individual goal achievement"
                    : "개별 목표 달성 추적"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.goals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {goal.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              goal.progress < 30
                                ? "destructive"
                                : goal.progress < 70
                                ? "outline"
                                : "default"
                            }
                            className="text-xs"
                          >
                            {goal.progress < 30
                              ? language === "english"
                                ? "At Risk"
                                : "위험"
                              : goal.progress < 70
                              ? language === "english"
                                ? "In Progress"
                                : "진행 중"
                              : language === "english"
                              ? "On Track"
                              : "정상"}
                          </Badge>
                          <span className="text-sm">{goal.progress}%</span>
                        </div>
                      </div>
                      <Progress
                        value={goal.progress}
                        className={`h-2 ${
                          goal.progress < 30
                            ? "bg-destructive/20"
                            : goal.progress < 70
                            ? "bg-amber-100"
                            : "bg-green-100"
                        }`}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {language === "english"
                          ? `Estimated completion: ${formatDate(
                              new Date(
                                Date.now() +
                                  (100 - goal.progress) * 24 * 60 * 60 * 1000
                              ).toISOString()
                            )}`
                          : `예상 완료일: ${formatDate(
                              new Date(
                                Date.now() +
                                  (100 - goal.progress) * 24 * 60 * 60 * 1000
                              ).toISOString()
                            )}`}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </AnimatedCard>

            {/* Progress Comparison Card */}
            <AnimatedCard>
              <CardHeader>
                <CardTitle>
                  {language === "english" ? "Progress Comparison" : "진행 비교"}
                </CardTitle>
                <CardDescription>
                  {language === "english"
                    ? "Compare with program averages"
                    : "프로그램 평균과 비교"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-medium">
                        {language === "english" ? "Your Progress" : "내 진행도"}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {language === "english"
                          ? `${user.progress}% complete`
                          : `${user.progress}% 완료`}
                      </p>
                    </div>
                    <div className="text-right">
                      <h4 className="text-sm font-medium">
                        {language === "english"
                          ? "Program Average"
                          : "프로그램 평균"}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {language === "english" ? "65% complete" : "65% 완료"}
                      </p>
                    </div>
                  </div>
                  <div className="relative pt-2">
                    <Progress
                      value={user.progress}
                      className="h-2 bg-primary/10"
                    />
                    <div
                      className="absolute top-0 left-[65%] w-px h-6 bg-muted-foreground"
                      style={{ marginTop: "2px" }}
                    >
                      <div className="absolute top-6 left-0 transform -translate-x-1/2 text-xs text-muted-foreground">
                        {language === "english" ? "Avg" : "평균"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-sm font-medium mb-2">
                      {language === "english"
                        ? "Engagement Metrics"
                        : "참여 지표"}
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="border rounded-md p-3 text-center">
                        <p className="text-2xl font-bold">92%</p>
                        <p className="text-xs text-muted-foreground">
                          {language === "english"
                            ? "Session Attendance"
                            : "세션 출석"}
                        </p>
                      </div>
                      <div className="border rounded-md p-3 text-center">
                        <p className="text-2xl font-bold">8.5</p>
                        <p className="text-xs text-muted-foreground">
                          {language === "english"
                            ? "Engagement Score"
                            : "참여 점수"}
                        </p>
                      </div>
                      <div className="border rounded-md p-3 text-center">
                        <p className="text-2xl font-bold">4.2</p>
                        <p className="text-xs text-muted-foreground">
                          {language === "english"
                            ? "Weekly Check-ins"
                            : "주간 체크인"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>

            {/* Progress Over Time Card */}
            <AnimatedCard className="md:col-span-2">
              <CardHeader>
                <CardTitle>
                  {language === "english"
                    ? "Progress Over Time"
                    : "시간에 따른 진행도"}
                </CardTitle>
                <CardDescription>
                  {language === "english"
                    ? "Track progress trends over the program duration"
                    : "프로그램 기간 동안의 진행 추세 추적"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    {language === "english"
                      ? "Progress chart visualization would appear here"
                      : "진행 차트 시각화가 여기에 표시됩니다"}
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">
                      {language === "english" ? "Current Pace" : "현재 속도"}
                    </h4>
                    <Badge variant="outline">
                      {language === "english"
                        ? "Ahead of Schedule"
                        : "일정보다 앞섬"}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {language === "english"
                        ? "7% ahead of expected progress"
                        : "예상 진행도보다 7% 앞섬"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">
                      {language === "english"
                        ? "Estimated Completion"
                        : "예상 완료"}
                    </h4>
                    <p className="text-sm">
                      {formatDate(new Date("2025-06-15").toISOString())}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {language === "english"
                        ? "2 weeks ahead of schedule"
                        : "일정보다 2주 앞섬"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">
                      {language === "english" ? "Recent Trend" : "최근 추세"}
                    </h4>
                    <Badge variant="default">
                      {language === "english" ? "Improving" : "개선 중"}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {language === "english"
                        ? "Accelerated progress in last 2 weeks"
                        : "지난 2주간 진행 속도 가속화"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </AnimatedCard>
          </div>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>
                    {language === "english" ? "Coach Notes" : "코치 노트"}
                  </CardTitle>
                  <CardDescription>
                    {language === "english"
                      ? "Private notes about this user"
                      : "이 사용자에 대한 비공개 노트"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Button variant="outline" size="sm">
                      {language === "english" ? "Behavioral" : "행동"}
                    </Button>
                    <Button variant="outline" size="sm">
                      {language === "english" ? "Progress" : "진행"}
                    </Button>
                    <Button variant="outline" size="sm">
                      {language === "english" ? "Concerns" : "우려사항"}
                    </Button>
                    <Button variant="outline" size="sm">
                      {language === "english" ? "Action Items" : "조치 항목"}
                    </Button>
                  </div>
                  <Textarea
                    placeholder={
                      language === "english"
                        ? "Add notes about this user..."
                        : "이 사용자에 대한 노트 추가..."
                    }
                    className="min-h-[200px]"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        {language === "english"
                          ? "Use Template"
                          : "템플릿 사용"}
                      </Button>
                      <Button variant="outline" size="sm">
                        {language === "english" ? "Add Date" : "날짜 추가"}
                      </Button>
                    </div>
                    <Button>
                      {language === "english" ? "Save Notes" : "노트 저장"}
                    </Button>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>

            <div>
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>
                    {language === "english" ? "Notes History" : "노트 기록"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-[400px] overflow-y-auto">
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">
                          {language === "english" ? "Progress" : "진행"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(new Date("2025-04-10").toISOString())}
                        </span>
                      </div>
                      <p className="text-sm">
                        {language === "english"
                          ? "Showing good progress with mindfulness exercises. Sleep quality improved by 30% according to self-reports."
                          : "마음 챙김 운동으로 좋은 진전을 보이고 있습니다. 자가 보고에 따르면 수면의 질이 30% 향상되었습니다."}
                      </p>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">
                          {language === "english" ? "Behavioral" : "행동"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(new Date("2025-04-03").toISOString())}
                        </span>
                      </div>
                      <p className="text-sm">
                        {language === "english"
                          ? "Noticed increased engagement in group sessions. More willing to share experiences with others."
                          : "그룹 세션에서 참여도가 증가한 것을 확인했습니다. 다른 사람들과 경험을 공유하는 데 더 적극적입니다."}
                      </p>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">
                          {language === "english" ? "Concerns" : "우려사항"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(new Date("2025-03-27").toISOString())}
                        </span>
                      </div>
                      <p className="text-sm">
                        {language === "english"
                          ? "Still struggling with work-related stressors. Consider focusing more on workplace coping strategies."
                          : "여전히 직장 관련 스트레스 요인으로 어려움을 겪고 있습니다. 직장 대처 전략에 더 집중하는 것을 고려하세요."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>
          </div>
        </TabsContent>

        {/* Chatbot Instructions Tab */}
        <TabsContent value="chatbot" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>
                    {language === "english"
                      ? "Chatbot Instructions"
                      : "챗봇 지시사항"}
                  </CardTitle>
                  <CardDescription>
                    {language === "english"
                      ? "Customize the chatbot behavior for this user"
                      : "이 사용자를 위한 챗봇 동작 사용자 지정"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Button variant="outline" size="sm">
                      {language === "english" ? "Check-ins" : "체크인"}
                    </Button>
                    <Button variant="outline" size="sm">
                      {language === "english" ? "Reminders" : "알림"}
                    </Button>
                    <Button variant="outline" size="sm">
                      {language === "english" ? "Exercises" : "운동"}
                    </Button>
                    <Button variant="outline" size="sm">
                      {language === "english" ? "Tone" : "어조"}
                    </Button>
                  </div>
                  <Textarea
                    placeholder={
                      language === "english"
                        ? "Add instructions for the chatbot..."
                        : "챗봇에 대한 지시사항 추가..."
                    }
                    className="min-h-[200px]"
                    value={chatbotInstructions}
                    onChange={(e) => setChatbotInstructions(e.target.value)}
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        {language === "english"
                          ? "Use Template"
                          : "템플릿 사용"}
                      </Button>
                      <Button variant="outline" size="sm">
                        {language === "english"
                          ? "Test Instructions"
                          : "지시사항 테스트"}
                      </Button>
                    </div>
                    <Button>
                      {language === "english"
                        ? "Save Instructions"
                        : "지시사항 저장"}
                    </Button>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>

            <div>
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>
                    {language === "english"
                      ? "Instruction Templates"
                      : "지시사항 템플릿"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="max-h-[400px] overflow-y-auto">
                  <div className="space-y-4">
                    <div className="border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                      <h3 className="text-sm font-medium mb-1">
                        {language === "english"
                          ? "Sleep Quality Focus"
                          : "수면 품질 중점"}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {language === "english"
                          ? "Emphasizes sleep tracking and improvement"
                          : "수면 추적 및 개선에 중점을 둡니다"}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {language === "english" ? "Popular" : "인기"}
                      </Badge>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                      <h3 className="text-sm font-medium mb-1">
                        {language === "english"
                          ? "Stress Management"
                          : "스트레스 관리"}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {language === "english"
                          ? "Focuses on identifying and reducing stress triggers"
                          : "스트레스 유발 요인 식별 및 감소에 중점을 둡니다"}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {language === "english" ? "Recommended" : "추천"}
                      </Badge>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                      <h3 className="text-sm font-medium mb-1">
                        {language === "english"
                          ? "Mindfulness Practice"
                          : "마음 챙김 연습"}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {language === "english"
                          ? "Regular reminders for mindfulness exercises"
                          : "마음 챙김 운동을 위한 정기적인 알림"}
                      </p>
                    </div>
                    <div className="border rounded-md p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                      <h3 className="text-sm font-medium mb-1">
                        {language === "english"
                          ? "Supportive Tone"
                          : "지원적인 어조"}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {language === "english"
                          ? "Uses encouraging and positive language"
                          : "격려하고 긍정적인 언어 사용"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              <AnimatedCard className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle>
                    {language === "english"
                      ? "Instruction Tips"
                      : "지시사항 팁"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium">
                        {language === "english"
                          ? "Be Specific"
                          : "구체적으로 작성하세요"}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {language === "english"
                          ? "Clear, detailed instructions get better results"
                          : "명확하고 상세한 지시사항이 더 나은 결과를 얻습니다"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">
                        {language === "english"
                          ? "Include Examples"
                          : "예시를 포함하세요"}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {language === "english"
                          ? "Show the chatbot exactly how to respond"
                          : "챗봇에게 정확히 어떻게 응답해야 하는지 보여주세요"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">
                        {language === "english"
                          ? "Consider Context"
                          : "맥락을 고려하세요"}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {language === "english"
                          ? "Tailor instructions to user's specific needs"
                          : "사용자의 특정 요구에 맞게 지시사항을 조정하세요"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
