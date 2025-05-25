import apiClient from "@/lib/api-client";
import type {
  IStartTrainingResponse,
  IGetTrainingJobsResponse,
  IGetTrainingJobByIdResponse,
} from "./training.types";
import type {
  StartTrainingSchemaType,
  GetTrainingJobsQuerySchemaType,
} from "./training.schema";

const TRAINING_BASE_URL = "/training";

export const startTraining = async (
  data: StartTrainingSchemaType
): Promise<IStartTrainingResponse> => {
  const response = await apiClient.post(`${TRAINING_BASE_URL}/run`, data);
  return response.data;
};

export const getTrainingJobs = async (
  params?: GetTrainingJobsQuerySchemaType
): Promise<IGetTrainingJobsResponse> => {
  const response = await apiClient.get(TRAINING_BASE_URL, { params });
  return response.data;
};

export const getTrainingJobById = async (
  id: string
): Promise<IGetTrainingJobByIdResponse> => {
  const response = await apiClient.get(`${TRAINING_BASE_URL}/${id}`);
  return response.data;
};
