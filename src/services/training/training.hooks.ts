import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTrainingJobs,
  getTrainingJob,
  startTraining,
  cancelTraining,
} from "./training.service";
import type {
  StartTrainingSchemaType,
  GetTrainingJobsQuerySchemaType,
} from "./training.schema";

export const trainingKeys = {
  all: ["training"] as const,
  lists: () => [...trainingKeys.all, "list"] as const,
  list: (params?: GetTrainingJobsQuerySchemaType) =>
    [...trainingKeys.lists(), params] as const,
  details: () => [...trainingKeys.all, "detail"] as const,
  detail: (id: string) => [...trainingKeys.details(), id] as const,
};

export function useTrainingJobs(params?: GetTrainingJobsQuerySchemaType) {
  return useQuery({
    queryKey: trainingKeys.list(params),
    queryFn: () => getTrainingJobs(params),
    refetchInterval: 1000,
    enabled: !!params?.chatbotId,
  });
}

export function useTrainingJob(id: string) {
  return useQuery({
    queryKey: trainingKeys.detail(id),
    queryFn: () => getTrainingJob(id),
    enabled: !!id,
    refetchInterval: 1000,
  });
}

export function useStartTraining() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: StartTrainingSchemaType) => startTraining(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trainingKeys.lists() });
    },
  });
}

export function useCancelTraining() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelTraining(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: trainingKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: trainingKeys.lists() });
    },
  });
}