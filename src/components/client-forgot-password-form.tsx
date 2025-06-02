"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type * as z from "zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { clientForgetPasswordSchema } from "@/services/client-auth/client-auth.schema";
import { toast } from "sonner";
import { clientForgetPassword } from "@/services/client-auth/client-auth.service";

type ForgotPasswordFormValues = z.infer<typeof clientForgetPasswordSchema>;

export function ClientForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("auth");
  const tErrors = useTranslations("errors");
  const tCommon = useTranslations("common");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(clientForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsSubmitting(true);

    try {
      const response = await clientForgetPassword(data);

      if (response.success) {
        setIsSuccess(true);
        toast.success(
          response.message || "Password reset instructions sent to your email"
        );
      } else {
        toast.error(response.message || tErrors("networkError"));
      }
    } catch (error) {
      toast.error((error as Error)?.message || tErrors("networkError"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{t("forgotPassword")}</CardTitle>
          <CardDescription>
            {isSuccess
              ? t("checkEmailForInstructions")
              : t("enterEmailForReset")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSuccess ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          disabled={isSubmitting}
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? tCommon("loading") : t("sendResetLink")}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center py-4">
              <p className="mb-4">{t("ifAccountExists")}</p>
              <Button onClick={() => setIsSuccess(false)} variant="outline">
                {t("tryAnotherEmail")}
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm">
            {t("rememberPassword")}{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
            >
              {tCommon("back")} to {t("login").toLowerCase()}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
