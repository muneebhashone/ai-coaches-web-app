import validator from "validator";
import z from "zod";
import { passwordValidationSchema } from "../common/common.schema";

export const clientResetPasswordSchema = z.object({
  userId: z
    .string({ required_error: "userId is required" })
    .min(1)
    .refine((value) => validator.isMongoId(value), "userId must be valid"),
  code: z
    .string({ required_error: "code is required" })
    .min(4)
    .max(4)
    .refine((value) => validator.isAlphanumeric(value), "code must be valid"),
  password: passwordValidationSchema("Password"),
  confirmPassword: passwordValidationSchema("Confirm password"),
});

export const clientChangePasswordSchema = z.object({
  currentPassword: passwordValidationSchema("Current password"),
  newPassword: passwordValidationSchema("New password"),
});

export const clientForgetPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Email must be valid"),
});

export const clientRegisterSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }).min(1),
    confirmPassword: passwordValidationSchema("Confirm Password"),
    email: z.string().email(),
    password: passwordValidationSchema("Password"),
  })
  .strict()
  .refine(({ password, confirmPassword }) => {
    if (password !== confirmPassword) {
      return false;
    }

    return true;
  }, "Password and confirm password must be same");

export const clientLoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: z.string().min(1, "Password is required"),
});

export type ClientRegisterSchemaType = z.infer<typeof clientRegisterSchema>;

export type ClientLoginSchemaType = z.infer<typeof clientLoginSchema>;

export type ClientChangePasswordSchemaType = z.infer<
  typeof clientChangePasswordSchema
>;

export type ClientForgetPasswordSchemaType = z.infer<
  typeof clientForgetPasswordSchema
>;

export type ClientResetPasswordSchemaType = z.infer<
  typeof clientResetPasswordSchema
>;
