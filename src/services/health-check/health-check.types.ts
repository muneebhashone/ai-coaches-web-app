import type { IAPIResponse } from "../common/common.types";

export interface IHealthStatus {
  status: "healthy" | "unhealthy";
  timestamp: string;
  version: string;
  services: {
    database: "healthy" | "unhealthy";
    redis?: "healthy" | "unhealthy";
    s3?: "healthy" | "unhealthy";
  };
}

export type IHealthCheckResponse = IAPIResponse<IHealthStatus>;