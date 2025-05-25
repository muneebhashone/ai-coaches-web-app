import { z } from "zod";

// Placeholder schemas for client functionality
// TODO: Implement proper schemas when backend integration is ready

export const ClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export const createClientSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type Client = z.infer<typeof ClientSchema>;
export type CreateClient = z.infer<typeof createClientSchema>;