"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Upload } from "lucide-react";

interface ScheduleInfoCardProps {
  userId: string;
}

// Mock schedule data
const mockSchedule = {
  plannedTotalSessions: 12,
  currentSession: 3,
  totalWeeks: 12,
  dateScheduled: "2025.May.25 13:00",
  cloneCoachSchedule: "Mon-Sun (9:00 PM)",
};

export function ScheduleInfoCard({ }: ScheduleInfoCardProps) {
  const t = useTranslations("dashboard.userManagement.detail");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-primary" />
          {t("scheduleInfo")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <Label className="text-muted-foreground">
              {t("plannedTotalSessions")}
            </Label>
            <p className="font-medium">
              {mockSchedule.plannedTotalSessions} weeks
            </p>
          </div>
          <div>
            <Label className="text-muted-foreground">
              {t("currentSession")}
            </Label>
            <p className="font-medium">
              {mockSchedule.currentSession}/{mockSchedule.totalWeeks}
            </p>
          </div>
        </div>

        <div>
          <Label className="text-muted-foreground">
            {t("dateScheduled")}
          </Label>
          <p className="font-medium flex items-center mt-1">
            <Clock className="h-4 w-4 mr-1" />
            {mockSchedule.dateScheduled}
          </p>
        </div>

        <div>
          <Label className="text-muted-foreground">
            {t("cloneCoachSchedule")}
          </Label>
          <p className="font-medium">{mockSchedule.cloneCoachSchedule}</p>
        </div>

        <div className="border-t pt-4">
          <Label className="text-sm font-medium mb-2 block">
            {t("uploadSessionAudio")}
          </Label>
          <div className="space-y-2">
            <Input type="file" accept="audio/*" className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
            <Button size="sm" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Audio File
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}