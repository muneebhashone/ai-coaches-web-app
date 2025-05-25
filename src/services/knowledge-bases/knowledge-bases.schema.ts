import z from "zod";
import validator from "validator";

export const GetKnowledgeBasesQuerySchema = z.object({
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
  active: z
    .enum(["true", "false"])
    .optional()
    .transform((val) => (val === "true" ? true : val === "false" ? false : undefined)),
});

export const CreateKnowledgeBaseSchema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().optional(),
  chatbotId: z
    .string()
    .min(1, "chatbotId is required")
    .refine(validator.isMongoId, "chatbotId must be a valid MongoDB ID"),
});

export const UpdateKnowledgeBaseSchema = CreateKnowledgeBaseSchema.pick({
  name: true,
  description: true,
})
  .partial()
  .extend({
    active: z.boolean().optional(),
  }); // name and description are optional for update, plus 'active'

export const KnowledgeBaseIdParamSchema = z.object({
  id: z.string().refine(validator.isMongoId, "id must be a valid MongoDB ID"),
});

export type GetKnowledgeBasesQuerySchemaType = z.infer<
  typeof GetKnowledgeBasesQuerySchema
>;
export type CreateKnowledgeBaseSchemaType = z.infer<
  typeof CreateKnowledgeBaseSchema
>;
export type UpdateKnowledgeBaseSchemaType = z.infer<
  typeof UpdateKnowledgeBaseSchema
>;
export type KnowledgeBaseIdParamSchemaType = z.infer<
  typeof KnowledgeBaseIdParamSchema
>;
