"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Send, Bot, User, Loader2, RefreshCw } from "lucide-react";
import { useChatbots, useChatbot } from "@/services/chatbot/chatbot.hooks"; // Placeholder
import { useStartChat, useSendMessage, useGetChatMessages, chatsKeys } from "@/services/chats/chats.hooks";
import type { IChatMessage } from "@/services/chats/chats.types";
import { useQueryClient } from "@tanstack/react-query";

// TODO: Replace this with actual chatbotId from context or props if not using the list
const TEMP_CHATBOT_ID = "660f00c4d92a778a6a9b3e7e"; // Example ID for selected chatbot
// TODO: This session ID should be dynamically managed (e.g., created on panel load or first message)
const TEMP_PREVIEW_SESSION_ID = `preview-session-${TEMP_CHATBOT_ID}`;

// Mock data for chatbot list (as `useChatbots` is placeholder)
const mockChatbotsForList = [
  { _id: TEMP_CHATBOT_ID, name: "Coach AI (Preview)", status: "Trained" },
  { _id: "chatbotId2", name: "Wellness Guide (Mock)", status: "Training" },
];

export function ChatbotPreviewPanel() {
  const t = useTranslations("dashboard.cloneCoachTraining.preview");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const queryClient = useQueryClient();

  const [selectedChatbotId, setSelectedChatbotId] = useState<string>(TEMP_CHATBOT_ID);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- Chatbot Selection (Placeholder) ---
  const { data: selectedChatbotFullData } = useChatbot(selectedChatbotId); // Placeholder
  const displayChatbot = selectedChatbotFullData?.data || mockChatbotsForList.find(c => c._id === selectedChatbotId);

  // --- Chat Session Management ---
  const startChatMutation = useStartChat({
    onSuccess: (response) => {
      if (response.success && response.data) {
        setCurrentChatId(response.data._id);
        toast.success(t("chatSession.startSuccess"));
        queryClient.invalidateQueries({ queryKey: chatsKeys.messagesList(response.data._id, {}) });
      } else {
        toast.error(response.message || t("chatSession.startError"));
      }
    },
    onError: (error) => {
      toast.error(error.message || t("chatSession.startError"));
    },
  });

  // --- Fetching Messages ---
  const { 
    data: messagesPages, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading: isLoadingMessages,
    refetch: refetchMessages,
  } = useGetChatMessages(
    currentChatId!, // Query is enabled only when currentChatId is not null
    { limitParam: 20, sortOrder: "asc" }, // Fetch messages sorted by time
    { enabled: !!currentChatId }
  );

  const messages: IChatMessage[] = useMemo(() => {
    return messagesPages?.pages.flatMap(page => page.data.data).reverse() || [];
  }, [messagesPages]);

  // --- Sending Messages ---
  const sendMessageMutation = useSendMessage(currentChatId!, {
    onSuccess: (response) => {
      if (response.success) {
        // Invalidate and refetch messages to get user message and AI response
        queryClient.invalidateQueries({ queryKey: chatsKeys.messagesList(currentChatId!, {}) });
        refetchMessages(); // Trigger refetch
      } else {
        toast.error(response.message || t("chatSession.sendError"));
      }
    },
    onError: (error) => {
      toast.error(error.message || t("chatSession.sendError"));
    },
  });
  
  // Initialize chat session on component mount or when selectedChatbotId changes
  useEffect(() => {
    // COMMENT: A real system might want to persist preview sessions or use a specific "preview" mode.
    // Here, we start a new chat session for the selected chatbot if one isn't active.
    // `TEMP_PREVIEW_SESSION_ID` is a simplification for client-side session tracking for this preview.
    // The `startChat` API uses `clientId` (user ID) and `chatbotId`.
    // For preview, `clientId` could be a generic preview user ID or the admin's ID.
    // For now, assuming backend handles `clientId` from auth context if not provided.
    if (selectedChatbotId) {
        // Let's always try to start a new chat for preview for simplicity of this example
        // A more robust solution might try to find an existing *preview* chat session first.
        startChatMutation.mutate({
            chatbotId: selectedChatbotId,
            // sessionId: TEMP_PREVIEW_SESSION_ID, // If API supports providing session ID
            // initialMessage: { role: "system", content: "Chat preview started." } // If API supports initial system message
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChatbotId]); // Removed startChatMutation from deps to avoid loop on error/success

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !currentChatId || sendMessageMutation.isPending) {
      return;
    }
    sendMessageMutation.mutate({ content: inputMessage, role: "user" });
    setInputMessage("");
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClearChat = () => {
    // COMMENT: This is a placeholder. A real implementation would need an API
    // to delete messages in a chat session or delete the session itself.
    // For now, it just clears the currentChatId to trigger a new session on next message.
    if (currentChatId) {
      toast.info(t("chatSession.clearPlaceholder"));
      queryClient.setQueryData(chatsKeys.messagesList(currentChatId, {}), { pages: [], pageParams: []});
      setCurrentChatId(null); // This will trigger a new session on next send or selection
      // Re-initiate a new chat session for the currently selected bot
      if (selectedChatbotId) {
          startChatMutation.mutate({ chatbotId: selectedChatbotId });
      }
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-primary" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chatbot Selection (Placeholder UI) */}
        <div className="space-y-2">
          <label className="text-sm font-medium">{t("selectChatbot")}</label>
          <Select 
            value={selectedChatbotId} 
            onValueChange={(value) => {
              setSelectedChatbotId(value);
              setCurrentChatId(null); // Reset chat session for new bot
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("selectChatbotPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {mockChatbotsForList.map((chatbot) => (
                <SelectItem key={chatbot._id} value={chatbot._id}>
                  <div className="flex items-center space-x-2">
                    <span>{chatbot.name}</span>
                    {/* @ts-ignore */}
                    <span className={`text-xs px-2 py-1 rounded ${
                      chatbot.status === "Trained" 
                        ? "bg-success/20 text-success" 
                        : "bg-warning/20 text-warning"
                    }`}>
                       {/* @ts-ignore */}
                      {chatbot.status}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* COMMENT: The chatbot's responses here are generic and based on the 'chats' service.
                     They will NOT reflect the specific prompts or configurations from the
                     'PromptConfigurationPanel' until the 'chatbot' service is fully implemented
                     and the chat interaction logic uses that configuration.
        */}
        <div className="p-2 border-l-4 border-amber-500/30 bg-amber-500/5 my-2">
            <p className="text-xs text-amber-700/80">
                <strong>{tCommon("noteTitle")}:</strong> {t("responseBehaviorNote")}
            </p>
        </div>

        {/* Chat Interface */}
        <div className="border rounded-lg">
          {/* Chat Header */}
          <div className="p-3 border-b bg-muted/50 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{displayChatbot?.name}</p>
                <p className="text-xs text-muted-foreground">{t("aiCoachAssistant")}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => refetchMessages()} disabled={isLoadingMessages || !currentChatId}>
              <RefreshCw className={`h-4 w-4 ${isLoadingMessages ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-3 space-y-3">
            {isLoadingMessages && messages.length === 0 && (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
            {!isLoadingMessages && messages.length === 0 && !currentChatId && !startChatMutation.isPending && (
                 <div className="text-center text-muted-foreground py-10">{t("chatSession.noActiveSession")}</div>
            )}
            {startChatMutation.isPending && messages.length === 0 && (
                <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" /> <p className="ml-2">{t("chatSession.starting")}</p>
                </div>
            )}
            {messages.map((message) => (
              <div
                key={message._id} // Use _id from API
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
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
             {isFetchingNextPage && <div className="text-center"><Loader2 className="h-4 w-4 animate-spin text-primary" /></div>}
          </div>

          {/* Message Input */}
          <div className="p-3 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder={t("testMessagePlaceholder")}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
                disabled={!currentChatId || sendMessageMutation.isPending || startChatMutation.isPending}
              />
              <Button 
                onClick={handleSendMessage} 
                size="sm" 
                disabled={!currentChatId || sendMessageMutation.isPending || !inputMessage.trim()}
              >
                {sendMessageMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* COMMENT: Real-time message updates (e.g., via WebSockets) are not implemented
                     by the current `chats` service hooks (which are poll-based via `refetchInterval`
                     or manual refetch). A full preview experience would ideally use WebSockets.
        */}
        <div className="p-2 border-l-4 border-blue-500/30 bg-blue-500/5 my-2">
            <p className="text-xs text-blue-700/80">
                <strong>{tCommon("noteTitle")}:</strong> {t("realtimeLimitationNote")}
            </p>
        </div>


        {/* Preview Info */}
        <div className="bg-primary/10 rounded-md p-3 text-sm">
          <p className="text-primary font-medium mb-1">🧪 {t("previewModeTitle")}:</p>
          <p className="text-primary/80">
            {t("previewModeDescription")}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" size="sm" onClick={handleClearChat} disabled={!currentChatId}>
            {t("clearChatButton")}
          </Button>
          <Button variant="outline" className="flex-1" size="sm" disabled> {/* Placeholder */}
            {t("exportTestLogButton")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}