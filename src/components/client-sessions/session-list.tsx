"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SessionListItem } from "./session-list-item";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useClientGetMe } from "@/services/client-auth/client-auth.hooks";
import { useChats } from "@/services/chats/chat.hooks";
import { Button } from "../ui/button";
import { useClientLogout } from "@/services/client-auth/client-auth.hooks";
import useClientAuthStore from "@/stores/useClientAuthStore";
import { useRouter } from "@/i18n/navigation";

interface SessionListProps {
  selectedSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
}

export function SessionList({
  selectedSessionId,
  onSessionSelect,
}: SessionListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: client } = useClientGetMe();
  const { removeToken } = useClientAuthStore();
  const router = useRouter();
  const { mutate: logout, isPending } = useClientLogout({
    onSuccess() {
      removeToken();
      router.push("/client/login");
    },
  });
  // For now, we'll fetch all sessions - later we can add clientId filter
  const { data: chats, isLoading } = useChats({
    page: 1,
    limit: 50,
    clientId: client?.data?._id,
  });

  const sessions = chats?.data?.results || [];

  // filter and sort sessions by sessionDate
  const filteredSessions = sessions
    .filter((chat) =>
      chat.session.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      return (
        new Date(b.session.sessionDate).getTime() -
        new Date(a.session.sessionDate).getTime()
      );
    })
    .toReversed();

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">My Sessions</h2>
          <Button
            variant="outline"
            onClick={() => {
              logout();
            }}
            disabled={isPending}
            size="sm"
          >
            {isPending ? "Logging out..." : "Logout"}
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))}
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            {searchQuery ? "No sessions found" : "No sessions available"}
          </div>
        ) : (
          <div>
            {filteredSessions.map((session) => (
              <SessionListItem
                key={session._id}
                session={session}
                isSelected={selectedSessionId === session._id}
                onClick={() => onSessionSelect(String(session.session._id))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
