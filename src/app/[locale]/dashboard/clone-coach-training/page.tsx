"use client";

import { useTranslations } from "next-intl";
import { ChatbotSelectorBar } from "@/components/clone-coach-training/chatbot-selector-bar";
import { KnowledgeBasePanel } from "@/components/clone-coach-training/knowledge-base-panel";
import { PromptConfigurationPanel } from "@/components/clone-coach-training/prompt-configuration-panel";
import { ChatbotPreviewPanel } from "@/components/clone-coach-training/chatbot-preview-panel";
import { FlowModalManager } from "@/components/clone-coach-training/flow-modal-manager";

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

      {/* Chatbot Selector and Progress Bar */}
      <ChatbotSelectorBar />

      {/* Main Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <KnowledgeBasePanel />
        <PromptConfigurationPanel />
        <ChatbotPreviewPanel />
      </div>

      {/* Flow Modal Manager for auto-popup creation flow */}
      <FlowModalManager />
    </div>
  );
}