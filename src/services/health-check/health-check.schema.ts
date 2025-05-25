import z from "zod";

// No request body schemas needed for Health Check service as it's a GET request.
// This file is created to maintain consistency with other services.

// Optional: Define schema for the response data if strict validation of response is desired.
export const ServiceConnectionStatusSchema = z.enum([
  "connected",
  "disconnected",
  "timeout",
]);
export const SystemStatusSchema = z.enum(["OK", "DEGRADED", "DOWN"]);
export const EnvironmentSchema = z.enum(["development", "production", "staging", "test"]); // Added common environments

export const HealthCheckDataSchema = z.object({
  status: SystemStatusSchema,
  timestamp: z.string().datetime(),
  uptime: z.string(),
  services: z.object({
    database: ServiceConnectionStatusSchema,
    redis: ServiceConnectionStatusSchema,
    s3: ServiceConnectionStatusSchema,
    openai: ServiceConnectionStatusSchema,
    pinecone: ServiceConnectionStatusSchema,
  }),
  version: z.string(),
  environment: EnvironmentSchema,
});

export type HealthCheckDataSchemaType = z.infer<typeof HealthCheckDataSchema>;
