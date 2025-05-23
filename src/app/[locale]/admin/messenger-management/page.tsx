"use client";

import { useState } from "react";
import {
  IconMessageForward,
  IconLanguage,
  IconUsers,
} from "@tabler/icons-react";
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Re-using the existing messenger management components
import { ConnectionStatus } from "@/components/messenger-management/connection-status";
import { MessageLogs } from "@/components/messenger-management/message-logs";
import { MessageSender } from "@/components/messenger-management/message-sender";
import { TemplateManager } from "@/components/messenger-management/template-manager";
import { ChatbotTestConsole } from "@/components/messenger-management/chatbot-test-console";
import { ExportTools } from "@/components/messenger-management/export-tools";

export default function AdminMessengerManagementPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english");
  const [selectedCoach, setSelectedCoach] = useState<string>("all");

  // Mock coaches data
  const coaches = [
    { id: "coach-1", name: "Sarah Kim" },
    { id: "coach-2", name: "David Park" },
    { id: "coach-3", name: "Jessica Lee" },
    { id: "coach-4", name: "Michael Jung" },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <IconMessageForward className="h-5 w-5 text-red-500" />
          <h1 className="text-2xl font-semibold tracking-tight">
            {language === "english" ? "Messenger Management" : "메신저 관리"}
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

      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <IconUsers className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {language === "english" ? "Filter by Coach:" : "코치별 필터링:"}
          </span>
        </div>
        <Select value={selectedCoach} onValueChange={setSelectedCoach}>
          <SelectTrigger className="w-[200px]">
            <SelectValue
              placeholder={language === "english" ? "All Coaches" : "모든 코치"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {language === "english" ? "All Coaches" : "모든 코치"}
            </SelectItem>
            {coaches.map((coach) => (
              <SelectItem key={coach.id} value={coach.id}>
                {coach.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="connections">
        <TabsList className="grid grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="connections">
            {language === "english" ? "Connections" : "연결"}
          </TabsTrigger>
          <TabsTrigger value="messages">
            {language === "english" ? "Messages" : "메시지"}
          </TabsTrigger>
          <TabsTrigger value="templates">
            {language === "english" ? "Templates" : "템플릿"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ConnectionStatus />
            <ExportTools />
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <MessageLogs />
            </div>
            <div className="space-y-4">
              <MessageSender />
              <ChatbotTestConsole />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <Card>
            <TemplateManager />
            {/* Note: We'd need to update the TemplateManager to handle admin functionality */}
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
