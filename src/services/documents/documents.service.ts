import apiClient from "@/lib/api-client";
import type {
  IGetDocumentsResponse,
  ICreateDocumentResponse,
  IGetDocumentByIdResponse,
  IUpdateDocumentResponse,
  IDeleteDocumentResponse,
} from "./documents.types";
import type {
  GetDocumentsQuerySchemaType,
  CreateDocumentSchemaType,
  UpdateDocumentSchemaType,
} from "./documents.schema";

const getDocumentsBaseUrl = (knowledgeBaseId: string) =>
  `/knowledge-bases/${knowledgeBaseId}/documents`;

export const getDocuments = async (
  knowledgeBaseId: string,
  params?: GetDocumentsQuerySchemaType
): Promise<IGetDocumentsResponse> => {
  const response = await apiClient.get(getDocumentsBaseUrl(knowledgeBaseId), {
    params,
  });
  return response.data;
};

export const createDocument = async (
  knowledgeBaseId: string,
  data: CreateDocumentSchemaType
): Promise<ICreateDocumentResponse> => {
  const response = await apiClient.post(
    getDocumentsBaseUrl(knowledgeBaseId),
    data
  );
  return response.data;
};

export const getDocumentById = async (
  knowledgeBaseId: string,
  id: string
): Promise<IGetDocumentByIdResponse> => {
  const response = await apiClient.get(
    `${getDocumentsBaseUrl(knowledgeBaseId)}/${id}`
  );
  return response.data;
};

export const updateDocument = async (
  knowledgeBaseId: string,
  id: string,
  data: UpdateDocumentSchemaType
): Promise<IUpdateDocumentResponse> => {
  const response = await apiClient.put(
    `${getDocumentsBaseUrl(knowledgeBaseId)}/${id}`,
    data
  );
  return response.data;
};

export const deleteDocument = async (
  knowledgeBaseId: string,
  id: string
): Promise<IDeleteDocumentResponse> => {
  const response = await apiClient.delete(
    `${getDocumentsBaseUrl(knowledgeBaseId)}/${id}`
  );
  return response.data;
};
