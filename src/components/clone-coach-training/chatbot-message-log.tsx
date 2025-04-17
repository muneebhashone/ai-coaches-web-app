"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  IconUser,
  IconRobot,
  IconSearch,
  IconCalendar,
  IconChevronDown,
  IconChevronRight,
  IconMessageCircle,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ChatbotMessageLogProps {
  language: "english" | "korean";
}

// Mock data for chatbot messages
const mockMessages = [
  {
    id: "msg-1",
    user: {
      id: "user-1",
      name: "Sarah Johnson",
    },
    date: "2024-04-17T09:30:00Z",
    messages: [
      {
        id: "chat-1-1",
        sender: "user",
        content: "I've been feeling really stressed about work lately.",
        timestamp: "2024-04-17T09:30:00Z",
      },
      {
        id: "chat-1-2",
        sender: "coach",
        content:
          "I understand that work stress can be challenging. Could you tell me more about what's been causing this stress?",
        timestamp: "2024-04-17T09:31:00Z",
      },
      {
        id: "chat-1-3",
        sender: "user",
        content:
          "I have too many deadlines and my manager keeps adding more tasks.",
        timestamp: "2024-04-17T09:32:00Z",
      },
      {
        id: "chat-1-4",
        sender: "coach",
        content:
          "That sounds overwhelming. Have you tried prioritizing your tasks or discussing your workload with your manager?",
        timestamp: "2024-04-17T09:33:00Z",
      },
    ],
  },
  {
    id: "msg-2",
    user: {
      id: "user-2",
      name: "Michael Chen",
    },
    date: "2024-04-17T10:15:00Z",
    messages: [
      {
        id: "chat-2-1",
        sender: "user",
        content: "I've been having trouble sleeping lately.",
        timestamp: "2024-04-17T10:15:00Z",
      },
      {
        id: "chat-2-2",
        sender: "coach",
        content:
          "I'm sorry to hear that. Sleep issues can affect many aspects of your wellbeing. What time do you usually go to bed?",
        timestamp: "2024-04-17T10:16:00Z",
      },
      {
        id: "chat-2-3",
        sender: "user",
        content:
          "Around midnight, but I often find myself scrolling on my phone until 1 or 2 AM.",
        timestamp: "2024-04-17T10:17:00Z",
      },
    ],
  },
  {
    id: "msg-3",
    user: {
      id: "user-3",
      name: "Emma Wilson",
    },
    date: "2024-04-17T11:45:00Z",
    messages: [
      {
        id: "chat-3-1",
        sender: "user",
        content:
          "I completed the meditation exercise you recommended. It really helped!",
        timestamp: "2024-04-17T11:45:00Z",
      },
      {
        id: "chat-3-2",
        sender: "coach",
        content:
          "That's wonderful to hear, Emma! I'm glad the meditation was helpful. How did you feel afterward?",
        timestamp: "2024-04-17T11:46:00Z",
      },
    ],
  },
];

export function ChatbotMessageLog({ language }: ChatbotMessageLogProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedConversation, setExpandedConversation] = useState<
    string | null
  >(null);
  const [timeFilter, setTimeFilter] = useState<"today" | "week" | "month">(
    "today"
  );

  const toggleConversation = (conversationId: string) => {
    if (expandedConversation === conversationId) {
      setExpandedConversation(null);
    } else {
      setExpandedConversation(conversationId);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString(
      language === "english" ? "en-US" : "ko-KR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === "english" ? "en-US" : "ko-KR",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  // Filter messages based on search query
  const filteredMessages = mockMessages.filter((conversation) => {
    const matchesUser = conversation.user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesContent = conversation.messages.some((message) =>
      message.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesUser || matchesContent;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">
          {language === "english" ? "Recent Conversations" : "최근 대화"}
        </h3>
        <Select
          value={timeFilter}
          onValueChange={(value) =>
            setTimeFilter(value as "today" | "week" | "month")
          }
        >
          <SelectTrigger className="w-[130px] h-8 text-xs">
            <IconCalendar className="h-3.5 w-3.5 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">
              {language === "english" ? "Today" : "오늘"}
            </SelectItem>
            <SelectItem value="week">
              {language === "english" ? "This Week" : "이번 주"}
            </SelectItem>
            <SelectItem value="month">
              {language === "english" ? "This Month" : "이번 달"}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={
            language === "english" ? "Search conversations..." : "대화 검색..."
          }
          className="pl-8 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            {language === "english"
              ? "No conversations found."
              : "대화를 찾을 수 없습니다."}
          </div>
        ) : (
          filteredMessages.map((conversation) => (
            <Collapsible
              key={conversation.id}
              open={expandedConversation === conversation.id}
              onOpenChange={() => toggleConversation(conversation.id)}
              className="border rounded-md overflow-hidden"
            >
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <IconUser className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {conversation.user.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(conversation.date)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <IconMessageCircle className="h-3 w-3 mr-1" />
                      {conversation.messages.length}
                    </Badge>
                    {expandedConversation === conversation.id ? (
                      <IconChevronDown className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <IconChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Separator />
                <div className="p-3 space-y-3 bg-muted/30">
                  {conversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${
                        message.sender === "user" ? "" : "justify-end"
                      }`}
                    >
                      {message.sender === "user" && (
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <IconUser className="h-3 w-3 text-primary" />
                        </div>
                      )}
                      <div
                        className={`rounded-lg px-3 py-2 text-sm max-w-[80%] ${
                          message.sender === "user"
                            ? "bg-muted"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <div>{message.content}</div>
                        <div
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-muted-foreground"
                              : "text-primary-foreground/80"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                      {message.sender === "coach" && (
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                          <IconRobot className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.push("/conversations")}
      >
        {language === "english" ? "View All Conversations" : "모든 대화 보기"}
      </Button>
    </div>
  );
}
