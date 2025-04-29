import type { IAPIResponse } from "../common/common.types";
import type { IPaginatorInfo } from "../client/client.types";

export type ChatbotStatus = "ACTIVE" | "INACTIVE" | "DELETED";

export interface IChatbotPersona {
  name: string;
  description: string;
  promptTemplate: string;
  systemInstructions: string;
}

export interface IChatbotApiSettings {
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface IChatbot {
  _id: string;
  name: string;
  description?: string;
  persona: IChatbotPersona;
  status: ChatbotStatus;
  apiSettings: IChatbotApiSettings;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface IChatbotsList {
  results: IChatbot[];
  paginatorInfo: IPaginatorInfo;
}

export interface IDefaultPersona {
  defaultPersona: IChatbotPersona;
  systemInstructions: string;
  promptTemplate: string;
}

export type ICreateChatbotResponse = IAPIResponse<IChatbot>;
export type IUpdateChatbotResponse = IAPIResponse<IChatbot>;
export type IGetChatbotResponse = IAPIResponse<IChatbot>;
export type IDeleteChatbotResponse = IAPIResponse<void>;
export type IGetChatbotsResponse = IAPIResponse<IChatbotsList>;
export type IGetDefaultPersonaResponse = IAPIResponse<IDefaultPersona>;
