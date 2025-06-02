"use client";

import { useState } from "react";
import { Send, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useOptimisticMessages } from "@/hooks/use-optimistic-messages";
import React from "react";

interface MessageInputProps {
  chatId: string;
  onMessageSent?: () => void;
  onWaitingForResponseChange?: (isWaiting: boolean) => void;
}

export function MessageInput({
  chatId,
  onMessageSent,
  onWaitingForResponseChange,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const {
    sendMessage,
    retryPendingMessage,
    clearPendingMessage,
    pendingMessage,
    isWaitingForResponse,
    isError,
  } = useOptimisticMessages({ chatId, onMessageSent });

  // Notify parent about waiting state changes
  React.useEffect(() => {
    onWaitingForResponseChange?.(isWaitingForResponse);
  }, [isWaitingForResponse, onWaitingForResponseChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    const messageToSend = message.trim();
    setMessage("");

    await sendMessage(messageToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-border bg-card p-4">
      {/* Error state with retry option */}
      {isError && pendingMessage && (
        <div className="mb-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-destructive font-medium">
                Failed to send message
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {pendingMessage}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={retryPendingMessage}
                className="h-8"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Retry
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={clearPendingMessage}
                className="h-8"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 min-h-[44px] max-h-32 resize-none"
        />

        <Button
          type="submit"
          size="icon"
          disabled={!message.trim()}
          className="h-11 w-11"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
