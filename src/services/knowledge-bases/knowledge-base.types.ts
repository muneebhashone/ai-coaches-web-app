import type { IAPIResponse, IPagination } from "../common/common.types";

export interface IKnowledgeBase {
  _id: string;
  name: string;
  description?: string;
  userId: string;
  documentCount: number;
  createdAt: string;
  updatedAt: string;
}

export type IGetKnowledgeBasesResponse = IAPIResponse<{
  results: IKnowledgeBase[];
  pagination: IPagination;
}>;

export type IGetKnowledgeBaseResponse = IAPIResponse<IKnowledgeBase>;

export type IGetKnowledgeBasesByChatbotIdResponse = IAPIResponse<IKnowledgeBase>;

export type ICreateKnowledgeBaseResponse = IAPIResponse<IKnowledgeBase>;

export type IUpdateKnowledgeBaseResponse = IAPIResponse<IKnowledgeBase>;

export type IDeleteKnowledgeBaseResponse = IAPIResponse<{
  id: string;
  message: string;
}>;