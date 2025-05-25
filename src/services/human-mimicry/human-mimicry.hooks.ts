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
  getHumanMimicryData,
  createHumanMimicryData,
  getHumanMimicryDataById,
  updateHumanMimicryData,
  deleteHumanMimicryData,
} from "./human-mimicry.service";
import type {
  IGetHumanMimicryDataResponse,
  ICreateHumanMimicryDataResponse,
  IGetHumanMimicryByIdResponse,
  IUpdateHumanMimicryDataResponse,
  IDeleteHumanMimicryDataResponse,
  IGetHumanMimicryDataPayload,
} from "./human-mimicry.types";
import type {
  GetHumanMimicryDataQuerySchemaType,
  CreateHumanMimicryDataSchemaType,
  UpdateHumanMimicryDataSchemaType,
} from "./human-mimicry.schema";

export const humanMimicryKeys = {
  all: (chatbotId: string) =>
    ["chatbots", chatbotId, "humanMimicry"] as const,
  lists: (chatbotId: string) =>
    [...humanMimicryKeys.all(chatbotId), "lists"] as const,
  list: (
    chatbotId: string,
    filters: GetHumanMimicryDataQuerySchemaType
  ) => [...humanMimicryKeys.lists(chatbotId), filters] as const,
  details: (chatbotId: string) =>
    [...humanMimicryKeys.all(chatbotId), "details"] as const,
  detail: (chatbotId: string, id: string) =>
    [...humanMimicryKeys.details(chatbotId), id] as const,
};

export const useGetHumanMimicryData = (
  chatbotId: string,
  filters: GetHumanMimicryDataQuerySchemaType,
  options?: UseInfiniteQueryOptions<
    IGetHumanMimicryDataResponse,
    Error,
    IGetHumanMimicryDataPayload,
    IGetHumanMimicryDataResponse,
    GetHumanMimicryDataQuerySchemaType, // QueryKey type
    number // PageParam type
  >
) => {
  return useInfiniteQuery<
    IGetHumanMimicryDataResponse,
    Error,
    IGetHumanMimicryDataPayload,
    GetHumanMimicryDataQuerySchemaType, // QueryKey type for useInfiniteQuery
    number // PageParam type
  >({
    queryKey: [
      humanMimicryKeys.list(chatbotId, filters)[0], // "lists"
      humanMimicryKeys.list(chatbotId, filters)[1], // chatbotId
      humanMimicryKeys.list(chatbotId, filters)[2], // "humanMimicry"
      filters,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getHumanMimicryData(chatbotId, {
        ...filters,
        pageParam: pageParam.toString(),
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pagination.hasNextPage) {
        return lastPage.data.pagination.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!chatbotId,
    ...options,
  });
};

export const useCreateHumanMimicryData = (
  chatbotId: string,
  options?: UseMutationOptions<
    ICreateHumanMimicryDataResponse,
    Error,
    CreateHumanMimicryDataSchemaType
  >
) => {
  return useMutation({
    mutationFn: (data: CreateHumanMimicryDataSchemaType) =>
      createHumanMimicryData(chatbotId, data),
    ...options,
  });
};

export const useGetHumanMimicryDataById = (
  chatbotId: string,
  id: string,
  options?: UseQueryOptions<IGetHumanMimicryByIdResponse>
) => {
  return useQuery({
    queryKey: humanMimicryKeys.detail(chatbotId, id),
    queryFn: () => getHumanMimicryDataById(chatbotId, id),
    enabled: !!chatbotId && !!id,
    ...options,
  });
};

export const useUpdateHumanMimicryData = (
  chatbotId: string,
  options?: UseMutationOptions<
    IUpdateHumanMimicryDataResponse,
    Error,
    { id: string; data: UpdateHumanMimicryDataSchemaType }
  >
) => {
  return useMutation({
    mutationFn: ({ id, data }) =>
      updateHumanMimicryData(chatbotId, id, data),
    ...options,
  });
};

export const useDeleteHumanMimicryData = (
  chatbotId: string,
  options?: UseMutationOptions<IDeleteHumanMimicryDataResponse, Error, string>
) => {
  return useMutation({
    mutationFn: (id: string) => deleteHumanMimicryData(chatbotId, id),
    ...options,
  });
};
