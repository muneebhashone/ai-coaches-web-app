"use client";

import { useState } from "react";
import {
  IconCalendar,
  IconClock,
  IconRefresh,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface ScheduledSession {
  id: string;
  date: string;
  title: string;
}

interface ChatbotSchedule {
  time: string;
  days: string[];
  enabled: boolean;
}

interface SessionSchedulerPanelProps {
  language: "english" | "korean";
  timezone: string;
  chatbotSchedule: ChatbotSchedule;
  upcomingSessions: ScheduledSession[];
  onChatbotScheduleChange: (schedule: ChatbotSchedule) => void;
  onAddHumanSession: (session: ScheduledSession) => void;
  onRemoveHumanSession: (sessionId: string) => void;
}

export function SessionSchedulerPanel({
  language,
  timezone,
  chatbotSchedule,
  upcomingSessions,
  onChatbotScheduleChange,
  onAddHumanSession,
  onRemoveHumanSession,
}: SessionSchedulerPanelProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState("15:00");
  const [sessionTitle, setSessionTitle] = useState("");
  const [newSession, setNewSession] = useState<boolean>(false);

  // Days of the week
  const daysOfWeek = [
    { value: "Monday", label: language === "english" ? "Monday" : "월요일" },
    { value: "Tuesday", label: language === "english" ? "Tuesday" : "화요일" },
    {
      value: "Wednesday",
      label: language === "english" ? "Wednesday" : "수요일",
    },
    {
      value: "Thursday",
      label: language === "english" ? "Thursday" : "목요일",
    },
    { value: "Friday", label: language === "english" ? "Friday" : "금요일" },
    {
      value: "Saturday",
      label: language === "english" ? "Saturday" : "토요일",
    },
    { value: "Sunday", label: language === "english" ? "Sunday" : "일요일" },
  ];

  // Handle chatbot schedule changes
  const handleDayToggle = (day: string) => {
    const updatedDays = chatbotSchedule.days.includes(day)
      ? chatbotSchedule.days.filter((d) => d !== day)
      : [...chatbotSchedule.days, day];

    onChatbotScheduleChange({
      ...chatbotSchedule,
      days: updatedDays,
    });
  };

  const handleTimeChange = (time: string) => {
    onChatbotScheduleChange({
      ...chatbotSchedule,
      time,
    });
  };

  const handleEnabledChange = (enabled: boolean) => {
    onChatbotScheduleChange({
      ...chatbotSchedule,
      enabled,
    });
  };

  // Handle human session scheduling
  const handleAddSession = () => {
    if (selectedDate && sessionTitle) {
      const newSessionData: ScheduledSession = {
        id: `session-${Date.now()}`,
        date: `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}:00`,
        title: sessionTitle,
      };
      onAddHumanSession(newSessionData);
      setSessionTitle("");
      setNewSession(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === "english" ? "Session Scheduling" : "세션 일정"}
        </CardTitle>
        <CardDescription>
          {language === "english"
            ? "Schedule chatbot check-ins and human coaching sessions"
            : "챗봇 체크인 및 인간 코칭 세션 일정 관리"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chatbot">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chatbot">
              {language === "english" ? "Chatbot Sessions" : "챗봇 세션"}
            </TabsTrigger>
            <TabsTrigger value="human">
              {language === "english" ? "Human Coaching" : "인간 코칭"}
            </TabsTrigger>
          </TabsList>

          {/* Chatbot Sessions Tab */}
          <TabsContent value="chatbot" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={chatbotSchedule.enabled}
                  onCheckedChange={handleEnabledChange}
                  id="chatbot-enabled"
                />
                <Label htmlFor="chatbot-enabled">
                  {language === "english"
                    ? "Enable daily check-ins"
                    : "일일 체크인 활성화"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <IconClock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {language === "english" ? "Timezone" : "시간대"}: {timezone}
                </span>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="check-in-time">
                  {language === "english" ? "Check-in Time" : "체크인 시간"}
                </Label>
                <Select
                  value={chatbotSchedule.time}
                  onValueChange={handleTimeChange}
                  disabled={!chatbotSchedule.enabled}
                >
                  <SelectTrigger id="check-in-time" className="w-full">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, hour) => {
                      const timeValue = `${hour
                        .toString()
                        .padStart(2, "0")}:00`;
                      return (
                        <SelectItem
                          key={`checkin-hour-${timeValue}`}
                          value={timeValue}
                        >
                          {timeValue}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  {language === "english" ? "Check-in Days" : "체크인 요일"}
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`day-${day.value}`}
                        checked={chatbotSchedule.days.includes(day.value)}
                        onCheckedChange={() => handleDayToggle(day.value)}
                        disabled={!chatbotSchedule.enabled}
                      />
                      <Label htmlFor={`day-${day.value}`}>{day.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  disabled={!chatbotSchedule.enabled}
                >
                  <IconRefresh className="h-4 w-4" />
                  {language === "english"
                    ? "Retry Failed"
                    : "실패한 항목 재시도"}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  disabled={!chatbotSchedule.enabled}
                >
                  {language === "english" ? "Save Schedule" : "일정 저장"}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Human Coaching Tab */}
          <TabsContent value="human" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>
                  {language === "english" ? "Upcoming Sessions" : "예정된 세션"}
                </Label>
                <Popover
                  open={newSession}
                  onOpenChange={(open: boolean) => setNewSession(open)}
                >
                  <PopoverTrigger asChild>
                    <Button size="sm" className="flex items-center gap-1">
                      <IconPlus className="h-4 w-4" />
                      {language === "english" ? "Add Session" : "세션 추가"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">
                        {language === "english"
                          ? "Schedule New Session"
                          : "새 세션 예약"}
                      </h4>
                      <div className="space-y-2">
                        <Label htmlFor="session-title">
                          {language === "english"
                            ? "Session Title"
                            : "세션 제목"}
                        </Label>
                        <Input
                          id="session-title"
                          value={sessionTitle}
                          onChange={(e) => setSessionTitle(e.target.value)}
                          placeholder={
                            language === "english"
                              ? "Enter session title"
                              : "세션 제목 입력"
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>
                          {language === "english" ? "Date" : "날짜"}
                        </Label>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="border rounded-md p-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="session-time">
                          {language === "english" ? "Time" : "시간"}
                        </Label>
                        <Select
                          value={selectedTime}
                          onValueChange={setSelectedTime}
                        >
                          <SelectTrigger id="session-time">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }).map((_, hour) => {
                              const timeValue = `${hour
                                .toString()
                                .padStart(2, "0")}:00`;
                              return (
                                <SelectItem
                                  key={`session-time-${timeValue}`}
                                  value={timeValue}
                                >
                                  {timeValue}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNewSession(false)}
                        >
                          {language === "english" ? "Cancel" : "취소"}
                        </Button>
                        <Button size="sm" onClick={handleAddSession}>
                          {language === "english" ? "Add" : "추가"}
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {upcomingSessions.length > 0 ? (
                <div className="space-y-2">
                  {upcomingSessions.map((session) => {
                    const sessionDate = new Date(session.date);
                    return (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-3 border rounded-md"
                      >
                        <div className="space-y-1">
                          <div className="font-medium">{session.title}</div>
                          <div className="flex items-center gap-2">
                            <IconCalendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {format(sessionDate, "PPP")}
                            </span>
                            <IconClock className="h-4 w-4 text-muted-foreground ml-2" />
                            <span className="text-sm text-muted-foreground">
                              {format(sessionDate, "p")}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveHumanSession(session.id)}
                        >
                          <IconTrash className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {language === "english"
                    ? "No upcoming sessions scheduled"
                    : "예정된 세션이 없습니다"}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
