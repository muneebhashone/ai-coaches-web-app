"use client";

import {
  useQuery,
  type UseQueryOptions,
  useMutation,
  type UseMutationOptions,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import {
  getKnowledgeBases,
  createKnowledgeBase,
  getKnowledgeBaseById,
  updateKnowledgeBase,
  deleteKnowledgeBase,
} from "./knowledge-bases.service";
import type {
  IGetKnowledgeBasesResponse,
  ICreateKnowledgeBaseResponse,
  IGetKnowledgeBaseByIdResponse,
  IUpdateKnowledgeBaseResponse,
  IDeleteKnowledgeBaseResponse,
  IGetKnowledgeBasesData,
} from "./knowledge-bases.types";
import type {
  GetKnowledgeBasesQuerySchemaType,
  CreateKnowledgeBaseSchemaType,
  UpdateKnowledgeBaseSchemaType,
} from "./knowledge-bases.schema";

export const knowledgeBaseKeys = {
  all: ["knowledgeBases"] as const,
  lists: () => [...knowledgeBaseKeys.all, "lists"] as const,
  list: (filters: GetKnowledgeBasesQuerySchemaType) =>
    [...knowledgeBaseKeys.lists(), filters] as const,
  details: () => [...knowledgeBaseKeys.all, "details"] as const,
  detail: (id: string) => [...knowledgeBaseKeys.details(), id] as const,
};

export const useGetKnowledgeBases = (
  filters: GetKnowledgeBasesQuerySchemaType,
  options?: UseInfiniteQueryOptions<
    IGetKnowledgeBasesResponse,
    Error,
    IGetKnowledgeBasesData,
    IGetKnowledgeBasesResponse,
    GetKnowledgeBasesQuerySchemaType, // QueryKey type
    number // PageParam type
  >
) => {
  return useInfiniteQuery<
    IGetKnowledgeBasesResponse,
    Error,
    IGetKnowledgeBasesData,
    GetKnowledgeBasesQuerySchemaType, // QueryKey type
    number // PageParam type
  >({
    queryKey: [knowledgeBaseKeys.list(filters)[0], filters],
    queryFn: ({ pageParam = 1 }) =>
      getKnowledgeBases({ ...filters, pageParam: pageParam.toString() }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pagination.hasNextPage) {
        return lastPage.data.pagination.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    ...options,
  });
};

export const useCreateKnowledgeBase = (
  options?: UseMutationOptions<
    ICreateKnowledgeBaseResponse,
    Error,
    CreateKnowledgeBaseSchemaType
  >
) => {
  return useMutation({
    mutationFn: createKnowledgeBase,
    ...options,
  });
};

export const useGetKnowledgeBaseById = (
  id: string,
  options?: UseQueryOptions<IGetKnowledgeBaseByIdResponse>
) => {
  return useQuery({
    queryKey: knowledgeBaseKeys.detail(id),
    queryFn: () => getKnowledgeBaseById(id),
    enabled: !!id,
    ...options,
  });
};

export const useUpdateKnowledgeBase = (
  options?: UseMutationOptions<
    IUpdateKnowledgeBaseResponse,
    Error,
    { id: string; data: UpdateKnowledgeBaseSchemaType }
  >
) => {
  return useMutation({
    mutationFn: ({ id, data }) => updateKnowledgeBase(id, data),
    ...options,
  });
};

export const useDeleteKnowledgeBase = (
  options?: UseMutationOptions<IDeleteKnowledgeBaseResponse, Error, string>
) => {
  return useMutation({
    mutationFn: deleteKnowledgeBase,
    ...options,
  });
};
