"use client";

import { useState } from "react";
import {
  IconBrain,
  IconLanguage,
  IconSearch,
  IconUpload,
  IconPlus,
  IconFile,
  IconAlertTriangle,
  IconMessageCircle,
  IconChartBar,
  IconUserCheck,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Import existing components
import { EnhancedFileUpload } from "@/components/knowledge-base/enhanced-file-upload";
import { CoachInstructionsDialog } from "@/components/chatbot/coach-instructions-dialog";
import type { CoachInstructionsData } from "@/components/chatbot/coach-instructions-form";
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

// Mock data for coaches
const coachTrainingData = [
  {
    id: "coach-1",
    name: "Sarah Kim",
    status: "completed",
    lastTrained: "2023-06-10T12:30:00Z",
    accuracy: 96,
    responseTime: 180,
    consistency: 92,
    feedbackScore: 4.8,
    userCount: 42,
  },
  {
    id: "coach-2",
    name: "David Park",
    status: "in-progress",
    lastTrained: "2023-06-15T09:45:00Z",
    accuracy: 88,
    responseTime: 210,
    consistency: 85,
    feedbackScore: 4.2,
    userCount: 35,
  },
  {
    id: "coach-3",
    name: "Jessica Lee",
    status: "scheduled",
    lastTrained: "2023-06-05T15:20:00Z",
    accuracy: 92,
    responseTime: 195,
    consistency: 89,
    feedbackScore: 4.5,
    userCount: 28,
  },
  {
    id: "coach-4",
    name: "Michael Jung",
    status: "needs-update",
    lastTrained: "2023-05-20T11:10:00Z",
    accuracy: 90,
    responseTime: 220,
    consistency: 87,
    feedbackScore: 4.3,
    userCount: 15,
  },
];

// Mock data for global knowledge base
const globalKnowledgeBase = [
  {
    id: "kb-1",
    name: "Core Coaching Principles",
    type: "PDF",
    size: "3.5 MB",
    coaches: ["Sarah Kim", "David Park", "Jessica Lee", "Michael Jung"],
    uploadDate: "2023-04-10",
  },
  {
    id: "kb-2",
    name: "Communication Techniques",
    type: "DOCX",
    size: "1.2 MB",
    coaches: ["Sarah Kim", "David Park"],
    uploadDate: "2023-04-15",
  },
  {
    id: "kb-3",
    name: "Goal Setting Framework",
    type: "PDF",
    size: "2.8 MB",
    coaches: ["Jessica Lee", "Michael Jung"],
    uploadDate: "2023-04-12",
  },
  {
    id: "kb-4",
    name: "Progress Tracking Methods",
    type: "PDF",
    size: "4.1 MB",
    coaches: ["Sarah Kim", "Jessica Lee"],
    uploadDate: "2023-04-20",
  },
  {
    id: "kb-5",
    name: "Feedback Collection Guide",
    type: "TXT",
    size: "0.5 MB",
    coaches: ["David Park", "Michael Jung"],
    uploadDate: "2023-04-18",
  },
];

export default function AdminCloneCoachTrainingPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english");
  const [searchQuery, setSearchQuery] = useState("");
  const [coachFilter, setCoachFilter] = useState<string>("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [, setSelectedFiles] = useState<File[]>([]);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);

  // Filter coaches based on search query
  const filteredCoaches = coachTrainingData.filter(
    (coach) =>
      coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter knowledge base files based on search query and coach filter
  const filteredKB = globalKnowledgeBase.filter(
    (kb) =>
      (kb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kb.type.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (coachFilter === "all" ||
        kb.coaches.some((coach) =>
          coach.toLowerCase().includes(coachFilter.toLowerCase())
        ))
  );

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    console.log(`Selected ${files.length} files for upload`);
  };

  const handleInstructionsSubmit = (data: CoachInstructionsData) => {
    console.log("Coach instructions submitted:", data);
    setInstructionsOpen(false);
  };

  const handleCoachSelect = (coachId: string) => {
    setSelectedCoach(coachId === selectedCoach ? null : coachId);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <IconBrain className="h-5 w-5 text-red-500" />
          <h1 className="text-2xl font-semibold tracking-tight">
            {language === "english"
              ? "Clone Coach Training"
              : "클론 코치 트레이닝"}
          </h1>
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

      <Tabs defaultValue="coaches">
        <TabsList className="mb-4">
          <TabsTrigger value="coaches" className="flex items-center gap-1">
            <IconUserCheck className="h-4 w-4" />
            <span>{language === "english" ? "Coaches" : "코치"}</span>
          </TabsTrigger>
          <TabsTrigger
            value="knowledge-base"
            className="flex items-center gap-1"
          >
            <IconFile className="h-4 w-4" />
            <span>
              {language === "english" ? "Knowledge Base" : "지식 베이스"}
            </span>
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-1">
            <IconChartBar className="h-4 w-4" />
            <span>{language === "english" ? "Monitoring" : "모니터링"}</span>
          </TabsTrigger>
        </TabsList>

        {/* Coaches Tab */}
        <TabsContent value="coaches" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={
                  language === "english" ? "Search coaches..." : "코치 검색..."
                }
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setInstructionsOpen(true)}>
              <IconPlus className="h-4 w-4 mr-2" />
              {language === "english" ? "New Coach" : "새 코치"}
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Coach Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Trained</TableHead>
                  <TableHead className="text-right">Accuracy</TableHead>
                  <TableHead className="text-right">Response Time</TableHead>
                  <TableHead className="text-right">Consistency</TableHead>
                  <TableHead className="text-right">Feedback</TableHead>
                  <TableHead className="text-right">Users</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoaches.map((coach) => (
                  <TableRow
                    key={coach.id}
                    className={
                      selectedCoach === coach.id ? "bg-primary/5" : undefined
                    }
                    onClick={() => handleCoachSelect(coach.id)}
                  >
                    <TableCell className="font-medium">{coach.name}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          coach.status === "completed"
                            ? "bg-green-500"
                            : coach.status === "in-progress"
                            ? "bg-blue-500"
                            : coach.status === "scheduled"
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }
                      >
                        {coach.status === "completed"
                          ? "Completed"
                          : coach.status === "in-progress"
                          ? "In Progress"
                          : coach.status === "scheduled"
                          ? "Scheduled"
                          : "Needs Update"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(coach.lastTrained).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {coach.accuracy}%
                    </TableCell>
                    <TableCell className="text-right">
                      {coach.responseTime}ms
                    </TableCell>
                    <TableCell className="text-right">
                      {coach.consistency}%
                    </TableCell>
                    <TableCell className="text-right">
                      {coach.feedbackScore}/5.0
                    </TableCell>
                    <TableCell className="text-right">
                      {coach.userCount}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {selectedCoach && (
            <Card>
              <CardHeader>
                <CardTitle>Coach Training Details</CardTitle>
                <CardDescription>
                  {coachTrainingData.find((c) => c.id === selectedCoach)?.name}{" "}
                  training metrics and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="metrics">
                  <TabsList className="mb-4">
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                    <TabsTrigger value="files">Knowledge Files</TabsTrigger>
                    <TabsTrigger value="settings">
                      Training Settings
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="metrics">
                    <MonitoringMetrics
                      language={language}
                      trainingStatus={trainingStatus}
                      userActivityData={[]}
                      userData={[]}
                    />
                  </TabsContent>

                  <TabsContent value="files">
                    <p className="text-muted-foreground mb-4">
                      Knowledge files associated with this coach
                    </p>
                  </TabsContent>

                  <TabsContent value="settings">
                    <p className="text-muted-foreground mb-4">
                      Training settings for this coach
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Knowledge Base Tab */}
        <TabsContent value="knowledge-base" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={
                  language === "english"
                    ? "Search knowledge base..."
                    : "지식 베이스 검색..."
                }
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={coachFilter} onValueChange={setCoachFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by coach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Coaches</SelectItem>
                  {coachTrainingData.map((coach) => (
                    <SelectItem key={coach.id} value={coach.name}>
                      {coach.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={() => setUploadDialogOpen(true)}>
                <IconUpload className="h-4 w-4 mr-2" />
                {language === "english" ? "Upload" : "업로드"}
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Associated Coaches</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKB.map((kb) => (
                  <TableRow key={kb.id}>
                    <TableCell className="font-medium">{kb.name}</TableCell>
                    <TableCell>{kb.type}</TableCell>
                    <TableCell>{kb.size}</TableCell>
                    <TableCell>
                      {new Date(kb.uploadDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {kb.coaches.map((coach, idx) => (
                          <Badge key={idx.toString()} variant="outline">
                            {coach}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <IconChartBar className="h-5 w-5 mr-2" />
                    {language === "english" ? "System Metrics" : "시스템 지표"}
                  </div>
                </CardTitle>
                <CardDescription>
                  {language === "english"
                    ? "Platform-wide training metrics and performance"
                    : "플랫폼 전체 훈련 지표 및 성능"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MonitoringMetrics
                  language={language}
                  trainingStatus={trainingStatus}
                  userActivityData={[]}
                  userData={[]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <IconAlertTriangle className="h-5 w-5 mr-2" />
                    {language === "english" ? "System Alerts" : "시스템 알림"}
                  </div>
                </CardTitle>
                <CardDescription>
                  {language === "english"
                    ? "Alerts and notifications requiring attention"
                    : "주의가 필요한 알림 및 통지"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <AlertsPanel language={language} />
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <IconMessageCircle className="h-5 w-5 mr-2" />
                    {language === "english" ? "Message Logs" : "메시지 로그"}
                  </div>
                </CardTitle>
                <CardDescription>
                  {language === "english"
                    ? "Recent interactions across all coach instances"
                    : "모든 코치 인스턴스에서의 최근 상호작용"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChatbotMessageLog language={language} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

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
