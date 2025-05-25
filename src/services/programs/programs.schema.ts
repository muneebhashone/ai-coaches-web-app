import z from "zod";
import validator from "validator";

export const GetProgramsQuerySchema = z.object({
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
  chatbotId: z
    .string()
    .refine(validator.isMongoId, "chatbotId must be a valid MongoDB ID")
    .optional(),
});

export const CreateProgramSchema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().optional(),
  purpose: z.string().optional(),
  goals: z.string().optional(),
  successMetrics: z.string().optional(),
  chatbotId: z
    .string()
    .min(1, "chatbotId is required")
    .refine(validator.isMongoId, "chatbotId must be a valid MongoDB ID"),
});

export const UpdateProgramSchema = CreateProgramSchema.partial().extend({
  active: z.boolean().optional(),
}); // All fields from CreateProgramSchema are optional for update, plus 'active'

export const ProgramIdParamSchema = z.object({
  id: z.string().refine(validator.isMongoId, "id must be a valid MongoDB ID"),
});

export type GetProgramsQuerySchemaType = z.infer<typeof GetProgramsQuerySchema>;
export type CreateProgramSchemaType = z.infer<typeof CreateProgramSchema>;
export type UpdateProgramSchemaType = z.infer<typeof UpdateProgramSchema>;
export type ProgramIdParamSchemaType = z.infer<typeof ProgramIdParamSchema>;
