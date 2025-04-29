import apiClient from "@/lib/api-client";
import type {
  CreateSessionSchemaType,
  UpdateSessionSchemaType,
  AddMessageSchemaType,
  ProcessMessageSchemaType,
  GetSessionsSchemaType,
} from "./session.schema";
import type {
  ICreateSessionResponse,
  IUpdateSessionResponse,
  IGetSessionResponse,
  IEndSessionResponse,
  IAddMessageResponse,
  IProcessMessageResponse,
  IGetSessionsResponse,
} from "./session.types";

export const createSession = async (
  data: CreateSessionSchemaType
): Promise<ICreateSessionResponse> => {
  const response = await apiClient.post("/sessions", data);
  return response.data;
};

export const updateSession = async (
  id: string,
  data: UpdateSessionSchemaType
): Promise<IUpdateSessionResponse> => {
  const response = await apiClient.put(`/sessions/${id}`, data);
  return response.data;
};

export const getSession = async (id: string): Promise<IGetSessionResponse> => {
  const response = await apiClient.get(`/sessions/${id}`);
  return response.data;
};

export const endSession = async (id: string): Promise<IEndSessionResponse> => {
  const response = await apiClient.post(`/sessions/${id}/end`);
  return response.data;
};

export const addMessage = async (
  sessionId: string,
  data: AddMessageSchemaType
): Promise<IAddMessageResponse> => {
  const response = await apiClient.post(`/sessions/message`, data, {
    params: { sessionId },
  });
  return response.data;
};

export const processMessage = async (
  sessionId: string,
  data: ProcessMessageSchemaType
): Promise<IProcessMessageResponse> => {
  const response = await apiClient.post(`/sessions/chat`, data, {
    params: { sessionId },
  });
  return response.data;
};

export const getSessions = async (
  params?: GetSessionsSchemaType
): Promise<IGetSessionsResponse> => {
  const response = await apiClient.get("/sessions", { params });
  return response.data;
};