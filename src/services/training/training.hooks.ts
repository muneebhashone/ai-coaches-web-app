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
  startTraining,
  getTrainingJobs,
  getTrainingJobById,
} from "./training.service";
import type {
  IStartTrainingResponse,
  IGetTrainingJobsResponse,
  IGetTrainingJobByIdResponse,
  IGetTrainingJobsData,
} from "./training.types";
import type {
  StartTrainingSchemaType,
  GetTrainingJobsQuerySchemaType,
} from "./training.schema";

export const trainingKeys = {
  all: ["training"] as const,
  lists: () => [...trainingKeys.all, "lists"] as const,
  list: (filters: GetTrainingJobsQuerySchemaType) =>
    [...trainingKeys.lists(), filters] as const,
  details: () => [...trainingKeys.all, "details"] as const,
  detail: (id: string) => [...trainingKeys.details(), id] as const,
};

export const useStartTraining = (
  options?: UseMutationOptions<
    IStartTrainingResponse,
    Error,
    StartTrainingSchemaType
  >
) => {
  return useMutation({
    mutationFn: startTraining,
    ...options,
  });
};

export const useGetTrainingJobs = (
  filters: GetTrainingJobsQuerySchemaType,
  options?: UseInfiniteQueryOptions<
    IGetTrainingJobsResponse,
    Error,
    IGetTrainingJobsData,
    IGetTrainingJobsResponse,
    GetTrainingJobsQuerySchemaType, // QueryKey type
    number // PageParam type
  >
) => {
  return useInfiniteQuery<
    IGetTrainingJobsResponse,
    Error,
    IGetTrainingJobsData,
    GetTrainingJobsQuerySchemaType, // QueryKey type
    number // PageParam type
  >({
    queryKey: [trainingKeys.list(filters)[0], filters],
    queryFn: ({ pageParam = 1 }) =>
      getTrainingJobs({ ...filters, pageParam: pageParam.toString() }),
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

export const useGetTrainingJobById = (
  id: string,
  options?: UseQueryOptions<IGetTrainingJobByIdResponse>
) => {
  return useQuery({
    queryKey: trainingKeys.detail(id),
    queryFn: () => getTrainingJobById(id),
    enabled: !!id && id !== "undefined" && id !== "null", // ensure id is valid
    ...options,
  });
};
