import apiClient from "@/lib/api-client";
import type {
  SendMessageSchemaType,
  GetChatsQuerySchemaType,
  UpdateChatSchemaType,
} from "./chat.schema";
import type {
  IGetChatsResponse,
  IGetChatResponse,
  ISendMessageResponse,
  IUpdateChatResponse,
  IDeleteChatResponse,
  ICreateChatsForClientResponse,
} from "./chat.types";

export const getChats = async (
  params?: GetChatsQuerySchemaType
): Promise<IGetChatsResponse> => {
  const response = await apiClient.get("/chats", { params });
  return response.data;
};

export const getChat = async (id: string): Promise<IGetChatResponse> => {
  const response = await apiClient.get(`/chats/${id}`);
  return response.data;
};

export const createChatsForClient = async (
  chatbotId: string
): Promise<ICreateChatsForClientResponse> => {
  const response = await apiClient.post("/chats/create-for-client", {
    chatbotId,
  });
  return response.data;
};

export const sendMessage = async (
  chatId: string,
  data: SendMessageSchemaType
): Promise<ISendMessageResponse> => {
  const response = await apiClient.post(`/chats/${chatId}/messages`, data);
  return response.data;
};

export const sendMessageUnprotected = async (
  chatId: string,
  clientId: string,
  data: SendMessageSchemaType
): Promise<ISendMessageResponse> => {
  const response = await apiClient.post(
    `/chats/unprotected/${chatId}/${clientId}/message`,
    data
  );
  return response.data;
};

export const updateChat = async (
  id: string,
  data: UpdateChatSchemaType
): Promise<IUpdateChatResponse> => {
  const response = await apiClient.put(`/chats/${id}`, data);
  return response.data;
};

export const deleteChat = async (id: string): Promise<IDeleteChatResponse> => {
  const response = await apiClient.delete(`/chats/${id}`);
  return response.data;
};

export const startChat = async (
  clientId: string,
  sessionId: string
): Promise<void> => {
  await apiClient.post("/chats/start", {
    clientId,
    sessionId,
  });
};
