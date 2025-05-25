import { useQuery, useMutation } from "@tanstack/react-query";

// Placeholder hooks for client functionality
// TODO: Implement proper API calls when backend integration is ready

export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => [],
    enabled: false, // Disable until backend is ready
  });
}

export function useClient(id?: string) {
  return useQuery({
    queryKey: ['clients', id],
    queryFn: async () => null,
    enabled: false, // Disable until backend is ready
  });
}

export function useCreateClient(options?: any) {
  return useMutation({
    mutationFn: async () => ({ success: true, data: { id: '1' } }),
    ...options,
  });
}