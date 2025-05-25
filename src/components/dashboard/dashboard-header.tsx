"use client";

import { useTranslations } from "next-intl";

export function DashboardHeader() {
  const t = useTranslations("dashboard");

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {t("title")}
      </h1>
      <p className="text-muted-foreground">
        {t("welcome")}
      </p>
    </div>
  );
}