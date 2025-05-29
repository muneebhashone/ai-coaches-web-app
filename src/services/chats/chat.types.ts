import type { IAPIResponse, IPagination } from "../common/common.types";

export interface IMessage {
  _id: string;
  content: string;
  sender: "client" | "chatbot";
  timestamp: string;
}

export interface IChat {
  _id: string;
  sessionId?: string;
  clientId: string;
  chatbotId: string;
  messages: IMessage[];
  isVisible: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type IGetChatsResponse = IAPIResponse<{
  results: IChat[];
  pagination: IPagination;
}>;

export type IGetChatResponse = IAPIResponse<IChat>;

export type ISendMessageResponse = IAPIResponse<{
  chat: IChat;
  response: string;
}>;

export type IUpdateChatResponse = IAPIResponse<IChat>;

export type IDeleteChatResponse = IAPIResponse<{
  id: string;
  message: string;
}>;