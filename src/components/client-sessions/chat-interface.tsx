"use client";

import { useEffect, useRef, useState } from "react";
import { useChats, useStartChat } from "@/services/chats/chat.hooks";
import { useSession } from "@/services/sessions/session.hooks";
import { MessageBubble } from "./message-bubble";
import { MessageInput } from "./message-input";
import { EmptyChatState } from "./empty-chat-state";
import { TypingIndicator } from "./typing-indicator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useClientGetMe } from "@/services/client-auth/client-auth.hooks";

interface ChatInterfaceProps {
  sessionId: string | null;
}

export function ChatInterface({ sessionId }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const { data: client } = useClientGetMe();

  const { data: sessionResponse } = useSession(sessionId || "");
  const { data: chatsResponse, isLoading: chatsLoading } = useChats({
    page: 1,
    limit: 10,
    sessionId: sessionId || undefined,
    clientId: client?.data?._id || undefined,
  });

  const startChatMutation = useStartChat();
  const session = sessionResponse?.data;
  const chats = chatsResponse?.data?.results || [];
  const currentChat = chats[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages, isWaitingForResponse]);

  const handleStartChat = async () => {
    if (!sessionId || !client?.data?._id) return;

    try {
      await startChatMutation.mutateAsync({
        clientId: client.data._id,
        sessionId,
      });
    } catch (error) {
      console.error("Failed to start chat:", error);
    }
  };

  if (!sessionId) {
    return <EmptyChatState />;
  }

  if (chatsLoading) {
    return (
      <div className="flex flex-col h-[calc(100vh-2rem)] max-h-[800px] bg-background border rounded-lg overflow-hidden">
        <div className="border-b border-border p-4 flex-shrink-0">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32 mt-2" />
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto min-h-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen  bg-background border rounded-lg overflow-hidden">
      {/* Chat Header */}
      {session && (
        <div className="border-b border-border p-4 bg-card flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {session.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {format(new Date(session.sessionDate), "MMM dd, yyyy • HH:mm")}{" "}
                • {session.duration}
              </p>
            </div>
            <Badge
              variant="secondary"
              className={
                session.status === "active"
                  ? "bg-success text-success-foreground"
                  : "bg-muted text-muted-foreground"
              }
            >
              {session.status}
            </Badge>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {!currentChat ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-muted-foreground mb-4">
              No chat started for this session yet.
            </p>
            <Button
              onClick={handleStartChat}
              disabled={startChatMutation.isPending}
            >
              {startChatMutation.isPending && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
              )}
              {startChatMutation.isPending ? "Starting..." : "Start Chat"}
            </Button>
          </div>
        ) : currentChat.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-muted-foreground">
              Chat is ready! Send your first message below.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentChat.messages.map((message) => (
              <MessageBubble key={message._id} message={message} />
            ))}
            {isWaitingForResponse && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      {currentChat && (
        <div className="flex-shrink-0">
          <MessageInput
            chatId={currentChat._id}
            onMessageSent={() => {
              // With optimistic updates, scroll happens immediately
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            onWaitingForResponseChange={setIsWaitingForResponse}
          />
        </div>
      )}
    </div>
  );
}
