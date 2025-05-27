"use client";

import { useState } from "react";
// import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Bot, Plus, ChevronRight, CheckCircle, Circle, AlertCircle } from "lucide-react";
import { ChatbotListModal } from "./chatbot-list-modal";
import { ChatbotCreationModal } from "./chatbot-creation-modal";
import { useChatbotFlowStore } from "@/stores/useChatbotFlowStore";
import { useChatbots } from "@/services/chatbots/chatbot.hooks";
import type { FlowStep } from "@/stores/useChatbotFlowStore";

const stepLabels: Record<FlowStep, string> = {
  chatbot: "Chatbot",
  program: "Program", 
  sessions: "Sessions",
  "knowledge-base": "Knowledge Base",
  documents: "Documents",
  "human-mimicry": "Human Mimicry",
  prompts: "Prompts",
  training: "Training"
};


export function ChatbotSelectorBar() {
  // const t = useTranslations("dashboard.cloneCoachTraining");
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  
  const {
    selectedChatbot,
    currentStep,
    flowSteps,
    getFlowProgress,
    getCompletedSteps,
    getNextStep,
    canAccessStep,
    setSelectedChatbot,
    setCurrentStep,
    setUserExplicitlyClosed,
    resetFlow,
  } = useChatbotFlowStore();

  const { data: chatbotsData, isLoading: chatbotsLoading } = useChatbots({ page: 1, limit: 50, active: true });
  const chatbots = chatbotsData?.data?.results || [];

  console.log({chatbots});

  const progress = getFlowProgress();
  const completedSteps = getCompletedSteps();
  const nextStep = getNextStep();

  const handleChatbotSelect = (chatbotId: string) => {
    const chatbot = chatbots.find(c => c._id === chatbotId);
    if (chatbot) {
      resetFlow();
      setSelectedChatbot(chatbot);
    }
  };

  const handleStepClick = (step: FlowStep) => {
    if (canAccessStep(step) || flowSteps[step].completed) {
      setCurrentStep(step);
    }
  };

  const getStepStatus = (step: FlowStep) => {
    if (flowSteps[step].completed) return "completed";
    if (step === currentStep) return "current";
    if (canAccessStep(step)) return "available";
    return "locked";
  };

  const getStepIcon = (step: FlowStep) => {
    const status = getStepStatus(step);
    
    if (status === "completed") {
      return <CheckCircle className="h-4 w-4 text-success" />;
    }
    if (status === "current") {
      return <Circle className="h-4 w-4 text-primary fill-primary" />;
    }
    if (status === "available") {
      return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
    return <Circle className="h-4 w-4 text-muted-foreground/50" />;
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header with Chatbot Selection */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Chatbot Training Flow</h2>
              </div>
              
              {selectedChatbot && (
                <Badge variant="outline" className="bg-primary/10">
                  {selectedChatbot.name}
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {selectedChatbot ? (
                <Select 
                  value={selectedChatbot._id} 
                  onValueChange={handleChatbotSelect}
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {chatbots.map((chatbot) => (
                      <SelectItem key={chatbot._id} value={chatbot._id}>
                        <div className="flex items-center space-x-2">
                          <span>{chatbot.name}</span>
                          {chatbot.active && (
                            <Badge variant="secondary" className="text-xs">
                              Active
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-muted-foreground text-sm">
                  Select or create a chatbot to begin
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsListModalOpen(true)}
                  disabled={chatbotsLoading}
                >
                  {selectedChatbot ? "Switch Chatbot" : "Select Chatbot"}
                </Button>
                <Button 
                  onClick={() => setIsCreationModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Button>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Progress: {completedSteps.length} of {Object.keys(flowSteps).length} steps completed
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Navigation */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-2">
            {Object.entries(stepLabels).map(([step, label], index) => {
              const flowStep = step as FlowStep;
              const status = getStepStatus(flowStep);
              const isClickable = status === "available" || status === "completed" || status === "current";
              
              return (
                <div key={step} className="flex items-center">
                  <Button
                    variant={status === "current" ? "default" : "ghost"}
                    size="sm"
                    className={`
                      flex items-center space-x-2 whitespace-nowrap transition-all
                      ${status === "completed" ? "text-success hover:text-success" : ""}
                      ${status === "locked" ? "text-muted-foreground/50 cursor-not-allowed" : ""}
                      ${isClickable ? "cursor-pointer" : "cursor-not-allowed"}
                    `}
                    onClick={() => isClickable && handleStepClick(flowStep)}
                    disabled={!isClickable}
                  >
                    {getStepIcon(flowStep)}
                    <span className="text-xs">{label}</span>
                  </Button>
                  
                  {index < Object.keys(stepLabels).length - 1 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 mx-1" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Next Step Suggestion */}
          {selectedChatbot && nextStep && (
            <div className="bg-primary/10 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span className="text-sm text-primary">
                  Next: Configure {stepLabels[nextStep]}
                </span>
              </div>
              <Button 
                size="sm" 
                onClick={() => {
                  setCurrentStep(nextStep);
                  setUserExplicitlyClosed(false);
                }}
                className="text-xs"
              >
                Continue
              </Button>
            </div>
          )}

          {/* No Chatbot Selected State */}
          {!selectedChatbot && (
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Bot className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">
                Select an existing chatbot or create a new one to start the training flow
              </p>
            </div>
          )}
        </div>
      </CardContent>

      <ChatbotListModal 
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        chatbots={chatbots.map(chatbot => ({
          id: chatbot._id,
          name: chatbot.name,
          linkedUsers: 0, // TODO: Get from actual data
          trainingStatus: "Trained", // TODO: Get from training status
          lastUsed: chatbot.updatedAt,
          knowledgeBase: chatbot.knowledgeBaseId || "No KB" 
        }))}
        onSelect={(chatbotId) => {
          handleChatbotSelect(chatbotId);
          setIsListModalOpen(false);
        }}
      />

      <ChatbotCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
      />
    </Card>
  );
}