import type { IAPIResponse, IPagination } from "../common/common.types";
import type { TrainingStatusSchema } from "./training.schema";
import type { z } from "zod";

export type TrainingStatusType = z.infer<typeof TrainingStatusSchema>;
export type TrainingLogLevelType = "info" | "warning" | "error" | "success";

export interface ITrainingLog {
  timestamp: string; // ISO datetime string
  level: TrainingLogLevelType;
  message: string;
}

export interface ITrainingJob {
  _id: string;
  chatbotId: string;
  status: TrainingStatusType;
  progress: number; // 0-100
  logs: ITrainingLog[];
  startTime: string; // ISO datetime string
  endTime: string | null; // ISO datetime string
  duration: number | null; // milliseconds
  user: string; // User ID
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

// Response for POST /run
export type IStartTrainingResponse = IAPIResponse<ITrainingJob>;

// Response for GET /
export interface IGetTrainingJobsData {
  trainings: ITrainingJob[];
  pagination: IPagination; // Reusing common IPagination type
}
export type IGetTrainingJobsResponse = IAPIResponse<IGetTrainingJobsData>;

// Response for GET /:id
export type IGetTrainingJobByIdResponse = IAPIResponse<ITrainingJob>;
