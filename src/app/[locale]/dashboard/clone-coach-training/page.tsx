"use client";

import { useState, useEffect } from "react";
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
  DialogFooter,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import knowledge base services
import {
  createKnowledgeBase,
  getKnowledgeBases,
  getKnowledgeBase,
  uploadDocumentToKnowledgeBase,
} from "@/services/knowledge-base";
import type { IKnowledgeBase } from "@/services/knowledge-base/knowledge-base.types";

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
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("files");

  // Knowledge base state
  const [knowledgeBases, setKnowledgeBases] = useState<IKnowledgeBase[]>([]);
  const [activeKnowledgeBase, setActiveKnowledgeBase] =
    useState<IKnowledgeBase | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [createKBDialogOpen, setCreateKBDialogOpen] = useState(false);
  const [newKBName, setNewKBName] = useState("");
  const [newKBDescription, setNewKBDescription] = useState("");

  // Fetch knowledge bases on component mount
  useEffect(() => {
    fetchKnowledgeBases();
  }, []);

  const fetchKnowledgeBases = async () => {
    setIsLoading(true);
    try {
      const response = await getKnowledgeBases();
      setKnowledgeBases(response.data.results);
      if (response.data.results.length > 0) {
        setActiveKnowledgeBase(response.data.results[0]);
      }
    } catch (error) {
      console.error("Failed to fetch knowledge bases:", error);
      setApiError("Failed to fetch knowledge bases. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchKnowledgeBaseFiles = async () => {
    if (!activeKnowledgeBase) return;

    setIsLoading(true);
    try {
      const response = await getKnowledgeBase(activeKnowledgeBase._id);
      setActiveKnowledgeBase(response.data);
    } catch (error) {
      console.error("Failed to fetch knowledge base details:", error);
      setApiError("Failed to fetch knowledge base details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Map API data to UI format
  const getFormattedKnowledgeBaseFiles = () => {
    if (!activeKnowledgeBase?.documents?.length) return [];

    return activeKnowledgeBase.documents.map((doc) => ({
      id: doc.name, // Using name as id since API doesn't seem to provide document IDs
      name: doc.name,
      type: doc.mimeType.split("/")[1].toUpperCase(),
      size: `${(doc.size / (1024 * 1024)).toFixed(1)} MB`,
      tags: [], // Add tag management functionality later
      program: "Unassigned", // Add program assignment functionality later
      uploadDate: new Date(doc.createdAt).toLocaleDateString(),
    }));
  };

  const handleCreateKnowledgeBase = async (
    name: string,
    description?: string
  ) => {
    setIsLoading(true);
    try {
      const response = await createKnowledgeBase({ name, description });
      setKnowledgeBases((prev) => [...prev, response.data]);
      setActiveKnowledgeBase(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to create knowledge base:", error);
      setApiError("Failed to create knowledge base. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadSubmit = async (files: File[]) => {
    if (!activeKnowledgeBase) {
      try {
        // Create knowledge base if none exists
        const newKB = await createKnowledgeBase({
          name: "Main Knowledge Base",
          description: "Primary knowledge base for coach training",
        });
        setActiveKnowledgeBase(newKB.data);
        await uploadFiles(newKB.data._id, files);
      } catch (error) {
        console.error(
          "Failed to create knowledge base and upload files:",
          error
        );
        setApiError(
          "Failed to create knowledge base and upload files. Please try again."
        );
      }
    } else {
      await uploadFiles(activeKnowledgeBase._id, files);
    }
  };

  const uploadFiles = async (kbId: string, files: File[]) => {
    setIsLoading(true);
    try {
      // Upload each file to the knowledge base
      const uploadPromises = files.map((file) =>
        uploadDocumentToKnowledgeBase(kbId, file)
      );

      await Promise.all(uploadPromises);
      // Update knowledge base files display
      fetchKnowledgeBaseFiles();
      setUploadDialogOpen(false);
    } catch (error) {
      console.error("Failed to upload files:", error);
      setApiError("Failed to upload files. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilesSelected = (files: File[]) => {
    console.log(`Selected ${files.length} files`);
  };

  const handleInstructionsSubmit = (data: CoachInstructionsData) => {
    console.log("Coach instructions submitted:", data);
    setInstructionsOpen(false);
  };

  // Filter files based on search query and knowledge base
  const filteredFiles = getFormattedKnowledgeBaseFiles().filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Knowledge Base Selector Component
  const KnowledgeBaseSelector = () => {
    return (
      <div className="mb-4">
        <label htmlFor="kb-selector" className="block text-sm font-medium mb-1">
          {language === "english"
            ? "Active Knowledge Base"
            : "활성 지식 베이스"}
        </label>
        <div className="flex items-center gap-2">
          <Select
            value={activeKnowledgeBase?._id || ""}
            onValueChange={(value) => {
              const selected = knowledgeBases.find((kb) => kb._id === value);
              if (selected) setActiveKnowledgeBase(selected);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  language === "english"
                    ? "Select a knowledge base"
                    : "지식 베이스 선택"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {knowledgeBases.map((kb) => (
                <SelectItem key={kb._id} value={kb._id}>
                  {kb.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setCreateKBDialogOpen(true)}>
            <IconPlus className="h-4 w-4 mr-2" />
            {language === "english" ? "New" : "새로 만들기"}
          </Button>
        </div>
      </div>
    );
  };

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
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        )}

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
                  <KnowledgeBaseSelector />
                  <FileTaggingList files={filteredFiles} language={language} />
                </TabsContent>

                <TabsContent value="programs" className="space-y-4">
                  <ProgramGrouping
                    programs={programs}
                    files={filteredFiles}
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
              onUploadSubmit={handleUploadSubmit}
              acceptedFileTypes={[".pdf", ".docx", ".doc", ".txt"]}
              isUploading={isLoading}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Knowledge Base Dialog */}
      <Dialog open={createKBDialogOpen} onOpenChange={setCreateKBDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === "english"
                ? "Create Knowledge Base"
                : "지식 베이스 생성"}
            </DialogTitle>
            <DialogDescription>
              {language === "english"
                ? "Create a new knowledge base for your coach training materials"
                : "코치 트레이닝 자료를 위한 새 지식 베이스 생성"}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateKnowledgeBase(newKBName, newKBDescription)
                .then(() => {
                  setCreateKBDialogOpen(false);
                  setNewKBName("");
                  setNewKBDescription("");
                })
                .catch(() => {
                  // Error already handled in handleCreateKnowledgeBase
                });
            }}
          >
            <div className="space-y-4 py-2">
              <div>
                <label
                  htmlFor="kb-name"
                  className="block text-sm font-medium mb-1"
                >
                  {language === "english" ? "Name" : "이름"}
                </label>
                <Input
                  id="kb-name"
                  value={newKBName}
                  onChange={(e) => setNewKBName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="kb-description"
                  className="block text-sm font-medium mb-1"
                >
                  {language === "english" ? "Description" : "설명"}
                </label>
                <Input
                  id="kb-description"
                  value={newKBDescription}
                  onChange={(e) => setNewKBDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    {language === "english" ? "Creating..." : "생성 중..."}
                  </span>
                ) : language === "english" ? (
                  "Create"
                ) : (
                  "생성"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Error Alert Dialog */}
      {apiError && (
        <AlertDialog open={!!apiError} onOpenChange={() => setApiError(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {language === "english" ? "Error" : "오류"}
              </AlertDialogTitle>
              <AlertDialogDescription>{apiError}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>
                {language === "english" ? "Dismiss" : "닫기"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

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
