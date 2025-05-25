import type { IAPIResponse } from "../common/common.types";
import type { z } from "zod";
import type {
  HealthCheckDataSchema,
  ServiceConnectionStatusSchema,
  SystemStatusSchema,
  EnvironmentSchema,
} from "./health-check.schema";

export type ServiceConnectionStatusType = z.infer<
  typeof ServiceConnectionStatusSchema
>;
export type SystemStatusType = z.infer<typeof SystemStatusSchema>;
export type EnvironmentType = z.infer<typeof EnvironmentSchema>;

export interface IHealthCheckServiceStatus {
  database: ServiceConnectionStatusType;
  redis: ServiceConnectionStatusType;
  s3: ServiceConnectionStatusType;
  openai: ServiceConnectionStatusType;
  pinecone: ServiceConnectionStatusType;
}

export interface IHealthCheckData extends z.infer<typeof HealthCheckDataSchema> {}
// This can also be defined directly if preferred, without inferring from Zod:
// export interface IHealthCheckData {
//   status: SystemStatusType;
//   timestamp: string; // ISO datetime string
//   uptime: string;
//   services: IHealthCheckServiceStatus;
//   version: string;
//   environment: EnvironmentType;
// }

export type IGetHealthCheckResponse = IAPIResponse<IHealthCheckData>;
