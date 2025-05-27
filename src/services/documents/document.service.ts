import apiClient from "@/lib/api-client";
import type {
  CreateDocumentSchemaType,
  UpdateDocumentSchemaType,
  GetDocumentsQuerySchemaType,
} from "./document.schema";
import type {
  IGetDocumentsResponse,
  IGetDocumentResponse,
  ICreateDocumentResponse,
  IUpdateDocumentResponse,
  IDeleteDocumentResponse,
} from "./document.types";

export const getDocuments = async (
  knowledgeBaseId: string,
  params?: GetDocumentsQuerySchemaType
): Promise<IGetDocumentsResponse> => {
  const response = await apiClient.get(
    `/documents/${knowledgeBaseId}`,
    { params }
  );
  return response.data;
};

export const getDocument = async (
  knowledgeBaseId: string,
  documentId: string
): Promise<IGetDocumentResponse> => {
  const response = await apiClient.get(
    `/documents/${knowledgeBaseId}/${documentId}`
  );
  return response.data;
};

export const createDocument = async (
  knowledgeBaseId: string,
  data: CreateDocumentSchemaType
): Promise<ICreateDocumentResponse> => {
  const response = await apiClient.post(
    `/documents/${knowledgeBaseId}`,
    data
  );
  return response.data;
};

export const updateDocument = async (
  knowledgeBaseId: string,
  documentId: string,
  data: UpdateDocumentSchemaType
): Promise<IUpdateDocumentResponse> => {
  const response = await apiClient.put(
    `/documents/${knowledgeBaseId}/${documentId}`,
    data
  );
  return response.data;
};

export const deleteDocument = async (
  knowledgeBaseId: string,
  documentId: string
): Promise<IDeleteDocumentResponse> => {
  const response = await apiClient.delete(
    `/documents/${knowledgeBaseId}/${documentId}`
  );
  return response.data;
};