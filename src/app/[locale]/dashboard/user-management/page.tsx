"use client";

import { useTranslations } from "next-intl";
import { UserFilters } from "@/components/user-management/user-filters";
import { UserDataTable } from "@/components/user-management/user-data-table";

export default function UserManagementPage() {
  const t = useTranslations("dashboard.userManagement");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <UserFilters />
      <UserDataTable />
    </div>
  );
}