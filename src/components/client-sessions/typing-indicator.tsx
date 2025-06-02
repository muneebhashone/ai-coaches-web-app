"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs bg-muted text-muted-foreground">
          AI
        </AvatarFallback>
      </Avatar>

      {/* Typing Content */}
      <div className="flex flex-col max-w-[70%]">
        <div className="px-3 py-2 rounded-lg bg-muted text-foreground">
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">
              Coach is typing
            </span>
            <div className="flex gap-1 ml-2">
              <div
                className="h-1 w-1 bg-muted-foreground/60 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="h-1 w-1 bg-muted-foreground/60 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="h-1 w-1 bg-muted-foreground/60 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
