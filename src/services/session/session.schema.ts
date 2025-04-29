import * as z from "zod";

export const createSessionSchema = z.object({
  chatbotId: z.string({ required_error: "Chatbot ID is required" }),
  clientId: z.string({ required_error: "Client ID is required" }),
  title: z.string().optional(),
});

export const updateSessionSchema = z.object({
  title: z.string().optional(),
  status: z.enum(["ACTIVE", "COMPLETED", "TERMINATED", "SCHEDULED"]).optional(),
  endTime: z.string().optional(),
  feedback: z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().optional(),
  }).optional(),
  metadata: z.record(z.any()).optional(),
});

export const addMessageSchema = z.object({
  message: z.object({
    role: z.enum(["user", "assistant", "system"]),
    content: z.string(),
    timestamp: z.string().optional(),
  }),
});

export const processMessageSchema = z.object({
  content: z.string({ required_error: "Message content is required" }),
});

export const getSessionsSchema = z.object({
  searchString: z.string().optional(),
  status: z.enum(["ACTIVE", "COMPLETED", "TERMINATED", "SCHEDULED"]).optional(),
  chatbotId: z.string().optional(),
  clientId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  limit: z.number().positive().default(10).optional(),
  skip: z.number().nonnegative().default(0).optional(),
});

export type CreateSessionSchemaType = z.infer<typeof createSessionSchema>;
export type UpdateSessionSchemaType = z.infer<typeof updateSessionSchema>;
export type AddMessageSchemaType = z.infer<typeof addMessageSchema>;
export type ProcessMessageSchemaType = z.infer<typeof processMessageSchema>;
export type GetSessionsSchemaType = z.infer<typeof getSessionsSchema>;