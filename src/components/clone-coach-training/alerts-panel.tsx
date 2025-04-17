"use client";

import { useState } from "react";
import {
  IconAlertTriangle,
  IconAlertCircle,
  IconInfoCircle,
  IconCheck,
  IconBell,
  IconCalendar,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface AlertsPanelProps {
  language: "english" | "korean";
}

// ConfigureAlertsDialog component
interface ConfigureAlertsDialogProps {
  language: "english" | "korean";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ConfigureAlertsDialog({
  language,
  open,
  onOpenChange,
}: ConfigureAlertsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {language === "english"
              ? "Configure Coach Bot Alerts"
              : "코치 봇 알림 구성"}
          </DialogTitle>
          <DialogDescription>
            {language === "english"
              ? "Define when your AI coach should trigger alerts based on user behavior patterns"
              : "사용자 행동 패턴에 따라 AI 코치가 알림을 트리거해야 하는 시기 정의"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2 max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">
              {language === "english"
                ? "User Behavior Triggers"
                : "사용자 행동 트리거"}
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconAlertCircle className="h-4 w-4 text-red-500" />
                  <div>
                    <span className="text-sm font-medium">
                      {language === "english"
                        ? "Missed Check-ins"
                        : "체크인 놓침"}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Alert if user misses scheduled check-ins"
                        : "사용자가 예정된 체크인을 놓치면 알림"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">
                    {language === "english" ? "Threshold:" : "임계값:"}
                  </span>
                  <Select defaultValue="2">
                    <SelectTrigger className="w-16 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconAlertTriangle className="h-4 w-4 text-amber-500" />
                  <div>
                    <span className="text-sm font-medium">
                      {language === "english"
                        ? "Negative Sentiment"
                        : "부정적 감정"}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Detect consistent negative tone in user messages"
                        : "사용자 메시지에서 일관된 부정적 톤 감지"}
                    </p>
                  </div>
                </div>
                <Checkbox defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconAlertTriangle className="h-4 w-4 text-amber-500" />
                  <div>
                    <span className="text-sm font-medium">
                      {language === "english"
                        ? "Goal Progress Stalling"
                        : "목표 진행 정체"}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Alert when user progress has stalled for a period"
                        : "사용자 진행이 일정 기간 동안 정체되었을 때 알림"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs">
                    {language === "english" ? "Days:" : "일:"}
                  </span>
                  <Select defaultValue="7">
                    <SelectTrigger className="w-16 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="14">14</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconInfoCircle className="h-4 w-4 text-blue-500" />
                  <div>
                    <span className="text-sm font-medium">
                      {language === "english"
                        ? "Response Time Anomalies"
                        : "응답 시간 이상"}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Alert on unusual patterns in user response times"
                        : "사용자 응답 시간의 비정상적인 패턴에 대한 알림"}
                    </p>
                  </div>
                </div>
                <Checkbox defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">
              {language === "english"
                ? "Coach Bot Performance Alerts"
                : "코치 봇 성능 알림"}
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconAlertCircle className="h-4 w-4 text-red-500" />
                  <div>
                    <span className="text-sm font-medium">
                      {language === "english"
                        ? "User Satisfaction Drop"
                        : "사용자 만족도 하락"}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Alert when user satisfaction metrics decline significantly"
                        : "사용자 만족도 지표가 크게 하락할 때 알림"}
                    </p>
                  </div>
                </div>
                <Checkbox defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconAlertTriangle className="h-4 w-4 text-amber-500" />
                  <div>
                    <span className="text-sm font-medium">
                      {language === "english"
                        ? "Knowledge Gap Detected"
                        : "지식 격차 감지"}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Alert when users ask questions the coach can't answer well"
                        : "사용자가 코치가 잘 대답할 수 없는 질문을 할 때 알림"}
                    </p>
                  </div>
                </div>
                <Checkbox defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconInfoCircle className="h-4 w-4 text-blue-500" />
                  <div>
                    <span className="text-sm font-medium">
                      {language === "english"
                        ? "Coach Model Drift"
                        : "코치 모델 드리프트"}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Alert when coach responses drift from expected pattern"
                        : "코치 응답이 예상 패턴에서 벗어날 때 알림"}
                    </p>
                  </div>
                </div>
                <Checkbox defaultChecked />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">
              {language === "english"
                ? "Alert Delivery Methods"
                : "알림 전달 방법"}
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {language === "english"
                      ? "Dashboard Notifications"
                      : "대시보드 알림"}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {language === "english" ? "Required" : "필수"}
                  </Badge>
                </div>
                <Checkbox defaultChecked disabled />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {language === "english" ? "Email Alerts" : "이메일 알림"}
                </span>
                <Checkbox defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {language === "english"
                    ? "SMS/Text Notifications"
                    : "SMS/문자 알림"}
                </span>
                <Checkbox />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {language === "english"
                    ? "Weekly Alert Digest"
                    : "주간 알림 요약"}
                </span>
                <Checkbox defaultChecked />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="mr-2"
          >
            {language === "english" ? "Cancel" : "취소"}
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            {language === "english" ? "Save Configuration" : "구성 저장"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Mock data for alerts
const mockAlerts = [
  {
    id: "alert-1",
    type: "warning",
    title: "Missed Check-ins",
    description: "Sarah Johnson has missed 3 consecutive check-ins",
    timestamp: "2024-04-17T08:30:00Z",
    resolved: false,
  },
  {
    id: "alert-2",
    type: "critical",
    title: "Negative Sentiment Detected",
    description:
      "Michael Chen's messages show concerning negative sentiment patterns",
    timestamp: "2024-04-17T09:15:00Z",
    resolved: false,
  },
  {
    id: "alert-3",
    type: "info",
    title: "New User Onboarded",
    description: "Emma Wilson has completed the onboarding process",
    timestamp: "2024-04-17T10:45:00Z",
    resolved: true,
  },
  {
    id: "alert-4",
    type: "warning",
    title: "Response Time Anomaly",
    description: "Coach response times are higher than usual (avg. 3.5 min)",
    timestamp: "2024-04-17T11:20:00Z",
    resolved: false,
  },
  {
    id: "alert-5",
    type: "info",
    title: "Training Update",
    description: "Coach model training completed with 95% accuracy",
    timestamp: "2024-04-16T14:30:00Z",
    resolved: true,
  },
];

export function AlertsPanel({ language }: AlertsPanelProps) {
  const [timeFilter, setTimeFilter] = useState<"today" | "week" | "month">(
    "today"
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "resolved"
  >("all");
  const [configureDialogOpen, setConfigureDialogOpen] = useState(false);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString(
      language === "english" ? "en-US" : "ko-KR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if the date is today
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return language === "english" ? "Today" : "오늘";
    }

    // Check if the date is yesterday
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return language === "english" ? "Yesterday" : "어제";
    }

    // Otherwise, return the formatted date
    return date.toLocaleDateString(language === "english" ? "en-US" : "ko-KR", {
      month: "short",
      day: "numeric",
    });
  };

  // Filter alerts based on time and status
  const filteredAlerts = mockAlerts.filter((alert) => {
    const alertDate = new Date(alert.timestamp);
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setDate(today.getDate() - 30);

    // Time filter
    const passesTimeFilter =
      (timeFilter === "today" &&
        alertDate.toDateString() === today.toDateString()) ||
      (timeFilter === "week" && alertDate >= weekAgo) ||
      (timeFilter === "month" && alertDate >= monthAgo);

    // Status filter
    const passesStatusFilter =
      statusFilter === "all" ||
      (statusFilter === "active" && !alert.resolved) ||
      (statusFilter === "resolved" && alert.resolved);

    return passesTimeFilter && passesStatusFilter;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <IconAlertCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <IconAlertTriangle className="h-5 w-5 text-amber-500" />;
      case "info":
        return <IconInfoCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <IconInfoCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertTypeText = (type: string) => {
    switch (type) {
      case "critical":
        return language === "english" ? "Critical" : "심각";
      case "warning":
        return language === "english" ? "Warning" : "경고";
      case "info":
        return language === "english" ? "Info" : "정보";
      default:
        return language === "english" ? "Info" : "정보";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center gap-1.5">
          <IconBell className="h-4 w-4" />
          {language === "english" ? "Alerts & Notifications" : "알림 및 통지"}
        </h3>
        <div className="flex gap-2">
          <Select
            value={timeFilter}
            onValueChange={(value) =>
              setTimeFilter(value as "today" | "week" | "month")
            }
          >
            <SelectTrigger className="h-8 text-xs w-[100px]">
              <IconCalendar className="h-3.5 w-3.5 mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">
                {language === "english" ? "Today" : "오늘"}
              </SelectItem>
              <SelectItem value="week">
                {language === "english" ? "Week" : "주간"}
              </SelectItem>
              <SelectItem value="month">
                {language === "english" ? "Month" : "월간"}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value as "all" | "active" | "resolved")
            }
          >
            <SelectTrigger className="h-8 text-xs w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === "english" ? "All" : "전체"}
              </SelectItem>
              <SelectItem value="active">
                {language === "english" ? "Active" : "활성"}
              </SelectItem>
              <SelectItem value="resolved">
                {language === "english" ? "Resolved" : "해결됨"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            {language === "english"
              ? "No alerts found for the selected filters."
              : "선택한 필터에 대한 알림을 찾을 수 없습니다."}
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-md p-3 ${
                alert.resolved ? "bg-muted/30" : "bg-white"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">{alert.title}</h4>
                      <Badge
                        variant={
                          alert.type === "critical"
                            ? "destructive"
                            : alert.type === "warning"
                            ? "default"
                            : "secondary"
                        }
                        className="text-[10px] px-1 py-0 h-4"
                      >
                        {getAlertTypeText(alert.type)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-xs text-muted-foreground">
                    {formatDate(alert.timestamp)} {formatTime(alert.timestamp)}
                  </div>
                  {alert.resolved ? (
                    <Badge variant="outline" className="text-xs bg-muted">
                      <IconCheck className="h-3 w-3 mr-1 text-green-500" />
                      {language === "english" ? "Resolved" : "해결됨"}
                    </Badge>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs px-2"
                          >
                            {language === "english" ? "Resolve" : "해결"}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p className="text-xs">
                            {language === "english"
                              ? "Mark this alert as resolved"
                              : "이 알림을 해결됨으로 표시"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Separator />

      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="font-medium">
            {filteredAlerts.filter((a) => !a.resolved).length}
          </span>{" "}
          {language === "english" ? "active alerts" : "활성 알림"}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfigureDialogOpen(true)}
        >
          {language === "english" ? "Configure Alerts" : "알림 구성"}
        </Button>
      </div>

      {/* Configure Alerts Dialog */}
      <ConfigureAlertsDialog
        language={language}
        open={configureDialogOpen}
        onOpenChange={setConfigureDialogOpen}
      />
    </div>
  );
}
