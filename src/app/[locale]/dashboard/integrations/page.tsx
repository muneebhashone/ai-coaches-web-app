"use client"

import { useState } from "react"
import {
  IconPlugConnected,
  IconLanguage,
  IconBrandKakoTalk,
  IconCalendar,
  IconBrandZoom,
  IconFile,
  IconMessage,
  IconSend
} from "@tabler/icons-react"

import { AnimatedCard } from "@/components/ui/animated-card"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import the components from the components folder
import { KakaoTalkPreviewDialog, SendAnnouncementDialog } from "./components"

// Mock integration data
const messagingIntegrations = [
  {
    id: 1,
    name: "KakaoTalk",
    description: "Connect your AI coach with KakaoTalk messaging platform",
    icon: IconBrandKakoTalk,
    status: "connected",
    lastSync: "2 hours ago",
  },
]

const calendarIntegrations = [
  {
    id: 1,
    name: "Google Calendar",
    description: "Schedule coaching sessions with Google Calendar",
    icon: IconCalendar,
    status: "connected",
    lastSync: "1 day ago",
  },
  {
    id: 2,
    name: "Zoom",
    description: "Host virtual coaching sessions with Zoom",
    icon: IconBrandZoom,
    status: "disconnected",
    lastSync: null,
  },
]

const dataIntegrations = [
  {
    id: 1,
    name: "File Upload",
    description: "Upload and manage documents for knowledge base",
    icon: IconFile,
    status: "available",
    lastSync: null,
  },
]

export default function IntegrationsPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english")

  return (
    <>
      <div className="flex items-center gap-2">
        <IconPlugConnected className="h-5 w-5" />
        <h1 className="text-xl font-semibold">
          {language === "english" ? "Integrations" : "통합"}
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

      <div className="mb-6">
        <p className="text-muted-foreground">
          {language === "english"
            ? "Connect your AI coach with third-party services and platforms."
            : "AI 코치를 타사 서비스 및 플랫폼과 연결하세요."}
        </p>
      </div>

      <Tabs defaultValue="messaging" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="messaging">
            {language === "english" ? "Messaging" : "메시징"}
          </TabsTrigger>
          <TabsTrigger value="calendar">
            {language === "english" ? "Calendar & Meetings" : "캘린더 및 회의"}
          </TabsTrigger>
          <TabsTrigger value="data">
            {language === "english" ? "Data Sources" : "데이터 소스"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messaging" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messagingIntegrations.map((integration) => (
              <AnimatedCard key={integration.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <integration.icon className="h-10 w-10 text-primary" />
                    <Badge variant={integration.status === "connected" ? "default" : "outline"}>
                      {language === "english"
                        ? integration.status === "connected" ? "Connected" : "Disconnected"
                        : integration.status === "connected" ? "연결됨" : "연결 해제됨"}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{integration.name}</CardTitle>
                  <CardDescription>
                    {language === "english"
                      ? integration.description
                      : `AI 코치를 ${integration.name} 메시징 플랫폼과 연결`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {integration.status === "connected" && (
                    <div className="mb-4 text-sm text-muted-foreground">
                      {language === "english"
                        ? `Last sync: ${integration.lastSync}`
                        : `마지막 동기화: ${integration.lastSync}`}
                    </div>
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button variant={integration.status === "connected" ? "outline" : "default"}>
                      {language === "english"
                        ? integration.status === "connected" ? "Disconnect" : "Connect"
                        : integration.status === "connected" ? "연결 해제" : "연결"}
                    </Button>

                    {integration.name === "KakaoTalk" && integration.status === "connected" && (
                      <>
                        <KakaoTalkPreviewDialog language={language} />
                        <SendAnnouncementDialog language={language} />
                      </>
                    )}
                  </div>

                  {integration.name === "KakaoTalk" && integration.status === "connected" && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">
                        {language === "english" ? "Interface Options" : "인터페이스 옵션"}
                      </h4>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2">
                          <div className="bg-primary/10 p-1 rounded-md">
                            <IconMessage className="h-4 w-4" />
                          </div>
                          <div className="text-sm">
                            <p className="font-medium">
                              {language === "english" ? "Customize Chat Appearance" : "채팅 외관 사용자 정의"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {language === "english"
                                ? "Edit how your AI coach appears to users"
                                : "AI 코치가 사용자에게 어떻게 표시되는지 편집"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="bg-primary/10 p-1 rounded-md">
                            <IconSend className="h-4 w-4" />
                          </div>
                          <div className="text-sm">
                            <p className="font-medium">
                              {language === "english" ? "Bulk Messaging" : "일괄 메시징"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {language === "english"
                                ? "Send announcements to all users"
                                : "모든 사용자에게 공지사항 보내기"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {calendarIntegrations.map((integration) => (
              <AnimatedCard key={integration.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <integration.icon className="h-10 w-10 text-primary" />
                    <Badge variant={integration.status === "connected" ? "default" : "outline"}>
                      {language === "english"
                        ? integration.status === "connected" ? "Connected" : "Disconnected"
                        : integration.status === "connected" ? "연결됨" : "연결 해제됨"}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{integration.name}</CardTitle>
                  <CardDescription>
                    {language === "english"
                      ? integration.description
                      : `${integration.name}로 코칭 세션 예약`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {integration.status === "connected" && (
                    <div className="mb-4 text-sm text-muted-foreground">
                      {language === "english"
                        ? `Last sync: ${integration.lastSync}`
                        : `마지막 동기화: ${integration.lastSync}`}
                    </div>
                  )}
                  <Button variant={integration.status === "connected" ? "outline" : "default"}>
                    {language === "english"
                      ? integration.status === "connected" ? "Disconnect" : "Connect"
                      : integration.status === "connected" ? "연결 해제" : "연결"}
                  </Button>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dataIntegrations.map((integration) => (
              <AnimatedCard key={integration.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <integration.icon className="h-10 w-10 text-primary" />
                    <Badge variant={
                      integration.status === "available"
                        ? "outline"
                        : integration.status === "coming-soon" ? "secondary" : "default"
                    }>
                      {language === "english"
                        ? integration.status === "available"
                          ? "Available"
                          : integration.status === "coming-soon" ? "Coming Soon" : "Connected"
                        : integration.status === "available"
                          ? "사용 가능"
                          : integration.status === "coming-soon" ? "출시 예정" : "연결됨"}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{integration.name}</CardTitle>
                  <CardDescription>
                    {language === "english"
                      ? integration.description
                      : integration.status === "coming-soon"
                        ? "곧 제공될 예정입니다"
                        : `${integration.name} 연결`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="default"
                    disabled={integration.status === "coming-soon"}
                  >
                    {language === "english"
                      ? integration.status === "coming-soon" ? "Coming Soon" : "Configure"
                      : integration.status === "coming-soon" ? "출시 예정" : "구성"}
                  </Button>
                </CardContent>
              </AnimatedCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />
    </>
  )
} 