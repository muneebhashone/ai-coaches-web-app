"use client";

import { useState } from "react";
import {
  IconCheck,
  IconX,
  IconMaximize,
  IconDownload,
  IconLanguage,
  IconSend,
  IconAlertTriangle,
  IconGraph,
  IconEdit,
  IconMicrophone,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock chat data
const mockChatLog = [
  {
    id: 1,
    role: "user",
    message: "I've been struggling with time management lately.",
    timestamp: "2024-04-08T10:00:00Z",
  },
  {
    id: 2,
    role: "assistant",
    message:
      "I understand. Let's break down your daily schedule and identify areas where we can improve efficiency. What does your typical day look like?",
    timestamp: "2024-04-08T10:00:30Z",
  },
  {
    id: 3,
    role: "user",
    message:
      "I usually start work at 9 AM, but I find myself getting distracted by emails and meetings throughout the day.",
    timestamp: "2024-04-08T10:01:00Z",
  },
  {
    id: 4,
    role: "assistant",
    message:
      "That's a common challenge. Have you tried time-blocking or the Pomodoro technique? These methods can help structure your day better.",
    timestamp: "2024-04-08T10:01:30Z",
  },
];

// Mock session summary data
const sessionSummaries = [
  {
    id: 1,
    topics: ["Goal Setting", "Time Management", "Work-Life Balance"],
    coachNotes:
      "Client shows strong motivation but needs help with prioritization",
    actionItems: [
      { task: "Create daily schedule", status: "completed" },
      { task: "Set SMART goals", status: "pending" },
    ],
    hasAudio: true,
    needsUpdate: false,
  },
  {
    id: 2,
    topics: ["Career Development", "Leadership Skills"],
    coachNotes: "Focus on developing delegation skills and team management",
    actionItems: [
      { task: "Read recommended leadership book", status: "pending" },
      { task: "Practice delegation exercise", status: "pending" },
    ],
    hasAudio: false,
    needsUpdate: true,
  },
];

export default function SessionDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState<"chat" | "summary">("chat");
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [language, setLanguage] = useState<"english" | "korean">("english");
  const [specialNotes, setSpecialNotes] = useState(
    "Client is highly motivated but struggles with procrastination."
  );
  const [customChatbotInstructions, setCustomChatbotInstructions] = useState(
    "Encourage the user to break down tasks into smaller, manageable steps."
  );
  const [showAlerts, setShowAlerts] = useState(true);
  const router = useRouter();
  const sessionId = params.id;

  // Mock data for coaching programs
  const coachingPrograms = [
    {
      id: "stress-reduction",
      title: "Stress Reduction Coaching Program",
      sessions: [
        { id: "session-1", date: "2025-04-10", type: "Human Coach" },
        { id: "session-2", date: "2025-04-11", type: "Chatbot" },
      ],
    },
    {
      id: "career-coaching",
      title: "Career Coaching Program",
      sessions: [
        { id: "session-3", date: "2025-04-12", type: "Human Coach" },
        { id: "session-4", date: "2025-04-13", type: "Chatbot" },
      ],
    },
  ];

  const handleDownload = (type: "chat" | "summary") => {
    console.log(`Downloading ${type} for session ${sessionId}`);
  };

  const handleSendReport = () => {
    console.log(`Sending report for session ${sessionId}`);
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log(
        `Uploading audio for session ${sessionId}:`,
        event.target.files[0]
      );
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {language === "english" ? "Session Details" : "세션 상세"} #
          {sessionId}
        </h1>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLanguage className="h-4 w-4 mr-2" />
                {language === "english" ? "English" : "한국어"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("english")}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("korean")}>
                한국어
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`/sessions/${sessionId}`, "_blank")}
          >
            <IconMaximize className="h-4 w-4 mr-2" />
            {language === "english" ? "Open in New Tab" : "새 탭에서 열기"}
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() =>
              handleDownload(activeTab === "chat" ? "chat" : "summary")
            }
          >
            <IconDownload className="h-4 w-4 mr-2" />
            {language === "english" ? "Download" : "다운로드"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          {/* Current Program Banner */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {language === "english" ? "Current Program" : "현재 프로그램"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/10 text-primary p-3 rounded-md">
                <p className="font-medium">
                  {language === "english"
                    ? "Stress Reduction Coaching Program"
                    : "스트레스 감소 코칭 프로그램"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Goal Progress */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {language === "english" ? "Goal Progress" : "목표 진행 상황"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Time Management</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Work-Life Balance</span>
                  <span className="text-sm font-medium">40%</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    Communication Skills
                  </span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* List of All Coaching Programs */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {language === "english" ? "Coaching Programs" : "코칭 프로그램"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {coachingPrograms.map((program) => (
                <button
                  key={program.id}
                  className={`w-full px-4 py-2 rounded-md border text-sm text-left ${
                    selectedProgram === program.id
                      ? "bg-secondary text-secondary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedProgram(program.id)}
                  type="button"
                >
                  {program.title}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Session List (Shown when a program is selected) */}
          {selectedProgram && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {language === "english" ? "Sessions" : "세션"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {coachingPrograms
                  .find((program) => program.id === selectedProgram)
                  ?.sessions.map((session) => (
                    <div
                      key={session.id}
                      className="w-full px-4 py-2 rounded-md border text-sm hover:bg-muted text-left flex justify-between items-center"
                    >
                      <button
                        onClick={() => {
                          setActiveTab("chat");
                        }}
                        type="button"
                        className="flex-grow text-left"
                      >
                        {session.date} - {session.type}
                      </button>
                      {session.type === "Human Coach" && (
                        <div>
                          <label className="cursor-pointer">
                            <IconMicrophone className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                            <input
                              type="file"
                              accept="audio/*"
                              className="hidden"
                              onChange={handleAudioUpload}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  ))}
              </CardContent>
            </Card>
          )}

          <Button
            className="w-full"
            variant="outline"
            onClick={() => router.back()}
          >
            <IconX className="h-4 w-4 mr-2" />
            {language === "english" ? "Back to Sessions" : "세션 목록으로"}
          </Button>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-0">
              <div className="flex border-b">
                <button
                  type="button"
                  className={`px-4 py-2 font-medium ${
                    activeTab === "chat"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setActiveTab("chat")}
                >
                  {language === "english" ? "Chat Log" : "채팅 로그"}
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 font-medium ${
                    activeTab === "summary"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setActiveTab("summary")}
                >
                  {language === "english" ? "Summary" : "요약"}
                </button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto mt-4">
              {activeTab === "chat" ? (
                <div className="space-y-4">
                  {/* Alert Banner for Critical Detection */}
                  {showAlerts && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg flex items-start">
                      <IconAlertTriangle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="flex-grow">
                        <p className="font-medium">
                          {language === "english"
                            ? "Potential concern detected"
                            : "잠재적 문제 감지됨"}
                        </p>
                        <p className="text-sm">
                          {language === "english"
                            ? "The user expressed high stress levels. Consider following up directly."
                            : "사용자가 높은 스트레스 수준을 표현했습니다. 직접 후속 조치를 고려하세요."}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAlerts(false)}
                        className="h-8 w-8 p-0"
                      >
                        <IconX className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {mockChatLog.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">
                      {language === "english" ? "Key Topics" : "주요 주제"}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {sessionSummaries[0].topics.map((topic) => (
                        <Badge key={topic} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">
                      {language === "english" ? "Coach Notes" : "코치 노트"}
                    </h4>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm">
                        {sessionSummaries[0].coachNotes}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">
                      {language === "english"
                        ? "Emotional Analysis"
                        : "감정 분석"}
                    </h4>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Anxious</span>
                        <span className="text-sm">Calm</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-500 h-full"
                          style={{ width: "35%" }}
                        />
                      </div>
                      <div className="mt-3">
                        <span className="text-sm text-muted-foreground">
                          {language === "english"
                            ? "User shows mild anxiety about work deadlines"
                            : "사용자는 업무 마감일에 대한 경미한 불안감을 보입니다"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">
                      {language === "english" ? "Action Items" : "실행 항목"}
                    </h4>
                    <div className="bg-muted rounded-lg p-4">
                      <ul className="space-y-3">
                        {sessionSummaries[0].actionItems.map((item) => (
                          <li
                            key={item.task}
                            className="flex items-center gap-2"
                          >
                            {item.status === "completed" ? (
                              <IconCheck className="h-4 w-4 text-green-500" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                            )}
                            <span className="text-sm">{item.task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">
                      {language === "english" ? "Key Metrics" : "주요 지표"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-muted rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          {language === "english" ? "Duration" : "기간"}
                        </p>
                        <p className="text-lg font-medium">45 minutes</p>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          {language === "english"
                            ? "Engagement Score"
                            : "참여도"}
                        </p>
                        <p className="text-lg font-medium">85%</p>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          {language === "english"
                            ? "Progress Made"
                            : "진행 상황"}
                        </p>
                        <p className="text-lg font-medium">Good</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="border-t p-4 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">
                      {language === "english"
                        ? "Special Notes"
                        : "특별 참고사항"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex">
                      <Textarea
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        className="text-sm resize-none min-h-[60px]"
                      />
                      <Button variant="ghost" className="ml-2">
                        <IconEdit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm">
                      {language === "english"
                        ? "Custom Chatbot Instructions"
                        : "사용자 지정 챗봇 지침"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex">
                      <Textarea
                        value={customChatbotInstructions}
                        onChange={(e) =>
                          setCustomChatbotInstructions(e.target.value)
                        }
                        className="text-sm resize-none min-h-[60px]"
                      />
                      <Button variant="ghost" className="ml-2">
                        <IconEdit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => console.log("Generate weekly report")}
                >
                  <IconGraph className="h-4 w-4 mr-2" />
                  {language === "english"
                    ? "Generate Weekly Report"
                    : "주간 보고서 생성"}
                </Button>
                <Button variant="default" onClick={handleSendReport}>
                  <IconSend className="h-4 w-4 mr-2" />
                  {language === "english"
                    ? "Send Report to User"
                    : "사용자에게 보고서 보내기"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
