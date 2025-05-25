import apiClient from "@/lib/api-client";
import type {
  IGetKnowledgeBasesResponse,
  ICreateKnowledgeBaseResponse,
  IGetKnowledgeBaseByIdResponse,
  IUpdateKnowledgeBaseResponse,
  IDeleteKnowledgeBaseResponse,
} from "./knowledge-bases.types";
import type {
  GetKnowledgeBasesQuerySchemaType,
  CreateKnowledgeBaseSchemaType,
  UpdateKnowledgeBaseSchemaType,
} from "./knowledge-bases.schema";

const KNOWLEDGE_BASES_BASE_URL = "/knowledge-bases";

export const getKnowledgeBases = async (
  params?: GetKnowledgeBasesQuerySchemaType
): Promise<IGetKnowledgeBasesResponse> => {
  const response = await apiClient.get(KNOWLEDGE_BASES_BASE_URL, { params });
  return response.data;
};

export const createKnowledgeBase = async (
  data: CreateKnowledgeBaseSchemaType
): Promise<ICreateKnowledgeBaseResponse> => {
  const response = await apiClient.post(KNOWLEDGE_BASES_BASE_URL, data);
  return response.data;
};

export const getKnowledgeBaseById = async (
  id: string
): Promise<IGetKnowledgeBaseByIdResponse> => {
  const response = await apiClient.get(`${KNOWLEDGE_BASES_BASE_URL}/${id}`);
  return response.data;
};

export const updateKnowledgeBase = async (
  id: string,
  data: UpdateKnowledgeBaseSchemaType
): Promise<IUpdateKnowledgeBaseResponse> => {
  const response = await apiClient.put(
    `${KNOWLEDGE_BASES_BASE_URL}/${id}`,
    data
  );
  return response.data;
};

export const deleteKnowledgeBase = async (
  id: string
): Promise<IDeleteKnowledgeBaseResponse> => {
  const response = await apiClient.delete(
    `${KNOWLEDGE_BASES_BASE_URL}/${id}`
  );
  return response.data;
};
