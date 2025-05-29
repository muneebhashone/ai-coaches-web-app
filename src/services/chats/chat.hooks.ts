import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getChats,
  getChat,
  sendMessage,
  sendMessageUnprotected,
  updateChat,
  deleteChat,
  startChat,
} from "./chat.service";
import type {
  SendMessageSchemaType,
  GetChatsQuerySchemaType,
  UpdateChatSchemaType,
} from "./chat.schema";

export const chatKeys = {
  all: ["chats"] as const,
  lists: () => [...chatKeys.all, "list"] as const,
  list: (params?: GetChatsQuerySchemaType) =>
    [...chatKeys.lists(), params] as const,
  details: () => [...chatKeys.all, "detail"] as const,
  detail: (id: string) => [...chatKeys.details(), id] as const,
};

export function useChats(params?: GetChatsQuerySchemaType) {
  return useQuery({
    queryKey: chatKeys.list(params),
    queryFn: () => getChats(params),
  });
}

export function useStartChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId, sessionId }: { clientId: string; sessionId: string }) => startChat(clientId, sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
    },
  });
}

export function useChat(id: string) {
  return useQuery({
    queryKey: chatKeys.detail(id),
    queryFn: () => getChat(id),
    enabled: !!id,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
        chatId,
        data,
    }: {
      chatId: string;
      data: SendMessageSchemaType;
    }) => sendMessage(chatId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
    },
  });
}

export function useSendMessageUnprotected() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      chatbotId,
      clientId,
      data,
    }: {
      chatbotId: string;
      clientId: string;
      data: SendMessageSchemaType;
    }) => sendMessageUnprotected(chatbotId, clientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
    },
  });
}

export function useUpdateChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateChatSchemaType }) =>
      updateChat(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: chatKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
    },
  });
}

export function useDeleteChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteChat(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
    },
  });
}