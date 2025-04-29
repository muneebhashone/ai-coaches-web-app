"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  createClient,
  updateClient,
  getClient,
  deleteClient,
  getClients,
} from "./client.service";
import type {
  CreateClientSchemaType,
  UpdateClientSchemaType,
  GetClientsSchemaType,
} from "./client.schema";
import type {
  ICreateClientResponse,
  IUpdateClientResponse,
  IGetClientResponse,
  IDeleteClientResponse,
  IGetClientsResponse,
} from "./client.types";

export const clientKeys = {
  all: ["clients"] as const,
  lists: () => [...clientKeys.all, "list"] as const,
  list: (params: GetClientsSchemaType | undefined) =>
    [...clientKeys.lists(), params] as const,
  details: () => [...clientKeys.all, "detail"] as const,
  detail: (id: string) => [...clientKeys.details(), id] as const,
} as const;

export const useClients = (
  params?: GetClientsSchemaType,
  options?: UseQueryOptions<IGetClientsResponse>
) => {
  return useQuery({
    ...options,
    queryKey: clientKeys.list(params),
    queryFn: () => getClients(params),
  });
};

export const useClient = (
  id: string,
  options?: UseQueryOptions<IGetClientResponse>
) => {
  return useQuery({
    ...options,
    queryKey: clientKeys.detail(id),
    queryFn: () => getClient(id),
    enabled: !!id,
  });
};

export const useCreateClient = (
  options?: UseMutationOptions<
    ICreateClientResponse,
    Error,
    CreateClientSchemaType
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: createClient,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useUpdateClient = (
  id: string,
  options?: UseMutationOptions<
    IUpdateClientResponse,
    Error,
    UpdateClientSchemaType
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: (data) => updateClient(id, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      queryClient.invalidateQueries({ queryKey: clientKeys.detail(id) });
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useDeleteClient = (
  options?: UseMutationOptions<IDeleteClientResponse, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationFn: deleteClient,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
      options?.onSuccess?.(data, variables, context);
    },
  });
};
