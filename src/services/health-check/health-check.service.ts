import apiClient from "@/lib/api-client";
import type { IGetHealthCheckResponse } from "./health-check.types";

const HEALTH_CHECK_BASE_URL = "/healthcheck";

export const getHealthCheckStatus =
  async (): Promise<IGetHealthCheckResponse> => {
    const response = await apiClient.get(HEALTH_CHECK_BASE_URL);
    return response.data;
  };
