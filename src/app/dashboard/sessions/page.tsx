"use client";

import { useState } from "react";
import {
  IconHistory,
  IconLanguage,
  IconChartBar,
  IconMessageCircle,
  IconSearch,
  IconUserCircle,
  IconStar,
  IconDownload,
  IconFileText,
  IconMicrophone,
  IconAlertCircle,
  IconCheck,
} from "@tabler/icons-react";

import { AnimatedCard } from "@/components/ui/animated-card";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SessionAnalysis } from "./components/SessionAnalysis";

// Mock feedback data
const feedbackItems = [
  {
    id: 1,
    user: "Sarah Kim",
    date: "April 2, 2023",
    rating: 5,
    message:
      "The AI coaching sessions have been tremendously helpful. I feel like I'm making real progress.",
    type: "User Feedback",
  },
  {
    id: 2,
    user: "James Wong",
    date: "April 1, 2023",
    rating: 4,
    message:
      "Good experience overall. The AI coach could use more variety in its responses, but the guidance is solid.",
    type: "User Feedback",
  },
  {
    id: 3,
    user: "Minho Park",
    date: "March 30, 2023",
    rating: 5,
    message:
      "I'm impressed with how personalized the coaching feels. The AI remembered details from our previous sessions.",
    type: "User Feedback",
  },
  {
    id: 4,
    user: "System",
    date: "March 29, 2023",
    rating: null,
    message:
      "Performance report: 93% user engagement rate, average session duration 8.5 minutes, 87% completion rate.",
    type: "System Analytics",
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

// Define status badge variants
const statusVariants = {
  Completed: "default",
  "In Progress": "outline",
  Scheduled: "secondary",
} as const;

export default function SessionsPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle audio file upload
    console.log("Audio file uploaded:", event.target.files?.[0]);
  };

  const handleDownload = (type: string) => {
    console.log(`Downloading ${type}`);
  };

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
          onPressedChange={(pressed) =>
            setLanguage(pressed ? "korean" : "english")
          }
        >
          <IconLanguage className="h-4 w-4 mr-2" />
          {language === "english" ? "English" : "한국어"}
        </Toggle>
      </div>

      <Tabs defaultValue="history">
        <TabsList className="mb-6 grid grid-cols-1 md:grid-cols-4 w-fit">
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
          <TabsTrigger value="summaries">
            <IconFileText className="h-4 w-4 mr-2" />
            {language === "english" ? "Summaries" : "요약"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={
                  language === "english" ? "Search sessions..." : "세션 검색..."
                }
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
                      <th className="p-3 text-left font-medium">
                        {language === "english" ? "Actions" : "작업"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array(6)
                      .fill(null)
                      .map((_, index) => {
                        const status = [
                          "Completed",
                          "In Progress",
                          "Scheduled",
                        ][index % 3] as keyof typeof statusVariants;
                        const needsUpdate = index % 3 === 1;
                        const sessionId = `session-${index}`;
                        const date = new Date(
                          Date.now() - index * 24 * 60 * 60 * 1000
                        );
                        return (
                          <tr key={sessionId} className="border-b">
                            <td className="p-3">User {index + 1}</td>
                            <td className="p-3">{date.toLocaleDateString()}</td>
                            <td className="p-3">{`${
                              Math.floor(Math.random() * 20) + 5
                            } min`}</td>
                            <td className="p-3">
                              <Badge variant={statusVariants[status]}>
                                {status}
                              </Badge>
                              {needsUpdate && (
                                <IconAlertCircle className="h-4 w-4 text-yellow-500 inline ml-2" />
                              )}
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    router.push(
                                      `/sessions/${sessionId}?language=${language}`
                                    )
                                  }
                                  className="text-muted-foreground hover:text-foreground"
                                  title={
                                    language === "english"
                                      ? "View details"
                                      : "상세 보기"
                                  }
                                >
                                  <IconFileText className="h-4 w-4" />
                                </button>
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
                                    onChange={handleAudioUpload}
                                  />
                                </label>
                              </div>
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
          <SessionAnalysis language={language} />
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
                  <div
                    key={item.id}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <IconUserCircle className="h-10 w-10 text-muted-foreground mr-3" />
                        <div>
                          <div className="font-medium">{item.user}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.date}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          item.type === "System Analytics"
                            ? "outline"
                            : "default"
                        }
                      >
                        {item.type}
                      </Badge>
                    </div>

                    {item.rating && (
                      <div className="flex mb-2">
                        {Array(5)
                          .fill(0)
                          .map((_, index) => (
                            <IconStar
                              key={`star-${item.id}-${index}`}
                              className={`h-4 w-4 ${
                                index < item.rating
                                  ? "text-yellow-500"
                                  : "text-muted-foreground"
                              }`}
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

        <TabsContent value="summaries" className="space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Session Summaries" : "세션 요약"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "View automated summaries and key insights from sessions"
                  : "세션의 자동 요약 및 주요 인사이트 보기"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sessionSummaries.map((summary) => (
                <div key={summary.id} className="mb-8 last:mb-0">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Session #{summary.id}
                    </h3>
                    <div className="flex items-center gap-2">
                      {summary.hasAudio && (
                        <Badge variant="outline">
                          <IconMicrophone className="h-4 w-4 mr-1" />
                          {language === "english"
                            ? "Has Recording"
                            : "녹음 있음"}
                        </Badge>
                      )}
                      {summary.needsUpdate && (
                        <Badge variant="destructive">
                          <IconAlertCircle className="h-4 w-4 mr-1" />
                          {language === "english"
                            ? "Needs Update"
                            : "업데이트 필요"}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">
                          {language === "english" ? "Key Topics" : "주요 주제"}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {summary.topics.map((topic) => (
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
                        <p className="text-sm text-muted-foreground">
                          {summary.coachNotes}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">
                        {language === "english" ? "Action Items" : "실행 항목"}
                      </h4>
                      <ul className="space-y-2">
                        {summary.actionItems.map((item) => {
                          const actionId = `${summary.id}-action-${item.task
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`;
                          return (
                            <li
                              key={actionId}
                              className="flex items-center gap-2"
                            >
                              {item.status === "completed" ? (
                                <IconCheck className="h-4 w-4 text-green-500" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                              )}
                              <span className="text-sm">{item.task}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload("summary")}
                    >
                      <IconDownload className="h-4 w-4 mr-2" />
                      {language === "english"
                        ? "Download Summary"
                        : "요약 다운로드"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
