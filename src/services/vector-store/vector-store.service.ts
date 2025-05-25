import apiClient from "@/lib/api-client";
import type {
  ISearchVectorsResponse,
  IInsertVectorsResponse,
  IUpdateVectorsResponse,
  IDeleteVectorsByIdsResponse,
  IDeleteVectorsByFilterResponse,
  IGetNamespaceStatsResponse,
  IDeleteNamespaceResponse,
  IListNamespacesResponse,
} from "./vector-store.types";
import type {
  SearchVectorsSchemaType,
  InsertVectorsSchemaType,
  UpdateVectorsSchemaType,
  DeleteVectorsByIdsSchemaType,
  DeleteVectorsByFilterSchemaType,
} from "./vector-store.schema";

const VECTOR_STORE_BASE_URL = "/vector-store";

export const searchVectors = async (
  namespace: string,
  data: SearchVectorsSchemaType
): Promise<ISearchVectorsResponse> => {
  const response = await apiClient.post(
    `${VECTOR_STORE_BASE_URL}/${namespace}/search`,
    data
  );
  return response.data;
};

export const insertVectors = async (
  namespace: string,
  data: InsertVectorsSchemaType
): Promise<IInsertVectorsResponse> => {
  const response = await apiClient.post(
    `${VECTOR_STORE_BASE_URL}/${namespace}/vectors`,
    data
  );
  return response.data;
};

export const updateVectors = async (
  namespace: string,
  data: UpdateVectorsSchemaType
): Promise<IUpdateVectorsResponse> => {
  const response = await apiClient.put(
    `${VECTOR_STORE_BASE_URL}/${namespace}/vectors`,
    data
  );
  return response.data;
};

export const deleteVectorsByIds = async (
  namespace: string,
  data: DeleteVectorsByIdsSchemaType
): Promise<IDeleteVectorsByIdsResponse> => {
  // The API docs specify DELETE with a body, which is unusual.
  // apiClient.delete might not support a body directly in all configurations.
  // If issues arise, this might need adjustment based on how apiClient handles DELETE with body.
  const response = await apiClient.delete(
    `${VECTOR_STORE_BASE_URL}/${namespace}/vectors`,
    { data } // Passing body as 'data' for delete requests
  );
  return response.data;
};

export const deleteVectorsByFilter = async (
  namespace: string,
  data: DeleteVectorsByFilterSchemaType
): Promise<IDeleteVectorsByFilterResponse> => {
  const response = await apiClient.delete(
    `${VECTOR_STORE_BASE_URL}/${namespace}/vectors/filter`,
    { data } // Passing body as 'data' for delete requests
  );
  return response.data;
};

export const getNamespaceStats = async (
  namespace: string
): Promise<IGetNamespaceStatsResponse> => {
  const response = await apiClient.get(
    `${VECTOR_STORE_BASE_URL}/${namespace}/stats`
  );
  return response.data;
};

export const deleteNamespace = async (
  namespace: string
): Promise<IDeleteNamespaceResponse> => {
  const response = await apiClient.delete(
    `${VECTOR_STORE_BASE_URL}/${namespace}`
  );
  return response.data;
};

export const listNamespaces = async (): Promise<IListNamespacesResponse> => {
  const response = await apiClient.get(`${VECTOR_STORE_BASE_URL}/namespaces`);
  return response.data;
};
