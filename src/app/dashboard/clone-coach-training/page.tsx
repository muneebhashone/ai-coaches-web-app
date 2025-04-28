"use client";

import { useState } from "react";
import {
  IconBrain,
  IconLanguage,
  IconSearch,
  IconUpload,
  IconPlus,
  IconFolder,
  IconFile,
  IconAlertTriangle,
  IconMessageCircle,
  IconChartBar,
} from "@tabler/icons-react";

import { AnimatedCard } from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Import existing components
import { EnhancedFileUpload } from "@/components/knowledge-base/enhanced-file-upload";
import { CoachInstructionsDialog } from "@/components/chatbot/coach-instructions-dialog";
import type { CoachInstructionsData } from "@/components/chatbot/coach-instructions-form";

// Import custom components for this page
import { FileTaggingList } from "@/components/clone-coach-training/file-tagging-list";
import { ProgramGrouping } from "@/components/clone-coach-training/program-grouping";
import { MonitoringMetrics } from "@/components/clone-coach-training/monitoring-metrics";
import { ChatbotMessageLog } from "@/components/clone-coach-training/chatbot-message-log";
import { AlertsPanel } from "@/components/clone-coach-training/alerts-panel";

// Mock data for training status
const trainingStatus = {
  status: "ready" as const,
  lastUpdated: "2024-04-17T23:55:00.000Z",
  metrics: {
    accuracy: { name: "Accuracy", value: 95, change: 1, target: 98 },
    responseTime: {
      name: "Response Time",
      value: 200,
      change: -10,
      target: 150,
    },
    consistency: { name: "Consistency", value: 90, change: 2, target: 95 },
  },
  activeKnowledgeBase: [
    {
      id: "1",
      name: "Document 1",
      type: "PDF",
      active: true,
      lastUpdated: "2024-04-10",
    },
    {
      id: "2",
      name: "FAQ",
      type: "Text",
      active: false,
      lastUpdated: "2024-04-15",
    },
  ],
  chatbotTone: {
    name: "Friendly",
    description: {
      english: "A friendly and helpful tone.",
      korean: "친절하고 도움이 되는 어조.",
    },
    active: true,
  },
};

// Mock data for user activity
const userActivityData = [
  { week: "Week 1", sessionCount: 28, goalProgress: 40 },
  { week: "Week 2", sessionCount: 32, goalProgress: 45 },
  { week: "Week 3", sessionCount: 37, goalProgress: 55 },
  { week: "Week 4", sessionCount: 42, goalProgress: 60 },
  { week: "Week 5", sessionCount: 46, goalProgress: 68 },
  { week: "Week 6", sessionCount: 45, goalProgress: 72 },
];

// Mock data for user insights
const userData = [
  {
    id: 1,
    name: "Kim Min-ji",
    age: 32,
    occupation: "Marketing Manager",
    sessions: 8,
    goalProgress: 75,
    status: "active",
  },
  {
    id: 2,
    name: "Park Ji-sung",
    age: 28,
    occupation: "Software Developer",
    sessions: 12,
    goalProgress: 85,
    status: "active",
  },
  {
    id: 3,
    name: "Lee Soo-jin",
    age: 35,
    occupation: "Business Consultant",
    sessions: 5,
    goalProgress: 45,
    status: "stalled",
  },
  {
    id: 4,
    name: "Choi Woo-shik",
    age: 30,
    occupation: "Graphic Designer",
    sessions: 10,
    goalProgress: 65,
    status: "active",
  },
  {
    id: 5,
    name: "Kang Hye-jin",
    age: 27,
    occupation: "Graduate Student",
    sessions: 3,
    goalProgress: 30,
    status: "low-response",
  },
];

// Mock data for knowledge base files
const knowledgeBaseFiles = [
  {
    id: "file-1",
    name: "Stress Management Guide.pdf",
    type: "PDF",
    size: "2.4 MB",
    tags: ["stress", "management", "guide"],
    program: "Stress Program",
    uploadDate: "2024-04-10",
  },
  {
    id: "file-2",
    name: "Mindfulness Techniques.docx",
    type: "Word",
    size: "1.8 MB",
    tags: ["mindfulness", "techniques", "meditation"],
    program: "Stress Program",
    uploadDate: "2024-04-12",
  },
  {
    id: "file-3",
    name: "Sleep Improvement Protocol.pdf",
    type: "PDF",
    size: "3.2 MB",
    tags: ["sleep", "improvement", "protocol"],
    program: "Sleep Program",
    uploadDate: "2024-04-15",
  },
  {
    id: "file-4",
    name: "Nutrition Guidelines.txt",
    type: "Text",
    size: "0.5 MB",
    tags: ["nutrition", "diet", "guidelines"],
    program: "Wellness Program",
    uploadDate: "2024-04-08",
  },
  {
    id: "file-5",
    name: "Exercise Routines.pdf",
    type: "PDF",
    size: "4.1 MB",
    tags: ["exercise", "fitness", "routines"],
    program: "Wellness Program",
    uploadDate: "2024-04-05",
  },
];

