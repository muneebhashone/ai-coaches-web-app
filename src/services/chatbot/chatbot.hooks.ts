"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  createChatbot,
  updateChatbot,
  getChatbot,
  deleteChatbot,
  getChatbots,
  getDefaultPersona,
} from "./chatbot.service";
import type {
  CreateChatbotSchemaType,
  UpdateChatbotSchemaType,
  GetChatbotsSchemaType,
  GetDefaultPersonaSchemaType,
} from "./chatbot.schema";
import type {
  ICreateChatbotResponse,
  IUpdateChatbotResponse,
  IGetChatbotResponse,
  IDeleteChatbotResponse,
  IGetChatbotsResponse,
  IGetDefaultPersonaResponse,
} from "./chatbot.types";

export const chatbotKeys = {
  all: ["chatbots"] as const,
  lists: () => [...chatbotKeys.all, "list"] as const,
  list: (params: GetChatbotsSchemaType | undefined) =>
    [...chatbotKeys.lists(), params] as const,
  details: () => [...chatbotKeys.all, "detail"] as const,
  detail: (id: string) => [...chatbotKeys.details(), id] as const,
  defaultPersona: (params: GetDefaultPersonaSchemaType | undefined) =>
    [...chatbotKeys.all, "defaultPersona", params] as const,
} as const;

export const useChatbots = (
  params?: GetChatbotsSchemaType,
  options?: UseQueryOptions<IGetChatbotsResponse>
) => {
  return useQuery({
    ...options,
    queryKey: chatbotKeys.list(params),
    queryFn: () => getChatbots(params),
  });
};

export const useChatbot = (
  id: string,
  options?: UseQueryOptions<IGetChatbotResponse>
) => {
  return useQuery({
    ...options,
    queryKey: chatbotKeys.detail(id),
    queryFn: () => getChatbot(id),
    enabled: !!id,
  });
};

export const useDefaultPersona = (
  params?: GetDefaultPersonaSchemaType,
  options?: UseQueryOptions<IGetDefaultPersonaResponse>
) => {
  return useQuery({
    ...options,
    queryKey: chatbotKeys.defaultPersona(params),
    queryFn: () => getDefaultPersona(params),
  });
};

export const useCreateChatbot = (
  options?: UseMutationOptions<
    ICreateChatbotResponse,
    Error,
    CreateChatbotSchemaType
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: createChatbot,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: chatbotKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useUpdateChatbot = (
  id: string,
  options?: UseMutationOptions<
    IUpdateChatbotResponse,
    Error,
    UpdateChatbotSchemaType
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (data) => updateChatbot(id, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: chatbotKeys.lists() });
      queryClient.invalidateQueries({ queryKey: chatbotKeys.detail(id) });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useDeleteChatbot = (
  options?: UseMutationOptions<IDeleteChatbotResponse, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: deleteChatbot,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: chatbotKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
