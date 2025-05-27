import apiClient from "@/lib/api-client";
import type { IHealthCheckResponse } from "./health-check.types";

export const getHealthCheck = async (): Promise<IHealthCheckResponse> => {
  const response = await apiClient.get("/healthcheck");
  return response.data;
};