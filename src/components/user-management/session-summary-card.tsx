"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Calendar, Loader2, Info, AlertTriangle } from "lucide-react";
import { useGetChats } from "@/services/chats/chats.hooks";
import type { IChat } from "@/services/chats/chats.types";
import { useGetAudioTranscriptions } from "@/services/audio-transcribe/audio-transcribe.hooks";
import type { IAudioTranscription } from "@/services/audio-transcribe/audio-transcribe.types";

interface SessionSummaryCardProps {
  userId: string; // This is the clientId for GetChatsQuerySchema
}

// Helper to calculate date ranges (simplified)
const getDateRange = (period: string) => {
  const endDate = new Date();
  let startDate = new Date();
  switch (period) {
    case "last-week":
      startDate.setDate(endDate.getDate() - 7);
      break;
    case "last-month":
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case "last-quarter":
      startDate.setMonth(endDate.getMonth() - 3);
      break;
    case "all-time":
      startDate = new Date(0); // Beginning of time
      break;
  }
  return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
};


export function SessionSummaryCard({ userId }: SessionSummaryCardProps) {
  const t = useTranslations("dashboard.userManagement.detail.sessionSummaryCard");
  const tCommon = useTranslations("common");

  const [selectedPeriod, setSelectedPeriod] = useState("last-week");
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);

  const dateRange = useMemo(() => getDateRange(selectedPeriod), [selectedPeriod]);

  // Fetch chat data
  // COMMENT: `useGetChats` filter by `clientId` is used.
  // Date range filtering in the API is assumed not to exist yet, so it's done client-side or not at all.
  const { 
    data: chatDataPages, 
    isLoading: isLoadingChats,
    isError: isErrorChats,
  } = useGetChats(
    { clientId: userId /*, dateFrom: dateRange.startDate, dateTo: dateRange.endDate */ }, 
    { 
      // Assuming API doesn't support date range, so fetch all and filter client-side (inefficient)
      // or simply show all for the user for now.
      // For this example, we'll just use all chats for the client due to API limitations.
    }
  );
  const chats: IChat[] = useMemo(() => 
    chatDataPages?.pages.flatMap(page => page.data.data) || [], 
  [chatDataPages]);

  // Fetch audio transcriptions
  // COMMENT: `useGetAudioTranscriptions` does not have a `userId` filter in its schema.
  // This means it would fetch all transcriptions. This is a major limitation.
  // For demonstration, we'll fetch all and then filter client-side if `item.userId === userId`.
  // This is highly inefficient and a proper API filter is needed.
  const { 
    data: transcriptionDataPages, 
    isLoading: isLoadingTranscriptions,
    isError: isErrorTranscriptions,
  } = useGetAudioTranscriptions(
    { /* No userId filter available */ },
    {
      // This query will run and fetch all transcriptions.
      // We will then have to filter them client-side.
    }
  );
  const transcriptions: IAudioTranscription[] = useMemo(() => 
    (transcriptionDataPages?.pages.flatMap(page => page.data.data) || [])
    .filter(item => item.userId === userId), // Client-side filter
  [transcriptionDataPages, userId]);


  const handleGenerateReport = () => {
    // COMMENT: This is a simplified summary generation.
    // A real implementation might involve more complex data processing or a dedicated backend summary API.
    toast.info(t("generateReportProgress"));
    let summary = `**${t("summaryForPeriodTitle", { period: t(`periods.${selectedPeriod}`) })}**\n\n`;
    summary += `**${t("chatSessionsTitle")} (${chats.length})**\n`;
    if (chats.length > 0) {
      chats.forEach(chat => {
        summary += `- ${t("chatEntry", { date: new Date(chat.createdAt).toLocaleDateString(), count: chat.messageCount })}\n`;
      });
    } else {
      summary += `- ${t("noChatSessions")}\n`;
    }
    summary += `\n**${t("audioTranscriptionsTitle")} (${transcriptions.length})**\n`;
    if (transcriptions.length > 0) {
      transcriptions.forEach(trans => {
        summary += `- ${t("transcriptionEntry", { date: new Date(trans.createdAt).toLocaleDateString(), duration: trans.duration || 0 })}\n`;
      });
    } else {
      summary += `- ${t("noAudioTranscriptions")}\n`;
    }
    setGeneratedSummary(summary);
    toast.success(t("generateReportSuccess"));
  };

  const isLoading = isLoadingChats || isLoadingTranscriptions;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          {t("cardTitle")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Disclaimer about data fetching limitations */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md text-amber-700/90">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 mt-0.5" />
            <div>
              <h5 className="text-xs font-semibold">{t("dataLimitationsTitle")}</h5>
              <ul className="list-disc list-inside text-xs">
                <li>{t("chatDateFilterNote")}</li>
                <li>{t("transcriptionUserFilterNote")}</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Summary Display */}
        {generatedSummary ? (
          <div>
            <h4 className="font-medium mb-2">{t("generatedSummaryTitle")}</h4>
            <div className="bg-muted/50 rounded-md p-3 text-sm max-h-60 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm">
                {generatedSummary.trim()}
              </pre>
            </div>
          </div>
        ) : (
           <div className="text-center text-muted-foreground py-4">
                <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{t("noSummaryGeneratedYet")}</p>
           </div>
        )}


        {/* Controls */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">{t("controlsTitle")}</h4>
          <div className="space-y-3">
            <div>
              <Label htmlFor="summaryPeriodSelect" className="text-sm text-muted-foreground mb-1 block">
                {t("selectPeriodLabel")}
              </Label>
              <Select 
                value={selectedPeriod} 
                onValueChange={setSelectedPeriod}
                disabled={isLoading}
              >
                <SelectTrigger id="summaryPeriodSelect">
                  <SelectValue placeholder={t("selectPeriodPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-week">{t("periods.last-week")}</SelectItem>
                  <SelectItem value="last-month">{t("periods.last-month")}</SelectItem>
                  <SelectItem value="last-quarter">{t("periods.last-quarter")}</SelectItem>
                  <SelectItem value="all-time">{t("periods.all-time")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerateReport} className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Calendar className="h-4 w-4 mr-2" />}
              {t("generateReportButton")}
            </Button>

            <Button variant="outline" className="w-full" disabled> {/* Placeholder for download */}
              <Download className="h-4 w-4 mr-2" />
              {t("downloadSummaryButton")}
            </Button>
          </div>
        </div>

        {/* Mock "Quick Insights" - this would ideally come from a more sophisticated summary API */}
        <div className="bg-muted/30 rounded-md p-3 text-sm">
          <p className="font-medium mb-2">{t("quickInsightsTitle")}</p>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>{t("mockInsightGoal")}</li>
            <li>{t("mockInsightEngagement")}</li>
            <li>{t("mockInsightFocus")}</li>
            <li>{t("mockInsightRecommendation")}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}