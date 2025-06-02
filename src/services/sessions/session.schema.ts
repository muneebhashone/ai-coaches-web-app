import { z } from "zod";
import { SessionStatusEnum } from "./session.types";

export const durations = ["30m", "1hr", "1hr30m", "2hr"];

// Helper function to validate datetime string
const datetimeString = z.string().refine(
  (val) => {
    if (!val) return false;
    // Check if it's a valid datetime string (ISO format or datetime-local format)
    const date = new Date(val);
    return !Number.isNaN(date.getTime()) && val.length >= 10;
  },
  {
    message: "Invalid datetime format",
  }
);

export const CreateSessionSchema = z.object({
  programId: z.string().min(1),
  chatbotId: z.string().min(1),
  sessionDate: datetimeString,
  name: z.string().min(1, "Session name is required"),
  duration: z.enum(durations as [string, ...string[]]),
  status: z.enum(Object.values(SessionStatusEnum) as [string, ...string[]]),
  active: z.boolean().default(true),
});

// Schema for creating multiple sessions
export const CreateMultipleSessionsSchema = z.object({
  programId: z.string().min(1),
  chatbotId: z.string().min(1),
  sessions: z
    .array(
      z.object({
        sessionDate: datetimeString,
        name: z.string().min(1, "Session name is required"),
        duration: z.enum(durations as [string, ...string[]]),
        status: z.enum(
          Object.values(SessionStatusEnum) as [string, ...string[]]
        ),
        active: z.boolean(),
      })
    )
    .min(1, "At least one session is required"),
});

// Schema for session template (used for quick generation)
export const SessionTemplateSchema = z.object({
  namePattern: z.string().min(1, "Name pattern is required"),
  duration: z.enum(durations as [string, ...string[]]),
  status: z.enum(Object.values(SessionStatusEnum) as [string, ...string[]]),
  active: z.boolean(),
});

export const UpdateSessionSchema = z.object({
  sessionDate: datetimeString.optional(),
  name: z.string().optional(),
  duration: z.enum(durations as [string, ...string[]]).optional(),
  status: z
    .enum(Object.values(SessionStatusEnum) as [string, ...string[]])
    .optional(),
  active: z.boolean().optional(),
});

export const GetSessionsQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  programId: z.string().optional(),
  chatbotId: z.string().optional(),
  status: z
    .enum(Object.values(SessionStatusEnum) as [string, ...string[]])
    .optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  active: z.boolean().optional(),
  clientId: z.string().optional(),
});

export type CreateSessionSchemaType = z.infer<typeof CreateSessionSchema>;
export type CreateMultipleSessionsSchemaType = z.infer<
  typeof CreateMultipleSessionsSchema
>;
export type SessionTemplateSchemaType = z.infer<typeof SessionTemplateSchema>;
export type UpdateSessionSchemaType = z.infer<typeof UpdateSessionSchema>;
export type GetSessionsQuerySchemaType = z.infer<typeof GetSessionsQuerySchema>;
