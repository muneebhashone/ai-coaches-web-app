import type { IAPIResponse, IPagination } from "../common/common.types";

export interface IClient {
  _id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  kakaoId?: string;
  activeProgramId?: string;
  createdAt: string;
  updatedAt: string;
}

export type IGetClientsResponse = IAPIResponse<{
  results: IClient[];
  pagination: IPagination;
}>;

export type IGetClientResponse = IAPIResponse<IClient>;

export type ICreateClientResponse = IAPIResponse<IClient>;

export type IUpdateClientResponse = IAPIResponse<IClient>;

export type IDeleteClientResponse = IAPIResponse<{
  id: string;
  message: string;
}>;

export type IConnectKakaoResponse = IAPIResponse<IClient>;