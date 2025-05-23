"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/navigation";
import { Link } from "@/lib/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
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

type ResetPasswordFormValues = {
  userId: string;
  code: string;
  password: string;
  confirmPassword: string;
};

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("auth");
  const tErrors = useTranslations("errors");
  const tValidation = useTranslations("validation");
  const tCommon = useTranslations("common");

  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const userId = searchParams.get("userId") || "";
  const code = searchParams.get("code") || "";

  // Create a schema that matches the API requirements with translations
  const resetPasswordSchema = z
    .object({
      userId: z.string().min(1, "User ID is required"),
      code: z.string().min(1, "Reset code is required"),
      password: passwordValidationSchema(t("password")),
      confirmPassword: passwordValidationSchema(t("confirmPassword")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tValidation("password.mustMatch"),
      path: ["confirmPassword"],
    });

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
        toast.success(response.message || tCommon("success"));
        // Redirect to login page after successful password reset
        router.push("/login");
      } else {
        toast.error(response.message || tErrors("networkError"));
        setIsFormDisabled(false);
      }
    },
    onError: (error) => {
      const errorMessage = error?.message || tErrors("networkError");
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
      {/* Language Switcher */}
      <div className="flex justify-end">
        <LanguageSwitcher />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("resetPassword")}</CardTitle>
          <CardDescription>
            {missingParams ? t("invalidResetLink") : t("enterNewPassword")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {missingParams ? (
            <div className="text-center py-4">
              <p className="text-red-500 mb-4">{t("resetLinkExpired")}</p>
              <Button
                onClick={() => router.push("/forgot-password")}
                className="w-full"
              >
                {t("requestNewResetLink")}
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Hidden fields for userId and code */}
                <input type="hidden" {...form.register("userId")} />
                <input type="hidden" {...form.register("code")} />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("newPassword")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          disabled={isFormDisabled}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground">
                        {t("passwordRequirements")}
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("confirmPassword")}</FormLabel>
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
                  {resetPasswordMutation.isPending
                    ? tCommon("loading")
                    : t("resetPassword")}
                </Button>
                <div className="mt-4 text-center text-sm">
                  <Link href="/login" className="underline underline-offset-4">
                    {tCommon("back")} to {t("login").toLowerCase()}
                  </Link>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
