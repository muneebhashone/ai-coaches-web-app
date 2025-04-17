"use client";

import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { format } from "date-fns";
import type { Message } from "@/lib/mock-conversations";

// Export the type for use in the page component
export interface Conversation {
  id: string;
  title: string;
  participants: string[];
  messages: Message[];
  lastActivity: string;
}

interface ConversationClientProps {
  conversation: Conversation;
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender.toLowerCase().includes("user");
  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? "flex-row-reverse" : ""
      } hover:bg-accent/5 p-2 rounded-lg transition-colors`}
    >
      <Avatar
        className={`h-8 w-8 flex justify-center items-center ${
          isUser ? "bg-primary" : "bg-secondary"
        }`}
      >
        <span
          className={`${
            isUser ? "text-primary-foreground" : "text-secondary-foreground"
          } font-medium`}
        >
          {message.sender.charAt(0)}
        </span>
      </Avatar>
      <div
        className={`flex flex-col ${
          isUser ? "items-end" : "items-start"
        } max-w-[80%]`}
      >
        <div
          className={`rounded-lg px-4 py-2 ${
            isUser ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {format(new Date(message.timestamp), "MMM d, h:mm a")}
        </span>
      </div>
    </div>
  );
}

function MessageList({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollArea className="h-[calc(100vh-200px)] pr-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">
            No messages in this conversation.
          </p>
        </div>
      ) : (
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </ScrollArea>
  );
}

// Generate mock conversation data
export const generateMockConversation = (id: string): Conversation => {
  return {
    id,
    title: "Project Discussion",
    participants: ["User", "Coach Smith"],
    lastActivity: new Date().toISOString(),
    messages: [
      {
        id: "msg1",
        sender: "Coach Smith",
        text: "Hello! How's your progress with the project coming along?",
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
      },
      {
        id: "msg2",
        sender: "User",
        text: "Hi Coach! I've completed the initial research phase and outlined the main requirements.",
        timestamp: new Date(Date.now() - 86400000 * 3 + 3600000).toISOString(), // 3 days ago + 1 hour
      },
      {
        id: "msg3",
        sender: "Coach Smith",
        text: "That's great progress! Have you started thinking about the implementation strategy yet?",
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      },
      {
        id: "msg4",
        sender: "User",
        text: "Yes, I'm considering using React with TypeScript for the frontend and Node.js for the backend. What do you think?",
        timestamp: new Date(Date.now() - 86400000 * 2 + 1800000).toISOString(), // 2 days ago + 30 min
      },
      {
        id: "msg5",
        sender: "Coach Smith",
        text: "That's a solid tech stack choice. Make sure you plan out your state management approach early. Would you like me to review your architecture diagram when it's ready?",
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: "msg6",
        sender: "User",
        text: "That would be extremely helpful! I'll have it ready by next week. Also, do you have any resources on optimizing React performance?",
        timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
      },
      {
        id: "msg7",
        sender: "Coach Smith",
        text: "Of course! I'll share some articles and videos on React performance optimization. Focus especially on memo, useMemo, and useCallback for component optimization.",
        timestamp: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
      },
    ],
  };
};

export default function ConversationClient({
  conversation,
}: ConversationClientProps) {
  return (
    <Card className="flex-grow flex flex-col w-full overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-semibold">{conversation.title}</h3>
        <p className="text-sm text-muted-foreground">
          Last activity:{" "}
          {format(new Date(conversation.lastActivity), "MMM d, yyyy")}
        </p>
      </div>

      <div className="flex-grow overflow-hidden">
        <MessageList messages={conversation.messages} />
      </div>

      <div className="p-3 border-t bg-muted/30 flex items-center justify-center">
        <p className="text-sm text-center w-full text-muted-foreground">
          This is a past conversation. View only.
        </p>
      </div>
    </Card>
  );
}
