import apiClient from "@/lib/api-client";
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

export const createChatbot = async (
  data: CreateChatbotSchemaType
): Promise<ICreateChatbotResponse> => {
  const response = await apiClient.post("/chatbots", data);
  return response.data;
};

export const updateChatbot = async (
  id: string,
  data: UpdateChatbotSchemaType
): Promise<IUpdateChatbotResponse> => {
  const response = await apiClient.put(`/chatbots/${id}`, data);
  return response.data;
};

export const getChatbot = async (id: string): Promise<IGetChatbotResponse> => {
  const response = await apiClient.get(`/chatbots/${id}`);
  return response.data;
};

export const deleteChatbot = async (id: string): Promise<IDeleteChatbotResponse> => {
  const response = await apiClient.delete(`/chatbots/${id}`);
  return response.data;
};

export const getChatbots = async (
  params?: GetChatbotsSchemaType
): Promise<IGetChatbotsResponse> => {
  const response = await apiClient.get("/chatbots", { params });
  return response.data;
};

export const getDefaultPersona = async (
  params?: GetDefaultPersonaSchemaType
): Promise<IGetDefaultPersonaResponse> => {
  const response = await apiClient.get("/chatbots/defaults/persona", { params });
  return response.data;
};