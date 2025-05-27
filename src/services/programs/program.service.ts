import apiClient from "@/lib/api-client";
import type {
  CreateProgramSchemaType,
  UpdateProgramSchemaType,
  GetProgramsQuerySchemaType,
} from "./program.schema";
import type {
  IGetProgramsResponse,
  IGetProgramResponse,
  ICreateProgramResponse,
  IUpdateProgramResponse,
  IDeleteProgramResponse,
  IGetProgramByChatbotIdResponse,
} from "./program.types";

export const getPrograms = async (
  params?: GetProgramsQuerySchemaType
): Promise<IGetProgramsResponse> => {
  const response = await apiClient.get("/programs", { params });
  return response.data;
};

export const getProgramByChatbotId = async (chatbotId: string): Promise<IGetProgramByChatbotIdResponse> => {
  const response = await apiClient.get(`/programs/chatbot/${chatbotId}`);
  return response.data;
};

export const getProgram = async (id: string): Promise<IGetProgramResponse> => {
  const response = await apiClient.get(`/programs/${id}`);
  return response.data;
};

export const createProgram = async (
  data: CreateProgramSchemaType
): Promise<ICreateProgramResponse> => {
  const response = await apiClient.post("/programs", data);
  return response.data;
};

export const updateProgram = async (
  id: string,
  data: UpdateProgramSchemaType
): Promise<IUpdateProgramResponse> => {
  const response = await apiClient.put(`/programs/${id}`, data);
  return response.data;
};

export const deleteProgram = async (id: string): Promise<IDeleteProgramResponse> => {
  const response = await apiClient.delete(`/programs/${id}`);
  return response.data;
};