"use client";

import { TrainingStatusDashboard } from "@/components/chatbot/training-status-dashboard";
import { UserActivityChart } from "@/components/dashboard/user-activity-chart";
import { UserInsightsTable } from "@/components/dashboard/user-insights-table";

interface DetailedAnalysisProps {
  language: "english" | "korean";
  trainingStatus: {
    status: "training" | "ready" | "error";
    lastUpdated: string;
    metrics: {
      accuracy: { name: string; value: number; change: number; target: number };
      responseTime: {
        name: string;
        value: number;
        change: number;
        target: number;
      };
      consistency: {
        name: string;
        value: number;
        change: number;
        target: number;
      };
    };
    activeKnowledgeBase: {
      id: string;
      name: string;
      type: string;
      active: boolean;
      lastUpdated: string;
    }[];
    chatbotTone: {
      name: string;
      description: {
        english: string;
        korean: string;
      };
      active: boolean;
    };
  };
  userActivityData: {
    week: string;
    sessionCount: number;
    goalProgress: number;
  }[];
  userData: {
    id: number;
    name: string;
    age: number;
    occupation: string;
    sessions: number;
    goalProgress: number;
    status: string;
  }[];
}

export function DetailedAnalysis({
  language,
  trainingStatus,
  userActivityData,
  userData,
}: DetailedAnalysisProps) {
  return (
    <div className="space-y-6">
      <TrainingStatusDashboard status={trainingStatus} language={language} />
      <UserActivityChart data={userActivityData} language={language} />
      <UserInsightsTable userData={userData} language={language} />
    </div>
  );
}
