"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
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
import { useRegisterEmail } from "@/services/auth/auth.hooks";
import { toast } from "sonner";
import { passwordValidationSchema } from "@/services/common/common.schema";

type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("auth");
  const tErrors = useTranslations("errors");
  const tValidation = useTranslations("validation");
  const tCommon = useTranslations("common");

  const router = useRouter();
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  // Create schema with translated validation messages
  const signupSchema = z
    .object({
      name: z.string({ required_error: tValidation("name.required") }).min(2, {
        message: tValidation("name.minLength", { count: 2 }),
      }),
      email: z
        .string({ required_error: tValidation("email.required") })
        .email({ message: tValidation("email.invalid") }),
      password: passwordValidationSchema(t("password")),
      confirmPassword: passwordValidationSchema(t("confirmPassword")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tValidation("password.mustMatch"),
      path: ["confirmPassword"],
    });

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useRegisterEmail({
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message || tCommon("success"));
        // Redirect to login page after successful registration
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

  function onSubmit(data: SignUpFormValues) {
    setIsFormDisabled(true);
    // Remove confirmPassword field as it's not expected by the API
    const { ...registrationData } = data;
    registerMutation.mutate(registrationData);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
    

      <Card>
        <CardHeader>
          <CardTitle>{t("signup")}</CardTitle>
          <CardDescription>{t("enterDetailsToCreateAccount")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fullName")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
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
                    <FormLabel>{t("password")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        disabled={isFormDisabled}
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
                        {...field}
                        disabled={isFormDisabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isFormDisabled || registerMutation.isPending}
              >
                {registerMutation.isPending
                  ? tCommon("loading")
                  : t("signupButton")}
              </Button>
              <div className="mt-4 text-center text-sm">
                {t("alreadyHaveAccount")}{" "}
                <Link href="/login" className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors">
                  {t("login")}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
