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
  getAudioTranscriptions,
  createAudioTranscription,
  getAudioTranscriptionStats,
  getAudioTranscriptionById,
  getAudioTranscriptionTranscript,
  copyTranscriptToKnowledgeBase,
  deleteAudioTranscription,
} from "./audio-transcribe.service";
import type {
  IGetAudioTranscriptionsResponse,
  ICreateAudioTranscriptionResponse,
  IGetAudioTranscriptionStatsResponse,
  IGetAudioTranscriptionByIdResponse,
  IGetAudioTranscriptionTranscriptResponse,
  ICopyTranscriptToKnowledgeBaseResponse,
  IDeleteAudioTranscriptionResponse,
  IGetAudioTranscriptionsData,
} from "./audio-transcribe.types";
import type {
  GetAudioTranscriptionsQuerySchemaType,
  CreateAudioTranscriptionSchemaType,
  CopyTranscriptToKnowledgeBaseSchemaType,
} from "./audio-transcribe.schema";

export const audioTranscribeKeys = {
  all: ["audioTranscribe"] as const,
  lists: () => [...audioTranscribeKeys.all, "lists"] as const,
  list: (filters: GetAudioTranscriptionsQuerySchemaType) =>
    [...audioTranscribeKeys.lists(), filters] as const,
  details: () => [...audioTranscribeKeys.all, "details"] as const,
  detail: (id: string) => [...audioTranscribeKeys.details(), id] as const,
  stats: () => [...audioTranscribeKeys.all, "stats"] as const,
  transcript: (id: string) =>
    [...audioTranscribeKeys.all, "transcript", id] as const,
};

export const useGetAudioTranscriptions = (
  filters: GetAudioTranscriptionsQuerySchemaType,
  options?: UseInfiniteQueryOptions<
    IGetAudioTranscriptionsResponse,
    Error,
    IGetAudioTranscriptionsData, // This should be IGetAudioTranscriptionsResponse if your service returns the full response
    IGetAudioTranscriptionsResponse, // Data type for queryFn
    GetAudioTranscriptionsQuerySchemaType, // Type of queryKey array
    number // Type of pageParam
  >
) => {
  return useInfiniteQuery<
    IGetAudioTranscriptionsResponse,
    Error,
    IGetAudioTranscriptionsData,
    GetAudioTranscriptionsQuerySchemaType, // QueryKey type
    number // PageParam type
  >({
    queryKey: [audioTranscribeKeys.list(filters)[0], filters], // Use a stable query key array
    queryFn: ({ pageParam = 1 }) =>
      getAudioTranscriptions({ ...filters, pageParam: pageParam.toString() }),
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

export const useCreateAudioTranscription = (
  options?: UseMutationOptions<
    ICreateAudioTranscriptionResponse,
    Error,
    CreateAudioTranscriptionSchemaType
  >
) => {
  return useMutation({
    mutationFn: createAudioTranscription,
    ...options,
  });
};

export const useGetAudioTranscriptionStats = (
  options?: UseQueryOptions<IGetAudioTranscriptionStatsResponse>
) => {
  return useQuery({
    queryKey: audioTranscribeKeys.stats(),
    queryFn: getAudioTranscriptionStats,
    ...options,
  });
};

export const useGetAudioTranscriptionById = (
  id: string,
  options?: UseQueryOptions<IGetAudioTranscriptionByIdResponse>
) => {
  return useQuery({
    queryKey: audioTranscribeKeys.detail(id),
    queryFn: () => getAudioTranscriptionById(id),
    enabled: !!id,
    ...options,
  });
};

export const useGetAudioTranscriptionTranscript = (
  id: string,
  options?: UseQueryOptions<IGetAudioTranscriptionTranscriptResponse>
) => {
  return useQuery({
    queryKey: audioTranscribeKeys.transcript(id),
    queryFn: () => getAudioTranscriptionTranscript(id),
    enabled: !!id,
    ...options,
  });
};

export const useCopyTranscriptToKnowledgeBase = (
  options?: UseMutationOptions<
    ICopyTranscriptToKnowledgeBaseResponse,
    Error,
    { id: string; data: CopyTranscriptToKnowledgeBaseSchemaType }
  >
) => {
  return useMutation({
    mutationFn: ({ id, data }) => copyTranscriptToKnowledgeBase(id, data),
    ...options,
  });
};

export const useDeleteAudioTranscription = (
  options?: UseMutationOptions<IDeleteAudioTranscriptionResponse, Error, string>
) => {
  return useMutation({
    mutationFn: deleteAudioTranscription,
    ...options,
  });
};
