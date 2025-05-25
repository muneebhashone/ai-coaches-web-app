"use client";

import {
  useQuery,
  type UseQueryOptions,
  useMutation,
  type UseMutationOptions,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import {
  startChat,
  sendMessage,
  getChatMessages,
  getChatBySessionId,
  getChats,
  getChatById,
  sendCoachMessage,
  updateChatStatus,
} from "./chats.service";
import type {
  IStartChatResponse,
  ISendMessageResponse,
  IGetChatMessagesResponse,
  IGetChatBySessionIdResponse,
  IGetChatsResponse,
  IGetChatByIdResponse,
  ISendCoachMessageResponse,
  IUpdateChatStatusResponse,
  IGetChatMessagesData,
  IGetChatsData,
} from "./chats.types";
import type {
  StartChatSchemaType,
  SendMessageSchemaType,
  GetChatMessagesQuerySchemaType,
  GetChatsQuerySchemaType,
  SendCoachMessageSchemaType,
  UpdateChatStatusSchemaType,
} from "./chats.schema";

export const chatsKeys = {
  all: ["chats"] as const,
  lists: () => [...chatsKeys.all, "lists"] as const,
  list: (filters: GetChatsQuerySchemaType) =>
    [...chatsKeys.lists(), filters] as const,
  details: () => [...chatsKeys.all, "details"] as const,
  detail: (id: string) => [...chatsKeys.details(), id] as const,
  session: (sessionId: string) =>
    [...chatsKeys.all, "session", sessionId] as const,
  messagesList: (chatId: string, filters: GetChatMessagesQuerySchemaType) =>
    [...chatsKeys.detail(chatId), "messages", filters] as const,
};

export const useStartChat = (
  options?: UseMutationOptions<
    IStartChatResponse,
    Error,
    StartChatSchemaType
  >
) => {
  return useMutation({
    mutationFn: startChat,
    ...options,
  });
};

export const useSendMessage = (
  chatId: string,
  options?: UseMutationOptions<
    ISendMessageResponse,
    Error,
    SendMessageSchemaType
  >
) => {
  return useMutation({
    mutationFn: (data: SendMessageSchemaType) => sendMessage(chatId, data),
    ...options,
  });
};

export const useGetChatMessages = (
  chatId: string,
  filters: GetChatMessagesQuerySchemaType,
  options?: UseInfiniteQueryOptions<
    IGetChatMessagesResponse,
    Error,
    IGetChatMessagesData,
    IGetChatMessagesResponse,
    GetChatMessagesQuerySchemaType, // QueryKey type
    number // PageParam type
  >
) => {
  return useInfiniteQuery<
    IGetChatMessagesResponse,
    Error,
    IGetChatMessagesData,
    GetChatMessagesQuerySchemaType, // QueryKey type
    number // PageParam type
  >({
    queryKey: [chatsKeys.messagesList(chatId, filters)[0], chatId, filters], // Ensure stable query key
    queryFn: ({ pageParam = 1 }) =>
      getChatMessages(chatId, { ...filters, pageParam: pageParam.toString() }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pagination.hasNextPage) {
        return lastPage.data.pagination.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!chatId,
    ...options,
  });
};

export const useGetChatBySessionId = (
  sessionId: string,
  options?: UseQueryOptions<IGetChatBySessionIdResponse>
) => {
  return useQuery({
    queryKey: chatsKeys.session(sessionId),
    queryFn: () => getChatBySessionId(sessionId),
    enabled: !!sessionId,
    ...options,
  });
};

export const useGetChats = (
  filters: GetChatsQuerySchemaType,
  options?: UseInfiniteQueryOptions<
    IGetChatsResponse,
    Error,
    IGetChatsData,
    IGetChatsResponse,
    GetChatsQuerySchemaType, // QueryKey type
    number // PageParam type
  >
) => {
  return useInfiniteQuery<
    IGetChatsResponse,
    Error,
    IGetChatsData,
    GetChatsQuerySchemaType, // QueryKey type
    number // PageParam type
  >({
    queryKey: [chatsKeys.list(filters)[0], filters],
    queryFn: ({ pageParam = 1 }) =>
      getChats({ ...filters, pageParam: pageParam.toString() }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pagination.hasNextPage) {
        return lastPage.data.pagination.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    ...options,
  });
};

export const useGetChatById = (
  id: string,
  options?: UseQueryOptions<IGetChatByIdResponse>
) => {
  return useQuery({
    queryKey: chatsKeys.detail(id),
    queryFn: () => getChatById(id),
    enabled: !!id,
    ...options,
  });
};

export const useSendCoachMessage = (
  chatId: string,
  options?: UseMutationOptions<
    ISendCoachMessageResponse,
    Error,
    SendCoachMessageSchemaType
  >
) => {
  return useMutation({
    mutationFn: (data: SendCoachMessageSchemaType) =>
      sendCoachMessage(chatId, data),
    ...options,
  });
};

export const useUpdateChatStatus = (
  chatId: string,
  options?: UseMutationOptions<
    IUpdateChatStatusResponse,
    Error,
    UpdateChatStatusSchemaType
  >
) => {
  return useMutation({
    mutationFn: (data: UpdateChatStatusSchemaType) =>
      updateChatStatus(chatId, data),
    ...options,
  });
};
