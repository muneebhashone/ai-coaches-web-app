import type { IAPIResponse, IPagination } from "../common/common.types";

export interface IProgram {
  _id: string;
  name: string;
  description: string | null;
  purpose: string | null;
  goals: string | null;
  successMetrics: string | null;
  chatbotId: string;
  active: boolean;
  user: string; // User ID
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

// Response for GET /
export interface IGetProgramsData {
  programs: IProgram[];
  pagination: IPagination;
}
export type IGetProgramsResponse = IAPIResponse<IGetProgramsData>;

// Response for POST /
export type ICreateProgramResponse = IAPIResponse<IProgram>;

// Response for GET /:id
export type IGetProgramByIdResponse = IAPIResponse<IProgram>;

// Response for PUT /:id
export type IUpdateProgramResponse = IAPIResponse<IProgram>;

// Response for DELETE /:id
export type IDeleteProgramResponse = IAPIResponse<{ message: string }>;
