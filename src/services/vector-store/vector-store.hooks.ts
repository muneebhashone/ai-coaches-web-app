"use client";

import {
  useQuery,
  type UseQueryOptions,
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";
import {
  searchVectors,
  insertVectors,
  updateVectors,
  deleteVectorsByIds,
  deleteVectorsByFilter,
  getNamespaceStats,
  deleteNamespace,
  listNamespaces,
} from "./vector-store.service";
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

export const vectorStoreKeys = {
  all: ["vectorStore"] as const,
  namespaces: () => [...vectorStoreKeys.all, "namespaces"] as const,
  namespace: (namespace: string) =>
    [...vectorStoreKeys.namespaces(), namespace] as const,
  stats: (namespace: string) =>
    [...vectorStoreKeys.namespace(namespace), "stats"] as const,
  search: (namespace: string, query: string) =>
    [...vectorStoreKeys.namespace(namespace), "search", query] as const,
};

export const useSearchVectors = (
  namespace: string,
  options?: UseMutationOptions<
    ISearchVectorsResponse,
    Error,
    SearchVectorsSchemaType
  >
  // Search is typically a POST but behaves like a query.
  // For React Query, it's often better to use useQuery if it's idempotent and cacheable,
  // or useMutation if it has side effects or isn't idempotent.
  // Given it's a POST and likely not idempotent (usage tracking), useMutation is appropriate.
) => {
  return useMutation({
    mutationFn: (data: SearchVectorsSchemaType) =>
      searchVectors(namespace, data),
    ...options,
  });
};

export const useInsertVectors = (
  namespace: string,
  options?: UseMutationOptions<
    IInsertVectorsResponse,
    Error,
    InsertVectorsSchemaType
  >
) => {
  return useMutation({
    mutationFn: (data: InsertVectorsSchemaType) =>
      insertVectors(namespace, data),
    ...options,
  });
};

export const useUpdateVectors = (
  namespace: string,
  options?: UseMutationOptions<
    IUpdateVectorsResponse,
    Error,
    UpdateVectorsSchemaType
  >
) => {
  return useMutation({
    mutationFn: (data: UpdateVectorsSchemaType) =>
      updateVectors(namespace, data),
    ...options,
  });
};

export const useDeleteVectorsByIds = (
  namespace: string,
  options?: UseMutationOptions<
    IDeleteVectorsByIdsResponse,
    Error,
    DeleteVectorsByIdsSchemaType
  >
) => {
  return useMutation({
    mutationFn: (data: DeleteVectorsByIdsSchemaType) =>
      deleteVectorsByIds(namespace, data),
    ...options,
  });
};

export const useDeleteVectorsByFilter = (
  namespace: string,
  options?: UseMutationOptions<
    IDeleteVectorsByFilterResponse,
    Error,
    DeleteVectorsByFilterSchemaType
  >
) => {
  return useMutation({
    mutationFn: (data: DeleteVectorsByFilterSchemaType) =>
      deleteVectorsByFilter(namespace, data),
    ...options,
  });
};

export const useGetNamespaceStats = (
  namespace: string,
  options?: UseQueryOptions<IGetNamespaceStatsResponse>
) => {
  return useQuery({
    queryKey: vectorStoreKeys.stats(namespace),
    queryFn: () => getNamespaceStats(namespace),
    enabled: !!namespace,
    ...options,
  });
};

export const useDeleteNamespace = (
  options?: UseMutationOptions<IDeleteNamespaceResponse, Error, string>
) => {
  return useMutation({
    mutationFn: (namespace: string) => deleteNamespace(namespace),
    ...options,
  });
};

export const useListNamespaces = (
  options?: UseQueryOptions<IListNamespacesResponse>
) => {
  return useQuery({
    queryKey: vectorStoreKeys.namespaces(),
    queryFn: listNamespaces,
    ...options,
  });
};
