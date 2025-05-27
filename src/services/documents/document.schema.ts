import { z } from "zod";

export const CreateDocumentSchema = z.object({
  name: z.string().min(1),
  fileUrl: z.string().url(),
  fileType: z.string(),
  fileSize: z.number().min(1),
});

export const UpdateDocumentSchema = z.object({
  name: z.string().min(1).optional(),
});

export const GetDocumentsQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(["PROCESSING", "COMPLETED", "FAILED"]).optional(),
});

export type CreateDocumentSchemaType = z.infer<typeof CreateDocumentSchema>;
export type UpdateDocumentSchemaType = z.infer<typeof UpdateDocumentSchema>;
export type GetDocumentsQuerySchemaType = z.infer<typeof GetDocumentsQuerySchema>;