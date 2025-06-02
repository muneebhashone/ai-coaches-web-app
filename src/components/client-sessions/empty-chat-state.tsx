"use client";

import { MessageCircle } from "lucide-react";

export function EmptyChatState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="rounded-full bg-muted p-6 mb-4">
        <MessageCircle className="h-12 w-12 text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Select a Session
      </h3>
      
      <p className="text-muted-foreground max-w-md">
        Choose a session from the left sidebar to start chatting with your AI coach.
      </p>
    </div>
  );
}