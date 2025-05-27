import type { IAPIResponse, IPagination } from "../common/common.types";

export interface IChatbot {
  _id: string;
  name: string;
  description?: string;
  knowledgeBaseId?: string;
  humanMimicryId?: string;
  prompt?: string;
  active: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type IGetChatbotsResponse = IAPIResponse<{
  results: IChatbot[];
  pagination: IPagination;
}>;

export type IGetChatbotResponse = IAPIResponse<IChatbot>;

export type ICreateChatbotResponse = IAPIResponse<IChatbot>;

export type IUpdateChatbotResponse = IAPIResponse<IChatbot>;

export type IDeleteChatbotResponse = IAPIResponse<{
  id: string;
  message: string;
}>;

export type ICloneChatbotResponse = IAPIResponse<IChatbot>;