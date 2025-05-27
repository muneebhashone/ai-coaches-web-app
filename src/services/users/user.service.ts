import apiClient from "@/lib/api-client";
import type {
  CreateUserSchemaType,
  UpdateUserSchemaType,
  GetUsersQuerySchemaType,
} from "./user.schema";
import type {
  IGetUsersResponse,
  IGetUserResponse,
  ICreateUserResponse,
  IUpdateUserResponse,
  IDeleteUserResponse,
} from "./user.types";

export const getUsers = async (
  params?: GetUsersQuerySchemaType
): Promise<IGetUsersResponse> => {
  const response = await apiClient.get("/users", { params });
  return response.data;
};

export const getUser = async (id: string): Promise<IGetUserResponse> => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (
  data: CreateUserSchemaType
): Promise<ICreateUserResponse> => {
  const response = await apiClient.post("/users", data);
  return response.data;
};

export const updateUser = async (
  id: string,
  data: UpdateUserSchemaType
): Promise<IUpdateUserResponse> => {
  const response = await apiClient.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string): Promise<IDeleteUserResponse> => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};