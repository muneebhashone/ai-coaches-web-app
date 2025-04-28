import { mockConversations } from "@/lib/mock-conversations";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import ConversationClient from "./conversation-client";
import { format } from "date-fns";
import type { PageProps } from "../../../../../.next/types/app/layout";

function ParticipantList({ participants }: { participants: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {participants.map((participant) => (
        <div
          key={participant}
          className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
        >
          {participant}
        </div>
      ))}
    </div>
  );
}

export default async function ConversationDetailPage({ params }: PageProps) {
  const { conversationId } = await params;
  const conversation = mockConversations.find((c) => c.id === conversationId);

  if (!conversation) {
    return (
      <Card className="container max-w-4xl mx-auto my-12 p-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Conversation not found</h2>
          <p className="text-muted-foreground">
            The conversation you&apos;re looking for doesn&apos;t exist or has
            been removed.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-6 h-[calc(100vh-80px)] flex flex-col">
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {conversation.title}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-muted-foreground">
                Last activity:{" "}
                {format(new Date(conversation.lastActivity), "MMM d, yyyy")}
              </p>
              <span className="text-muted-foreground">•</span>
              <p className="text-sm text-muted-foreground">
                ID: {conversation.id}
              </p>
            </div>
          </div>
          <ParticipantList participants={conversation.participants} />
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex-grow p-12 text-center">
            Loading conversation...
          </div>
        }
      >
        <ConversationClient conversation={conversation} />
      </Suspense>
    </div>
  );
}
