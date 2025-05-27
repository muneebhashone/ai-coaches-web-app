import { z } from "zod";

export const CreateHumanMimicrySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  style: z.enum(["FORMAL", "CASUAL", "FRIENDLY", "PROFESSIONAL", "ENTHUSIASTIC"]),
  examples: z.array(z.string()).min(1),
});

export const UpdateHumanMimicrySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  style: z.enum(["FORMAL", "CASUAL", "FRIENDLY", "PROFESSIONAL", "ENTHUSIASTIC"]).optional(),
  examples: z.array(z.string()).min(1).optional(),
});

export const GetHumanMimicryQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  style: z.enum(["FORMAL", "CASUAL", "FRIENDLY", "PROFESSIONAL", "ENTHUSIASTIC"]).optional(),
});

export type CreateHumanMimicrySchemaType = z.infer<typeof CreateHumanMimicrySchema>;
export type UpdateHumanMimicrySchemaType = z.infer<typeof UpdateHumanMimicrySchema>;
export type GetHumanMimicryQuerySchemaType = z.infer<typeof GetHumanMimicryQuerySchema>;