"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Send, Bot, User, Calendar, Clock } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import {
  useChats,
  useSendMessage,
  useStartChat,
} from "@/services/chats/chat.hooks";
import { useGetMe } from "@/services/auth/auth.hooks";
import type { ISession } from "@/services/sessions/session.types";
import { IChat } from "@/services/chats/chat.types";
import { useChatbot } from "@/services/chatbots/chatbot.hooks";
import { useSessions } from "@/services/sessions/session.hooks";
import { useProgramByChatbotId } from "@/services/programs/program.hooks";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function ChatbotPreviewPanel({ chatbotId }: { chatbotId: string }) {
  const t = useTranslations("dashboard.cloneCoachTraining.preview");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedSession, setSelectedSession] = useState<ISession | null>(null);

  const { data: selectedChatbot } = useChatbot(chatbotId);
  const { data: programById } = useProgramByChatbotId(chatbotId);
  const { data: selectedSessions } = useSessions({
    programId: programById?.data._id || "",
    page: 1,
    limit: 100,
    active: true,
  });

  const { data: user } = useGetMe();

  const sendMessageMutation = useSendMessage();
  const startChatMutation = useStartChat();
  const { data: chats } = useChats({
    page: 1,
    limit: 100,
    clientId: user?.data._id,
    sessionId: selectedSession?._id,
  });

  const chat = chats?.data?.results?.[0] as IChat;

  useEffect(() => {
    if (chat) {
      console.log({ chatMessagesServer: chat.messages });

      setMessages(
        chat.messages.map((message) => ({
          id: message._id,
          role: message.role === "client" ? "user" : "assistant",
          content: message.content,
          timestamp: message.createdAt,
        }))
      );
    }
  }, [chat]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedChatbot || !user?.data._id || !chat)
      return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");

    try {
      await sendMessageMutation.mutateAsync({
        chatId: chat?._id || "",
        data: {
          content: inputMessage,
          role: "client",
        },
      });
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleStartChat = async () => {
    if (!selectedChatbot || !user?.data._id || !selectedSession?._id) return;

    try {
      await startChatMutation.mutateAsync({
        clientId: user.data._id,
        sessionId: selectedSession?._id || "",
      });
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  return (
    <div className="space-y-6" id="chatbot-preview-panel">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Chatbot Selection */}
          {!selectedChatbot && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {t("selectChatbot")}
              </Label>
              <p className="text-sm text-muted-foreground">
                Please select a chatbot to start preview.
              </p>
            </div>
          )}

          {/* Session Selection */}
          {selectedChatbot && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Select Session (Optional)
              </Label>
              <Select
                value={selectedSession?._id || ""}
                onValueChange={(value) => {
                  const session = selectedSessions?.data.results?.find(
                    (s) => s._id === value
                  );
                  setSelectedSession(session || null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a session or start without one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">
                    No session (general chat)
                  </SelectItem>
                  {selectedSessions?.data.results?.map((session) => (
                    <SelectItem key={session._id} value={session._id}>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>{session.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({new Date(session.sessionDate).toLocaleDateString()})
                        </span>
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{session.duration}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Chat Interface */}
          <div className="border rounded-lg">
            {/* Chat Header */}
            <div className="p-3 border-b bg-muted/50 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {selectedChatbot?.data.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    AI Coach Assistant
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-3 space-y-3">
              {!selectedSession && selectedChatbot && (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="text-center space-y-2">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Session Required
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Please select a session above to start chatting with{" "}
                      {selectedChatbot.data.name}
                    </p>
                  </div>
                </div>
              )}
              {!chat && selectedChatbot && selectedSession && (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="text-center space-y-2">
                    <Bot className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      No chat found
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Start a new conversation with {selectedChatbot.data.name}
                    </p>
                  </div>
                  <Button
                    onClick={handleStartChat}
                    disabled={startChatMutation.isPending}
                    size="sm"
                  >
                    {startChatMutation.isPending ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                        Starting Chat...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Start Chat
                      </>
                    )}
                  </Button>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-2 ${
                    message.role === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>
                      {message.role === "user" ? (
                        <User className="h-3 w-3" />
                      ) : (
                        <Bot className="h-3 w-3" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[70%] p-2 rounded-lg text-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder={
                    !selectedChatbot
                      ? "Select a chatbot first..."
                      : !selectedSession
                      ? "Select a session first..."
                      : !chat
                      ? "Start a chat first..."
                      : t("testMessage")
                  }
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && handleSendMessage()
                  }
                  className="flex-1"
                  disabled={
                    !selectedChatbot ||
                    !selectedSession ||
                    (!chat && !startChatMutation.isPending) ||
                    sendMessageMutation.isPending ||
                    startChatMutation.isPending
                  }
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  disabled={
                    !selectedChatbot ||
                    !selectedSession ||
                    !inputMessage.trim() ||
                    sendMessageMutation.isPending ||
                    startChatMutation.isPending
                  }
                >
                  {sendMessageMutation.isPending ||
                  startChatMutation.isPending ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Info */}
          <div className="bg-primary/10 rounded-md p-3 text-sm space-y-1">
            <p className="text-primary font-medium">🧪 Preview Mode</p>
            <p className="text-primary/80">
              Testing environment using your user ID as client. Messages
              won&apos;t affect real conversations.
            </p>
            {selectedSession && (
              <p className="text-primary/70 text-xs">
                Session: {selectedSession.name} | {selectedSession.duration}
              </p>
            )}
          </div>

          {/* Actions */}
        </CardContent>
      </Card>
    </div>
  );
}
