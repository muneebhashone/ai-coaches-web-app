import { ClientResetPasswordForm } from "@/components/client-reset-password-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense
      fallback={<div className="text-muted-foreground">Loading...</div>}
    >
      <ClientResetPasswordForm />
    </Suspense>
  );
}
