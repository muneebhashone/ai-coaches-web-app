"use client";

import { useState, useEffect } from "react";
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
  History
} from "lucide-react";
import { useChatbotFlowStore } from "@/stores/useChatbotFlowStore";
import { 
  useStartTraining, 
  useCancelTraining, 
  useTrainingJob 
} from "@/services/training/training.hooks";
import type { ITrainingJob } from "@/services/training/training.types";

interface TrainingCenterPanelProps {
  className?: string;
}

export function TrainingCenterPanel({ className = "" }: TrainingCenterPanelProps) {
  // const t = useTranslations("dashboard.cloneCoachTraining.training");
  const [showLogs, setShowLogs] = useState(false);

  const {
    selectedChatbot,
    documents,
    humanMimicryStyles,
    flowSteps,
    currentTrainingJob,
    suggestRetraining,
    lastDocumentChange,
    setCurrentTrainingJob,
    setSuggestRetraining,
  } = useChatbotFlowStore();

  console.log({lastDocumentChange})

  const startTrainingMutation = useStartTraining();
  const cancelTrainingMutation = useCancelTraining();

  // Poll training job status if there's an active job
  const { data: trainingJobData } = useTrainingJob(currentTrainingJob?._id || "");

  // Update current training job when polling data changes
  useEffect(() => {
    if (trainingJobData?.data) {
      setCurrentTrainingJob(trainingJobData.data);
      
      // Clear retraining suggestion when training completes
      if (trainingJobData.data.status === 'completed') {
        setSuggestRetraining(false);
      }
    }
  }, [trainingJobData, setCurrentTrainingJob, setSuggestRetraining]);

  // Calculate prerequisites
  const hasDocuments = documents.length > 0;
  const hasChatbot = !!selectedChatbot;
  const hasKnowledgeBase = flowSteps['knowledge-base'].completed;
  
  const canTrain = hasChatbot && hasDocuments && hasKnowledgeBase && 
    (!currentTrainingJob || currentTrainingJob.status === 'completed' || currentTrainingJob.status === 'failed');

  const isTraining = currentTrainingJob?.status === 'pending' || currentTrainingJob?.status === 'running';

  const handleStartTraining = async () => {
    if (!selectedChatbot || !canTrain) return;

    try {
      const result = await startTrainingMutation.mutateAsync({
        chatbotId: selectedChatbot._id
      });
      
      if (result.success && result.data) {
        setCurrentTrainingJob(result.data);
      }
    } catch (error) {
      console.error('Training start failed:', error);
    }
  };

  const handleCancelTraining = async () => {
    if (!currentTrainingJob) return;

    try {
      await cancelTrainingMutation.mutateAsync(currentTrainingJob._id);
      setCurrentTrainingJob(null);
    } catch (error) {
      console.error('Training cancellation failed:', error);
    }
  };

  const getStatusIcon = (status?: ITrainingJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'running':
        return <Zap className="h-5 w-5 text-warning animate-pulse" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Play className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusText = (status?: ITrainingJob['status']) => {
    switch (status) {
      case 'completed':
        return 'Training Completed';
      case 'failed':
        return 'Training Failed';
      case 'running':
        return 'Training in Progress';
      case 'pending':
        return 'Training Queued';
      default:
        return 'Ready to Train';
    }
  };

  const getStatusColor = (status?: ITrainingJob['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'failed':
        return 'bg-destructive text-destructive-foreground';
      case 'running':
        return 'bg-warning text-warning-foreground';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return 'Never';
    return new Date(timestamp).toLocaleString();
  };

  const getTimeSinceLastTraining = () => {
    if (!currentTrainingJob?.completedAt) return null;
    
    const completedAt = new Date(currentTrainingJob.completedAt);
    const now = new Date();
    const diffMs = now.getTime() - completedAt.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Less than an hour ago';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Training Status Header */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            Training Center
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(currentTrainingJob?.status)}
              <div>
                <p className="font-medium">{getStatusText(currentTrainingJob?.status)}</p>
                {currentTrainingJob?.completedAt && (
                  <p className="text-sm text-muted-foreground">
                    Last trained: {getTimeSinceLastTraining()}
                  </p>
                )}
              </div>
            </div>
            <Badge className={getStatusColor(currentTrainingJob?.status)}>
              {currentTrainingJob?.status || 'Not Started'}
            </Badge>
          </div>

          {/* Progress Bar for Active Training */}
          {isTraining && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Indexing documents...</span>
                <span>{currentTrainingJob?.progress || 0}%</span>
              </div>
              <Progress value={currentTrainingJob?.progress || 0} className="h-2" />
              {currentTrainingJob?.progress && currentTrainingJob.progress > 0 && (
                <p className="text-xs text-muted-foreground">
                  ETA: ~{Math.ceil((100 - currentTrainingJob.progress) / 10)} minutes
                </p>
              )}
            </div>
          )}

          {/* Error Message */}
          {currentTrainingJob?.status === 'failed' && currentTrainingJob.errorMessage && (
            <Alert className="border-destructive/50">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                Training failed: {currentTrainingJob.errorMessage}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Prerequisites Check */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Prerequisites</CardTitle>
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
                <span className="text-sm">Chatbot configured</span>
              </div>
              {hasChatbot && (
                <Badge variant="outline" className="text-xs">
                  {selectedChatbot?.name}
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
                <span className="text-sm">Knowledge base created</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {hasDocuments ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
                <span className="text-sm">Documents uploaded</span>
              </div>
              {hasDocuments && (
                <Badge variant="outline" className="text-xs">
                  {documents.length} file{documents.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {humanMimicryStyles.length > 0 ? (
                  <CheckCircle className="h-4 w-4 text-success" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                )}
                <span className="text-sm">Human mimicry styles</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {humanMimicryStyles.length > 0 ? 'Configured' : 'Optional'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Retraining Suggestion */}
      {suggestRetraining && currentTrainingJob?.status === 'completed' && (
        <Alert className="border-warning/50 bg-warning/10">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertDescription>
            Documents have been updated since last training. Retrain to apply changes.
            {lastDocumentChange && (
              <span className="block text-xs mt-1">
                Last change: {formatTimestamp(typeof lastDocumentChange === 'string' ? lastDocumentChange : lastDocumentChange.toISOString())}
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Training Actions */}
      <div className="flex gap-2">
        {!isTraining ? (
          <>
            <Button 
              onClick={handleStartTraining}
              disabled={!canTrain || startTrainingMutation.isPending}
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              {currentTrainingJob?.status === 'failed' ? 'Retry Training' : 'Start Training'}
        
            </Button>
            {currentTrainingJob && (
              <Button 
                variant="outline" 
                onClick={() => setShowLogs(!showLogs)}
              >
                <History className="h-4 w-4 mr-2" />
                Logs
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
            Cancel Training
          </Button>
        )}
      </div>

      {/* Training Logs */}
      {showLogs && currentTrainingJob && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Training Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
              {/* <div>
                <span className="text-muted-foreground">Started:</span>
                <p>{formatTimestamp(currentTrainingJob.startedAt)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Completed:</span>
                <p>{formatTimestamp(currentTrainingJob.completedAt)}</p>
              </div> */}
              <div>
                <span className="text-muted-foreground">Status:</span>
                <p>{currentTrainingJob.status?.toUpperCase()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Progress:</span>
                <p>{currentTrainingJob.progress}%</p>
              </div>
            </div>
            {currentTrainingJob.errorMessage && (
              <div className="pt-2 border-t">
                <span className="text-muted-foreground">Error:</span>
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
              Complete the prerequisites above to enable training. Training will index all uploaded documents into the vector store for semantic search.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}