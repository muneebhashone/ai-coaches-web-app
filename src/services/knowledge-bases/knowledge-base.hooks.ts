import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getKnowledgeBases,
  getKnowledgeBase,
  createKnowledgeBase,
  updateKnowledgeBase,
  deleteKnowledgeBase,
  getKnowledgeBasesByChatbotId,
} from "./knowledge-base.service";
import type {
  CreateKnowledgeBaseSchemaType,
  UpdateKnowledgeBaseSchemaType,
  GetKnowledgeBasesQuerySchemaType,
} from "./knowledge-base.schema";

export const knowledgeBaseKeys = {
  all: ["knowledge-bases"] as const,
  lists: () => [...knowledgeBaseKeys.all, "list"] as const,
  list: (params?: GetKnowledgeBasesQuerySchemaType) =>
    [...knowledgeBaseKeys.lists(), params] as const,
  details: () => [...knowledgeBaseKeys.all, "detail"] as const,
  detail: (id: string) => [...knowledgeBaseKeys.details(), id] as const,
  chatbot: (chatbotId: string) => [...knowledgeBaseKeys.all, "chatbot", chatbotId] as const,
};

export function useKnowledgeBasesByChatbotId(chatbotId: string) {
  return useQuery({
    queryKey: knowledgeBaseKeys.chatbot(chatbotId),
    queryFn: () => getKnowledgeBasesByChatbotId(chatbotId),
    enabled: !!chatbotId,
  });
}

export function useKnowledgeBases(params?: GetKnowledgeBasesQuerySchemaType) {
  return useQuery({
    queryKey: knowledgeBaseKeys.list(params),
    queryFn: () => getKnowledgeBases(params),
  });
}

export function useKnowledgeBase(id: string) {
  return useQuery({
    queryKey: knowledgeBaseKeys.detail(id),
    queryFn: () => getKnowledgeBase(id),
    enabled: !!id,
  });
}

export function useCreateKnowledgeBase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateKnowledgeBaseSchemaType) => createKnowledgeBase(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.lists() });
    },
  });
}

export function useUpdateKnowledgeBase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateKnowledgeBaseSchemaType }) =>
      updateKnowledgeBase(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.lists() });
    },
  });
}

export function useDeleteKnowledgeBase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteKnowledgeBase(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: knowledgeBaseKeys.lists() });
    },
  });
}