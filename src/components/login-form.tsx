"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
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
import { useLoginEmail } from "@/services/auth/auth.hooks";
import type { LoginUserByEmailSchemaType } from "@/services/auth/auth.schema";
import useAuthStore from "@/stores/useAuthStore";
import { toast } from "sonner";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("auth");
  const tErrors = useTranslations("errors");
  const tValidation = useTranslations("validation");
  const tCommon = useTranslations("common");

  const router = useRouter();
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const { setToken } = useAuthStore();

  // Create schema with translated validation messages
  const loginSchema = z.object({
    email: z
      .string({ required_error: tValidation("email.required") })
      .email({ message: tValidation("email.invalid") }),
    password: z.string().min(1, tValidation("password.required")),
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLoginEmail({
    onSuccess: (response) => {
      if (response.success) {
        // Store the token in auth store
        setToken(response.data.token);

        toast.success(response.message || tCommon("success"));
        router.push("/dashboard" as any);
      } else {
        // Even with success:false in response, show the error message
        toast.error(response.message || tErrors("unauthorized"));
        setIsFormDisabled(false);
      }
    },
    onError: (error) => {
      toast.error(error.message || tErrors("networkError"));
      setIsFormDisabled(false);
    },
  });

  function onSubmit(data: LoginFormValues) {
    setIsFormDisabled(true);
    loginMutation.mutate(data as LoginUserByEmailSchemaType);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Language Switcher */}
      <div className="flex justify-end">
        <LanguageSwitcher />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("login")}</CardTitle>
          <CardDescription>{t("enterEmailToLogin")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        {...field}
                        disabled={isFormDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>{t("password")}</FormLabel>
                      <Link
                        href={"/forgot-password" as any}
                        className="ml-auto inline-block text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
                      >
                        {t("forgotPassword")}?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        disabled={isFormDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isFormDisabled || loginMutation.isPending}
                >
                  {loginMutation.isPending
                    ? `${tCommon("loading")}`
                    : t("loginButton")}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                {t("dontHaveAccount")}{" "}
                <Link
                  href={"/signup" as any}
                  className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                >
                  {t("signup")}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
