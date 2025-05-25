import apiClient from "@/lib/api-client";
import type {
  IGetProgramsResponse,
  ICreateProgramResponse,
  IGetProgramByIdResponse,
  IUpdateProgramResponse,
  IDeleteProgramResponse,
} from "./programs.types";
import type {
  GetProgramsQuerySchemaType,
  CreateProgramSchemaType,
  UpdateProgramSchemaType,
} from "./programs.schema";

const PROGRAMS_BASE_URL = "/programs";

export const getPrograms = async (
  params?: GetProgramsQuerySchemaType
): Promise<IGetProgramsResponse> => {
  const response = await apiClient.get(PROGRAMS_BASE_URL, { params });
  return response.data;
};

export const createProgram = async (
  data: CreateProgramSchemaType
): Promise<ICreateProgramResponse> => {
  const response = await apiClient.post(PROGRAMS_BASE_URL, data);
  return response.data;
};

export const getProgramById = async (
  id: string
): Promise<IGetProgramByIdResponse> => {
  const response = await apiClient.get(`${PROGRAMS_BASE_URL}/${id}`);
  return response.data;
};

export const updateProgram = async (
  id: string,
  data: UpdateProgramSchemaType
): Promise<IUpdateProgramResponse> => {
  const response = await apiClient.put(`${PROGRAMS_BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteProgram = async (
  id: string
): Promise<IDeleteProgramResponse> => {
  const response = await apiClient.delete(`${PROGRAMS_BASE_URL}/${id}`);
  return response.data;
};
