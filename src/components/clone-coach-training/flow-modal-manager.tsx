"use client";

import { useEffect, useState } from "react";
import { useChatbotFlowStore } from "@/stores/useChatbotFlowStore";
import { ProgramCreationModal } from "./program-creation-modal";
import { SessionCreationModal } from "./session-creation-modal";
import { KnowledgeBaseCreationModal } from "./knowledge-base-creation-modal";
import { useProgramByChatbotId } from "@/services/programs/program.hooks";
import { useSessions } from "@/services/sessions/session.hooks";
import { useKnowledgeBasesByChatbotId } from "@/services/knowledge-bases/knowledge-base.hooks";
import { useHumanMimicries } from "@/services/human-mimicry/human-mimicry.hooks";
import { useDocuments } from "@/services/documents/document.hooks";
import { useTrainingJobs } from "@/services/training/training.hooks";
import { ITrainingJob } from "@/services/training/training.types";

export function FlowModalManager() {
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showKnowledgeBaseModal, setShowKnowledgeBaseModal] = useState(false);

  const {
    selectedChatbot,
    selectedProgram,
    selectedSessions,
    selectedKnowledgeBase,
    setSelectedKnowledgeBase,
    setSelectedProgram,
    addSession,
    flowSteps,
    addDocument,
    addHumanMimicryStyle,
    updateFlowStep,
    setCurrentStep,
    userExplicitlyClosed,
    setCurrentTrainingJob,
    setUserExplicitlyClosed,
  } = useChatbotFlowStore();

  const { data: programById } = useProgramByChatbotId(
    selectedChatbot?._id || ""
  );
  const { data: sessionsByProgramId } = useSessions({
    programId: selectedProgram?._id || "",
    page: 1,
    limit: 100,
    active: true,
  });

  const { data: knowledgeBasesByChatbotId } = useKnowledgeBasesByChatbotId(
    selectedChatbot?._id || ""
  );

  const {data: humanMimicryStyles} = useHumanMimicries(
    selectedChatbot?._id || ""
  );

  const {data: documents} = useDocuments(
    selectedKnowledgeBase?._id || ""
  );


  const {data: trainingJobs} = useTrainingJobs({
    page: 1,
    limit: 100,
    status: "completed" as ITrainingJob["status"],
    chatbotId: selectedChatbot?._id || "",
  });

  useEffect(() => {
    if (trainingJobs) {
      updateFlowStep("training", {
        completed: true,
        hasData: true,
      });

      for (const trainingJob of trainingJobs.data.results) {
        setCurrentTrainingJob(trainingJob);
      }
    }
  }, [trainingJobs, updateFlowStep, setCurrentTrainingJob]); 
  

  useEffect(() => {
    if (programById) {
      setShowProgramModal(false);
      updateFlowStep("program", {
        completed: true,
        hasData: true,
      });

      setCurrentStep("sessions");

      setSelectedProgram(programById.data);
    }
  }, [programById, updateFlowStep, setCurrentStep, setSelectedProgram]);

  useEffect(() => {
    if (sessionsByProgramId) {
      if (sessionsByProgramId.data.results.length > 0) {
        setShowSessionModal(false);
        updateFlowStep("sessions", {
          completed: true,
          hasData: true,
        });
        for (const session of sessionsByProgramId.data.results) {
          addSession(session);
        }

      setCurrentStep("knowledge-base");

      }
    }
  }, [sessionsByProgramId, updateFlowStep, setCurrentStep, addSession]);

  useEffect(() => {
    if (humanMimicryStyles && (humanMimicryStyles.data.results.length || 0) > 0) {
      updateFlowStep("human-mimicry", {
        completed: true,
        hasData: true,
      });

      for (const humanMimicryStyle of humanMimicryStyles.data.results) {
        addHumanMimicryStyle(humanMimicryStyle);
      }
    }
  }, [humanMimicryStyles, updateFlowStep, addHumanMimicryStyle]);

  useEffect(() => {
    if (knowledgeBasesByChatbotId) {
      setShowKnowledgeBaseModal(false);
      updateFlowStep("knowledge-base", {
        completed: true,
        hasData: true,
      });
      setSelectedKnowledgeBase(knowledgeBasesByChatbotId.data);
      setCurrentStep("documents");
    }
  }, [knowledgeBasesByChatbotId, updateFlowStep, setCurrentStep, setSelectedKnowledgeBase]);

  useEffect(() => {
    if (documents && (documents.data.results.length || 0) > 0) {
      updateFlowStep("documents", {
        completed: true,
        hasData: true,
      });

      for (const document of documents.data.results) {
        addDocument(document);
      }
    }
  }, [documents, updateFlowStep, addDocument]);

  // Auto-trigger program creation when chatbot is created
  useEffect(() => {
    if (
      selectedChatbot &&
      !selectedProgram &&
      flowSteps.chatbot.completed &&
      !flowSteps.program.completed &&
      !showProgramModal &&
      !userExplicitlyClosed
    ) {
      setShowProgramModal(true);
    }
  }, [
    selectedChatbot,
    selectedProgram,
    flowSteps.chatbot.completed,
    flowSteps.program.completed,
    showProgramModal,
    userExplicitlyClosed,
  ]);

  // Auto-trigger session creation when program is created
  useEffect(() => {
    if (
      selectedProgram &&
      selectedSessions.length === 0 &&
      flowSteps.program.completed &&
      !flowSteps.sessions.completed &&
      !showSessionModal &&
      !showProgramModal &&
      !userExplicitlyClosed
    ) {
      setShowSessionModal(true);
    }
  }, [
    selectedProgram,
    selectedSessions.length,
    flowSteps.program.completed,
    flowSteps.sessions.completed,
    showSessionModal,
    showProgramModal,
    userExplicitlyClosed,
  ]);

  // Auto-trigger knowledge base creation when first session is created
  useEffect(() => {
    if (
      selectedSessions.length > 0 &&
      !selectedKnowledgeBase &&
      flowSteps.sessions.completed &&
      !flowSteps["knowledge-base"].completed &&
      !showKnowledgeBaseModal &&
      !showSessionModal && // Don't show if session modal is still open
      !showProgramModal &&
      !userExplicitlyClosed
    ) {
      setShowKnowledgeBaseModal(true);
    }
  }, [
    selectedSessions.length,
    selectedKnowledgeBase,
    flowSteps.sessions.completed,
    showKnowledgeBaseModal,
    showSessionModal,
    showProgramModal,
    userExplicitlyClosed,
    flowSteps,
  ]);

  const handleProgramClose = () => {
    setShowProgramModal(false);
    if (selectedProgram) {
      updateFlowStep("program", {
        completed: true,
        hasData: true,
      });
    }
  };

  const handleSessionClose = () => {
    setShowSessionModal(false);
    if (selectedSessions.length > 0) {
      updateFlowStep("sessions", {
        completed: true,
        hasData: true,
      });
    }
  };

  const handleKnowledgeBaseClose = () => {
    setShowKnowledgeBaseModal(false);
    if (selectedKnowledgeBase) {
      updateFlowStep("knowledge-base", {
        completed: true,
        hasData: true,
      });
    }
  };

  const handleExplicitClose = () => {
    setUserExplicitlyClosed(true);
    setShowProgramModal(false);
    setShowSessionModal(false);
    setShowKnowledgeBaseModal(false);
  };

  console.log({
    selectedChatbot,
    selectedProgram,
    selectedSessions,
    selectedKnowledgeBase,
    flowSteps,
    updateFlowStep,
    setCurrentStep,
    userExplicitlyClosed,
    setUserExplicitlyClosed,
  });

  return (
    <>
      <ProgramCreationModal
        isOpen={showProgramModal}
        onClose={handleProgramClose}
        onExplicitClose={handleExplicitClose}
      />

      <SessionCreationModal
        isOpen={showSessionModal}
        onClose={handleSessionClose}
        onExplicitClose={handleExplicitClose}
      />

      <KnowledgeBaseCreationModal
        isOpen={showKnowledgeBaseModal}
        onClose={handleKnowledgeBaseClose}
        onExplicitClose={handleExplicitClose}
      />
    </>
  );
}
