import apiClient from "@/lib/api-client";
import type {
  IStartChatResponse,
  ISendMessageResponse,
  IGetChatMessagesResponse,
  IGetChatBySessionIdResponse,
  IGetChatsResponse,
  IGetChatByIdResponse,
  ISendCoachMessageResponse,
  IUpdateChatStatusResponse,
} from "./chats.types";
import type {
  StartChatSchemaType,
  SendMessageSchemaType,
  GetChatMessagesQuerySchemaType,
  GetChatsQuerySchemaType,
  SendCoachMessageSchemaType,
  UpdateChatStatusSchemaType,
} from "./chats.schema";

const CHATS_BASE_URL = "/chats";

export const startChat = async (
  data: StartChatSchemaType
): Promise<IStartChatResponse> => {
  const response = await apiClient.post(`${CHATS_BASE_URL}/start`, data);
  return response.data;
};

export const sendMessage = async (
  id: string,
  data: SendMessageSchemaType
): Promise<ISendMessageResponse> => {
  const response = await apiClient.post(
    `${CHATS_BASE_URL}/${id}/messages`,
    data
  );
  return response.data;
};

export const getChatMessages = async (
  id: string,
  params?: GetChatMessagesQuerySchemaType
): Promise<IGetChatMessagesResponse> => {
  const response = await apiClient.get(
    `${CHATS_BASE_URL}/${id}/messages`,
    { params }
  );
  return response.data;
};

export const getChatBySessionId = async (
  sessionId: string
): Promise<IGetChatBySessionIdResponse> => {
  const response = await apiClient.get(
    `${CHATS_BASE_URL}/session/${sessionId}`
  );
  return response.data;
};

export const getChats = async (
  params?: GetChatsQuerySchemaType
): Promise<IGetChatsResponse> => {
  const response = await apiClient.get(CHATS_BASE_URL, { params });
  return response.data;
};

export const getChatById = async (
  id: string
): Promise<IGetChatByIdResponse> => {
  const response = await apiClient.get(`${CHATS_BASE_URL}/${id}`);
  return response.data;
};

export const sendCoachMessage = async (
  id: string,
  data: SendCoachMessageSchemaType
): Promise<ISendCoachMessageResponse> => {
  const response = await apiClient.post(
    `${CHATS_BASE_URL}/${id}/coach-message`,
    data
  );
  return response.data;
};

export const updateChatStatus = async (
  id: string,
  data: UpdateChatStatusSchemaType
): Promise<IUpdateChatStatusResponse> => {
  const response = await apiClient.put(
    `${CHATS_BASE_URL}/${id}/status`,
    data
  );
  return response.data;
};
