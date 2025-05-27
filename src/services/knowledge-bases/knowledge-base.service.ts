import apiClient from "@/lib/api-client";
import type {
  CreateKnowledgeBaseSchemaType,
  UpdateKnowledgeBaseSchemaType,
  GetKnowledgeBasesQuerySchemaType,
} from "./knowledge-base.schema";
import type {
  IGetKnowledgeBasesResponse,
  IGetKnowledgeBaseResponse,
  ICreateKnowledgeBaseResponse,
  IUpdateKnowledgeBaseResponse,
  IDeleteKnowledgeBaseResponse,
  IGetKnowledgeBasesByChatbotIdResponse,
} from "./knowledge-base.types";

export const getKnowledgeBases = async (
  params?: GetKnowledgeBasesQuerySchemaType
): Promise<IGetKnowledgeBasesResponse> => {
  const response = await apiClient.get("/knowledge-bases", { params });
  return response.data;
};

export const getKnowledgeBasesByChatbotId = async (
  chatbotId: string
): Promise<IGetKnowledgeBasesByChatbotIdResponse> => {
  const response = await apiClient.get(`/knowledge-bases/chatbot/${chatbotId}`);
  return response.data;
};

export const getKnowledgeBase = async (id: string): Promise<IGetKnowledgeBaseResponse> => {
  const response = await apiClient.get(`/knowledge-bases/${id}`);
  return response.data;
};

export const createKnowledgeBase = async (
  data: CreateKnowledgeBaseSchemaType
): Promise<ICreateKnowledgeBaseResponse> => {
  const response = await apiClient.post("/knowledge-bases", data);
  return response.data;
};

export const updateKnowledgeBase = async (
  id: string,
  data: UpdateKnowledgeBaseSchemaType
): Promise<IUpdateKnowledgeBaseResponse> => {
  const response = await apiClient.put(`/knowledge-bases/${id}`, data);
  return response.data;
};

export const deleteKnowledgeBase = async (id: string): Promise<IDeleteKnowledgeBaseResponse> => {
  const response = await apiClient.delete(`/knowledge-bases/${id}`);
  return response.data;
};