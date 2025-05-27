"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useChatbotFlowStore } from "@/stores/useChatbotFlowStore";
import { Settings, Lock, AlertCircle, Edit, ChevronDown, ChevronRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ChatbotUpdateForm } from "./chatbot-update-form";

export function PromptConfigurationPanel() {
  const t = useTranslations("dashboard.cloneCoachTraining.promptConfiguration");
  const { 
    selectedChatbot, 
    selectedKnowledgeBase,
    selectedProgram,
    humanMimicryStyles,
    canAccessStep,
    updateFlowStep 
  } = useChatbotFlowStore();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const canAccessPrompts = canAccessStep('prompts');
  const isLocked = !selectedChatbot;

  const hasHumanMimicry = humanMimicryStyles[0];

  // Mark step as completed when chatbot is configured
  useEffect(() => {
    if (selectedChatbot && canAccessPrompts) {
      updateFlowStep('prompts', { 
        completed: true,
        hasData: true,
      });
    }
  }, [selectedChatbot, canAccessPrompts, updateFlowStep]);

  const handleFormSuccess = () => {
    setIsFormOpen(false);
  };

  return (
    <Card className={`h-fit ${isLocked ? 'opacity-60' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2 text-primary" />
          {t("title")}
          {isLocked && <Lock className="h-4 w-4 ml-2 text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Locked State */}
        {isLocked && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Select a chatbot to configure prompts and settings.
            </AlertDescription>
          </Alert>
        )}

        {/* Prompts Not Ready State */}
        {!isLocked && !canAccessPrompts && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Complete the chatbot setup to configure prompts and persona.
            </AlertDescription>
          </Alert>
        )}
        
        {/* Current Chatbot Info */}
        {selectedChatbot && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t("selectedChatbot")}</Label>
            <div className="bg-muted/50 p-3 rounded">
              <p className="font-medium">{selectedChatbot.name}</p>
              {selectedChatbot.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedChatbot.description}
                </p>
              )}
              <div className="text-xs text-muted-foreground mt-2 space-y-1">
                <p><strong>Status:</strong> {selectedChatbot.active ? 'Active' : 'Inactive'}</p>
                <p><strong>Knowledge Base:</strong> {selectedKnowledgeBase?.name || 'Not linked'}</p>
                <p><strong>Human Mimicry:</strong> {hasHumanMimicry ? 'Configured' : 'Not configured'}</p>
                {selectedChatbot.prompt && (
                  <p><strong>System Prompt:</strong> Configured</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Chatbot Update Form */}
        {selectedChatbot && canAccessPrompts && (
          <div className="space-y-2">
            <Collapsible open={isFormOpen} onOpenChange={setIsFormOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    {t("editChatbot")}
                  </span>
                  {isFormOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pt-4">
                <ChatbotUpdateForm 
                  chatbot={selectedChatbot} 
                  onSuccess={handleFormSuccess}
                />
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}

        {/* Configuration Status */}
        {canAccessPrompts && (
          <div className="space-y-4">
            <div className="bg-success/10 border border-success/20 rounded-md p-3">
              <p className="text-sm text-success">
                ✓ Chatbot configuration completed. Ready for next steps.
              </p>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p><strong>Next Steps:</strong></p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {!selectedProgram && <li>Create a program for training sessions</li>}
                {!selectedKnowledgeBase && <li>Set up knowledge base with documents</li>}
                {!hasHumanMimicry && <li>Configure human mimicry styles</li>}
                {selectedChatbot && selectedKnowledgeBase && hasHumanMimicry && selectedProgram && <li>Start training your AI coach</li>}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}