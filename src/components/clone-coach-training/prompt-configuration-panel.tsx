"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChatbotListModal } from "@/components/clone-coach-training/chatbot-list-modal";
import { Settings, Bot, Save, Loader2 } from "lucide-react";
import { useChatbots, useChatbot } from "@/services/chatbot/chatbot.hooks"; // Placeholder hooks
import { useGetTrainingJobById } from "@/services/training/training.hooks"; // Assuming last training job for chatbot
import type { ITrainingJob } from "@/services/training/training.types";

// TODO: Replace this with actual chatbotId from context or props if not using the list
const TEMP_CHATBOT_ID = "660f00c4d92a778a6a9b3e7e"; // Example ID

// Mock data for chatbot list (as `useChatbots` is a placeholder)
const mockChatbotsForList = [
  { _id: TEMP_CHATBOT_ID, name: "Coach AI (Loaded)", description: "Primary assistant" },
  { _id: "chatbotId2", name: "Wellness Guide (Mock)", description: "Wellness specialist" },
];

export function PromptConfigurationPanel() {
  const t = useTranslations("dashboard.cloneCoachTraining.promptConfiguration");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");

  const [selectedChatbotId, setSelectedChatbotId] = useState<string>(TEMP_CHATBOT_ID);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompts, setPrompts] = useState({ systemPrompt: "", persona: "" });
  const [isSaving, setIsSaving] = useState(false); // For simulated save

  // --- Chatbot Configuration Fetching (Placeholder) ---
  // COMMENT: `useChatbot` is a placeholder. In a real scenario, this hook would fetch
  // the chatbot's configuration, including prompts, temperature, model settings, etc.
  // For now, it returns null or mock data, so we'll set prompts manually or from mock.
  const { 
    data: chatbotData, 
    isLoading: isLoadingChatbotData, 
    isError: isErrorChatbotData 
  } = useChatbot(selectedChatbotId); 

  // COMMENT: `useChatbots` is also a placeholder. Using mock data for the selection list.
  const { data: chatbotsList } = useChatbots(); // Would be used for ChatbotListModal

  useEffect(() => {
    if (chatbotData) {
      // COMMENT: Assuming chatbotData contains fields like `systemPrompt` and `persona`.
      // As `chatbot.hooks.ts` is a placeholder, this data structure is hypothetical.
      // @ts-ignore
      setPrompts({ systemPrompt: chatbotData.systemPrompt || "", persona: chatbotData.persona || "" });
    } else {
      // Set default or mock prompts if no data is fetched (due to placeholder hook)
      setPrompts({
        systemPrompt: `You are an AI coaching assistant for ${selectedChatbotId}. Your role is to...`,
        persona: `This is the persona for ${selectedChatbotId}.`,
      });
    }
  }, [chatbotData, selectedChatbotId]);

  // --- Training Status ---
  // COMMENT: Assuming the chatbot's configuration might include its last/current training job ID.
  // For this example, we'll try to fetch training status for TEMP_CHATBOT_ID,
  // but in a real system, you'd fetch the specific training job associated with this chatbot config.
  // This is a simplification as `chatbotData` doesn't provide a `trainingJobId`.
  // The API /training/{id} expects a training job ID, not a chatbot ID.
  // This part highlights a potential need for better linking or a different endpoint.
  // For now, we'll use TEMP_CHATBOT_ID as a placeholder for a training job ID for demonstration.
  const placeholderTrainingJobId = TEMP_CHATBOT_ID; 
  const { 
    data: trainingJobData, 
    isLoading: isLoadingTrainingStatus 
  } = useGetTrainingJobById(placeholderTrainingJobId, {
    // enabled: !!chatbotData?.lastTrainingJobId // Ideally, enable based on actual ID
  });
  
  const trainingStatus: ITrainingJob | null = trainingJobData?.data || null;

  const handleSave = () => {
    // COMMENT: This is a placeholder for saving chatbot configuration.
    // A real implementation would use a mutation hook like `useUpdateChatbotConfiguration(selectedChatbotId)`.
    // This hook is currently missing from the placeholder `chatbot.hooks.ts`.
    console.log("Attempting to save prompts for chatbot:", selectedChatbotId, prompts);
    setIsSaving(true);
    toast.info(t("saveInitiated"));
    setTimeout(() => {
      setIsSaving(false);
      toast.success(t("saveSuccessPlaceholder"));
      // In a real scenario, you might refetch chatbot data here.
    }, 1500);

    // MISSING API: `useUpdateChatbotConfiguration` or similar would be called here.
    // Example: updateChatbotConfigMutation.mutate({ chatbotId: selectedChatbotId, config: prompts });
    alert(t("missingApiSaveAlert")); 
  };
  
  // --- UI for Chatbot Info (from placeholder hook) ---
  const displayChatbot = chatbotData?.data || mockChatbotsForList.find(c => c._id === selectedChatbotId);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2 text-primary" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chatbot Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("selectedChatbot")}</Label>
          <div className="flex gap-2">
            <Select value={selectedChatbotId} onValueChange={setSelectedChatbotId} disabled={isLoadingChatbotData}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t("selectChatbotPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {/* Using mock list as useChatbots is placeholder */}
                {mockChatbotsForList.map((chatbot) => (
                  <SelectItem key={chatbot._id} value={chatbot._id}>
                    {chatbot.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(true)}
              disabled={isLoadingChatbotData}
            >
              {t("listChatbots")}
            </Button>
          </div>
          
          {isLoadingChatbotData && <Loader2 className="h-4 w-4 animate-spin" />}
          {isErrorChatbotData && <p className="text-xs text-destructive">{tErrors("chatbot.fetchConfigError")}</p>}
          
          {displayChatbot && !isLoadingChatbotData && (
            <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
              {/* COMMENT: Fields like linkedUsers, knowledgeBase are hypothetical as chatbotData structure is unknown */}
              <p><strong>ID:</strong> {displayChatbot._id}</p>
              {/* @ts-ignore */}
              <p><strong>Description:</strong> {displayChatbot.description || "N/A"}</p>
            </div>
          )}
        </div>

        {/* System Prompt Configuration */}
        {/* COMMENT: Specific API for prompt configuration (e.g., temperature, max tokens, model choice) is missing. */}
        <div className="p-2 border-l-4 border-destructive/30 bg-destructive/5 my-2">
             <p className="text-xs text-destructive/80">
                <strong>{tCommon("missingFeatureTitle")}:</strong> {t("missingApis.detailedPromptConfig")}
            </p>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("prompts")}</Label>
          <Textarea
            placeholder={t("systemPromptPlaceholder")}
            value={prompts.systemPrompt}
            onChange={(e) => setPrompts(prev => ({ ...prev, systemPrompt: e.target.value }))}
            className="min-h-[150px] text-sm"
            disabled={isLoadingChatbotData || isSaving}
          />
          <p className="text-xs text-muted-foreground">
            {t("systemPromptDescription")}
          </p>
        </div>

        {/* Persona Configuration */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("persona")}</Label>
          <Textarea
            placeholder={t("personaPlaceholder")}
            value={prompts.persona}
            onChange={(e) => setPrompts(prev => ({ ...prev, persona: e.target.value }))}
            className="min-h-[120px] text-sm"
            disabled={isLoadingChatbotData || isSaving}
          />
          <p className="text-xs text-muted-foreground">
            {t("personaDescription")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button onClick={handleSave} className="flex-1" disabled={isSaving || isLoadingChatbotData}>
            {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            {isSaving ? tCommon("saving") : t("saveConfigurationButton")}
          </Button>
          <Button variant="outline" disabled> {/* Test Prompts likely needs full chatbot interaction */}
            <Bot className="h-4 w-4 mr-2" />
            {t("testPromptsButton")} 
            {/* COMMENT: Test Prompts functionality would ideally use the ChatbotPreviewPanel or similar,
                         but requires the chatbot service to be fully functional and reflect these unsaved changes.
            */}
          </Button>
        </div>
        
        {/* Training Status Display */}
        <div className="bg-primary/10 rounded-md p-3 text-sm">
          <p className="text-primary font-medium mb-1">📚 {t("trainingStatusTitle")}:</p>
          {isLoadingTrainingStatus && <Loader2 className="h-4 w-4 animate-spin" />}
          {!isLoadingTrainingStatus && trainingStatus && (
            <>
              <p className="text-primary/80">
                <strong>{t("statusLabel")}:</strong> {trainingStatus.status} ({trainingStatus.progress}%)
              </p>
              <p className="text-primary/80">
                <strong>{t("lastTrainedLabel")}:</strong> {new Date(trainingStatus.updatedAt).toLocaleString()}
              </p>
              {/* COMMENT: A button to trigger new training (`useStartTraining` hook) could be added here.
                           This would require `chatbotId` and potentially other parameters.
                           Example: <Button onClick={() => startTrainingMutation.mutate({ chatbotId: selectedChatbotId })}>Start New Training</Button>
              */}
            </>
          )}
          {!isLoadingTrainingStatus && !trainingStatus && (
            <p className="text-primary/80">{t("noTrainingData")}</p>
          )}
           {/* COMMENT: The current useGetTrainingJobById hook expects a training job ID.
                       A real system might need an endpoint like `/chatbots/{chatbotId}/training-status`
                       or link the chatbot entity to its latest training job ID.
                       Using TEMP_CHATBOT_ID as a placeholder for training job ID is a simplification.
          */}
           <div className="p-1 mt-1 border-l-2 border-destructive/30 bg-destructive/5">
                <p className="text-xs text-destructive/80">
                    <strong>{tCommon("noteTitle")}:</strong> {t("trainingIdNote")}
                </p>
            </div>
        </div>
      </CardContent>

      <ChatbotListModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // @ts-ignore Using mock data as chatbot service is placeholder
        chatbots={mockChatbotsForList} 
        onSelect={(chatbotId) => {
          setSelectedChatbotId(chatbotId);
          setIsModalOpen(false);
        }}
      />
    </Card>
  );
}