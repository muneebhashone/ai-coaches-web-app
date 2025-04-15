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
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedCard } from "@/components/ui/animated-card";
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
    program: "Stress Reduction Program",
    status: "active",
    progress: 72,
    lastActivity: "2025-04-10T10:30:00",
    alerts: 0,
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
      },
      {
        id: "s2",
        date: "2025-04-03T14:45:00",
        type: "chatbot",
        title: "Daily Check-in",
        summary: "Reported improved sleep and reduced anxiety.",
      },
      {
        id: "s3",
        date: "2025-03-27T09:15:00",
        type: "human",
        title: "Progress Review",
        summary:
          "Reviewed mindfulness techniques and adjusted practice schedule.",
      },
    ],
    goals: [
      { id: "g1", title: "Reduce daily stress levels", progress: 65 },
      { id: "g2", title: "Improve sleep quality", progress: 80 },
      { id: "g3", title: "Practice mindfulness daily", progress: 50 },
    ],
    notes:
      "Sara has been making consistent progress. Focus on work-related stressors in upcoming sessions.",
    chatbotInstructions:
      "Ask about sleep quality daily. Remind about mindfulness practice in morning check-ins.",
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
          <CardHeader>
            <CardTitle>
              {language === "english" ? "User Information" : "사용자 정보"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === "english" ? "Email" : "이메일"}
                </span>
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === "english" ? "Phone" : "전화번호"}
                </span>
                <span className="text-sm font-medium">{user.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === "english" ? "Join Date" : "가입일"}
                </span>
                <span className="text-sm font-medium">
                  {formatDate(user.joinDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  {language === "english" ? "Status" : "상태"}
                </span>
                <Badge
                  variant={user.status === "active" ? "default" : "secondary"}
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
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Goal Progress Card */}
        <AnimatedCard>
          <CardHeader>
            <CardTitle>
              {language === "english" ? "Goal Progress" : "목표 진행도"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.goals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{goal.title}</span>
                    <span className="text-sm">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </AnimatedCard>

        {/* Last Session Card */}
        <AnimatedCard>
          <CardHeader>
            <CardTitle>
              {language === "english" ? "Last Session" : "마지막 세션"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.sessions.length > 0 ? (
              <div className="space-y-2">
                <h3 className="font-medium">{user.sessions[0].title}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {user.sessions[0].type === "human"
                      ? language === "english"
                        ? "Human Coach"
                        : "인간 코치"
                      : language === "english"
                      ? "Chatbot"
                      : "챗봇"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(user.sessions[0].date)}
                  </span>
                </div>
                <p className="text-sm mt-2">{user.sessions[0].summary}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {language === "english"
                  ? "No sessions yet"
                  : "아직 세션이 없습니다"}
              </p>
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
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-medium">
                        {language === "english" ? "Session" : "세션"}
                      </th>
                      <th className="p-3 text-left font-medium">
                        {language === "english" ? "Date" : "날짜"}
                      </th>
                      <th className="p-3 text-left font-medium">
                        {language === "english" ? "Type" : "유형"}
                      </th>
                      <th className="p-3 text-left font-medium">
                        {language === "english" ? "Summary" : "요약"}
                      </th>
                      <th className="p-3 text-left font-medium">
                        {language === "english" ? "Actions" : "작업"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.sessions.map((session) => (
                      <tr key={session.id} className="border-b">
                        <td className="p-3 font-medium">{session.title}</td>
                        <td className="p-3">{formatDate(session.date)}</td>
                        <td className="p-3">
                          <Badge variant="outline">
                            {session.type === "human"
                              ? language === "english"
                                ? "Human Coach"
                                : "인간 코치"
                              : language === "english"
                              ? "Chatbot"
                              : "챗봇"}
                          </Badge>
                        </td>
                        <td className="p-3 max-w-xs truncate">
                          {session.summary}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/sessions/${session.id}?language=${language}`}
                              className="text-muted-foreground hover:text-foreground"
                              title={
                                language === "english"
                                  ? "View details"
                                  : "상세 보기"
                              }
                            >
                              <IconFileText className="h-4 w-4" />
                            </Link>
                            {session.type === "human" && (
                              <label
                                className="cursor-pointer text-muted-foreground hover:text-foreground"
                                title={
                                  language === "english"
                                    ? "Upload audio"
                                    : "오디오 업로드"
                                }
                              >
                                <IconMicrophone className="h-4 w-4" />
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="mt-4">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Detailed Progress" : "상세 진행도"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Track goal achievement and attendance"
                  : "목표 달성 및 출석 추적"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-4">
                    {language === "english" ? "Goal Progress" : "목표 진행도"}
                  </h3>
                  <div className="space-y-4">
                    {user.goals.map((goal) => (
                      <div key={goal.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            {goal.title}
                          </span>
                          <span className="text-sm">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-4">
                    {language === "english"
                      ? "Overall Progress"
                      : "전체 진행도"}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        {language === "english"
                          ? "Program Completion"
                          : "프로그램 완료"}
                      </span>
                      <span className="text-sm">{user.progress}%</span>
                    </div>
                    <Progress value={user.progress} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="mt-4">
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
              <Button className="mt-4">
                {language === "english" ? "Save Notes" : "노트 저장"}
              </Button>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        {/* Chatbot Instructions Tab */}
        <TabsContent value="chatbot" className="mt-4">
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
              <Button className="mt-4">
                {language === "english" ? "Save Instructions" : "지시사항 저장"}
              </Button>
            </CardContent>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
