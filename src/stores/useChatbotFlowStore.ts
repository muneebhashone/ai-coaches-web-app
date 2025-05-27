import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import type { ITrainingJob } from '@/services/training/training.types';
import type { IChatbot } from '@/services/chatbots/chatbot.types';
import type { IProgram } from '@/services/programs/program.types';
import type { ISession } from '@/services/sessions/session.types';
import type { IKnowledgeBase } from '@/services/knowledge-bases/knowledge-base.types';
import type { IDocument } from '@/services/documents/document.types';
import type { IHumanMimicry } from '@/services/human-mimicry/human-mimicry.types';

export type FlowStep = 
  | 'chatbot'
  | 'program' 
  | 'sessions'
  | 'knowledge-base'
  | 'documents'
  | 'human-mimicry'
  | 'prompts'
  | 'training';

export interface FlowStepStatus {
  completed: boolean;
  hasData: boolean;
  lastUpdated?: Date;
}

export interface ChatbotFlowState {
  // Current selection
  selectedChatbot: IChatbot | null;
  selectedProgram: IProgram | null;
  selectedSessions: ISession[];
  selectedKnowledgeBase: IKnowledgeBase | null;
  
  // Flow state
  currentStep: FlowStep;
  flowSteps: Record<FlowStep, FlowStepStatus>;
  isCreating: boolean;
  
  // Training state
  currentTrainingJob: ITrainingJob | null;
  suggestRetraining: boolean;
  lastDocumentChange: Date | null;
  
  // Data arrays
  documents: IDocument[];
  humanMimicryStyles: IHumanMimicry[];
  
  // Actions
  setSelectedChatbot: (chatbot: IChatbot | null) => void;
  setSelectedProgram: (program: IProgram | null) => void;
  addSession: (session: ISession) => void;
  removeSession: (sessionId: string) => void;
  setSelectedKnowledgeBase: (knowledgeBase: IKnowledgeBase | null) => void;
  setCurrentStep: (step: FlowStep) => void;
  updateFlowStep: (step: FlowStep, status: Partial<FlowStepStatus>) => void;
  setIsCreating: (creating: boolean) => void;
  
  // Training actions
  setCurrentTrainingJob: (job: ITrainingJob | null) => void;
  setSuggestRetraining: (suggest: boolean) => void;
  onDocumentChange: () => void;
  
  // Data actions
  setDocuments: (documents: IDocument[]) => void;
  addDocument: (document: IDocument) => void;
  removeDocument: (documentId: string) => void;
  setHumanMimicryStyles: (styles: IHumanMimicry[]) => void;
  addHumanMimicryStyle: (style: IHumanMimicry) => void;
  removeHumanMimicryStyle: (styleId: string) => void;
  
  // Flow helpers
  getCompletedSteps: () => FlowStep[];
  getNextStep: () => FlowStep | null;
  canAccessStep: (step: FlowStep) => boolean;
  getFlowProgress: () => number;
  resetFlow: () => void;

  // Explicit close
  setUserExplicitlyClosed: (closed: boolean) => void; 
  userExplicitlyClosed: boolean;
}

const initialFlowSteps: Record<FlowStep, FlowStepStatus> = {
  chatbot: { completed: false, hasData: false },
  program: { completed: false, hasData: false },
  sessions: { completed: false, hasData: false },
  'knowledge-base': { completed: false, hasData: false },
  documents: { completed: false, hasData: false },
  'human-mimicry': { completed: false, hasData: false },
  prompts: { completed: false, hasData: false },
  training: { completed: false, hasData: false },
};

// Define step dependencies
const stepDependencies: Record<FlowStep, FlowStep[]> = {
  chatbot: [],
  program: ['chatbot'],
  sessions: ['program'],
  'knowledge-base': ['sessions'],
  documents: ['knowledge-base'],
  'human-mimicry': ['knowledge-base'],
  prompts: ['chatbot'],
  training: ['documents'],
};

