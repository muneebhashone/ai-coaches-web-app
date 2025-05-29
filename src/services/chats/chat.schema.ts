import { z } from "zod";

export const SendMessageSchema = z.object({
  content: z.string().min(1),
  role: z.enum(["client", "coach"]),
});

export const GetChatsQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sessionId: z.string().optional(),
  clientId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const UpdateChatSchema = z.object({
  isVisible: z.boolean().optional(),
  notes: z.string().optional(),
});

export type SendMessageSchemaType = z.infer<typeof SendMessageSchema>;
export type GetChatsQuerySchemaType = z.infer<typeof GetChatsQuerySchema>;
export type UpdateChatSchemaType = z.infer<typeof UpdateChatSchema>;