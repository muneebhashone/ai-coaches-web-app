import { ResetPasswordForm } from "@/components/reset-password-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-muted-foreground">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
