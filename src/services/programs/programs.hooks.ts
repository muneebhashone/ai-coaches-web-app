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
  getPrograms,
  createProgram,
  getProgramById,
  updateProgram,
  deleteProgram,
} from "./programs.service";
import type {
  IGetProgramsResponse,
  ICreateProgramResponse,
  IGetProgramByIdResponse,
  IUpdateProgramResponse,
  IDeleteProgramResponse,
  IGetProgramsData,
} from "./programs.types";
import type {
  GetProgramsQuerySchemaType,
  CreateProgramSchemaType,
  UpdateProgramSchemaType,
} from "./programs.schema";

export const programsKeys = {
  all: ["programs"] as const,
  lists: () => [...programsKeys.all, "lists"] as const,
  list: (filters: GetProgramsQuerySchemaType) =>
    [...programsKeys.lists(), filters] as const,
  details: () => [...programsKeys.all, "details"] as const,
  detail: (id: string) => [...programsKeys.details(), id] as const,
};

export const useGetPrograms = (
  filters: GetProgramsQuerySchemaType,
  options?: UseInfiniteQueryOptions<
    IGetProgramsResponse,
    Error,
    IGetProgramsData,
    IGetProgramsResponse,
    GetProgramsQuerySchemaType, // QueryKey type
    number // PageParam type
  >
) => {
  return useInfiniteQuery<
    IGetProgramsResponse,
    Error,
    IGetProgramsData,
    GetProgramsQuerySchemaType, // QueryKey type
    number // PageParam type
  >({
    queryKey: [programsKeys.list(filters)[0], filters],
    queryFn: ({ pageParam = 1 }) =>
      getPrograms({ ...filters, pageParam: pageParam.toString() }),
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

export const useCreateProgram = (
  options?: UseMutationOptions<
    ICreateProgramResponse,
    Error,
    CreateProgramSchemaType
  >
) => {
  return useMutation({
    mutationFn: createProgram,
    ...options,
  });
};

export const useGetProgramById = (
  id: string,
  options?: UseQueryOptions<IGetProgramByIdResponse>
) => {
  return useQuery({
    queryKey: programsKeys.detail(id),
    queryFn: () => getProgramById(id),
    enabled: !!id,
    ...options,
  });
};

export const useUpdateProgram = (
  options?: UseMutationOptions<
    IUpdateProgramResponse,
    Error,
    { id: string; data: UpdateProgramSchemaType }
  >
) => {
  return useMutation({
    mutationFn: ({ id, data }) => updateProgram(id, data),
    ...options,
  });
};

export const useDeleteProgram = (
  options?: UseMutationOptions<IDeleteProgramResponse, Error, string>
) => {
  return useMutation({
    mutationFn: deleteProgram,
    ...options,
  });
};
