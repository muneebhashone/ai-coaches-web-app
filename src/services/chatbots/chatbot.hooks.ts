import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getChatbots,
  getChatbot,
  createChatbot,
  updateChatbot,
  deleteChatbot,
  cloneChatbot,
} from "./chatbot.service";
import type {
  CreateChatbotSchemaType,
  UpdateChatbotSchemaType,
  GetChatbotsQuerySchemaType,
  CloneChatbotSchemaType,
} from "./chatbot.schema";

export const chatbotKeys = {
  all: ["chatbots"] as const,
  lists: () => [...chatbotKeys.all, "list"] as const,
  list: (params?: GetChatbotsQuerySchemaType) =>
    [...chatbotKeys.lists(), params] as const,
  details: () => [...chatbotKeys.all, "detail"] as const,
  detail: (id: string) => [...chatbotKeys.details(), id] as const,
};

export function useChatbots(params?: GetChatbotsQuerySchemaType) {
  return useQuery({
    queryKey: chatbotKeys.list(params),
    queryFn: () => getChatbots(params),
  });
}

export function useChatbot(id: string) {
  return useQuery({
    queryKey: chatbotKeys.detail(id),
    queryFn: () => getChatbot(id),
    enabled: !!id,
  });
}

export function useCreateChatbot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateChatbotSchemaType) => createChatbot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatbotKeys.lists() });
    },
  });
}

export function useUpdateChatbot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateChatbotSchemaType }) =>
      updateChatbot(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: chatbotKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: chatbotKeys.lists() });
    },
  });
}

export function useDeleteChatbot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteChatbot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatbotKeys.lists() });
    },
  });
}

export function useCloneChatbot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CloneChatbotSchemaType }) =>
      cloneChatbot(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatbotKeys.lists() });
    },
  });
}