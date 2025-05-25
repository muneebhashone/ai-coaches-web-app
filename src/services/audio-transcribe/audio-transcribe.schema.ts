import z from "zod";
import validator from "validator";

export const AudioTranscriptionStatusSchema = z.enum([
  "not-started",
  "pending",
  "completed",
  "failed",
]);

export const GetAudioTranscriptionsQuerySchema = z.object({
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
  filterByStatus: AudioTranscriptionStatusSchema.optional(),
});

export const CreateAudioTranscriptionSchema = z.object({
  fileName: z.string().min(1, "fileName is required"),
  fileSize: z.number().positive("fileSize must be a positive number"),
  fileUrl: z.string().url("fileUrl must be a valid URL"),
});

export const AudioTranscriptionIdParamSchema = z.object({
  id: z.string().refine(validator.isMongoId, "id must be a valid MongoDB ID"),
});

export const CopyTranscriptToKnowledgeBaseSchema = z.object({
  knowledgeBaseId: z
    .string()
    .min(1, "knowledgeBaseId is required")
    .refine(
      validator.isMongoId,
      "knowledgeBaseId must be a valid MongoDB ID"
    ),
  description: z.string().optional(),
});

export type GetAudioTranscriptionsQuerySchemaType = z.infer<
  typeof GetAudioTranscriptionsQuerySchema
>;
export type CreateAudioTranscriptionSchemaType = z.infer<
  typeof CreateAudioTranscriptionSchema
>;
export type AudioTranscriptionIdParamSchemaType = z.infer<
  typeof AudioTranscriptionIdParamSchema
>;
export type CopyTranscriptToKnowledgeBaseSchemaType = z.infer<
  typeof CopyTranscriptToKnowledgeBaseSchema
>;
