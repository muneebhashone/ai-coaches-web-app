import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram,
  getProgramByChatbotId,
} from "./program.service";
import type {
  CreateProgramSchemaType,
  UpdateProgramSchemaType,
  GetProgramsQuerySchemaType,
} from "./program.schema";

export const programKeys = {
  all: ["programs"] as const,
  lists: () => [...programKeys.all, "list"] as const,
  list: (params?: GetProgramsQuerySchemaType) =>
    [...programKeys.lists(), params] as const,
  details: () => [...programKeys.all, "detail"] as const,
  detail: (id: string) => [...programKeys.details(), id] as const,
  chatbot: (chatbotId: string) =>
    [...programKeys.all, "chatbot", chatbotId] as const,
};

export function useProgramByChatbotId(chatbotId: string) {
  return useQuery({
    queryKey: programKeys.chatbot(chatbotId),
    queryFn: () => getProgramByChatbotId(chatbotId),
    enabled: !!chatbotId,
  });
}

export function usePrograms(params?: GetProgramsQuerySchemaType) {
  return useQuery({
    queryKey: programKeys.list(params),
    queryFn: () => getPrograms(params),
  });
}

export function useProgram(id: string) {
  return useQuery({
    queryKey: programKeys.detail(id),
    queryFn: () => getProgram(id),
    enabled: !!id,
  });
}

export function useCreateProgram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProgramSchemaType) => createProgram(data),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: programKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: programKeys.chatbot(data.chatbotId),
      });
    },
  });
}

export function useUpdateProgram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProgramSchemaType }) =>
      updateProgram(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: programKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: programKeys.lists() });
    },
  });
}

export function useDeleteProgram() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProgram(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: programKeys.lists() });
    },
  });
}
