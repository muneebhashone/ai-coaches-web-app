"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { UserDetailHeader } from "@/components/user-management/user-detail-header";
import { ScheduleInfoCard } from "@/components/user-management/schedule-info-card";
import { SessionSummaryCard } from "@/components/user-management/session-summary-card";
import { SpecialNotesCard } from "@/components/user-management/special-notes-card";

export default function UserDetailPage() {
  const params = useParams();
  const t = useTranslations("dashboard.userManagement");
  const userId = params.userId as string;

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

      <UserDetailHeader userId={userId} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ScheduleInfoCard userId={userId} />
        <SessionSummaryCard userId={userId} />
        <SpecialNotesCard userId={userId} />
      </div>
    </div>
  );
}