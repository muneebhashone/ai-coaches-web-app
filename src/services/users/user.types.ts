import type { IAPIResponse, IPagination } from "../common/common.types";

export interface IUser {
  _id: string;
  email: string;
  role: "DEFAULT_USER" | "COACH" | "SUPER_ADMIN";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export type IGetUsersResponse = IAPIResponse<{
  results: IUser[];
  pagination: IPagination;
}>;

export type IGetUserResponse = IAPIResponse<IUser>;

export type ICreateUserResponse = IAPIResponse<IUser>;

export type IUpdateUserResponse = IAPIResponse<IUser>;

export type IDeleteUserResponse = IAPIResponse<{
  id: string;
  message: string;
}>;