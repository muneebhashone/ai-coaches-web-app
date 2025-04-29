"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  createSession,
  updateSession,
  getSession,
  endSession,
  addMessage,
  processMessage,
  getSessions,
} from "./session.service";
import type {
  CreateSessionSchemaType,
  UpdateSessionSchemaType,
  AddMessageSchemaType,
  ProcessMessageSchemaType,
  GetSessionsSchemaType,
} from "./session.schema";
import type {
  ICreateSessionResponse,
  IUpdateSessionResponse,
  IGetSessionResponse,
  IEndSessionResponse,
  IGetSessionsResponse,
  IAddMessageResponse,
  IProcessMessageResponse,
} from "./session.types";

export const sessionKeys = {
  all: ["sessions"] as const,
  lists: () => [...sessionKeys.all, "list"] as const,
  list: (params: GetSessionsSchemaType | undefined) =>
    [...sessionKeys.lists(), params] as const,
  details: () => [...sessionKeys.all, "detail"] as const,
  detail: (id: string) => [...sessionKeys.details(), id] as const,
} as const;

export const useSessions = (
  params?: GetSessionsSchemaType,
  options?: UseQueryOptions<IGetSessionsResponse>
) => {
  return useQuery({
    ...options,
    queryKey: sessionKeys.list(params),
    queryFn: () => getSessions(params),
  });
};

export const useSession = (
  id: string,
  options?: UseQueryOptions<IGetSessionResponse>
) => {
  return useQuery({
    ...options,
    queryKey: sessionKeys.detail(id),
    queryFn: () => getSession(id),
    enabled: !!id,
  });
};

export const useCreateSession = (
  options?: UseMutationOptions<
    ICreateSessionResponse,
    Error,
    CreateSessionSchemaType
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: createSession,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useUpdateSession = (
  id: string,
  options?: UseMutationOptions<
    IUpdateSessionResponse,
    Error,
    UpdateSessionSchemaType
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (data) => updateSession(id, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: sessionKeys.detail(id) });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useEndSession = (
  options?: UseMutationOptions<IEndSessionResponse, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: endSession,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: sessionKeys.detail(variables),
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useAddMessage = (
  sessionId: string,
  options?: UseMutationOptions<IAddMessageResponse, Error, AddMessageSchemaType>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (data) => addMessage(sessionId, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: sessionKeys.detail(sessionId),
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useProcessMessage = (
  sessionId: string,
  options?: UseMutationOptions<
    IProcessMessageResponse,
    Error,
    ProcessMessageSchemaType
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (data) => processMessage(sessionId, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: sessionKeys.detail(sessionId),
      });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
