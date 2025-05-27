import { z } from "zod";

export const CreateChatbotSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  active: z.boolean().default(true),
});

export const UpdateChatbotSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  prompt: z.string().optional(),
  knowledgeBaseId: z.string().optional(),
  humanMimicryId: z.string().optional(),
  programId: z.string().optional(),
  active: z.boolean().optional(),
});

export const GetChatbotsQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  active: z.boolean().optional(),
  knowledgeBaseId: z.string().optional(),
});

export const CloneChatbotSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export type CreateChatbotSchemaType = z.infer<typeof CreateChatbotSchema>;
export type UpdateChatbotSchemaType = z.infer<typeof UpdateChatbotSchema>;
export type GetChatbotsQuerySchemaType = z.infer<typeof GetChatbotsQuerySchema>;
export type CloneChatbotSchemaType = z.infer<typeof CloneChatbotSchema>;