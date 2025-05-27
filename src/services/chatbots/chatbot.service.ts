import apiClient from "@/lib/api-client";
import type {
  CreateChatbotSchemaType,
  UpdateChatbotSchemaType,
  GetChatbotsQuerySchemaType,
  CloneChatbotSchemaType,
} from "./chatbot.schema";
import type {
  IGetChatbotsResponse,
  IGetChatbotResponse,
  ICreateChatbotResponse,
  IUpdateChatbotResponse,
  IDeleteChatbotResponse,
  ICloneChatbotResponse,
} from "./chatbot.types";

export const getChatbots = async (
  params?: GetChatbotsQuerySchemaType
): Promise<IGetChatbotsResponse> => {
  const response = await apiClient.get("/chatbots", { params });
  return response.data;
};

export const getChatbot = async (id: string): Promise<IGetChatbotResponse> => {
  const response = await apiClient.get(`/chatbots/${id}`);
  return response.data;
};

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

export const deleteChatbot = async (id: string): Promise<IDeleteChatbotResponse> => {
  const response = await apiClient.delete(`/chatbots/${id}`);
  return response.data;
};

export const cloneChatbot = async (
  id: string,
  data: CloneChatbotSchemaType
): Promise<ICloneChatbotResponse> => {
  const response = await apiClient.post(`/chatbots/${id}/clone`, data);
  return response.data;
};