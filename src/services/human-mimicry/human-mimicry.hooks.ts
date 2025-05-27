import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getHumanMimicries,
  getHumanMimicry,
  createHumanMimicry,
  updateHumanMimicry,
  deleteHumanMimicry,
} from "./human-mimicry.service";
import type {
  CreateHumanMimicrySchemaType,
  UpdateHumanMimicrySchemaType,
  GetHumanMimicryQuerySchemaType,
} from "./human-mimicry.schema";

export const humanMimicryKeys = {
  all: ["human-mimicry"] as const,
  lists: (chatbotId: string) => [...humanMimicryKeys.all, "list", chatbotId] as const,
  list: (chatbotId: string, params?: GetHumanMimicryQuerySchemaType) =>
    [...humanMimicryKeys.lists(chatbotId), params] as const,
  details: (chatbotId: string) => [...humanMimicryKeys.all, "detail", chatbotId] as const,
  detail: (chatbotId: string, humanMimicryId: string) =>
    [...humanMimicryKeys.details(chatbotId), humanMimicryId] as const,
};

export function useHumanMimicries(chatbotId: string, params?: GetHumanMimicryQuerySchemaType) {
  return useQuery({
    queryKey: humanMimicryKeys.list(chatbotId, params),
    queryFn: () => getHumanMimicries(chatbotId, params),
    enabled: !!chatbotId,
  });
}

export function useHumanMimicry(chatbotId: string, humanMimicryId: string) {
  return useQuery({
    queryKey: humanMimicryKeys.detail(chatbotId, humanMimicryId),
    queryFn: () => getHumanMimicry(chatbotId, humanMimicryId),
    enabled: !!chatbotId && !!humanMimicryId,
  });
}

export function useCreateHumanMimicry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      chatbotId,
      data,
    }: {
      chatbotId: string;
      data: CreateHumanMimicrySchemaType;
    }) => createHumanMimicry(chatbotId, data),
    onSuccess: (_, { chatbotId }) => {
      queryClient.invalidateQueries({ queryKey: humanMimicryKeys.lists(chatbotId) });
    },
  });
}

export function useUpdateHumanMimicry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      chatbotId,
      humanMimicryId,
      data,
    }: {
      chatbotId: string;
      humanMimicryId: string;
      data: UpdateHumanMimicrySchemaType;
    }) => updateHumanMimicry(chatbotId, humanMimicryId, data),
    onSuccess: (_, { chatbotId, humanMimicryId }) => {
      queryClient.invalidateQueries({
        queryKey: humanMimicryKeys.detail(chatbotId, humanMimicryId),
      });
      queryClient.invalidateQueries({ queryKey: humanMimicryKeys.lists(chatbotId) });
    },
  });
}

export function useDeleteHumanMimicry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      chatbotId,
      humanMimicryId,
    }: {
      chatbotId: string;
      humanMimicryId: string;
    }) => deleteHumanMimicry(chatbotId, humanMimicryId),
    onSuccess: (_, { chatbotId }) => {
      queryClient.invalidateQueries({ queryKey: humanMimicryKeys.lists(chatbotId) });
    },
  });
}