export const useChatbotFlowStore = create<ChatbotFlowState>()(
  persist(
    devtools(
    (set, get) => ({
      // Initial state
      selectedChatbot: null,
      selectedProgram: null,
      selectedSessions: [],
      selectedKnowledgeBase: null,
      currentStep: 'chatbot',
      flowSteps: initialFlowSteps,
      isCreating: false,
      currentTrainingJob: null,
      suggestRetraining: false,
      lastDocumentChange: null,
      documents: [],
      humanMimicryStyles: [],

      // Selection actions
      setSelectedChatbot: (chatbot) => {
        set((state) => {
          const newState = {
            selectedChatbot: chatbot,
            flowSteps: {
              ...state.flowSteps,
              chatbot: {
                completed: !!chatbot,
                hasData: !!chatbot,
                lastUpdated: new Date(),
              },
            },
          };

          if (state.selectedChatbot?._id !== chatbot?._id) {
            Object.assign(newState, {
              selectedProgram: null,
              selectedSessions: [],
              selectedKnowledgeBase: null,
              documents: [],
              humanMimicryStyles: [],
              flowSteps: {
                ...newState.flowSteps,
                program: { completed: false, hasData: false },
                sessions: { completed: false, hasData: false },
                'knowledge-base': { completed: false, hasData: false },
                documents: { completed: false, hasData: false },
                'human-mimicry': { completed: false, hasData: false },
                prompts: { completed: false, hasData: false },
                training: { completed: false, hasData: false },
              },
            });
          }

          return newState;
        });
      },

      setSelectedProgram: (program) => {
        set((state) => ({
          selectedProgram: program,
          flowSteps: {
            ...state.flowSteps,
            program: {
              completed: !!program,
              hasData: !!program,
              lastUpdated: new Date(),
            },
          },
        }));
      },

      addSession: (session) => {
        set((state) => {
          const newSessions = [...state.selectedSessions, session];
          return {
            selectedSessions: newSessions,
            flowSteps: {
              ...state.flowSteps,
              sessions: {
                completed: newSessions.length > 0,
                hasData: newSessions.length > 0,
                lastUpdated: new Date(),
              },
            },
          };
        });
      },

      removeSession: (sessionId) => {
        set((state) => {
          const newSessions = state.selectedSessions.filter(session => session._id !== sessionId);
          return {
            selectedSessions: newSessions,
            flowSteps: {
              ...state.flowSteps,
              sessions: {
                completed: newSessions.length > 0,
                hasData: newSessions.length > 0,
                lastUpdated: new Date(),
              },
            },
          };
        });
      },

      setSelectedKnowledgeBase: (knowledgeBase) => {
        set((state) => ({
          selectedKnowledgeBase: knowledgeBase,
          flowSteps: {
            ...state.flowSteps,
            'knowledge-base': {
              completed: !!knowledgeBase,
              hasData: !!knowledgeBase,
              lastUpdated: new Date(),
            },
          },
        }));
      },

      setCurrentStep: (step) => {
        set({ currentStep: step });
      },

      updateFlowStep: (step, status) => {
        set((state) => ({
          flowSteps: {
            ...state.flowSteps,
            [step]: {
              ...state.flowSteps[step],
              ...status,
              lastUpdated: new Date(),
            },
          },
        }));
      },

      setIsCreating: (creating) => {
        set({ isCreating: creating });
      },

      // Training actions
      setCurrentTrainingJob: (job) => {
        set((state) => ({
          currentTrainingJob: job,
          flowSteps: {
            ...state.flowSteps,
            training: {
              completed: job?.status === 'completed',
              hasData: !!job,
              lastUpdated: new Date(),
            },
          },
        }));
      },

      setSuggestRetraining: (suggest) => {
        set({ suggestRetraining: suggest });
      },

      onDocumentChange: () => {
        set({ 
          lastDocumentChange: new Date(),
          suggestRetraining: true,
        });
      },

      // Data actions
      setDocuments: (documents) => {
        set((state) => ({
          documents,
          flowSteps: {
            ...state.flowSteps,
            documents: {
              completed: documents.length > 0,
              hasData: documents.length > 0,
              lastUpdated: new Date(),
            },
          },
        }));
        get().onDocumentChange();
      },

      addDocument: (document) => {
        set((state) => {
          const newDocuments = [...state.documents, document].filter((doc, index, documents) => documents.findIndex(d => d._id === doc._id) === index);
          return {
            documents: newDocuments,
            flowSteps: {
              ...state.flowSteps,
              documents: {
                completed: newDocuments.length > 0,
                hasData: newDocuments.length > 0,
                lastUpdated: new Date(),
              },
            },
          };
        });
        get().onDocumentChange();
      },

      removeDocument: (documentId) => {
        set((state) => {
          const newDocuments = state.documents.filter(doc => doc._id !== documentId);
          return {
            documents: newDocuments,
            flowSteps: {
              ...state.flowSteps,
              documents: {
                completed: newDocuments.length > 0,
                hasData: newDocuments.length > 0,
                lastUpdated: new Date(),
              },
            },
          };
        });
        get().onDocumentChange();
      },

      setHumanMimicryStyles: (styles) => {
        set((state) => ({
          humanMimicryStyles: styles,
          flowSteps: {
            ...state.flowSteps,
            'human-mimicry': {
              completed: styles.length > 0,
              hasData: styles.length > 0,
              lastUpdated: new Date(),
            },
          },
        }));
      },

      addHumanMimicryStyle: (style) => {
        set((state) => {
          const newStyles = [...state.humanMimicryStyles, style];
          return {
            humanMimicryStyles: newStyles,
            flowSteps: {
              ...state.flowSteps,
              'human-mimicry': {
                completed: newStyles.length > 0,
                hasData: newStyles.length > 0,
                lastUpdated: new Date(),
              },
            },
          };
        });
      },

      removeHumanMimicryStyle: (styleId) => {
        set((state) => {
          const newStyles = state.humanMimicryStyles.filter(style => style._id !== styleId);
          return {
            humanMimicryStyles: newStyles,
            flowSteps: {
              ...state.flowSteps,
              'human-mimicry': {
                completed: newStyles.length > 0,
                hasData: newStyles.length > 0,
                lastUpdated: new Date(),
              },
            },
          };
        });
      },

      // Flow helpers
      getCompletedSteps: () => {
        const { flowSteps } = get();
        return Object.entries(flowSteps)
          .filter(([, status]) => status.completed)
          .map(([step]) => step as FlowStep);
      },

      getNextStep: () => {
        const { flowSteps } = get();
        const flowOrder: FlowStep[] = [
          'chatbot', 'program', 'sessions', 'knowledge-base', 
          'documents', 'human-mimicry', 'prompts', 'training'
        ];
        
        return flowOrder.find(step => !flowSteps[step].completed) || null;
      },

      canAccessStep: (step) => {
        const { flowSteps } = get();
        const dependencies = stepDependencies[step];
        
        return dependencies.every(dep => flowSteps[dep].completed);
      },

      getFlowProgress: () => {
        const { flowSteps } = get();
        const totalSteps = Object.keys(flowSteps).length;
        const completedSteps = Object.values(flowSteps).filter(status => status.completed).length;
        
        return Math.round((completedSteps / totalSteps) * 100);
      },

      resetFlow: () => {
        set({
          selectedChatbot: null,
          selectedProgram: null,
          selectedSessions: [],
          selectedKnowledgeBase: null,
          currentStep: 'chatbot',
          flowSteps: initialFlowSteps,
          isCreating: false,
          currentTrainingJob: null,
          suggestRetraining: false,
          lastDocumentChange: null,
          documents: [],
          humanMimicryStyles: [],
        });
      },

      // Explicit close
      setUserExplicitlyClosed: (closed) => {
        set({ userExplicitlyClosed: closed });
      },

      userExplicitlyClosed: false,
    }),
    {
      name: 'chatbot-flow-store',
    }
  ),
  {
    name: 'chatbot-flow-store',
    storage: createJSONStorage(() => localStorage),
  }
  )
);