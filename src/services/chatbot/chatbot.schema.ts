import * as z from "zod";

// Define schema for the persona object
const personaSchema = z.object({
  name: z.string({ required_error: "Persona name is required" }),
  description: z.string({ required_error: "Persona description is required" }),
  promptTemplate: z.string({ required_error: "Prompt template is required" }),
  systemInstructions: z.string().optional(),
});

// Define schema for API settings
const apiSettingsSchema = z.object({
  model: z.string().optional(),
  temperature: z.number().min(0).max(1).optional(),
  maxTokens: z.number().positive().optional(),
});

export const createChatbotSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1),
  description: z.string().optional(),
  persona: personaSchema.optional(),
  apiSettings: apiSettingsSchema.optional(),
  knowledgeBases: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
});

export const updateChatbotSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  persona: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
      promptTemplate: z.string().optional(),
      systemInstructions: z.string().optional(),
    })
    .optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  apiSettings: apiSettingsSchema.optional(),
  knowledgeBases: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
});

export const getChatbotsSchema = z.object({
  searchString: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  limitParam: z.number().positive().default(10).optional(),
  pageParam: z.number().nonnegative().default(0).optional(),
});

export const getDefaultPersonaSchema = z.object({
  name: z.string().optional(),
  expertise: z.string().optional(),
});

export type CreateChatbotSchemaType = z.infer<typeof createChatbotSchema>;
export type UpdateChatbotSchemaType = z.infer<typeof updateChatbotSchema>;
export type GetChatbotsSchemaType = z.infer<typeof getChatbotsSchema>;
export type GetDefaultPersonaSchemaType = z.infer<
  typeof getDefaultPersonaSchema
>;
