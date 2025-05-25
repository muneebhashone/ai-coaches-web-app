import z from "zod";

// Supported file types and max size are for informational purposes from the docs,
// actual validation of file type and size would typically happen server-side
// or during the S3 upload process itself, not just in generating the signed URL.

export const GetSignedUrlSchema = z.object({
  bucket: z.string().min(1, "Bucket name is required"),
  key: z.string().min(1, "File key is required"), // e.g., "documents/myfile.pdf"
  contentType: z.string().min(1, "Content type is required"), // e.g., "application/pdf"
  metadata: z.record(z.string()).optional(), // Optional key-value pairs
});

export type GetSignedUrlSchemaType = z.infer<typeof GetSignedUrlSchema>;
