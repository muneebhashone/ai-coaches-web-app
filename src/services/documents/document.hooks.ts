import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
} from "./document.service";
import type {
  CreateDocumentSchemaType,
  UpdateDocumentSchemaType,
  GetDocumentsQuerySchemaType,
} from "./document.schema";

export const documentKeys = {
  all: ["documents"] as const,
  lists: (knowledgeBaseId: string) => [...documentKeys.all, "list", knowledgeBaseId] as const,
  list: (knowledgeBaseId: string, params?: GetDocumentsQuerySchemaType) =>
    [...documentKeys.lists(knowledgeBaseId), params] as const,
  details: (knowledgeBaseId: string) => [...documentKeys.all, "detail", knowledgeBaseId] as const,
  detail: (knowledgeBaseId: string, documentId: string) =>
    [...documentKeys.details(knowledgeBaseId), documentId] as const,
};

export function useDocuments(knowledgeBaseId: string, params?: GetDocumentsQuerySchemaType) {
  return useQuery({
    queryKey: documentKeys.list(knowledgeBaseId, params),
    queryFn: () => getDocuments(knowledgeBaseId, params),
    enabled: !!knowledgeBaseId,
  });
}

export function useDocument(knowledgeBaseId: string, documentId: string) {
  return useQuery({
    queryKey: documentKeys.detail(knowledgeBaseId, documentId),
    queryFn: () => getDocument(knowledgeBaseId, documentId),
    enabled: !!knowledgeBaseId && !!documentId,
  });
}

export function useCreateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      knowledgeBaseId,
      data,
    }: {
      knowledgeBaseId: string;
      data: CreateDocumentSchemaType;
    }) => createDocument(knowledgeBaseId, data),
    onSuccess: (_, { knowledgeBaseId }) => {
      queryClient.invalidateQueries({ queryKey: documentKeys.lists(knowledgeBaseId) });
    },
  });
}

export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      knowledgeBaseId,
      documentId,
      data,
    }: {
      knowledgeBaseId: string;
      documentId: string;
      data: UpdateDocumentSchemaType;
    }) => updateDocument(knowledgeBaseId, documentId, data),
    onSuccess: (_, { knowledgeBaseId, documentId }) => {
      queryClient.invalidateQueries({
        queryKey: documentKeys.detail(knowledgeBaseId, documentId),
      });
      queryClient.invalidateQueries({ queryKey: documentKeys.lists(knowledgeBaseId) });
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      knowledgeBaseId,
      documentId,
    }: {
      knowledgeBaseId: string;
      documentId: string;
    }) => deleteDocument(knowledgeBaseId, documentId),
    onSuccess: (_, { knowledgeBaseId }) => {
      queryClient.invalidateQueries({ queryKey: documentKeys.lists(knowledgeBaseId) });
    },
  });
}