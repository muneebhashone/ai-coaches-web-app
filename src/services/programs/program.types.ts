import type { IAPIResponse, IPagination } from "../common/common.types";

export interface IProgram {
  _id: string;
  name: string;
  description?: string;
  chatbotId: string;
  goals?: string[];
  metrics?: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IGetProgramsResponse = IAPIResponse<{
  results: IProgram[];
  pagination: IPagination;
}>;

export type IGetProgramByChatbotIdResponse = IAPIResponse<IProgram>;

export type IGetProgramResponse = IAPIResponse<IProgram>;

export type ICreateProgramResponse = IAPIResponse<IProgram>;

export type IUpdateProgramResponse = IAPIResponse<IProgram>;

export type IDeleteProgramResponse = IAPIResponse<{
  id: string;
  message: string;
}>;