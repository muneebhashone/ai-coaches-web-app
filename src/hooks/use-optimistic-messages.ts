import { useState } from "react";
import { toast } from "sonner";
import { useSendMessage } from "@/services/chats/chat.hooks";

interface UseOptimisticMessagesProps {
  chatId: string;
  onMessageSent?: () => void;
}

export function useOptimisticMessages({
  chatId,
  onMessageSent,
}: UseOptimisticMessagesProps) {
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const sendMessageMutation = useSendMessage();

  const sendMessage = async (content: string) => {
    setPendingMessage(content);
    setIsWaitingForResponse(true);
    onMessageSent?.();

    try {
      await sendMessageMutation.mutateAsync({
        chatId,
        data: {
          content,
          role: "client",
        },
      });
      setPendingMessage(null);
      setIsWaitingForResponse(false);
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsWaitingForResponse(false);
      toast.error("Failed to send message", {
        description: "Your message couldn't be sent. Please try again.",
        action: {
          label: "Retry",
          onClick: () => retryPendingMessage(),
        },
      });
    }
  };

  const retryPendingMessage = () => {
    if (pendingMessage) {
      sendMessage(pendingMessage);
    }
  };

  const clearPendingMessage = () => {
    setPendingMessage(null);
    setIsWaitingForResponse(false);
  };

  return {
    sendMessage,
    retryPendingMessage,
    clearPendingMessage,
    pendingMessage,
    isWaitingForResponse,
    isError: sendMessageMutation.isError,
    isLoading: sendMessageMutation.isPending,
  };
}
