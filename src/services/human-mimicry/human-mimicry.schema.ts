import z from "zod";
import validator from "validator";

// Enums for Personality Configuration, based on the documentation
export const PersonalityToneSchema = z.enum([
  "professional",
  "empathetic",
  "casual",
  "authoritative",
  "supportive",
]);
export const PersonalityStyleSchema = z.enum([
  "structured",
  "conversational",
  "analytical",
  "creative",
  "direct",
]);
export const PersonalityApproachSchema = z.enum([
  "consultative",
  "directive",
  "collaborative",
  "person-centered",
  "solution-focused",
]);

export const PersonalitySchema = z.object({
  tone: PersonalityToneSchema,
  style: PersonalityStyleSchema,
  approach: PersonalityApproachSchema,
});

export const GetHumanMimicryDataQuerySchema = z.object({
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

export const CreateHumanMimicryDataSchema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().optional(),
  toneExample: z.string().optional(),
  styleExample: z.string().optional(),
  writingExample: z.string().optional(),
  transcripts: z.string().optional(),
  // personality is in the response but not in the request body for create
});

export const UpdateHumanMimicryDataSchema =
  CreateHumanMimicryDataSchema.partial().extend({
    active: z.boolean().optional(), // 'active' is in response, assuming it can be updated
    // personality can also be made updatable if needed
  });

export const HumanMimicryIdParamSchema = z.object({
  id: z.string().refine(validator.isMongoId, "id must be a valid MongoDB ID"),
});

export const ChatbotIdParamSchema = z.object({
  chatbotId: z
    .string()
    .refine(validator.isMongoId, "chatbotId must be a valid MongoDB ID"),
});

export type GetHumanMimicryDataQuerySchemaType = z.infer<
  typeof GetHumanMimicryDataQuerySchema
>;
export type CreateHumanMimicryDataSchemaType = z.infer<
  typeof CreateHumanMimicryDataSchema
>;
export type UpdateHumanMimicryDataSchemaType = z.infer<
  typeof UpdateHumanMimicryDataSchema
>;
export type HumanMimicryIdParamSchemaType = z.infer<
  typeof HumanMimicryIdParamSchema
>;
export type ChatbotIdParamSchemaType = z.infer<typeof ChatbotIdParamSchema>;
export type PersonalitySchemaType = z.infer<typeof PersonalitySchema>;
