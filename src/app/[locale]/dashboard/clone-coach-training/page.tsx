"use client";

import { useTranslations } from "next-intl";
import { ChatbotSelectorBar } from "@/components/clone-coach-training/chatbot-selector-bar";
import { KnowledgeBasePanel } from "@/components/clone-coach-training/knowledge-base-panel";
import { PromptConfigurationPanel } from "@/components/clone-coach-training/prompt-configuration-panel";
import { ChatbotPreviewPanel } from "@/components/clone-coach-training/chatbot-preview-panel";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function CloneCoachTrainingPage() {
  const t = useTranslations("dashboard.cloneCoachTraining");
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const chatbotId = searchParams.get("chatbotId") as string;

  const handleChatbotSelect = (chatbotId: string) => {
    const locale = params.locale as string;
    router.push(
      `/${locale}/dashboard/clone-coach-training?chatbotId=${chatbotId}`
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      {/* Chatbot Selector and Progress Bar */}
      <ChatbotSelectorBar
        chatbotId={chatbotId}
        onChatbotSelect={handleChatbotSelect}
      />

      {/* Main Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <KnowledgeBasePanel chatbotId={chatbotId} />
        <PromptConfigurationPanel chatbotId={chatbotId} />
        <ChatbotPreviewPanel chatbotId={chatbotId} />
      </div>

      {/* Flow Modal Manager for auto-popup creation flow */}
      {/* <FlowModalManager /> */}
    </div>
  );
}
