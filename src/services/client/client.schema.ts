import * as z from "zod";

export const createClientSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1),
  email: z
    .string({ required_error: "Email is required" })
    .email("Email must be valid"),
  phoneNumber: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  chatbotId: z.string({ required_error: "Chatbot ID is required" }),
});

export const updateClientSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Email must be valid").optional(),
  phoneNumber: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

export const getClientsSchema = z.object({
  searchString: z.string().optional(),
  limit: z.number().positive().default(10).optional(),
  skip: z.number().nonnegative().default(0).optional(),
});

export type CreateClientSchemaType = z.infer<typeof createClientSchema>;
export type UpdateClientSchemaType = z.infer<typeof updateClientSchema>;
export type GetClientsSchemaType = z.infer<typeof getClientsSchema>;
