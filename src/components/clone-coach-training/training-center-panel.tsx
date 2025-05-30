"use client";

import { useState } from "react";
// import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Play,
  Square,
  FileText,
  History,
} from "lucide-react";
import {
  useStartTraining,
  useCancelTraining,
  useTrainingJobs,
} from "@/services/training/training.hooks";
import type { ITrainingJob } from "@/services/training/training.types";
import { useTranslations } from "next-intl";
import { useChatbot } from "@/services/chatbots/chatbot.hooks";
import { useDocuments } from "@/services/documents/document.hooks";
import { useHumanMimicries } from "@/services/human-mimicry/human-mimicry.hooks";

interface TrainingCenterPanelProps {
  className?: string;
  chatbotId: string;
}

export function TrainingCenterPanel({
  className = "",
  chatbotId,
}: TrainingCenterPanelProps) {
  const t = useTranslations("dashboard.cloneCoachTraining.training");
  const [showLogs, setShowLogs] = useState(false);

  const { data: selectedChatbot } = useChatbot(chatbotId);
  const { data: documents } = useDocuments(
    selectedChatbot?.data.knowledgeBaseId || ""
  );
  const { data: humanMimicryStyles } = useHumanMimicries(
    selectedChatbot?.data._id || ""
  );
  const { data: trainings } = useTrainingJobs({
    chatbotId: selectedChatbot?.data._id || "",
    page: 1,
    limit: 100,
    status: "completed" as ITrainingJob["status"],
  });

  const startTrainingMutation = useStartTraining();
  const cancelTrainingMutation = useCancelTraining();

  const currentTrainingJob = trainings?.data.results?.[0];

  // Calculate prerequisites
  const hasDocuments = (documents?.data.results?.length || 0) > 0;
  const hasChatbot = !!selectedChatbot;
  const hasKnowledgeBase = !!selectedChatbot?.data.knowledgeBaseId;

  const canTrain =
    hasChatbot &&
    hasDocuments &&
    hasKnowledgeBase &&
    (!currentTrainingJob ||
      currentTrainingJob.status === "completed" ||
      currentTrainingJob.status === "failed");

  const isTraining =
    currentTrainingJob?.status === "pending" ||
    currentTrainingJob?.status === "running";

  const handleStartTraining = async () => {
    if (!selectedChatbot || !canTrain) return;

    try {
      await startTrainingMutation.mutateAsync({
        chatbotId: selectedChatbot.data._id,
      });
    } catch (error) {
      console.error("Training start failed:", error);
    }
  };

  const handleCancelTraining = async () => {
    if (!currentTrainingJob) return;

    try {
      await cancelTrainingMutation.mutateAsync(currentTrainingJob._id);
    } catch (error) {
      console.error("Training cancellation failed:", error);
    }
  };

  const getStatusIcon = (status?: ITrainingJob["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "running":
        return <Zap className="h-5 w-5 text-warning animate-pulse" />;
      case "pending":
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Play className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusText = (status?: ITrainingJob["status"]) => {
    switch (status) {
      case "completed":
        return t("status.completed");
      case "failed":
        return t("status.failed");
      case "running":
        return t("status.running");
      case "pending":
        return t("status.pending");
      default:
        return t("status.notStarted");
    }
  };

  const getStatusColor = (status?: ITrainingJob["status"]) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "failed":
        return "bg-destructive text-destructive-foreground";
      case "running":
        return "bg-warning text-warning-foreground";
      case "pending":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getTimeSinceLastTraining = () => {
    if (!currentTrainingJob?.completedAt) return null;

    const completedAt = new Date(currentTrainingJob.completedAt);
    const now = new Date();
    const diffMs = now.getTime() - completedAt.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return t("time.daysAgo", { count: diffDays });
    if (diffHours > 0) return t("time.hoursAgo", { count: diffHours });
    return t("time.lessThanHour");
  };

  return (
    <div className={`space-y-4 ${className}`} id="training-center-panel">
      {/* Training Status Header */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(currentTrainingJob?.status)}
              <div>
                <p className="font-medium">
                  {getStatusText(currentTrainingJob?.status)}
                </p>
                {currentTrainingJob?.completedAt && (
                  <p className="text-sm text-muted-foreground">
                    {t("progress.lastTrained", {
                      time: getTimeSinceLastTraining() || "",
                    })}
                  </p>
                )}
              </div>
            </div>
            <Badge className={getStatusColor(currentTrainingJob?.status)}>
              {currentTrainingJob?.status || "Not Started"}
            </Badge>
          </div>

          {/* Progress Bar for Active Training */}
          {isTraining && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{t("progress.indexingDocuments")}</span>
                <span>{currentTrainingJob?.progress || 0}%</span>
              </div>
              <Progress
                value={currentTrainingJob?.progress || 0}
                className="h-2"
              />
              {currentTrainingJob?.progress &&
                currentTrainingJob.progress > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {t("progress.eta", {
                      minutes: Math.ceil(
                        (100 - currentTrainingJob.progress) / 10
                      ),
                    })}
                  </p>
                )}
            </div>
          )}

          {/* Error Message */}
          {currentTrainingJob?.status === "failed" &&
            currentTrainingJob.errorMessage && (
              <Alert className="border-destructive/50">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  {t("messages.trainingFailed", {
                    error: currentTrainingJob.errorMessage,
                  })}
                </AlertDescription>
              </Alert>
            )}
        </CardContent>
      </Card>

      {/* Prerequisites Check */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            {t("prerequisites.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {hasChatbot ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                <span className="text-sm">
                  {t("prerequisites.chatbotConfigured")}
                </span>
              </div>
              {hasChatbot && (
                <Badge variant="outline" className="text-xs">
                  {selectedChatbot?.data.name}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {hasKnowledgeBase ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                <span className="text-sm">
                  {t("prerequisites.knowledgeBaseCreated")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {hasDocuments ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                <span className="text-sm">
                  {t("prerequisites.documentsUploaded")}
                </span>
              </div>
              {hasDocuments && (
                <Badge variant="outline" className="text-xs">
                  {documents?.data.results?.length || 0} file
                  {documents?.data.results?.length !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {humanMimicryStyles?.data.results?.length &&
                humanMimicryStyles?.data.results?.length > 0 ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                )}
                <span className="text-sm">
                  {t("prerequisites.humanMimicryStyles")}
                </span>
              </div>
              <Badge variant="outline" className="text-xs">
                {humanMimicryStyles?.data.results?.length &&
                humanMimicryStyles?.data.results?.length > 0
                  ? t("prerequisites.configured")
                  : t("prerequisites.optional")}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {!isTraining ? (
          <>
            <Button
              onClick={handleStartTraining}
              disabled={!canTrain || startTrainingMutation.isPending}
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              {currentTrainingJob?.status === "failed"
                ? t("actions.retryTraining")
                : t("actions.startTraining")}
            </Button>
            {currentTrainingJob && (
              <Button variant="outline" onClick={() => setShowLogs(!showLogs)}>
                <History className="h-4 w-4 mr-2" />
                {t("actions.logs")}
              </Button>
            )}
          </>
        ) : (
          <Button
            variant="destructive"
            onClick={handleCancelTraining}
            disabled={cancelTrainingMutation.isPending}
            className="flex-1"
          >
            <Square className="h-4 w-4 mr-2" />
            {t("actions.cancelTraining")}
          </Button>
        )}
      </div>

      {/* Training Logs */}
      {showLogs && currentTrainingJob && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              {t("details.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">
                  {t("details.status")}
                </span>
                <p>{currentTrainingJob.status?.toUpperCase()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">
                  {t("details.progress")}
                </span>
                <p>{currentTrainingJob.progress}%</p>
              </div>
            </div>
            {currentTrainingJob.errorMessage && (
              <div className="pt-2 border-t">
                <span className="text-muted-foreground">
                  {t("details.error")}
                </span>
                <p className="text-destructive text-xs mt-1">
                  {currentTrainingJob.errorMessage}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Help Text */}
      {!canTrain && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              {t("messages.completePrerequisites")}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
