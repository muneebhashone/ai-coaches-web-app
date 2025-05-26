"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Eye, Edit, AlertTriangle, CheckCircle, Users, Loader2 } from "lucide-react";
import { useClients } from "@/services/client/client.hooks"; // Placeholder hook
import { toast } from "sonner";

// Define a more representative mock client structure
// This interface would ideally come from `client.types.ts` if it existed.
export interface ClientUser {
  _id: string; 
  name: string;
  email: string;
  avatar?: string | null;
  currentStage?: string;
  attendanceRate?: number;
  chatbotMatch?: string; 
  recentActivity?: string; 
  riskIndicators?: "low" | "medium" | "high";
}

// Enhanced mock data to be used if API is placeholder or returns nothing
const mockClientUsers: ClientUser[] = [
  {
    _id: "user1", name: "Sarah Kim (Mock)", email: "sarah.kim@example.com", currentStage: "Active",
    attendanceRate: 85, chatbotMatch: "Coach AI v2.1", recentActivity: "2 hours ago", riskIndicators: "low", avatar: null,
  },
  {
    _id: "user2", name: "Michael Chen (Mock)", email: "michael.chen@example.com", currentStage: "In Progress",
    attendanceRate: 72, chatbotMatch: "Coach AI v2.0", recentActivity: "1 day ago", riskIndicators: "medium", avatar: null,
  },
  {
    _id: "user3", name: "Emma Johnson (Mock)", email: "emma.johnson@example.com", currentStage: "Onboarding",
    attendanceRate: 45, chatbotMatch: "Coach AI v2.1", recentActivity: "3 days ago", riskIndicators: "high", avatar: null,
  },
    {
    _id: "user4", name: "David Park (Mock)", email: "david.park@example.com", currentStage: "Active",
    attendanceRate: 92, chatbotMatch: "Coach AI v2.1", recentActivity: "30 minutes ago", riskIndicators: "low", avatar: null,
  },
  {
    _id: "user5", name: "Lisa Rodriguez (Mock)", email: "lisa.rodriguez@example.com", currentStage: "Completed",
    attendanceRate: 88, chatbotMatch: "Coach AI v2.0", recentActivity: "1 week ago", riskIndicators: "low", avatar: null,
  },
];


export function UserDataTable() {
  const t = useTranslations("dashboard.userManagement.table");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const router = useRouter();

  // COMMENT: `useClients` is a placeholder hook from `client.hooks.ts`.
  // It's marked `enabled: false` and currently returns an empty array or mock data based on its internal logic.
  // We use `mockClientUsers` as a fallback if the API doesn't return data.
  // A real implementation would rely on `useClients` fetching actual data,
  // supporting pagination, filtering, and searching passed from `UserFilters.tsx`.
  const { 
    data: clientsApiResponse, // Assuming the hook returns { success: boolean, data: ClientUser[], pagination?: any }
    isLoading: isLoadingClients, 
    isError: isErrorClients,
    // TODO: Implement states for pagination, filters, search term if API supported them
  } = useClients(); 

  const users: ClientUser[] = useMemo(() => {
    // @ts-ignore - Assuming clientsApiResponse.data is an array of ClientUser if API was real
    const fetchedUsers = clientsApiResponse?.data?.length ? clientsApiResponse.data : mockClientUsers;
    if(clientsApiResponse && !clientsApiResponse.success && !clientsApiResponse.data?.length) {
       // If API call was made (not disabled) but failed or returned no data, show mock as fallback
       return mockClientUsers;
    }
    return fetchedUsers;
  }, [clientsApiResponse]);

  const getRiskIndicatorIcon = (risk?: "low" | "medium" | "high") => {
    switch (risk) {
      case "low": return <CheckCircle className="h-4 w-4 text-success" />;
      case "medium": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "high": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return <span className="text-xs text-muted-foreground">-</span>;
    }
  };

  const getStageColor = (stage?: string) => {
    switch (stage?.toLowerCase()) {
      case "active": return "bg-success text-success-foreground";
      case "in progress": return "bg-primary text-primary-foreground";
      case "onboarding": return "bg-warning text-warning-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };
  
  const handleEditUser = (userId: string) => {
    // COMMENT: This function is a placeholder for an edit action.
    // A real implementation would likely navigate to an edit page or open a modal form.
    // It would also require an `useUpdateClient` mutation from `client.hooks.ts`, which is currently a placeholder.
    toast.info(t("editUserPlaceholder", { userId }));
    alert(tErrors("client.missingUpdateApi"));
  };

  if (isLoadingClients && !clientsApiResponse) { // Show loading only if no data (even mock) is ready
    return (
      <div className="flex items-center justify-center rounded-md border bg-card p-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">{tCommon("loadingData")}</p>
      </div>
    );
  }
  
  // COMMENT: A more specific error message could be shown if isErrorClients is true from a real API call.
  // For now, if it's not loading and no users (even mock), it shows empty state.

  return (
    <div className="rounded-md border bg-card">
      {/* COMMENT: UserFilters component (not part of this task) would interact with useClients
                   to pass search/filter parameters if the API supported them.
                   Currently, filtering/searching is not implemented due to placeholder service.
      */}
      <div className="p-4 border-b">
        <div className="flex items-center p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
            <Users className="h-6 w-6 mr-3 text-blue-600" />
            <div>
                <h4 className="text-sm font-semibold text-blue-700">{t("clientServicePlaceholderTitle")}</h4>
                <p className="text-xs text-blue-600/80">
                    {t("clientServicePlaceholderDescription")}
                </p>
            </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("currentStage")}</TableHead>
            <TableHead>{t("attendanceRate")}</TableHead>
            <TableHead>{t("chatbotMatch")}</TableHead>
            <TableHead>{t("recentActivity")}</TableHead>
            <TableHead>{t("riskIndicators")}</TableHead>
            <TableHead className="text-right">{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 && !isLoadingClients && ( // isLoadingClients check might be redundant if mock is always present
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                {isErrorClients ? tErrors("client.fetchFailed") : t("noUsersFound")}
              </TableCell>
            </TableRow>
          )}
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || ""} />
                    <AvatarFallback>
                      {user.name?.split(" ").map(n => n[0])[0] || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name || t("unknownUser")}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.email || t("noEmail")}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {user.currentStage ? (
                  <Badge className={getStageColor(user.currentStage)}>
                    {user.currentStage}
                  </Badge>
                ) : <span className="text-xs text-muted-foreground">-</span>}
              </TableCell>
              <TableCell>
                {typeof user.attendanceRate === 'number' ? (
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{user.attendanceRate}%</div>
                    <Progress value={user.attendanceRate} className="h-2 w-20" />
                  </div>
                ) : <span className="text-xs text-muted-foreground">-</span>}
              </TableCell>
              <TableCell>
                <div className="text-sm">{user.chatbotMatch || "-"}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground">
                  {user.recentActivity || "-"}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  {getRiskIndicatorIcon(user.riskIndicators)}
                  <span className="text-sm capitalize">{user.riskIndicators || ""}</span> 
                  {/* Removed '-' to avoid double hyphens with icon fallback */}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/dashboard/user-management/${user._id}`)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">{t("view")}</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEditUser(user._id)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">{t("edit")}</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* COMMENT: Pagination controls would be here if API supported pagination.
                   Example: <DataTablePagination table={table} /> or similar.
                   Currently, `useClients` is a placeholder and does not support pagination.
      */}
       <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground">
            {t("paginationPlaceholderNote")}
        </p>
      </div>
    </div>
  );
}