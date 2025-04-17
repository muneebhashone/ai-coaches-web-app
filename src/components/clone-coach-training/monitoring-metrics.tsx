"use client";

import { useState } from "react";
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconInfoCircle,
  IconCalendar,
} from "@tabler/icons-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DetailedAnalysis } from "@/components/dashboard/detailed-analysis";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MonitoringMetricsProps {
  language: "english" | "korean";
  trainingStatus: {
    status: "training" | "ready" | "error";
    lastUpdated: string;
    metrics: {
      accuracy: {
        name: string;
        value: number;
        change: number;
        target: number;
      };
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

// Mock data for metrics
const mockMetrics = {
  checkInRate: {
    value: 85,
    change: 3.2,
    target: 95,
  },
  responseTime: {
    value: 2.4, // in minutes
    change: -0.5,
    target: 2.0,
  },
  sentimentScore: {
    value: 78,
    change: 5.7,
    target: 85,
  },
};

export function MonitoringMetrics({
  language,
  trainingStatus,
  userActivityData,
  userData,
}: MonitoringMetricsProps) {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("week");
  const [open, setOpen] = useState(false);
  const getTimeRangeText = () => {
    switch (timeRange) {
      case "day":
        return language === "english" ? "Last 24 hours" : "최근 24시간";
      case "week":
        return language === "english" ? "Last 7 days" : "최근 7일";
      case "month":
        return language === "english" ? "Last 30 days" : "최근 30일";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">
          {language === "english" ? "Performance Metrics" : "성능 지표"}
        </h3>
        <Select
          value={timeRange}
          onValueChange={(value) =>
            setTimeRange(value as "day" | "week" | "month")
          }
        >
          <SelectTrigger className="w-[130px] h-8 text-xs">
            <IconCalendar className="h-3.5 w-3.5 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">
              {language === "english" ? "Last 24 hours" : "최근 24시간"}
            </SelectItem>
            <SelectItem value="week">
              {language === "english" ? "Last 7 days" : "최근 7일"}
            </SelectItem>
            <SelectItem value="month">
              {language === "english" ? "Last 30 days" : "최근 30일"}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-xs text-muted-foreground mb-4">
        {getTimeRangeText()}
      </div>

      {/* Check-in Success Rate */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium">
              {language === "english"
                ? "Check-in Success Rate"
                : "체크인 성공률"}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                    <IconInfoCircle className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[200px]">
                    {language === "english"
                      ? "Percentage of users who successfully completed their scheduled check-ins."
                      : "예약된 체크인을 성공적으로 완료한 사용자의 비율입니다."}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              {mockMetrics.checkInRate.value}%
            </span>
            <span
              className={`flex items-center text-xs ${
                mockMetrics.checkInRate.change >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {mockMetrics.checkInRate.change >= 0 ? (
                <IconArrowUpRight className="h-3 w-3 mr-0.5" />
              ) : (
                <IconArrowDownRight className="h-3 w-3 mr-0.5" />
              )}
              {Math.abs(mockMetrics.checkInRate.change)}%
            </span>
          </div>
        </div>
        <Progress
          value={
            (mockMetrics.checkInRate.value / mockMetrics.checkInRate.target) *
            100
          }
          className="h-1.5"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>
            {language === "english" ? "Target" : "목표"}:{" "}
            {mockMetrics.checkInRate.target}%
          </span>
          <span>100%</span>
        </div>
      </div>

      {/* Average Response Time */}
      <div className="space-y-2 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium">
              {language === "english" ? "Avg. Response Time" : "평균 응답 시간"}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                    <IconInfoCircle className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[200px]">
                    {language === "english"
                      ? "Average time it takes for the coach to respond to user messages."
                      : "코치가 사용자 메시지에 응답하는 데 걸리는 평균 시간입니다."}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              {mockMetrics.responseTime.value}{" "}
              {language === "english" ? "min" : "분"}
            </span>
            <span
              className={`flex items-center text-xs ${
                mockMetrics.responseTime.change <= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {mockMetrics.responseTime.change <= 0 ? (
                <IconArrowDownRight className="h-3 w-3 mr-0.5" />
              ) : (
                <IconArrowUpRight className="h-3 w-3 mr-0.5" />
              )}
              {Math.abs(mockMetrics.responseTime.change)}{" "}
              {language === "english" ? "min" : "분"}
            </span>
          </div>
        </div>
        <Progress
          value={
            ((mockMetrics.responseTime.target * 2 -
              mockMetrics.responseTime.value) /
              (mockMetrics.responseTime.target * 2)) *
            100
          }
          className="h-1.5"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0 {language === "english" ? "min" : "분"}</span>
          <span>
            {language === "english" ? "Target" : "목표"}:{" "}
            {mockMetrics.responseTime.target}{" "}
            {language === "english" ? "min" : "분"}
          </span>
          <span>
            {mockMetrics.responseTime.target * 2}{" "}
            {language === "english" ? "min" : "분"}
          </span>
        </div>
      </div>

      {/* Sentiment Trends */}
      <div className="space-y-2 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium">
              {language === "english" ? "Sentiment Score" : "감정 점수"}
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                    <IconInfoCircle className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[200px]">
                    {language === "english"
                      ? "Average sentiment score of user messages, indicating overall user satisfaction."
                      : "사용자 메시지의 평균 감정 점수로, 전반적인 사용자 만족도를 나타냅니다."}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">
              {mockMetrics.sentimentScore.value}
            </span>
            <span
              className={`flex items-center text-xs ${
                mockMetrics.sentimentScore.change >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {mockMetrics.sentimentScore.change >= 0 ? (
                <IconArrowUpRight className="h-3 w-3 mr-0.5" />
              ) : (
                <IconArrowDownRight className="h-3 w-3 mr-0.5" />
              )}
              {Math.abs(mockMetrics.sentimentScore.change)}
            </span>
          </div>
        </div>
        <Progress
          value={
            (mockMetrics.sentimentScore.value /
              mockMetrics.sentimentScore.target) *
            100
          }
          className="h-1.5"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>
            {language === "english" ? "Target" : "목표"}:{" "}
            {mockMetrics.sentimentScore.target}
          </span>
          <span>100</span>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="w-full mt-4">
            {language === "english"
              ? "View Detailed Analytics"
              : "상세 분석 보기"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[825px] max-h-[70vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detailed Analysis</DialogTitle>
            <DialogDescription>
              Comprehensive insights into chatbot performance and user activity.
            </DialogDescription>
          </DialogHeader>
          <DetailedAnalysis
            language={language}
            trainingStatus={trainingStatus}
            userActivityData={userActivityData}
            userData={userData}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
