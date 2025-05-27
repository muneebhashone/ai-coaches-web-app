import apiClient from "@/lib/api-client";
import type {
  CreateSessionSchemaType,
  CreateMultipleSessionsSchemaType,
  UpdateSessionSchemaType,
  GetSessionsQuerySchemaType,
} from "./session.schema";
import type {
  IGetSessionsResponse,
  IGetSessionResponse,
  ICreateSessionResponse,
  IUpdateSessionResponse,
  IDeleteSessionResponse,
} from "./session.types";

export const getSessions = async (
  params?: GetSessionsQuerySchemaType
): Promise<IGetSessionsResponse> => {
  const response = await apiClient.get("/sessions", { params });
  return response.data;
};

export const getSession = async (id: string): Promise<IGetSessionResponse> => {
  const response = await apiClient.get(`/sessions/${id}`);
  return response.data;
};

export const createSession = async (
  data: CreateSessionSchemaType
): Promise<ICreateSessionResponse> => {
  const response = await apiClient.post("/sessions", data);
  return response.data;
};

// Bulk session creation - creates multiple sessions
export const createMultipleSessions = async (
  data: CreateMultipleSessionsSchemaType
): Promise<{
  success: boolean;
  results: Array<{
    success: boolean;
    data?: any;
    error?: string;
    sessionData: any;
  }>;
}> => {
  const { programId, chatbotId, sessions } = data;
  const results = [];

  for (const session of sessions) {
    try {
      const sessionData = {
        ...session,
        programId,
        chatbotId,
      };
      
      const response = await createSession(sessionData);
      results.push({
        success: true,
        data: response.data,
        sessionData,
      });
    } catch (error: any) {
      results.push({
        success: false,
        error: error.message || 'Failed to create session',
        sessionData: session,
      });
    }
  }

  const successCount = results.filter(r => r.success).length;
  
  return {
    success: successCount > 0,
    results,
  };
};

export const updateSession = async (
  id: string,
  data: UpdateSessionSchemaType
): Promise<IUpdateSessionResponse> => {
  const response = await apiClient.put(`/sessions/${id}`, data);
  return response.data;
};

export const deleteSession = async (id: string): Promise<IDeleteSessionResponse> => {
  const response = await apiClient.delete(`/sessions/${id}`);
  return response.data;
};