// Mock data for programs
const programs = [
  {
    id: "prog-1",
    name: "Stress Program",
    fileCount: 2,
    description:
      "A program focused on stress management and reduction techniques.",
  },
  {
    id: "prog-2",
    name: "Sleep Program",
    fileCount: 1,
    description:
      "Techniques and protocols for improving sleep quality and duration.",
  },
  {
    id: "prog-3",
    name: "Wellness Program",
    fileCount: 2,
    description:
      "Comprehensive wellness program covering nutrition and exercise.",
  },
];

export default function CloneCoachTrainingPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [, setSelectedFiles] = useState<File[]>([]);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("files");

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    console.log(`Selected ${files.length} files for upload`);
  };

  const handleInstructionsSubmit = (data: CoachInstructionsData) => {
    console.log("Coach instructions submitted:", data);
    setInstructionsOpen(false);
  };

  // Filter files based on search query
  const filteredFiles = knowledgeBaseFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      file.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center gap-2">
        <IconBrain className="h-5 w-5" />
        <h1 className="text-xl font-semibold">
          {language === "english"
            ? "Clone Coach Training"
            : "클론 코치 트레이닝"}
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

      <div className="grid grid-cols-1  gap-6 mt-6">
        {/* Main Interface - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english"
                  ? "Knowledge Base Management"
                  : "지식 베이스 관리"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Upload, organize, and manage your coach training materials"
                  : "코치 트레이닝 자료를 업로드, 구성 및 관리하세요"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="relative w-full max-w-sm">
                  <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={
                      language === "english"
                        ? "Search files..."
                        : "파일 검색..."
                    }
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setUploadDialogOpen(true)}
                  >
                    <IconUpload className="h-4 w-4 mr-2" />
                    {language === "english" ? "Upload Files" : "파일 업로드"}
                  </Button>
                  <Button onClick={() => setInstructionsOpen(true)}>
                    <IconPlus className="h-4 w-4 mr-2" />
                    {language === "english" ? "Add Instructions" : "지침 추가"}
                  </Button>
                </div>
              </div>

              <Tabs
                defaultValue="files"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="mb-4">
                  <TabsTrigger value="files">
                    <IconFile className="h-4 w-4 mr-2" />
                    {language === "english" ? "Files" : "파일"}
                  </TabsTrigger>
                  <TabsTrigger value="programs">
                    <IconFolder className="h-4 w-4 mr-2" />
                    {language === "english" ? "Programs" : "프로그램"}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="files" className="space-y-4">
                  <FileTaggingList files={filteredFiles} language={language} />
                </TabsContent>

                <TabsContent value="programs" className="space-y-4">
                  <ProgramGrouping
                    programs={programs}
                    files={knowledgeBaseFiles}
                    language={language}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </AnimatedCard>
        </div>

        {/* Monitoring Panel - 1/3 width on large screens */}
        <div className="space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center">
                  <IconChartBar className="h-5 w-5 mr-2" />
                  {language === "english"
                    ? "Monitoring Panel"
                    : "모니터링 패널"}
                </div>
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Track performance metrics and user interactions"
                  : "성능 지표 및 사용자 상호 작용 추적"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="metrics" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="metrics" className="flex-1">
                    <IconChartBar className="h-4 w-4 mr-2" />
                    {language === "english" ? "Metrics" : "지표"}
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="flex-1">
                    <IconMessageCircle className="h-4 w-4 mr-2" />
                    {language === "english" ? "Messages" : "메시지"}
                  </TabsTrigger>
                  <TabsTrigger value="alerts" className="flex-1">
                    <IconAlertTriangle className="h-4 w-4 mr-2" />
                    {language === "english" ? "Alerts" : "알림"}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="metrics" className="p-4">
                  <MonitoringMetrics
                    language={language}
                    trainingStatus={trainingStatus}
                    userActivityData={userActivityData}
                    userData={userData}
                  />
                </TabsContent>

                <TabsContent value="messages" className="p-4">
                  <ChatbotMessageLog language={language} />
                </TabsContent>

                <TabsContent value="alerts" className="p-4">
                  <AlertsPanel language={language} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </AnimatedCard>
        </div>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {language === "english"
                ? "Upload Knowledge Base Files"
                : "지식 베이스 파일 업로드"}
            </DialogTitle>
            <DialogDescription>
              {language === "english"
                ? "Upload files to train your coach clone. Supports PDF, DOCX, and TXT formats."
                : "코치 클론을 훈련시키기 위한 파일을 업로드하세요. PDF, DOCX 및 TXT 형식을 지원합니다."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <EnhancedFileUpload
              language={language}
              onFilesSelected={handleFilesSelected}
              acceptedFileTypes={[".pdf", ".docx", ".doc", ".txt"]}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Coach Instructions Dialog */}
      <CoachInstructionsDialog
        open={instructionsOpen}
        onOpenChange={setInstructionsOpen}
        language={language}
        onSubmit={handleInstructionsSubmit}
      />
    </>
  );
}
