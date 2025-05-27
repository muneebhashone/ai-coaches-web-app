import type { IAPIResponse, IPagination } from "../common/common.types";

export interface ITrainingJob {
  _id: string;
  chatbotId: string;
  status: "pending" | "running" | "completed" | "failed";
  progress: number;
  errorMessage?: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type IGetTrainingJobsResponse = IAPIResponse<{
  results: ITrainingJob[];
  pagination: IPagination;
}>;

export type IGetTrainingJobResponse = IAPIResponse<ITrainingJob>;

export type IStartTrainingResponse = IAPIResponse<ITrainingJob>;

export type ICancelTrainingResponse = IAPIResponse<{
  id: string;
  message: string;
}>;