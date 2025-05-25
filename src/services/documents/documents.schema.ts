import z from "zod";
import validator from "validator";

export const DocumentFileTypeSchema = z.enum([
  "pdf",
  "csv",
  "docx",
  "xlsx",
  "txt",
]);
export const DocumentProcessingStatusSchema = z.enum([
  "pending",
  "processing",
  "completed",
  "failed",
]);

export const GetDocumentsQuerySchema = z.object({
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
  fileType: DocumentFileTypeSchema.optional(),
});

export const CreateDocumentSchema = z.object({
  name: z.string().min(1, "name is required"),
  description: z.string().optional(),
  fileType: DocumentFileTypeSchema,
  fileUrl: z.string().url("fileUrl must be a valid URL"),
  // fileSize is in the response but not in the request body for create
});

export const UpdateDocumentSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export const DocumentIdParamSchema = z.object({
  id: z.string().refine(validator.isMongoId, "id must be a valid MongoDB ID"),
});

export const KnowledgeBaseIdParamSchema = z.object({
  knowledgeBaseId: z
    .string()
    .refine(
      validator.isMongoId,
      "knowledgeBaseId must be a valid MongoDB ID"
    ),
});

export type GetDocumentsQuerySchemaType = z.infer<
  typeof GetDocumentsQuerySchema
>;
export type CreateDocumentSchemaType = z.infer<typeof CreateDocumentSchema>;
export type UpdateDocumentSchemaType = z.infer<typeof UpdateDocumentSchema>;
export type DocumentIdParamSchemaType = z.infer<typeof DocumentIdParamSchema>;
export type KnowledgeBaseIdParamSchemaType = z.infer<
  typeof KnowledgeBaseIdParamSchema
>;
