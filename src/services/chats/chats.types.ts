import type { IAPIResponse, IPagination } from "../common/common.types";
import type { ChatMessageRoleSchema } from "./chats.schema";
import type { z } from "zod";

export type ChatMessageRoleType = z.infer<typeof ChatMessageRoleSchema>;

export interface IChatMessage {
  _id: string;
  content: string;
  role: ChatMessageRoleType;
  timestamp: string; // ISO datetime string
}

export interface IChat {
  _id: string;
  sessionId: string;
  clientId: string;
  chatbotId: string;
  active: boolean;
  messages?: IChatMessage[]; // Optional based on GET /:id response, not present in GET /
  messageCount: number;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

// Response for POST /start
export type IStartChatResponse = IAPIResponse<IChat>;

// Response for POST /:id/messages
export interface ISendMessageData {
  message: IChatMessage;
  aiResponse: IChatMessage;
}
export type ISendMessageResponse = IAPIResponse<ISendMessageData>;

// Response for GET /:id/messages
export interface IGetChatMessagesData {
  data: IChatMessage[];
  pagination: IPagination;
}
export type IGetChatMessagesResponse = IAPIResponse<IGetChatMessagesData>;

// Response for GET /session/:sessionId
// The response for this endpoint in the docs shows a Chat object without the messages array.
export type IGetChatBySessionIdResponse = IAPIResponse<
  Omit<IChat, "messages">
>;

// Response for GET / (protected - coach access)
export interface IGetChatsData {
  data: Array<Omit<IChat, "messages">>; // messages array not included in this list view
  pagination: IPagination;
}
export type IGetChatsResponse = IAPIResponse<IGetChatsData>;

// Response for GET /:id (protected - coach access)
// This response includes the messages array.
export type IGetChatByIdResponse = IAPIResponse<IChat>;

// Response for POST /:id/coach-message
export type ISendCoachMessageResponse = IAPIResponse<IChatMessage>;

// Response for PUT /:id/status
// The response example shows _id, active, updatedAt.
export interface IUpdateChatStatusData {
  _id: string;
  active: boolean;
  updatedAt: string;
}
export type IUpdateChatStatusResponse = IAPIResponse<IUpdateChatStatusData>;
