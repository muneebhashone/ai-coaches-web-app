import z from "zod";
import validator from "validator";

export const ChatMessageRoleSchema = z.enum(["client", "coach"]);

export const StartChatSchema = z.object({
  sessionId: z
    .string()
    .min(1, "sessionId is required")
    .refine(validator.isMongoId, "sessionId must be a valid MongoDB ID"),
  clientId: z
    .string()
    .min(1, "clientId is required")
    .refine(validator.isMongoId, "clientId must be a valid MongoDB ID"),
  // chatbotId is mentioned in the response but not in the request body for /start
  // If it's required for starting a chat, it should be added here.
  // For now, assuming it's derived server-side or not needed for this endpoint.
});

export const SendMessageSchema = z.object({
  content: z
    .string()
    .min(1, "content is required")
    .max(4000, "content must be under 4000 characters"),
  role: ChatMessageRoleSchema.optional().default("client"),
});

export const GetChatMessagesQuerySchema = z.object({
  limitParam: z
    .string()
    .optional()
    .refine(
      (val) => (val ? validator.isInt(val, { min: 1 }) : true),
      "limitParam must be a positive integer string"
    )
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
  pageParam: z
    .string()
    .optional()
    .refine(
      (val) => (val ? validator.isInt(val, { min: 1 }) : true),
      "pageParam must be a positive integer string"
    )
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
});

export const ChatIdParamSchema = z.object({
  id: z.string().refine(validator.isMongoId, "id must be a valid MongoDB ID"),
});

export const SessionIdParamSchema = z.object({
  sessionId: z
    .string()
    .refine(validator.isMongoId, "sessionId must be a valid MongoDB ID"),
});

export const GetChatsQuerySchema = z.object({
  sessionId: z
    .string()
    .refine(validator.isMongoId, "sessionId must be a valid MongoDB ID")
    .optional(),
  clientId: z
    .string()
    .refine(validator.isMongoId, "clientId must be a valid MongoDB ID")
    .optional(),
  chatbotId: z
    .string()
    .refine(validator.isMongoId, "chatbotId must be a valid MongoDB ID")
    .optional(),
  active: z
    .enum(["true", "false"])
    .optional()
    .transform((val) => (val === "true" ? true : val === "false" ? false : undefined)),
  searchString: z.string().optional(),
  limitParam: z
    .string()
    .optional()
    .refine(
      (val) => (val ? validator.isInt(val, { min: 1 }) : true),
      "limitParam must be a positive integer string"
    )
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
  pageParam: z
    .string()
    .optional()
    .refine(
      (val) => (val ? validator.isInt(val, { min: 1 }) : true),
      "pageParam must be a positive integer string"
    )
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
});

export const SendCoachMessageSchema = z.object({
  content: z
    .string()
    .min(1, "content is required")
    .max(4000, "content must be under 4000 characters"),
  role: ChatMessageRoleSchema.optional().default("coach"), // Default to 'coach' for this endpoint
});

export const UpdateChatStatusSchema = z.object({
  active: z.boolean(),
});

export type StartChatSchemaType = z.infer<typeof StartChatSchema>;
export type SendMessageSchemaType = z.infer<typeof SendMessageSchema>;
export type GetChatMessagesQuerySchemaType = z.infer<
  typeof GetChatMessagesQuerySchema
>;
export type ChatIdParamSchemaType = z.infer<typeof ChatIdParamSchema>;
export type SessionIdParamSchemaType = z.infer<typeof SessionIdParamSchema>;
export type GetChatsQuerySchemaType = z.infer<typeof GetChatsQuerySchema>;
export type SendCoachMessageSchemaType = z.infer<typeof SendCoachMessageSchema>;
export type UpdateChatStatusSchemaType = z.infer<typeof UpdateChatStatusSchema>;
