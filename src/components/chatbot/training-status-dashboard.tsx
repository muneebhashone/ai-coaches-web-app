"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IconBook, IconMessageCircle, IconCheck } from "@tabler/icons-react";

interface TrainingMetric {
  name: string;
  value: number;
  change: number;
  target: number;
}

interface KnowledgeBaseItem {
  id: string;
  name: string;
  type: string;
  active: boolean;
  lastUpdated: string;
}

interface ChatbotTone {
  name: string;
  description: {
    english: string;
    korean: string;
  };
  active: boolean;
}

interface TrainingStatus {
  status: "training" | "ready" | "error";
  lastUpdated: string;
  metrics: {
    accuracy: TrainingMetric;
    responseTime: TrainingMetric;
    consistency: TrainingMetric;
  };
  activeKnowledgeBase: KnowledgeBaseItem[];
  chatbotTone: ChatbotTone;
}

interface TrainingStatusDashboardProps {
  status: TrainingStatus;
  language: "english" | "korean";
}

const getStatusColor = (status: TrainingStatus["status"]) => {
  switch (status) {
    case "training":
      return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20";
    case "ready":
      return "bg-green-500/20 text-green-500 hover:bg-green-500/20";
    case "error":
      return "bg-red-500/20 text-red-500 hover:bg-red-500/20";
    default:
      return "";
  }
};

const getStatusText = (
  status: TrainingStatus["status"],
  language: "english" | "korean"
) => {
  switch (status) {
    case "training":
      return language === "english" ? "Training in Progress" : "학습 진행 중";
    case "ready":
      return language === "english" ? "Ready" : "준비 완료";
    case "error":
      return language === "english" ? "Error" : "오류";
    default:
      return "";
  }
};

export function TrainingStatusDashboard({
  status,
  language,
}: TrainingStatusDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {language === "english" ? "Training Status" : "학습 상태"}
        </h2>
        <Badge className={getStatusColor(status.status)}>
          {getStatusText(status.status, language)}
        </Badge>
      </div>

      <div className="text-sm text-muted-foreground">
        {language === "english" ? "Last updated: " : "마지막 업데이트: "}
        {status.lastUpdated}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Accuracy Metric */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {language === "english" ? "Accuracy" : "정확도"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  {status.metrics.accuracy.value}%
                </span>
                <span
                  className={
                    status.metrics.accuracy.change >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {status.metrics.accuracy.change > 0 ? "+" : ""}
                  {status.metrics.accuracy.change}%
                </span>
              </div>
              <Progress
                value={
                  (status.metrics.accuracy.value /
                    status.metrics.accuracy.target) *
                  100
                }
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                {language === "english" ? "Target: " : "목표: "}
                {status.metrics.accuracy.target}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Time Metric */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {language === "english" ? "Response Time" : "응답 시간"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  {status.metrics.responseTime.value}ms
                </span>
                <span
                  className={
                    status.metrics.responseTime.change <= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {status.metrics.responseTime.change > 0 ? "+" : ""}
                  {status.metrics.responseTime.change}ms
                </span>
              </div>
              <Progress
                value={
                  ((status.metrics.responseTime.target -
                    status.metrics.responseTime.value) /
                    status.metrics.responseTime.target) *
                  100
                }
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                {language === "english" ? "Target: " : "목표: "}
                {status.metrics.responseTime.target}ms
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consistency Metric */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {language === "english" ? "Consistency" : "일관성"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  {status.metrics.consistency.value}%
                </span>
                <span
                  className={
                    status.metrics.consistency.change >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {status.metrics.consistency.change > 0 ? "+" : ""}
                  {status.metrics.consistency.change}%
                </span>
              </div>
              <Progress
                value={
                  (status.metrics.consistency.value /
                    status.metrics.consistency.target) *
                  100
                }
                className="h-2"
              />
              <div className="text-xs text-muted-foreground">
                {language === "english" ? "Target: " : "목표: "}
                {status.metrics.consistency.target}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6" />

      {/* Knowledge Base Materials Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <IconBook className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">
            {language === "english"
              ? "Active Knowledge Base Materials"
              : "활성 지식 베이스 자료"}
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {status.activeKnowledgeBase.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.type}</p>
                  </div>
                  {item.active && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-600"
                    >
                      <IconCheck className="h-3 w-3 mr-1" />
                      {language === "english" ? "Active" : "활성"}
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {language === "english"
                    ? "Last updated: "
                    : "마지막 업데이트: "}
                  {item.lastUpdated}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Chatbot Tone Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <IconMessageCircle className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">
            {language === "english" ? "Chatbot Tone" : "챗봇 톤"}
          </h3>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{status.chatbotTone.name}</CardTitle>
              {status.chatbotTone.active && (
                <Badge variant="outline" className="bg-green-50 text-green-600">
                  <IconCheck className="h-3 w-3 mr-1" />
                  {language === "english" ? "Active" : "활성"}
                </Badge>
              )}
            </div>
            <CardDescription>
              {status.chatbotTone.description[language]}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
