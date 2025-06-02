import type { IAPIResponse, IPagination } from "../common/common.types";
import { IProgram } from "../programs/program.types";
import { ISession } from "../sessions/session.types";

export interface IMessage {
  _id: string;
  content: string;
  role: "client" | "assistant";
  createdAt: string;
}

export interface IChat {
  _id: string;
  sessionId?: string;
  clientId: string;
  chatbotId: string;
  session: ISession;
  messages: IMessage[];
  program: IProgram;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type IGetChatsResponse = IAPIResponse<{
  results: IChat[];
  pagination: IPagination;
}>;

export type IGetChatResponse = IAPIResponse<IChat>;

export type ICreateChatsForClientResponse = IAPIResponse<IChat[]>;

export type ISendMessageResponse = IAPIResponse<{
  chat: IChat;
  response: string;
}>;

export type IUpdateChatResponse = IAPIResponse<IChat>;

export type IDeleteChatResponse = IAPIResponse<{
  id: string;
  message: string;
}>;
