import { ResetPasswordForm } from "@/components/reset-password-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <Suspense fallback={<div className="text-muted-foreground">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
