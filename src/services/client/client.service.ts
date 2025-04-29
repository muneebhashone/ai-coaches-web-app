import apiClient from "@/lib/api-client";
import type {
  CreateClientSchemaType,
  UpdateClientSchemaType,
  GetClientsSchemaType,
} from "./client.schema";
import type {
  ICreateClientResponse,
  IUpdateClientResponse,
  IGetClientResponse,
  IDeleteClientResponse,
  IGetClientsResponse,
} from "./client.types";

export const createClient = async (
  data: CreateClientSchemaType
): Promise<ICreateClientResponse> => {
  const response = await apiClient.post("/clients", data);
  return response.data;
};

export const updateClient = async (
  id: string,
  data: UpdateClientSchemaType
): Promise<IUpdateClientResponse> => {
  const response = await apiClient.put(`/clients/${id}`, data);
  return response.data;
};

export const getClient = async (id: string): Promise<IGetClientResponse> => {
  const response = await apiClient.get(`/clients/${id}`);
  return response.data;
};

export const deleteClient = async (id: string): Promise<IDeleteClientResponse> => {
  const response = await apiClient.delete(`/clients/${id}`);
  return response.data;
};

export const getClients = async (
  params?: GetClientsSchemaType
): Promise<IGetClientsResponse> => {
  const response = await apiClient.get("/clients", { params });
  return response.data;
};