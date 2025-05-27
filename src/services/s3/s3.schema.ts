import { z } from "zod";

export const getSignedUrlSchema = z.object({
  bucket: z.string().min(1, 'Bucket is required'),
  key: z.string().min(1, 'Key is required'),
  contentType: z.string().min(1, 'Content type is required'),
  metadata: z.record(z.string(), z.string()).optional(),
});

export type GetSignedUrlSchemaType = z.infer<typeof getSignedUrlSchema>;