import type { IAPIResponse } from "../common/common.types";
import type { IChatbot } from "../chatbot/chatbot.types";
import type { IClient } from "../client/client.types";
import type { IPaginatorInfo } from "../client/client.types";

export type SessionStatus = "ACTIVE" | "COMPLETED" | "TERMINATED" | "SCHEDULED";

export interface IMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface IFeedback {
  rating?: number;
  comment?: string;
}

export interface ISession {
  _id: string;
  chatbotId: string | IChatbot;
  clientId: string | IClient;
  title?: string;
  startTime: string;
  endTime?: string;
  status: SessionStatus;
  messages: IMessage[];
  metadata?: Record<string, unknown>;
  feedback?: IFeedback;
  createdAt: string;
  updatedAt: string;
}

export interface ISessionsList {
  results: ISession[];
  paginatorInfo: IPaginatorInfo;
}

export type ICreateSessionResponse = IAPIResponse<ISession>;
export type IUpdateSessionResponse = IAPIResponse<ISession>;
export type IGetSessionResponse = IAPIResponse<ISession>;
export type IEndSessionResponse = IAPIResponse<ISession>;
export type IAddMessageResponse = IAPIResponse<ISession>;
export type IProcessMessageResponse = IAPIResponse<IMessage>;
export type IGetSessionsResponse = IAPIResponse<ISessionsList>;
