"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, TrendingUp, User, Loader2 } from "lucide-react";
import { useClient } from "@/services/client/client.hooks"; // Placeholder hook
import type { ClientUser } from "./user-data-table"; // Assuming type from UserDataTable

interface UserDetailHeaderProps {
  userId: string;
}

// Enhanced mock data for a single user, matching ClientUser structure
const mockSingleUser: ClientUser = {
  _id: "user1",
  name: "Sarah Kim (Mock Detail)",
  email: "sarah.detail@example.com",
  activeProgram: "Stress Management & Wellness Program (Mock)",
  currentStage: "Active",
  progressPercentage: 75,
  goalAchievement: 68,
  avatar: null,
  // @ts-ignore - attendanceHistory is not in ClientUser but was in original mock.
  attendanceHistory: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1], 
};

export function UserDetailHeader({ userId }: UserDetailHeaderProps) {
  const t = useTranslations("dashboard.userManagement.detail.header");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");

  // COMMENT: `useClient(userId)` is a placeholder hook from `client.hooks.ts`.
  // It's marked `enabled: false` and currently returns null or mock data.
  // We use `mockSingleUser` as a fallback.
  // A real implementation would rely on `useClient(userId)` fetching actual user details.
  const { 
    data: clientApiResponse, 
    isLoading: isLoadingClient, 
    isError: isErrorClient 
  } = useClient(userId);

  const user: ClientUser = useMemo(() => {
    // @ts-ignore
    const fetchedUser = clientApiResponse?.data ? clientApiResponse.data : { ...mockSingleUser, _id: userId };
     if(clientApiResponse && !clientApiResponse.success && !clientApiResponse.data) {
       return { ...mockSingleUser, _id: userId, name: `${mockSingleUser.name} (Fallback)` };
    }
    return fetchedUser;
  }, [clientApiResponse, userId]);

  if (isLoadingClient && !clientApiResponse) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex items-center justify-center p-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">{tCommon("loadingData")}</p>
          </CardHeader>
        </Card>
      </div>
    );
  }
  
  if (isErrorClient && !user) {
     return (
      <div className="space-y-4">
        <Card>
          <CardHeader className="text-center text-destructive">
             <User className="h-10 w-10 mx-auto mb-2 opacity-70" />
            {tErrors("client.fetchDetailFailed", { userId })}
          </CardHeader>
        </Card>
      </div>
    );
  }


  return (
    <div className="space-y-4">
      <div className="p-4 border-b">
        <div className="flex items-center p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
            <User className="h-6 w-6 mr-3 text-blue-600" />
            <div>
                <h4 className="text-sm font-semibold text-blue-700">{t("clientServicePlaceholderTitle")}</h4>
                <p className="text-xs text-blue-600/80">
                     {t("clientServicePlaceholderDescription", { userId: user._id })}
                </p>
            </div>
        </div>
      </div>
      {/* User Name and Active Program */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || ""} />
              <AvatarFallback className="text-lg">
                {user.name?.split(" ").map(n => n[0])[0]?.toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{user.name || tCommon("unknown")}</h2>
              <p className="text-muted-foreground">{user.email || tCommon("noEmail")}</p>
              <div className="flex items-center space-x-2 flex-wrap">
                {user.activeProgram && <Badge variant="outline">{user.activeProgram}</Badge>}
                {user.currentStage && 
                  <Badge className={user.currentStage.toLowerCase() === 'active' ? "bg-success text-success-foreground" : "bg-secondary text-secondary-foreground"}>
                    {user.currentStage}
                  </Badge>
                }
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress and Goal Achievement */}
      {/* COMMENT: Fields like progressPercentage, goalAchievement, attendanceHistory are part of the mock.
                   A real `ClientUser` type from the API would need to include these if they are to be displayed.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
              {t("progressOverviewTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {typeof user.progressPercentage === 'number' ? (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{t("overallProgressLabel")}</span>
                    <span className="font-medium">{user.progressPercentage}%</span>
                  </div>
                  <Progress value={user.progressPercentage} className="h-2" />
                </div>
              ) : <p className="text-xs text-muted-foreground">{t("noProgressData")}</p>}
              {typeof user.goalAchievement === 'number' ? (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{t("goalAchievementLabel")}</span>
                    <span className="font-medium">{user.goalAchievement}%</span>
                  </div>
                  <Progress value={user.goalAchievement} className="h-2" />
                </div>
              ) : <p className="text-xs text-muted-foreground">{t("noGoalData")}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              {t("attendanceHistoryTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* @ts-ignore */}
            {user.attendanceHistory && user.attendanceHistory.length > 0 ? (
              <>
                <div className="flex items-center space-x-1">
                  {/* @ts-ignore */}
                  {user.attendanceHistory.map((attended: number, index: number) => (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-medium ${
                        attended 
                          ? "bg-success text-success-foreground" 
                          : "bg-muted text-muted-foreground"
                      }`}
                      title={attended ? t("attendedHint") : t("absentHint")}
                    >
                      {attended ? "✓" : "○"}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {/* @ts-ignore */}
                  {t("lastSessionsCount", { count: user.attendanceHistory.length })}
                </p>
              </>
            ) : <p className="text-xs text-muted-foreground">{t("noAttendanceData")}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}