"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Calendar } from "lucide-react";

interface SessionSummaryCardProps {
  userId: string;
}

// Mock session data
const mockLastWeekSummary = `
**Human Coach Session (May 18, 2025)**
- Discussed stress management techniques
- Practiced breathing exercises
- Set weekly goals for work-life balance

**Chatbot Sessions (May 19-24, 2025)**
- 5 interactions focusing on daily check-ins
- Mood tracking: Average 7.2/10
- Progress on breathing exercises: Consistent practice
- Identified triggers: Work deadlines, family commitments
`;

export function SessionSummaryCard({ }: SessionSummaryCardProps) {
  const t = useTranslations("dashboard.userManagement.detail");
  const [selectedPeriod, setSelectedPeriod] = useState("last-week");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          Session Summaries
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Last Week Summary */}
        <div>
          <h4 className="font-medium mb-2">{t("lastWeekSummary")}</h4>
          <div className="bg-muted/50 rounded-md p-3 text-sm">
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {mockLastWeekSummary.trim()}
            </pre>
          </div>
        </div>

        {/* Overall Session Summaries */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">{t("overallSummaries")}</h4>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Select Period
              </label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Generate Report
            </Button>

            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Session Summary
            </Button>
          </div>
        </div>

        {/* Report Preview */}
        <div className="bg-muted/30 rounded-md p-3 text-sm">
          <p className="font-medium mb-2">Quick Insights:</p>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Goal achievement: 68% (↑12% from last period)</li>
            <li>• Session engagement: High consistency</li>
            <li>• Key focus areas: Stress management, sleep quality</li>
            <li>• Coach recommendation: Continue current approach</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}