import * as z from "zod";

export const createKnowledgeBaseSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1),
  description: z.string().optional(),
});

export const getKnowledgeBasesSchema = z.object({
  limitParam: z.number().positive().optional(),
  pageParam: z.number().positive().optional(),
  searchString: z.string().optional(),
});

export const addDocumentSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1),
  mimeType: z.string({ required_error: "MIME type is required" }).min(1),
  size: z.number({ required_error: "Size is required" }).positive(),
  content: z.string({ required_error: "Content is required" }).min(1),
});

export type CreateKnowledgeBaseSchemaType = z.infer<
  typeof createKnowledgeBaseSchema
>;
export type GetKnowledgeBasesSchemaType = z.infer<
  typeof getKnowledgeBasesSchema
>;
export type AddDocumentSchemaType = z.infer<typeof addDocumentSchema>;
