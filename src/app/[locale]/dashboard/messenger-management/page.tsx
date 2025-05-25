"use client";

import { useTranslations } from "next-intl";
import { KakaoIntegrationPanel } from "@/components/messenger-management/kakao-integration-panel";
import { MessageManagementPanel } from "@/components/messenger-management/message-management-panel";

export default function MessengerManagementPage() {
  const t = useTranslations("dashboard.messengerManagement");

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KakaoIntegrationPanel />
        <MessageManagementPanel />
      </div>
    </div>
  );
}