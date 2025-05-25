"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getHealthCheckStatus } from "./health-check.service";
import type { IGetHealthCheckResponse } from "./health-check.types";

export const healthCheckKeys = {
  all: ["healthCheck"] as const,
  status: () => [...healthCheckKeys.all, "status"] as const,
};

export const useGetHealthCheckStatus = (
  options?: UseQueryOptions<IGetHealthCheckResponse>
) => {
  return useQuery({
    queryKey: healthCheckKeys.status(),
    queryFn: getHealthCheckStatus,
    ...options,
  });
};
