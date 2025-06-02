import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getChats,
  getChat,
  sendMessage,
  sendMessageUnprotected,
  updateChat,
  deleteChat,
  startChat,
  createChatsForClient,
} from "./chat.service";
import type {
  SendMessageSchemaType,
  GetChatsQuerySchemaType,
  UpdateChatSchemaType,
} from "./chat.schema";
import type {
  IMessage,
  IGetChatsResponse,
  ISendMessageResponse,
} from "./chat.types";

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
    mutationFn: ({
      clientId,
      sessionId,
    }: {
      clientId: string;
      sessionId: string;
    }) => startChat(clientId, sessionId),
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

    // Optimistic update
    onMutate: async ({ chatId, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: chatKeys.lists() });

      // Get all relevant query keys that might contain this chat
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((query) => query.queryKey)
        .filter(
          (key) =>
            key[0] === "chats" &&
            key[1] === "list" &&
            key[2] &&
            typeof key[2] === "object"
        );

      // Snapshot the previous value for rollback
      const previousData: Array<{ key: any; data: any }> = [];

      // Create optimistic message
      const optimisticMessage: IMessage = {
        _id: `temp-${Date.now()}`, // Temporary ID
        content: data.content,
        role: data.role === "client" ? "client" : "assistant",
        createdAt: new Date().toISOString(),
      };

      // Update each relevant query cache
      for (const queryKey of queryKeys) {
        const oldData = queryClient.getQueryData<IGetChatsResponse>(queryKey);
        if (oldData?.data?.results) {
          previousData.push({ key: queryKey, data: oldData });

          // Find the chat to update
          const updatedResults = oldData.data.results.map((chat) => {
            if (chat._id === chatId) {
              return {
                ...chat,
                messages: [...chat.messages, optimisticMessage],
              };
            }
            return chat;
          });

          // Update cache
          queryClient.setQueryData<IGetChatsResponse>(queryKey, {
            ...oldData,
            data: {
              ...oldData.data,
              results: updatedResults,
            },
          });
        }
      }

      return { previousData, optimisticMessage };
    },

    // Handle success
    onSuccess: (response: ISendMessageResponse, variables) => {
      // Update cache with real message data from the updated chat
      const queryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((query) => query.queryKey)
        .filter(
          (key) =>
            key[0] === "chats" &&
            key[1] === "list" &&
            key[2] &&
            typeof key[2] === "object"
        );

      for (const queryKey of queryKeys) {
        const currentData =
          queryClient.getQueryData<IGetChatsResponse>(queryKey);
        if (currentData?.data?.results && response.data?.chat) {
          const updatedResults = currentData.data.results.map((chat) => {
            if (chat._id === variables.chatId) {
              // Replace with the updated chat from the response
              return response.data.chat;
            }
            return chat;
          });

          queryClient.setQueryData<IGetChatsResponse>(queryKey, {
            ...currentData,
            data: {
              ...currentData.data,
              results: updatedResults,
            },
          });
        }
      }
    },

    // Handle error - rollback optimistic updates
    onError: (err, variables, context) => {
      if (context?.previousData) {
        // Restore previous data for all affected queries
        context.previousData.forEach(({ key, data }) => {
          queryClient.setQueryData(key, data);
        });
      }
    },

    // Always refetch in the background to ensure consistency
    onSettled: () => {
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

export function useCreateChatsForClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatbotId: string) => createChatsForClient(chatbotId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: chatKeys.list({
          clientId: variables,
          page: 1,
          limit: 100,
        }),
      });
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
