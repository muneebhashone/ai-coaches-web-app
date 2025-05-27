import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["DEFAULT_USER", "COACH", "SUPER_ADMIN"]).optional(),
});

export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  role: z.enum(["DEFAULT_USER", "COACH", "SUPER_ADMIN"]).optional(),
  isActive: z.boolean().optional(),
});

export const GetUsersQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  role: z.enum(["DEFAULT_USER", "COACH", "SUPER_ADMIN"]).optional(),
  isActive: z.boolean().optional(),
});

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
export type GetUsersQuerySchemaType = z.infer<typeof GetUsersQuerySchema>;