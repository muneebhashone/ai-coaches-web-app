import { z } from "zod";

export const StartTrainingSchema = z.object({
  chatbotId: z.string().min(1),
});

export const GetTrainingJobsQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  chatbotId: z.string().optional(),
  status: z.enum(["pending", "running", "completed", "failed"]).optional(),
});

export type StartTrainingSchemaType = z.infer<typeof StartTrainingSchema>;
export type GetTrainingJobsQuerySchemaType = z.infer<typeof GetTrainingJobsQuerySchema>;