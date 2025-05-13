import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Messenger Management",
  description: "Manage messaging connections, view logs, and send messages.",
};

import { ConnectionStatus } from "@/components/messenger-management/connection-status";
import { MessageLogs } from "@/components/messenger-management/message-logs";
import { MessageSender } from "@/components/messenger-management/message-sender";
import { TemplateManager } from "@/components/messenger-management/template-manager";
import { ChatbotTestConsole } from "@/components/messenger-management/chatbot-test-console";
import { ExportTools } from "@/components/messenger-management/export-tools";
import { ChatbotManager } from "@/components/messenger-management/chatbot-manager";

export default function MessengerManagementPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Messenger Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage messaging connections, view logs, and send messages
          </p>
        </div>
      </div>

      <Tabs defaultValue="connections">
        <TabsList className="grid grid-cols-4 lg:w-[500px]">
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
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
          </Card>
        </TabsContent>

        <TabsContent value="chatbot" className="mt-4">
          <ChatbotManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
