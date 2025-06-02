import apiClient from "@/lib/api-client";
import type {
  CreateClientSchemaType,
  UpdateClientSchemaType,
  GetClientsQuerySchemaType,
  ConnectKakaoSchemaType,
} from "./client.schema";
import type {
  IGetClientsResponse,
  IGetClientResponse,
  ICreateClientResponse,
  IUpdateClientResponse,
  IDeleteClientResponse,
  IConnectKakaoResponse,
} from "./client.types";

export const getClients = async (
  params?: GetClientsQuerySchemaType
): Promise<IGetClientsResponse> => {
  const response = await apiClient.get("/clients", { params });
  return response.data;
};

export const getClient = async (id: string): Promise<IGetClientResponse> => {
  const response = await apiClient.get(`/clients/${id}`);
  return response.data;
};

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

export const deleteClient = async (
  id: string
): Promise<IDeleteClientResponse> => {
  const response = await apiClient.delete(`/clients/${id}`);
  return response.data;
};

export const connectKakao = async (
  clientId: string,
  data: ConnectKakaoSchemaType
): Promise<IConnectKakaoResponse> => {
  const response = await apiClient.post(`/clients/${clientId}/kakao`, data);
  return response.data;
};

export const disconnectKakao = async (
  clientId: string
): Promise<IConnectKakaoResponse> => {
  const response = await apiClient.delete(`/clients/${clientId}/kakao`);
  return response.data;
};
