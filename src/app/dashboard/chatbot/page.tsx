"use client";

import { useState } from "react";
import {
  IconMessageChatbot,
  IconLanguage,
  IconSend,
  IconSettings,
  IconMessageCircle,
  IconUser,
  IconRobot,
  IconPalette,
  IconForms,
  IconBrain,
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
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { TrainingStatusDashboard } from "@/components/chatbot/training-status-dashboard";
import { IntegrationStatus } from "@/components/knowledge-base/integration-status";
import { CoachInstructionsDialog } from "@/components/chatbot/coach-instructions-dialog";
import type { CoachInstructionsData } from "@/components/chatbot/coach-instructions-form";

// Mock chat messages
const initialMessages = [
  {
    role: "assistant",
    content: "Hello! I'm your AI coaching assistant. How can I help you today?",
    timestamp: "10:30 AM",
  },
  {
    role: "user",
    content: "I've been struggling with time management lately.",
    timestamp: "10:31 AM",
  },
  {
    role: "assistant",
    content:
      "I understand how challenging time management can be. Let's work on this together. Could you tell me more about your current routine and what specific areas you're finding difficult?",
    timestamp: "10:31 AM",
  },
  {
    role: "user",
    content:
      "I have trouble prioritizing tasks and often end up procrastinating.",
    timestamp: "10:32 AM",
  },
  {
    role: "assistant",
    content:
      "That's a common challenge. Let's start by breaking down your approach to prioritization. Have you tried using any specific methods like the Eisenhower Matrix (urgent/important grid) or time-blocking?",
    timestamp: "10:32 AM",
  },
];

// Mock training status data
const mockTrainingStatus = {
  status: "training" as const,
  lastUpdated: new Date().toLocaleString(),
  metrics: {
    accuracy: {
      name: "Accuracy",
      value: 85,
      change: 2.5,
      target: 95,
    },
    responseTime: {
      name: "Response Time",
      value: 250,
      change: -50,
      target: 200,
    },
    consistency: {
      name: "Consistency",
      value: 90,
      change: 5,
      target: 95,
    },
  },
  activeKnowledgeBase: [
    {
      id: "kb-1",
      name: "Coaching Methodology Guide",
      type: "PDF Document",
      active: true,
      lastUpdated: "2024-04-10 14:30",
    },
    {
      id: "kb-2",
      name: "Communication Techniques",
      type: "Text Document",
      active: true,
      lastUpdated: "2024-04-12 09:15",
    },
    {
      id: "kb-3",
      name: "Goal Setting Framework",
      type: "Spreadsheet",
      active: true,
      lastUpdated: "2024-04-08 16:45",
    },
    {
      id: "kb-4",
      name: "Emotional Intelligence Assessment",
      type: "PDF Document",
      active: false,
      lastUpdated: "2024-04-05 11:20",
    },
  ],
  chatbotTone: {
    name: "Empathetic Coach",
    description: {
      english:
        "Focuses on understanding client emotions and providing supportive guidance with a warm, encouraging tone.",
      korean:
        "고객의 감정을 이해하고 따뜻하고 격려하는 톤으로 지원적인 안내를 제공하는 데 중점을 둡니다.",
    },
    active: true,
  },
};

// Mock integration items
const mockIntegrationItems = [
  {
    id: "1",
    name: "Coaching Methodology Guide",
    type: "guide" as const,
    status: "integrated" as const,
  },
  {
    id: "2",
    name: "Communication Techniques",
    type: "document" as const,
    status: "integrating" as const,
    progress: 75,
  },
  {
    id: "3",
    name: "Goal Setting Framework",
    type: "article" as const,
    status: "integrated" as const,
  },
];

export default function ChatbotPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english");
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#0ea5e9");
  const [chatbotName, setChatbotName] = useState("Coach Assistant");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hello! I'm your AI coaching assistant. How can I help you today?"
  );
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      role: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        role: "assistant",
        content:
          "Thank you for sharing that. I've noted your concerns. This is a demo, so I'm providing a generic response, but the actual AI would give personalized coaching advice based on your input.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleInstructionsSubmit = (data: CoachInstructionsData) => {
    console.log("Coach instructions submitted:", data);
    setInstructionsOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <IconMessageChatbot className="h-5 w-5" />
        <h1 className="text-xl font-semibold">
          {language === "english" ? "Chatbot" : "챗봇"}
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

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="preview">
            <IconMessageCircle className="h-4 w-4 mr-2" />
            {language === "english" ? "Preview" : "미리보기"}
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <IconPalette className="h-4 w-4 mr-2" />
            {language === "english" ? "Appearance" : "외관"}
          </TabsTrigger>
          <TabsTrigger value="behavior">
            <IconSettings className="h-4 w-4 mr-2" />
            {language === "english" ? "Behavior" : "동작"}
          </TabsTrigger>
          <TabsTrigger value="training">
            <IconBrain className="h-4 w-4 mr-2" />
            {language === "english" ? "Training" : "학습"}
          </TabsTrigger>
          <TabsTrigger value="embed">
            <IconForms className="h-4 w-4 mr-2" />
            {language === "english" ? "Embed Code" : "임베드 코드"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>
                    {language === "english"
                      ? "Chatbot Preview"
                      : "챗봇 미리보기"}
                  </CardTitle>
                  <CardDescription>
                    {language === "english"
                      ? "This is how your chatbot will appear to users"
                      : "사용자에게 보여질 챗봇 모습입니다"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden shadow-md max-w-md mx-auto">
                    {/* Chat header */}
                    <div
                      className="p-4 flex items-center"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <IconRobot className="h-6 w-6 mr-2 text-white" />
                      <span className="text-white font-medium">
                        {chatbotName}
                      </span>
                    </div>

                    {/* Chat messages */}
                    <div className="bg-muted/20 h-96 overflow-y-auto p-4 flex flex-col gap-3">
                      {messages.map((message, i) => (
                        <div
                          key={i}
                          className={`flex ${
                            message.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`
                              max-w-[80%] rounded-lg p-3
                              ${
                                message.role === "user"
                                  ? "bg-primary text-primary-foreground ml-auto"
                                  : "bg-muted"
                              }
                            `}
                            style={
                              message.role === "user"
                                ? { backgroundColor: primaryColor }
                                : {}
                            }
                          >
                            <div className="flex items-start">
                              {message.role === "assistant" && (
                                <IconRobot className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                              )}
                              <div>
                                <p className="text-sm">{message.content}</p>
                                <div className="text-xs opacity-70 mt-1 text-right">
                                  {message.timestamp}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat input */}
                    <div className="p-3 border-t flex gap-2">
                      <Input
                        placeholder={
                          language === "english"
                            ? "Type your message..."
                            : "메시지 입력..."
                        }
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        style={{ backgroundColor: primaryColor }}
                      >
                        <IconSend className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>

            <div>
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>
                    {language === "english" ? "Quick Settings" : "빠른 설정"}
                  </CardTitle>
                  <CardDescription>
                    {language === "english"
                      ? "Adjust basic chatbot settings"
                      : "기본 챗봇 설정 조정"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="chatbotName"
                        className="text-sm font-medium mb-2 block"
                      >
                        {language === "english" ? "Chatbot Name" : "챗봇 이름"}
                      </label>
                      <Input
                        id="chatbotName"
                        value={chatbotName}
                        onChange={(e) => setChatbotName(e.target.value)}
                        placeholder="Coach Assistant"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="primaryColor"
                        className="text-sm font-medium mb-2 block"
                      >
                        {language === "english" ? "Primary Color" : "주요 색상"}
                      </label>
                      <Input
                        id="primaryColor"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="chatInput" className="sr-only">
                        {language === "english" ? "Chat input" : "채팅 입력"}
                      </label>
                      <Input
                        id="chatInput"
                        placeholder={
                          language === "english"
                            ? "Type your message..."
                            : "메시지 입력..."
                        }
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                        style={{ backgroundColor: primaryColor }}
                      >
                        <IconSend className="h-5 w-5" />
                      </Button>
                    </div>

                    <div>
                      <label
                        htmlFor="chatAvailability"
                        className="text-sm font-medium mb-2 block"
                      >
                        {language === "english"
                          ? "Chatbot Availability"
                          : "챗봇 가용성"}
                      </label>
                      <div
                        id="chatAvailability"
                        className="grid grid-cols-1 md:grid-cols-3 gap-2"
                      >
                        <Button
                          variant="outline"
                          className="justify-start"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              // Handle availability selection
                            }
                          }}
                        >
                          {language === "english"
                            ? "Always Online"
                            : "항상 온라인"}
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-start"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              // Handle availability selection
                            }
                          }}
                        >
                          {language === "english"
                            ? "Business Hours Only"
                            : "영업 시간만"}
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-start"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              // Handle availability selection
                            }
                          }}
                        >
                          {language === "english"
                            ? "Custom Schedule"
                            : "사용자 정의 일정"}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="windowPosition"
                        className="text-sm font-medium mb-2 block"
                      >
                        {language === "english"
                          ? "Chat Window Position"
                          : "채팅 창 위치"}
                      </label>
                      <div
                        id="windowPosition"
                        className="grid grid-cols-2 gap-2"
                      >
                        <Button
                          variant="outline"
                          className="justify-start"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              // Handle position selection
                            }
                          }}
                        >
                          {language === "english"
                            ? "Bottom Right"
                            : "오른쪽 하단"}
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-start"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              // Handle position selection
                            }
                          }}
                        >
                          {language === "english" ? "Bottom Left" : "왼쪽 하단"}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="buttonIcon"
                        className="text-sm font-medium mb-2 block"
                      >
                        {language === "english" ? "Button Icon" : "버튼 아이콘"}
                      </label>
                      <div id="buttonIcon" className="grid grid-cols-3 gap-2">
                        <Button
                          variant="outline"
                          className="justify-center"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              // Handle icon selection
                            }
                          }}
                        >
                          <IconMessageCircle className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-center"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              // Handle icon selection
                            }
                          }}
                        >
                          <IconRobot className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-center"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              // Handle icon selection
                            }
                          }}
                        >
                          <IconUser className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Button>
                        {language === "english"
                          ? "Save Changes"
                          : "변경사항 저장"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Appearance Settings" : "외관 설정"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Customize the look and feel of your chatbot"
                  : "챗봇의 모양과 느낌을 사용자 정의"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {language === "english" ? "Color Scheme" : "색상 구성표"}
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        "#0ea5e9",
                        "#8b5cf6",
                        "#10b981",
                        "#f97316",
                        "#ef4444",
                      ].map((color) => (
                        <div
                          key={color}
                          className={`w-full aspect-square rounded-md cursor-pointer transition-all ${
                            primaryColor === color
                              ? "ring-2 ring-offset-2 ring-primary"
                              : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setPrimaryColor(color)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {language === "english"
                        ? "Custom Color"
                        : "사용자 정의 색상"}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-12 h-12 p-1 border rounded cursor-pointer"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {language === "english"
                        ? "Chat Window Position"
                        : "채팅 창 위치"}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">
                        {language === "english"
                          ? "Bottom Right"
                          : "오른쪽 하단"}
                      </Button>
                      <Button variant="outline" className="justify-start">
                        {language === "english" ? "Bottom Left" : "왼쪽 하단"}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {language === "english" ? "Button Icon" : "버튼 아이콘"}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="justify-center">
                        <IconMessageCircle className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" className="justify-center">
                        <IconRobot className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" className="justify-center">
                        <IconUser className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button>
                  {language === "english" ? "Save Appearance" : "외관 저장"}
                </Button>
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Behavior Settings" : "동작 설정"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Configure how your chatbot interacts with users"
                  : "챗봇이 사용자와 상호작용하는 방식 구성"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="welcomeMessage"
                      className="text-sm font-medium mb-2 block"
                    >
                      {language === "english"
                        ? "Welcome Message"
                        : "환영 메시지"}
                    </label>
                    <Input
                      id="welcomeMessage"
                      value={welcomeMessage}
                      onChange={(e) => setWelcomeMessage(e.target.value)}
                      placeholder="Hello! How can I help you today?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="offlineMessage"
                      className="text-sm font-medium mb-2 block"
                    >
                      {language === "english"
                        ? "Offline Message"
                        : "오프라인 메시지"}
                    </label>
                    <Input
                      id="offlineMessage"
                      placeholder={
                        language === "english"
                          ? "Sorry, I'm offline right now. Please try again later."
                          : "죄송합니다. 현재 오프라인입니다. 나중에 다시 시도해주세요."
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-4">
                    {language === "english"
                      ? "User-Specific Instructions"
                      : "사용자별 지침"}
                  </h3>
                  <Button
                    variant="outline"
                    onClick={() => setInstructionsOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setInstructionsOpen(true);
                      }
                    }}
                    className="w-full"
                  >
                    {language === "english"
                      ? "Configure User Instructions"
                      : "사용자 지침 구성"}
                  </Button>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {language === "english"
                      ? "Chatbot Availability"
                      : "챗봇 가용성"}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <Button variant="outline" className="justify-start">
                      {language === "english" ? "Always Online" : "항상 온라인"}
                    </Button>
                    <Button variant="outline" className="justify-start">
                      {language === "english"
                        ? "Business Hours Only"
                        : "영업 시간만"}
                    </Button>
                    <Button variant="outline" className="justify-start">
                      {language === "english"
                        ? "Custom Schedule"
                        : "사용자 정의 일정"}
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">
                    {language === "english"
                      ? "Conversation Options"
                      : "대화 옵션"}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">
                        {language === "english"
                          ? "Save Conversation History"
                          : "대화 기록 저장"}
                      </label>
                      <Toggle />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">
                        {language === "english"
                          ? "Show Typing Indicator"
                          : "입력 표시기 표시"}
                      </label>
                      <Toggle defaultPressed />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">
                        {language === "english"
                          ? "Allow File Attachments"
                          : "파일 첨부 허용"}
                      </label>
                      <Toggle />
                    </div>
                  </div>
                </div>

                <Button>
                  {language === "english" ? "Save Behavior" : "동작 저장"}
                </Button>
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Training Status" : "학습 상태"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Monitor your chatbot's training progress and performance"
                  : "챗봇의 학습 진행 상황과 성능을 모니터링하세요"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrainingStatusDashboard
                status={mockTrainingStatus}
                language={language}
              />
            </CardContent>
          </AnimatedCard>

          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Knowledge Integration" : "지식 통합"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Track the integration status of your knowledge base materials"
                  : "지식 베이스 자료의 통합 상태를 추적하세요"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IntegrationStatus
                items={mockIntegrationItems}
                language={language}
              />
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="embed" className="space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Embed Your Chatbot" : "챗봇 임베드"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Add your chatbot to your website or application"
                  : "웹사이트나 애플리케이션에 챗봇 추가"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {language === "english"
                      ? "Website Script"
                      : "웹사이트 스크립트"}
                  </label>
                  <div className="bg-muted/50 p-4 rounded-md overflow-x-auto">
                    <pre className="text-xs">
                      {`<script>
  window.coachChatConfig = {
    chatbotId: "coach-${Math.random().toString(36).substring(2, 8)}",
    position: "right",
    primaryColor: "${primaryColor}",
    language: "${language}"
  };
</script>
<script async src="https://ai-coach.example.com/chat-widget.js"></script>`}
                    </pre>
                  </div>
                </div>

                <Button variant="outline">
                  {language === "english" ? "Copy Code" : "코드 복사"}
                </Button>

                <Separator />

                <div>
                  <CardTitle className="text-lg mb-2">
                    {language === "english" ? "Direct Link" : "직접 링크"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "english"
                      ? "Share this link to allow anyone to chat with your AI coach"
                      : "이 링크를 공유하여 누구나 AI 코치와 채팅할 수 있도록 허용"}
                  </p>
                  <div className="bg-muted/50 p-4 rounded-md">
                    <p className="break-all text-sm">
                      https://ai-coach.example.com/chat/
                      {`coach-${Math.random().toString(36).substring(2, 8)}`}
                    </p>
                  </div>
                </div>

                <Button variant="outline">
                  {language === "english" ? "Copy Link" : "링크 복사"}
                </Button>
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>
      </Tabs>

      <CoachInstructionsDialog
        open={instructionsOpen}
        onOpenChange={setInstructionsOpen}
        language={language}
        onSubmit={handleInstructionsSubmit}
      />
    </>
  );
}
