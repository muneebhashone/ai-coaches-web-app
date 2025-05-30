"use client";

import { useMemo, useState } from "react";
// import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Bot, Plus, ChevronRight, Circle, CheckCircle } from "lucide-react";
import { ChatbotListModal } from "./chatbot-list-modal";
import { ChatbotCreationModal } from "./chatbot-creation-modal";
import { useChatbots } from "@/services/chatbots/chatbot.hooks";
import { useProgramByChatbotId } from "@/services/programs/program.hooks";
import { useSessions } from "@/services/sessions/session.hooks";
import { useKnowledgeBasesByChatbotId } from "@/services/knowledge-bases/knowledge-base.hooks";
import { useHumanMimicries } from "@/services/human-mimicry/human-mimicry.hooks";
import { useDocuments } from "@/services/documents/document.hooks";
import { useTrainingJobs } from "@/services/training/training.hooks";
import { SessionCreationModal } from "./session-creation-modal";
import { KnowledgeBaseCreationModal } from "./knowledge-base-creation-modal";
import { ProgramCreationModal } from "./program-creation-modal";

export const FlowSteps = {
  chatbot: "chatbot",
  program: "program",
  sessions: "sessions",
  "knowledge-base": "knowledge-base",
  documents: "documents",
  "human-mimicry": "human-mimicry",
  prompts: "prompts",
  training: "training",
} as const;

export type FlowStepsType = keyof typeof FlowSteps;

const stepLabels: Record<FlowStepsType, string> = {
  chatbot: "Chatbot",
  program: "Program",
  sessions: "Sessions",
  "knowledge-base": "Knowledge Base",
  documents: "Documents",
  "human-mimicry": "Human Mimicry",
  prompts: "Prompts",
  training: "Training",
};

type ChatbotSelectorBarProps = {
  chatbotId: string;
  onChatbotSelect: (chatbotId: string) => void;
};

