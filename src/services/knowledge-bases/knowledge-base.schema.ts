import { z } from "zod";

export const CreateKnowledgeBaseSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  chatbotId: z.string().min(1),
});

export const UpdateKnowledgeBaseSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

export const GetKnowledgeBasesQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
});

export type CreateKnowledgeBaseSchemaType = z.infer<typeof CreateKnowledgeBaseSchema>;
export type UpdateKnowledgeBaseSchemaType = z.infer<typeof UpdateKnowledgeBaseSchema>;
export type GetKnowledgeBasesQuerySchemaType = z.infer<typeof GetKnowledgeBasesQuerySchema>;