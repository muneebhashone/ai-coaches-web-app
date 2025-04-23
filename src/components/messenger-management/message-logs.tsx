"use client";

import { useState } from "react";
import { IconMessage, IconUser } from "@tabler/icons-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for message logs
const messageLogData = [
  {
    id: "1",
    user: "Kim Min-ji",
    type: "ai",
    message: "Hello! How are you feeling today?",
    timestamp: "2025-04-22T09:30:00Z",
  },
  {
    id: "2",
    user: "Kim Min-ji",
    type: "user",
    message: "I'm doing well, thanks for asking!",
    timestamp: "2025-04-22T09:31:00Z",
  },
  {
    id: "3",
    user: "Kim Min-ji",
    type: "ai",
    message:
      "Great! Would you like to review your progress on last week's goals?",
    timestamp: "2025-04-22T09:32:00Z",
  },
  {
    id: "4",
    user: "Park Ji-sung",
    type: "coach",
    message:
      "Hi Park Ji-sung, I'm following up on our last session. How is your progress with the stress reduction techniques we discussed?",
    timestamp: "2025-04-22T10:15:00Z",
  },
  {
    id: "5",
    user: "Park Ji-sung",
    type: "user",
    message:
      "I've been practicing the breathing exercises daily and they're helping a lot!",
    timestamp: "2025-04-22T10:17:00Z",
  },
];

export function MessageLogs() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");

  const users = Array.from(new Set(messageLogData.map((m) => m.user)));

  const filteredMessages = messageLogData.filter((message) => {
    if (selectedUser !== "all" && message.user !== selectedUser) return false;
    if (activeTab === "ai" && message.type !== "ai") return false;
    if (activeTab === "coach" && message.type !== "coach") return false;
    if (activeTab === "user" && message.type !== "user") return false;
    return true;
  });

  return (
    <div className="bg-card rounded-lg border shadow-sm h-full">
      <div className="flex flex-row items-center justify-between p-4 pb-2">
        <div>
          <h2 className="text-lg font-semibold">Message Logs</h2>
          <p className="text-sm text-muted-foreground">
            View history of AI and coach messages
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {users.map((user) => (
                <SelectItem key={user} value={user}>
                  {user}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Messages</TabsTrigger>
            <TabsTrigger value="ai">AI Chatbot</TabsTrigger>
            <TabsTrigger value="coach">Coach Manual</TabsTrigger>
            <TabsTrigger value="user">User Responses</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 p-3 rounded-lg ${
                    message.type === "user" ? "bg-muted/40" : "bg-muted/20"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${
                      message.type === "ai"
                        ? "bg-primary/10 text-primary"
                        : message.type === "coach"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-muted"
                    }`}
                  >
                    {message.type === "ai" ? (
                      <IconMessage size={16} />
                    ) : message.type === "coach" ? (
                      <IconUser size={16} />
                    ) : (
                      <IconUser size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {message.user}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {message.type === "ai"
                            ? "(AI Chatbot)"
                            : message.type === "coach"
                            ? "(Coach Message)"
                            : "(User)"}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
}
