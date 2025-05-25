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
  getDocuments,
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "./documents.service";
import type {
  IGetDocumentsResponse,
  ICreateDocumentResponse,
  IGetDocumentByIdResponse,
  IUpdateDocumentResponse,
  IDeleteDocumentResponse,
  IGetDocumentsData,
} from "./documents.types";
import type {
  GetDocumentsQuerySchemaType,
  CreateDocumentSchemaType,
  UpdateDocumentSchemaType,
} from "./documents.schema";

export const documentsKeys = {
  all: (knowledgeBaseId: string) =>
    ["knowledgeBases", knowledgeBaseId, "documents"] as const,
  lists: (knowledgeBaseId: string) =>
    [...documentsKeys.all(knowledgeBaseId), "lists"] as const,
  list: (
    knowledgeBaseId: string,
    filters: GetDocumentsQuerySchemaType
  ) => [...documentsKeys.lists(knowledgeBaseId), filters] as const,
  details: (knowledgeBaseId: string) =>
    [...documentsKeys.all(knowledgeBaseId), "details"] as const,
  detail: (knowledgeBaseId: string, id: string) =>
    [...documentsKeys.details(knowledgeBaseId), id] as const,
};

export const useGetDocuments = (
  knowledgeBaseId: string,
  filters: GetDocumentsQuerySchemaType,
  options?: UseInfiniteQueryOptions<
    IGetDocumentsResponse,
    Error,
    IGetDocumentsData,
    IGetDocumentsResponse,
    GetDocumentsQuerySchemaType, // QueryKey type
    number // PageParam type
  >
) => {
  return useInfiniteQuery<
    IGetDocumentsResponse,
    Error,
    IGetDocumentsData,
    GetDocumentsQuerySchemaType, // QueryKey type for useInfiniteQuery
    number // PageParam type
  >({
    // Construct queryKey as an array of strings/objects for stability
    queryKey: [
      documentsKeys.list(knowledgeBaseId, filters)[0], // "lists"
      documentsKeys.list(knowledgeBaseId, filters)[1], // knowledgeBaseId
      documentsKeys.list(knowledgeBaseId, filters)[2], // "documents"
      filters,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getDocuments(knowledgeBaseId, {
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
    enabled: !!knowledgeBaseId,
    ...options,
  });
};

export const useCreateDocument = (
  knowledgeBaseId: string,
  options?: UseMutationOptions<
    ICreateDocumentResponse,
    Error,
    CreateDocumentSchemaType
  >
) => {
  return useMutation({
    mutationFn: (data: CreateDocumentSchemaType) =>
      createDocument(knowledgeBaseId, data),
    ...options,
  });
};

export const useGetDocumentById = (
  knowledgeBaseId: string,
  id: string,
  options?: UseQueryOptions<IGetDocumentByIdResponse>
) => {
  return useQuery({
    queryKey: documentsKeys.detail(knowledgeBaseId, id),
    queryFn: () => getDocumentById(knowledgeBaseId, id),
    enabled: !!knowledgeBaseId && !!id,
    ...options,
  });
};

export const useUpdateDocument = (
  knowledgeBaseId: string,
  options?: UseMutationOptions<
    IUpdateDocumentResponse,
    Error,
    { id: string; data: UpdateDocumentSchemaType }
  >
) => {
  return useMutation({
    mutationFn: ({ id, data }) => updateDocument(knowledgeBaseId, id, data),
    ...options,
  });
};

export const useDeleteDocument = (
  knowledgeBaseId: string,
  options?: UseMutationOptions<IDeleteDocumentResponse, Error, string>
) => {
  return useMutation({
    mutationFn: (id: string) => deleteDocument(knowledgeBaseId, id),
    ...options,
  });
};
