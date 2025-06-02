"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { IMessage } from "@/services/chats/chat.types";

interface MessageBubbleProps {
  message: IMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isClient = message.role === "client";
  const isOptimistic = message._id.startsWith("temp-");

  return (
    <div className={cn("flex gap-3", isClient && "flex-row-reverse")}>
      {/* Avatar */}
      <Avatar className="h-8 w-8">
        <AvatarFallback
          className={cn(
            "text-xs",
            isClient
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {isClient ? "ME" : "AI"}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className={cn("flex flex-col max-w-[70%]", isClient && "items-end")}>
        <div
          className={cn(
            "px-3 py-2 rounded-lg",
            isClient
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground",
            isOptimistic && "opacity-70" // Visual indicator for pending messages
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>

        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-muted-foreground">
            {format(new Date(message.createdAt), "HH:mm")}
          </span>
          {isOptimistic && (
            <div className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground/50" />
          )}
        </div>
      </div>
    </div>
  );
}
