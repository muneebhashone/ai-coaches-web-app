import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSessions,
  getSession,
  createSession,
  createMultipleSessions,
  updateSession,
  deleteSession,
} from "./session.service";
import type {
  CreateSessionSchemaType,
  CreateMultipleSessionsSchemaType,
  UpdateSessionSchemaType,
  GetSessionsQuerySchemaType,
} from "./session.schema";

export const sessionKeys = {
  all: ["sessions"] as const,
  lists: () => [...sessionKeys.all, "list"] as const,
  list: (params?: GetSessionsQuerySchemaType) =>
    [...sessionKeys.lists(), params] as const,
  details: () => [...sessionKeys.all, "detail"] as const,
  detail: (id: string) => [...sessionKeys.details(), id] as const,
};

export function useSessions(params?: GetSessionsQuerySchemaType) {
  return useQuery({
    queryKey: sessionKeys.list(params),
    queryFn: () => getSessions(params),
    enabled: !!params?.programId,
  });
}

export function useSession(id: string) {
  return useQuery({
    queryKey: sessionKeys.detail(id),
    queryFn: () => getSession(id),
    enabled: !!id,
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSessionSchemaType) => createSession(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
    },
  });
}

export function useCreateMultipleSessions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMultipleSessionsSchemaType) =>
      createMultipleSessions(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
    },
  });
}

export function useUpdateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSessionSchemaType }) =>
      updateSession(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
    },
  });
}
