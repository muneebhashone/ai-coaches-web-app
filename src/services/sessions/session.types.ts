import type { IAPIResponse, IPagination } from "../common/common.types";

export const SessionStatusEnum = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NEXT: 'next',
} as const;

export type SessionStatus =
  (typeof SessionStatusEnum)[keyof typeof SessionStatusEnum];

export interface ISession {
  _id: string;
  programId: string;
  sessionDate: string;
  chatbotId: string;
  name: string;
  duration: string;
  status: SessionStatus;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IGetSessionsResponse = IAPIResponse<{
  results: ISession[];
  pagination: IPagination;
}>;

export type IGetSessionResponse = IAPIResponse<ISession>;

export type ICreateSessionResponse = IAPIResponse<ISession>;

export type IUpdateSessionResponse = IAPIResponse<ISession>;

export type IDeleteSessionResponse = IAPIResponse<{
  id: string;
  message: string;
}>;