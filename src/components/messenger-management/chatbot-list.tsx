"use client";

import {
  IconEdit,
  IconTrash,
  IconCheck,
  IconX,
  IconExternalLink,
  IconCopy,
} from "@tabler/icons-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useDeleteChatbot,
  useUpdateChatbot,
} from "@/services/chatbot/chatbot.hooks";
import type { IChatbot } from "@/services/chatbot/chatbot.types";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatbotListProps {
  chatbots: IChatbot[];
  isLoading: boolean;
  onEdit: (id: string) => void;
}

export function ChatbotList({ chatbots, isLoading, onEdit }: ChatbotListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const { mutate: deleteChatbot } = useDeleteChatbot({
    onSuccess: () => {
      toast.success("Chatbot deleted successfully");
      setDeletingId(null);
    },
    onError: () => {
      toast.error("Failed to delete chatbot");
      setDeletingId(null);
    },
  });

  const { mutate: updateChatbot } = useUpdateChatbot("", {
    onSuccess: () => {
      toast.success("Chatbot status updated");
    },
    onError: () => {
      toast.error("Failed to update chatbot status");
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this chatbot?")) {
      setDeletingId(id);
      deleteChatbot(id);
    }
  };

  const toggleStatus = (chatbot: IChatbot) => {
    updateChatbot({
      status: chatbot.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
    });
  };

  const openChatbot = (id: string) => {
    router.push(`/chat/${id}`);
  };

  const copyLink = (id: string) => {
    const linkUrl = `${window.location.origin}/chat/${id}`;
    navigator.clipboard.writeText(linkUrl);
    toast.success("Chatbot link copied to clipboard");
  };

  if (isLoading) {
    return <div className="py-4 text-center">Loading chatbots...</div>;
  }

  if (chatbots.length === 0) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        No chatbots found. Create one to get started.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Knowledge Bases</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chatbots.map((chatbot) => (
            <TableRow key={chatbot._id}>
              <TableCell>
                <div>
                  <div className="font-medium">{chatbot.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {chatbot.persona.name}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    chatbot.status === "ACTIVE" ? "default" : "secondary"
                  }
                  className="cursor-pointer"
                  onClick={() => toggleStatus(chatbot)}
                >
                  {chatbot.status === "ACTIVE" ? (
                    <>
                      <IconCheck className="mr-1 h-3 w-3" /> Active
                    </>
                  ) : (
                    <>
                      <IconX className="mr-1 h-3 w-3" /> Inactive
                    </>
                  )}
                </Badge>
              </TableCell>
              <TableCell>{chatbot.apiSettings.model || "Default"}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {chatbot.knowledgeBases?.length || 0} bases
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openChatbot(chatbot._id)}
                        >
                          <IconExternalLink className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Open Chatbot</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyLink(chatbot._id)}
                        >
                          <IconCopy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy Chatbot Link</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(chatbot._id)}
                  >
                    <IconEdit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(chatbot._id)}
                    disabled={deletingId === chatbot._id}
                  >
                    <IconTrash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
