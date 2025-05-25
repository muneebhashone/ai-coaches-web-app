import { useQuery } from "@tanstack/react-query";

// Placeholder hooks for chatbot functionality
// TODO: Implement proper API calls when backend integration is ready

export function useChatbots() {
  return useQuery({
    queryKey: ['chatbots'],
    queryFn: async () => [],
    enabled: false, // Disable until backend is ready
  });
}

export function useChatbot(id?: string) {
  return useQuery({
    queryKey: ['chatbots', id],
    queryFn: async () => null,
    enabled: false, // Disable until backend is ready
  });
}

export const chatbotKeys = {
  all: ['chatbots'] as const,
  lists: () => [...chatbotKeys.all, 'list'] as const,
  list: (filters: string) => [...chatbotKeys.lists(), { filters }] as const,
  details: () => [...chatbotKeys.all, 'detail'] as const,
  detail: (id: string) => [...chatbotKeys.details(), id] as const,
};