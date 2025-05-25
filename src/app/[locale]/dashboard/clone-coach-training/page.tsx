"use client";

import { useTranslations } from "next-intl";
import { KnowledgeBasePanel } from "@/components/clone-coach-training/knowledge-base-panel";
import { PromptConfigurationPanel } from "@/components/clone-coach-training/prompt-configuration-panel";
import { ChatbotPreviewPanel } from "@/components/clone-coach-training/chatbot-preview-panel";

export default function CloneCoachTrainingPage() {
  const t = useTranslations("dashboard.cloneCoachTraining");

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <KnowledgeBasePanel />
        <PromptConfigurationPanel />
        <ChatbotPreviewPanel />
      </div>
    </div>
  );
}