import { z } from "zod";

export const CreateProgramSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  chatbotId: z.string().min(1),
  goals: z.array(z.string()).optional(),
  metrics: z.record(z.string(), z.any()).optional(),
  isActive: z.boolean().default(true),
});

export const UpdateProgramSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  goals: z.array(z.string()).optional(),
  metrics: z.record(z.string(), z.any()).optional(),
  isActive: z.boolean().optional(),
});

export const GetProgramsQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  chatbotId: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CreateProgramSchemaType = z.infer<typeof CreateProgramSchema>;
export type UpdateProgramSchemaType = z.infer<typeof UpdateProgramSchema>;
export type GetProgramsQuerySchemaType = z.infer<typeof GetProgramsQuerySchema>;