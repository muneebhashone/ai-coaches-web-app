"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "@/services/auth/auth.hooks";
import { toast } from "sonner";
import { passwordValidationSchema } from "@/services/common/common.schema";

// Create a schema that matches the API requirements
const resetPasswordSchema = z
  .object({
    userId: z.string().min(1, "User ID is required"),
    code: z.string().min(1, "Reset code is required"),
    password: passwordValidationSchema("Password"),
    confirmPassword: passwordValidationSchema("Confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const userId = searchParams.get("userId") || "";
  const code = searchParams.get("code") || "";

  // Form validation will fail if userId or code are missing
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      userId,
      code,
      password: "",
      confirmPassword: "",
    },
  });

  const resetPasswordMutation = useResetPassword({
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || "Password has been reset successfully");
        // Redirect to login page after successful password reset
        router.push("/login");
      } else {
        toast.error(response.message || "Password reset failed");
        setIsFormDisabled(false);
      }
    },
    onError: (error) => {
      const errorMessage = error?.message || "Password reset failed. Please try again or request a new reset link.";
      toast.error(errorMessage);
      setIsFormDisabled(false);
    },
  });

  function onSubmit(data: ResetPasswordFormValues) {
    setIsFormDisabled(true);
    resetPasswordMutation.mutate(data);
  }

  // Show error if userId or code are missing from URL
  const missingParams = !userId || !code;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            {missingParams 
              ? "Invalid reset link. Please request a new password reset." 
              : "Enter your new password below"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {missingParams ? (
            <div className="text-center py-4">
              <p className="text-red-500 mb-4">
                Your password reset link is invalid or has expired.
              </p>
              <Button
                onClick={() => router.push("/forgot-password")}
                className="w-full"
              >
                Request New Reset Link
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Hidden fields for userId and code */}
                <input type="hidden" {...form.register("userId")} />
                <input type="hidden" {...form.register("code")} />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          disabled={isFormDisabled}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground">
                        Password must be at least 8 characters with lowercase, uppercase, number and symbol.
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          disabled={isFormDisabled}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isFormDisabled || resetPasswordMutation.isPending}
                >
                  {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
                </Button>
                <div className="mt-4 text-center text-sm">
                  <a href="/login" className="underline underline-offset-4">
                    Back to login
                  </a>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
