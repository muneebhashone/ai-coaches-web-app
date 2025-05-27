import apiClient from "@/lib/api-client";
import type {
  StartTrainingSchemaType,
  GetTrainingJobsQuerySchemaType,
} from "./training.schema";
import type {
  IGetTrainingJobsResponse,
  IGetTrainingJobResponse,
  IStartTrainingResponse,
  ICancelTrainingResponse,
} from "./training.types";

export const getTrainingJobs = async (
  params?: GetTrainingJobsQuerySchemaType
): Promise<IGetTrainingJobsResponse> => {
  const response = await apiClient.get("/training", { params });
  return response.data;
};

export const getTrainingJob = async (id: string): Promise<IGetTrainingJobResponse> => {
  const response = await apiClient.get(`/training/${id}`);
  return response.data;
};

export const startTraining = async (
  data: StartTrainingSchemaType
): Promise<IStartTrainingResponse> => {
  const response = await apiClient.post("/training/run", data);
  return response.data;
};

export const cancelTraining = async (id: string): Promise<ICancelTrainingResponse> => {
  const response = await apiClient.delete(`/training/${id}`);
  return response.data;
};