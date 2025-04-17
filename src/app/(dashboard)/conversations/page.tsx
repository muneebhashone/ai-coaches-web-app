"use client";

import { useState } from "react";
import {
  IconUser,
  IconSearch,
  IconCalendar,
  IconMessageCircle,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockConversations } from "@/lib/mock-conversations";

export default function ConversationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState<"today" | "week" | "month">(
    "today"
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filter messages based on search query
  const filteredConversations = mockConversations.filter((conversation) => {
    const matchesTitle = conversation.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesParticipants = conversation.participants.some((participant) =>
      participant.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesContent = conversation.messages.some((message) =>
      message.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesTitle || matchesParticipants || matchesContent;
  });

  // Sort conversations by last activity (most recent first)
  const sortedConversations = [...filteredConversations].sort(
    (a, b) =>
      new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Past Conversations</h3>
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
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search conversations..."
          className="pl-8 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {sortedConversations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No conversations found.
          </div>
        ) : (
          sortedConversations.map((conversation) => (
            <a
              key={conversation.id}
              href={`/conversations/${conversation.id}`}
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 w-full border rounded-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <IconUser className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">
                    {conversation.title}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <span>{formatDate(conversation.lastActivity)}</span>
                    <span>•</span>
                    <span>
                      with{" "}
                      {conversation.participants
                        .filter((p) => p !== "User")
                        .join(", ")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="text-xs">
                  <IconMessageCircle className="h-3 w-3 mr-1" />
                  {conversation.messages.length}
                </Badge>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
