"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { IChat } from "@/services/chats/chat.types";

interface SessionListItemProps {
  session: IChat;
  isSelected: boolean;
  onClick: () => void;
}

export function SessionListItem({
  session,
  isSelected,
  onClick,
}: SessionListItemProps) {
  const formatSessionDate = (date: string) => {
    return format(new Date(date), "MMM dd, HH:mm");
  };

  const formatUpdatedDate = (date: string) => {
    return format(new Date(date), "MMM dd");
  };

  return (
    <div
      className={cn(
        "group relative w-full max-w-full p-4 border-b border-border/50 cursor-pointer transition-all duration-200 hover:bg-muted/30 hover:border-border",
        "before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-transparent before:transition-colors before:duration-200",
        isSelected && "bg-primary/5 before:bg-primary shadow-sm"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3 w-full min-w-0">
        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Title section */}
          <div className="flex items-start justify-between gap-2 w-full">
            <h3 className="font-semibold text-sm text-foreground truncate flex-1 min-w-0 leading-tight">
              {session.program.name}
            </h3>
            <Badge
              variant="secondary"
              className="text-xs font-medium px-2 py-0.5 rounded-md shrink-0"
            >
              {formatUpdatedDate(session.session.sessionDate)}
            </Badge>
          </div>

          {/* Client name */}
          <p className="text-xs font-medium text-muted-foreground truncate">
            {session.session.name}
          </p>

          {/* Session details */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="truncate">
              Started: {formatSessionDate(session.session.sessionDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
      )}
    </div>
  );
}
