import type { IAPIResponse } from "../common/common.types";

export interface IClient {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface IPaginatorInfo {
  count: number;
  currentPage: number;
  hasMorePages: boolean;
  lastPage: number;
  limit: number;
  perPage: number;
  total: number;
}

export interface IClientsList {
  results: IClient[];
  paginatorInfo: IPaginatorInfo;
}

export type ICreateClientResponse = IAPIResponse<IClient>;
export type IUpdateClientResponse = IAPIResponse<IClient>;
export type IGetClientResponse = IAPIResponse<IClient>;
export type IDeleteClientResponse = IAPIResponse<void>;
export type IGetClientsResponse = IAPIResponse<IClientsList>;