export function ChatbotSelectorBar({
  chatbotId,
  onChatbotSelect,
}: ChatbotSelectorBarProps) {
  // const t = useTranslations("dashboard.cloneCoachTraining");
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  const [openModal, setOpenModal] = useState<
    "session" | "knowledge-base" | "program" | null
  >(null);

  const { data: chatbotsData, isLoading: chatbotsLoading } = useChatbots({
    page: 1,
    limit: 50,
    active: true,
  });
  const { data: programData } = useProgramByChatbotId(chatbotId);
  const { data: sessionsData } = useSessions({
    programId: programData?.data?._id || "",
    page: 1,
    limit: 100,
    active: true,
  });
  const { data: knowledgeBaseData } = useKnowledgeBasesByChatbotId(chatbotId);
  const knowledgeBase = knowledgeBaseData?.data;

  const { data: documentData } = useDocuments(knowledgeBase?._id || "");
  const { data: humanMimicryData } = useHumanMimicries(chatbotId);

  const { data: trainingData } = useTrainingJobs({
    page: 1,
    limit: 100,
    chatbotId,
  });

  const trainings = useMemo(
    () => trainingData?.data?.results || [],
    [trainingData?.data?.results]
  );

  const program = programData?.data;
  const sessions = useMemo(
    () => sessionsData?.data?.results || [],
    [sessionsData?.data?.results]
  );

  console.log({ sessions });

  const chatbots = chatbotsData?.data?.results || [];
  const selectedChatbot = chatbots.find((chatbot) => chatbot._id === chatbotId);

  const completedFlowSteps = useMemo((): Record<FlowStepsType, boolean> => {
    return {
      chatbot: !!selectedChatbot,
      program: !!program,
      sessions: sessions.length > 0,
      "knowledge-base": !!knowledgeBase?._id,
      documents: !!documentData?.data?.results?.length,
      "human-mimicry": !!humanMimicryData?.data?.results?.length,
      prompts: !!selectedChatbot?.prompt,
      training: trainings.length > 0,
    };
  }, [
    selectedChatbot,
    program,
    sessions,
    knowledgeBase,
    documentData,
    humanMimicryData,
    trainings,
  ]);

  const totalSteps = Object.keys(FlowSteps).length;
  const completedSteps =
    Object.values(completedFlowSteps).filter(Boolean).length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const getStepStatus = (step: FlowStepsType): "completed" | "available" => {
    if (completedFlowSteps[step]) {
      return "completed";
    }
    return "available";
  };

  const handleChatbotSelect = (chatbotId: string) => {
    onChatbotSelect(chatbotId);
  };

  const getStepIcon = (step: FlowStepsType) => {
    if (completedFlowSteps[step]) {
      return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
    }
    return <Circle className="h-4 w-4 text-muted-foreground" />;
  };

  const handleStepOnClick = (step: FlowStepsType) => {
    switch (step) {
      case "sessions":
        setOpenModal("session");
        break;
      case "knowledge-base":
        setOpenModal("knowledge-base");
        break;
      case "program":
        setOpenModal("program");
        break;
      case "documents":
        const documentsPanel = document.getElementById("knowledge-base-panel");
        if (documentsPanel) {
          documentsPanel.scrollIntoView({ behavior: "smooth" });
          documentsPanel.classList.add("bg-primary/10");
          setTimeout(() => {
            documentsPanel.classList.remove("bg-primary/10");
          }, 1000);
        }
        break;
      case "human-mimicry":
        const humanMimicryPanel = document.getElementById(
          "knowledge-base-panel"
        );
        if (humanMimicryPanel) {
          humanMimicryPanel.scrollIntoView({ behavior: "smooth" });
          humanMimicryPanel.classList.add("bg-primary/10");
          setTimeout(() => {
            humanMimicryPanel.classList.remove("bg-primary/10");
          }, 1000);
        }
        break;
      case "prompts":
        const promptPanel = document.getElementById(
          "prompt-configuration-panel"
        );
        if (promptPanel) {
          promptPanel.scrollIntoView({ behavior: "smooth" });
          promptPanel.classList.add("bg-primary/10");
          setTimeout(() => {
            promptPanel.classList.remove("bg-primary/10");
          }, 1000);
        }
        break;
      case "training":
        const trainingPanel = document.getElementById("training-center-panel");
        if (trainingPanel) {
          trainingPanel.scrollIntoView({ behavior: "smooth" });
          trainingPanel.classList.add("bg-primary/10");
          setTimeout(() => {
            trainingPanel.classList.remove("bg-primary/10");
          }, 1000);
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      <SessionCreationModal
        isOpen={openModal === "session"}
        onClose={() => setOpenModal(null)}
        chatbotId={chatbotId}
      />

      <KnowledgeBaseCreationModal
        isOpen={openModal === "knowledge-base"}
        onClose={() => setOpenModal(null)}
        chatbotId={chatbotId}
      />

      <ProgramCreationModal
        isOpen={openModal === "program"}
        onClose={() => setOpenModal(null)}
        chatbotId={chatbotId}
      />

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header with Chatbot Selection */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Bot className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold">
                    Chatbot Training Flow
                  </h2>
                </div>

                {selectedChatbot && (
                  <Badge variant="outline" className="bg-primary/10">
                    {selectedChatbot.name}
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Select
                  value={selectedChatbot?._id || ""}
                  onValueChange={handleChatbotSelect}
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select Chatbot" />
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

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsListModalOpen(true)}
                    disabled={chatbotsLoading}
                  >
                    {selectedChatbot ? "Switch Chatbot" : "Select Chatbot"}
                  </Button>
                  <Button onClick={() => setIsCreationModalOpen(true)}>
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
                  Progress: {completedSteps} of {totalSteps} steps completed
                </span>
                <span className="font-medium">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Step Navigation */}
            <div className="flex items-center space-x-1 overflow-x-auto pb-2">
              {Object.entries(stepLabels).map(([step, label], index) => {
                const isClickable = true;
                const status = getStepStatus(step as FlowStepsType);

                return (
                  <div key={step} className="flex items-center">
                    <Button
                      variant={status === "available" ? "default" : "ghost"}
                      size="sm"
                      className={`
                      cursor-pointer flex items-center space-x-2 whitespace-nowrap transition-all
                      ${
                        status === "completed"
                          ? "text-success hover:text-success"
                          : ""
                      }
                    `}
                      disabled={!isClickable}
                      onClick={() => handleStepOnClick(step as FlowStepsType)}
                    >
                      {getStepIcon(step as FlowStepsType)}
                      <span className="text-xs">{label}</span>
                    </Button>

                    {index < Object.keys(stepLabels).length - 1 && (
                      <ChevronRight className="h-4 w-4 text-muted-foreground/50 mx-1" />
                    )}
                  </div>
                );
              })}
            </div>
            {/* No Chatbot Selected State */}
            {!selectedChatbot && (
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <Bot className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">
                  Select an existing chatbot or create a new one to start the
                  training flow
                </p>
              </div>
            )}
          </div>
        </CardContent>

        <ChatbotListModal
          isOpen={isListModalOpen}
          onClose={() => setIsListModalOpen(false)}
          chatbots={chatbots.map((chatbot) => ({
            id: chatbot._id,
            name: chatbot.name,
            linkedUsers: 0, // TODO: Get from actual data
            trainingStatus: "Trained", // TODO: Get from training status
            lastUsed: chatbot.updatedAt,
            knowledgeBase: chatbot.knowledgeBaseId || "No KB",
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
    </>
  );
}
