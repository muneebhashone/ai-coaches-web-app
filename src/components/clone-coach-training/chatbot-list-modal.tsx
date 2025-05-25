"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, RefreshCw, Eye, UserPlus } from "lucide-react";

interface Chatbot {
  id: string;
  name: string;
  linkedUsers: number;
  trainingStatus: string;
  lastUsed: string;
  knowledgeBase: string;
}

interface ChatbotListModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatbots: Chatbot[];
  onSelect: (chatbotId: string) => void;
}

export function ChatbotListModal({ isOpen, onClose, chatbots, onSelect }: ChatbotListModalProps) {
  const t = useTranslations("dashboard.cloneCoachTraining");
  const tableT = useTranslations("dashboard.cloneCoachTraining.chatbotList");
  const [isCreating, setIsCreating] = useState(false);
  const [newChatbotName, setNewChatbotName] = useState("");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "trained":
        return "bg-success text-success-foreground";
      case "training":
        return "bg-warning text-warning-foreground";
      case "failed":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const handleCreateChatbot = () => {
    if (newChatbotName.trim()) {
      // Create chatbot logic here
      console.log("Creating chatbot:", newChatbotName);
      setNewChatbotName("");
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("promptConfiguration.listChatbots")}</DialogTitle>
          <DialogDescription>
            Manage your AI coaching chatbots and their configurations.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <div className="space-y-4">
          {/* Create New Chatbot */}
          {isCreating ? (
            <div className="flex gap-2 p-4 border rounded-lg bg-muted/50">
              <Input
                placeholder="Enter chatbot name..."
                value={newChatbotName}
                onChange={(e) => setNewChatbotName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateChatbot()}
                className="flex-1"
              />
              <Button onClick={handleCreateChatbot}>Create</Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsCreating(true)} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              {t("promptConfiguration.createChatbot")}
            </Button>
          )}

          {/* Chatbots Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{tableT("name")}</TableHead>
                  <TableHead>{tableT("linkedUsers")}</TableHead>
                  <TableHead>{tableT("trainingStatus")}</TableHead>
                  <TableHead>{tableT("lastUsed")}</TableHead>
                  <TableHead className="text-right">{tableT("actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chatbots.map((chatbot) => (
                  <TableRow 
                    key={chatbot.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onSelect(chatbot.id)}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{chatbot.name}</div>
                        <div className="text-sm text-muted-foreground">
                          KB: {chatbot.knowledgeBase}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{chatbot.linkedUsers}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(chatbot.trainingStatus)}>
                        {chatbot.trainingStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{chatbot.lastUsed}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Retrain logic
                          }}
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span className="sr-only">{tableT("retrain")}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Preview logic
                          }}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">{tableT("preview")}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Reassign logic
                          }}
                        >
                          <UserPlus className="h-4 w-4" />
                          <span className="sr-only">{tableT("reassign")}</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

            <div className="text-sm text-muted-foreground">
              Click on a chatbot row to select it for configuration.
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}