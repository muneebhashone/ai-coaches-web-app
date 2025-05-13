import apiClient from "@/lib/api-client";
import type {
  CreateKnowledgeBaseSchemaType,
  GetKnowledgeBasesSchemaType,
  AddDocumentSchemaType,
} from "./knowledge-base.schema";
import type {
  ICreateKnowledgeBaseResponse,
  IGetKnowledgeBaseResponse,
  IGetKnowledgeBasesResponse,
  IDeleteKnowledgeBaseResponse,
  IAddDocumentResponse,
  IUploadDocumentResponse,
} from "./knowledge-base.types";

const BASE_PATH = "/knowledge-base";

/**
 * Creates a new knowledge base
 */
export const createKnowledgeBase = async (
  data: CreateKnowledgeBaseSchemaType
): Promise<ICreateKnowledgeBaseResponse> => {
  try {
    const response = await apiClient.post(BASE_PATH, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to create knowledge base");
  }
};

/**
 * Retrieves all knowledge bases with pagination
 */
export const getKnowledgeBases = async (
  params?: GetKnowledgeBasesSchemaType
): Promise<IGetKnowledgeBasesResponse> => {
  try {
    const response = await apiClient.get(BASE_PATH, { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to fetch knowledge bases");
  }
};

/**
 * Retrieves a specific knowledge base by ID
 */
export const getKnowledgeBase = async (
  id: string
): Promise<IGetKnowledgeBaseResponse> => {
  try {
    const response = await apiClient.get(`${BASE_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to fetch knowledge base");
  }
};

/**
 * Deletes a knowledge base by ID
 */
export const deleteKnowledgeBase = async (
  id: string
): Promise<IDeleteKnowledgeBaseResponse> => {
  try {
    const response = await apiClient.delete(`${BASE_PATH}/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to delete knowledge base");
  }
};

/**
 * Adds a document to an existing knowledge base
 */
export const addDocumentToKnowledgeBase = async (
  id: string,
  data: AddDocumentSchemaType
): Promise<IAddDocumentResponse> => {
  try {
    const response = await apiClient.post(`${BASE_PATH}/${id}/document`, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to add document to knowledge base");
  }
};

/**
 * Uploads a document file to a knowledge base
 */
export const uploadDocumentToKnowledgeBase = async (
  id: string,
  file: File
): Promise<IUploadDocumentResponse> => {
  try {
    const formData = new FormData();
    formData.append("document", file);

    const response = await apiClient.post(
      `${BASE_PATH}/${id}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error, "Failed to upload document to knowledge base");
  }
};

/**
 * Helper function to handle API errors
 */
function handleApiError(error: unknown, defaultMessage: string): Error {
  if (error instanceof Error) {
    return error;
  }

  // For axios errors
  if (typeof error === "object" && error !== null && "response" in error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    if (axiosError.response?.data?.message) {
      return new Error(axiosError.response.data.message);
    }
  }

  return new Error(defaultMessage);
}
