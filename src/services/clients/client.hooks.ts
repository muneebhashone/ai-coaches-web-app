import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  connectKakao,
  disconnectKakao,
} from "./client.service";
import type {
  CreateClientSchemaType,
  UpdateClientSchemaType,
  GetClientsQuerySchemaType,
  ConnectKakaoSchemaType,
} from "./client.schema";

export const clientKeys = {
  all: ["clients"] as const,
  lists: () => [...clientKeys.all, "list"] as const,
  list: (params?: GetClientsQuerySchemaType) =>
    [...clientKeys.lists(), params] as const,
  details: () => [...clientKeys.all, "detail"] as const,
  detail: (id: string) => [...clientKeys.details(), id] as const,
};

export function useClients(params?: GetClientsQuerySchemaType) {
  return useQuery({
    queryKey: clientKeys.list(params),
    queryFn: () => getClients(params),
  });
}

export function useClient(id: string) {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => getClient(id),
    enabled: !!id,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClientSchemaType) => createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClientSchemaType }) =>
      updateClient(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
  });
}

export function useConnectKakao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ clientId, data }: { clientId: string; data: ConnectKakaoSchemaType }) =>
      connectKakao(clientId, data),
    onSuccess: (_, { clientId }) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.detail(clientId) });
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
  });
}

export function useDisconnectKakao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientId: string) => disconnectKakao(clientId),
    onSuccess: (_, clientId) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.detail(clientId) });
      queryClient.invalidateQueries({ queryKey: clientKeys.lists() });
    },
  });
}