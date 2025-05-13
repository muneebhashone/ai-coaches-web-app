"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useChatbots } from "@/services/chatbot/chatbot.hooks";
import { ChatbotForm } from "./chatbot-form";
import { ChatbotList } from "./chatbot-list";

export function ChatbotManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingChatbotId, setEditingChatbotId] = useState<string | null>(null);

  const { data: chatbotsResponse, isLoading } = useChatbots();

  const handleCreate = () => {
    setIsCreating(true);
    setEditingChatbotId(null);
  };

  const handleEdit = (id: string) => {
    setIsCreating(false);
    setEditingChatbotId(id);
  };

  const handleCancel = (isCreating: boolean) => {
    setIsCreating(isCreating);
    setEditingChatbotId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Chatbot Management</h2>
        <Button onClick={handleCreate} disabled={isCreating}>
          <Plus className="mr-1 h-4 w-4" />
          Create Chatbot
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="p-4">
            <ChatbotList
              onEdit={handleEdit}
              isLoading={isLoading}
              chatbots={chatbotsResponse?.data?.results || []}
            />
          </Card>
        </div>

        <div>
          <Card className="p-4">
            <ChatbotForm
              isCreating={isCreating}
              editingId={editingChatbotId}
              onCancel={handleCancel}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
