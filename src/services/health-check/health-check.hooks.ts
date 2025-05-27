import { useQuery } from "@tanstack/react-query";
import { getHealthCheck } from "./health-check.service";

export const healthCheckKeys = {
  all: ["health-check"] as const,
  status: () => [...healthCheckKeys.all, "status"] as const,
};

export function useHealthCheck() {
  return useQuery({
    queryKey: healthCheckKeys.status(),
    queryFn: getHealthCheck,
    refetchInterval: 30000, // Check every 30 seconds
  });
}