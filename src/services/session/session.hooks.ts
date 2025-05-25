import { useQuery, useMutation } from "@tanstack/react-query";

// Placeholder hooks for session functionality
// TODO: Implement proper API calls when backend integration is ready

export function useSessions() {
  return useQuery({
    queryKey: ['sessions'],
    queryFn: async () => [],
    enabled: false, // Disable until backend is ready
  });
}

export function useSession(id?: string) {
  return useQuery({
    queryKey: ['sessions', id],
    queryFn: async () => null,
    enabled: false, // Disable until backend is ready
  });
}

export function useCreateSession(options?: any) {
  return useMutation({
    mutationFn: async () => ({ success: true, data: { id: '1' } }),
    ...options,
  });
}

export function useAddMessage(options?: any) {
  return useMutation({
    mutationFn: async () => ({ success: true, data: {} }),
    ...options,
  });
}

export function useProcessMessage(options?: any) {
  return useMutation({
    mutationFn: async () => ({ success: true, data: {} }),
    ...options,
  });
}

export function useEndSession(options?: any) {
  return useMutation({
    mutationFn: async () => ({ success: true, data: {} }),
    ...options,
  });
}

export const sessionKeys = {
  all: ['sessions'] as const,
  lists: () => [...sessionKeys.all, 'list'] as const,
  list: (filters: string) => [...sessionKeys.lists(), { filters }] as const,
  details: () => [...sessionKeys.all, 'detail'] as const,
  detail: (id: string) => [...sessionKeys.details(), id] as const,
};