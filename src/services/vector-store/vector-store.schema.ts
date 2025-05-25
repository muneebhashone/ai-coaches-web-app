import z from "zod";
import validator from "validator"; // Assuming validator is available

// Common metadata structure for vectors
export const VectorMetadataSchema = z.object({
  text: z.string(),
  source: z.string(),
  chunkIndex: z.number().int().positive(),
  documentId: z
    .string()
    .refine(validator.isMongoId, "documentId must be a valid MongoDB ID"),
});

// Schema for a single vector when inserting
export const VectorInsertSchema = z.object({
  id: z.string().min(1, "Vector ID is required"),
  values: z.array(z.number()).min(1, "Vector values cannot be empty"),
  metadata: VectorMetadataSchema.optional(),
});

// Schema for a single vector update
export const VectorUpdateSchema = z.object({
  id: z.string().min(1, "Vector ID is required"),
  values: z.array(z.number()).optional(),
  metadata: VectorMetadataSchema.optional(),
});

// Schema for POST /:namespace/search
export const SearchVectorsSchema = z.object({
  query: z.string().min(1, "Search query is required"),
  topK: z.number().int().min(1).max(100).optional().default(5),
  filter: z.record(z.any()).optional(), // Generic object for filter
  includeValues: z.boolean().optional().default(false),
  includeMetadata: z.boolean().optional().default(true),
});

// Schema for POST /:namespace/vectors (insert)
export const InsertVectorsSchema = z.object({
  vectors: z.array(VectorInsertSchema).min(1, "At least one vector is required"),
});

// Schema for PUT /:namespace/vectors (update)
export const UpdateVectorsSchema = z.object({
  updates: z.array(VectorUpdateSchema).min(1, "At least one update is required"),
});

// Schema for DELETE /:namespace/vectors (by IDs)
export const DeleteVectorsByIdsSchema = z.object({
  vectorIds: z
    .array(z.string().min(1))
    .min(1, "At least one vector ID is required"),
});

// Schema for DELETE /:namespace/vectors/filter
export const DeleteVectorsByFilterSchema = z.object({
  filter: z.record(z.any()).min(1, "Filter object cannot be empty"), // Generic non-empty object
});

// Schema for namespace parameter (used in path)
export const NamespaceParamSchema = z.object({
  namespace: z
    .string()
    .min(1, "Namespace is required")
    .refine(
      validator.isMongoId,
      "Namespace must be a valid MongoDB ID (chatbotId)"
    ),
});

export type VectorMetadataSchemaType = z.infer<typeof VectorMetadataSchema>;
export type VectorInsertSchemaType = z.infer<typeof VectorInsertSchema>;
export type VectorUpdateSchemaType = z.infer<typeof VectorUpdateSchema>;
export type SearchVectorsSchemaType = z.infer<typeof SearchVectorsSchema>;
export type InsertVectorsSchemaType = z.infer<typeof InsertVectorsSchema>;
export type UpdateVectorsSchemaType = z.infer<typeof UpdateVectorsSchema>;
export type DeleteVectorsByIdsSchemaType = z.infer<
  typeof DeleteVectorsByIdsSchema
>;
export type DeleteVectorsByFilterSchemaType = z.infer<
  typeof DeleteVectorsByFilterSchema
>;
export type NamespaceParamSchemaType = z.infer<typeof NamespaceParamSchema>;
