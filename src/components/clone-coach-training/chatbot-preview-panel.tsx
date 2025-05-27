"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { TrainingCenterPanel } from "./training-center-panel";
import { useChatbotFlowStore } from "@/stores/useChatbotFlowStore";
import { Label } from "@radix-ui/react-label";

// Mock chatbots for selection
const mockChatbots = [
  { id: "1", name: "Coach AI v2.1", status: "Trained" },
  { id: "2", name: "Wellness Coach", status: "Training" },
];

// Mock conversation
const mockMessages = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI wellness coach. How are you feeling today?",
    timestamp: "10:30 AM"
  },
  {
    id: "2", 
    role: "user",
    content: "I'm feeling quite stressed about work lately.",
    timestamp: "10:31 AM"
  },
  {
    id: "3",
    role: "assistant", 
    content: "I understand that work stress can be overwhelming. Let's explore some techniques that might help. Can you tell me what specific aspects of work are causing you the most stress?",
    timestamp: "10:31 AM"
  }
];

export function ChatbotPreviewPanel() {
  const t = useTranslations("dashboard.cloneCoachTraining.preview");
  const [messages, setMessages] = useState(mockMessages);
  const [inputMessage, setInputMessage] = useState("");

  
  const { selectedChatbot: flowChatbot } = useChatbotFlowStore();

  const selectedMockChatbot = mockChatbots.find(bot => bot.id === flowChatbot?._id);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newUserMessage = {
        id: Date.now().toString(),
        role: "user" as const,
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, newUserMessage]);
      setInputMessage("");

      // Simulate AI response after a brief delay
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant" as const,
          content: "Thank you for sharing that with me. That's a very important insight. Let me suggest a simple breathing exercise that might help you feel more centered right now...",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        {/* Chatbot Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("selectChatbot")}</Label>
      
        </div>

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
                <p className="text-sm font-medium">{flowChatbot?.name || selectedMockChatbot?.name}</p>
                <p className="text-xs text-muted-foreground">AI Coach Assistant</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
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
                  <p className={`text-xs mt-1 ${
                    message.role === "user" 
                      ? "text-primary-foreground/70" 
                      : "text-muted-foreground"
                  }`}>
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
                placeholder={t("testMessage")}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Info */}
        <div className="bg-primary/10 rounded-md p-3 text-sm">
          <p className="text-primary font-medium mb-1">🧪 Preview Mode:</p>
          <p className="text-primary/80">
            This is a test environment. Messages here don&apos;t affect real user conversations.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" size="sm">
            Clear Chat
          </Button>
          <Button variant="outline" className="flex-1" size="sm">
            Export Test Log
          </Button>
        </div>
        </CardContent>
      </Card>

      {/* Training Center Panel */}
      <TrainingCenterPanel />
    </div>
  );
}