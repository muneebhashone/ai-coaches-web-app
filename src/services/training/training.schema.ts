import z from "zod";
import validator from "validator";

export const TrainingStatusSchema = z.enum([
  "pending",
  "running",
  "completed",
  "failed",
]);

export const StartTrainingSchema = z.object({
  chatbotId: z
    .string()
    .min(1, "chatbotId is required")
    .refine(validator.isMongoId, "chatbotId must be a valid MongoDB ID"),
});

export const GetTrainingJobsQuerySchema = z.object({
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
  status: TrainingStatusSchema.optional(),
});

export const TrainingJobIdParamSchema = z.object({
  id: z.string().refine(validator.isMongoId, "id must be a valid MongoDB ID"),
});

export type StartTrainingSchemaType = z.infer<typeof StartTrainingSchema>;
export type GetTrainingJobsQuerySchemaType = z.infer<
  typeof GetTrainingJobsQuerySchema
>;
export type TrainingJobIdParamSchemaType = z.infer<
  typeof TrainingJobIdParamSchema
>;
