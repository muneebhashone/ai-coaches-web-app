import { z } from "zod";

export const CreateClientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  kakaoId: z.string().optional(),
  activeProgramId: z.string().optional(),
});

export const UpdateClientSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  activeProgramId: z.string().optional(),
});

export const GetClientsQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  activeProgramId: z.string().optional(),
  hasKakaoId: z.boolean().optional(),
});

export const ConnectKakaoSchema = z.object({
  kakaoId: z.string().min(1),
});

export type CreateClientSchemaType = z.infer<typeof CreateClientSchema>;
export type UpdateClientSchemaType = z.infer<typeof UpdateClientSchema>;
export type GetClientsQuerySchemaType = z.infer<typeof GetClientsQuerySchema>;
export type ConnectKakaoSchemaType = z.infer<typeof ConnectKakaoSchema>;