"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Eye, Edit, AlertTriangle, CheckCircle } from "lucide-react";

// Mock data - would be replaced with API data
const mockUsers = [
  {
    id: "1",
    name: "Sarah Kim",
    email: "sarah.kim@example.com",
    currentStage: "Active",
    attendanceRate: 85,
    chatbotMatch: "Coach AI v2.1",
    recentActivity: "2 hours ago",
    riskIndicators: "low",
    avatar: null,
  },
  {
    id: "2", 
    name: "Michael Chen",
    email: "michael.chen@example.com",
    currentStage: "In Progress",
    attendanceRate: 72,
    chatbotMatch: "Coach AI v2.0",
    recentActivity: "1 day ago",
    riskIndicators: "medium",
    avatar: null,
  },
  {
    id: "3",
    name: "Emma Johnson",
    email: "emma.johnson@example.com", 
    currentStage: "Onboarding",
    attendanceRate: 45,
    chatbotMatch: "Coach AI v2.1",
    recentActivity: "3 days ago",
    riskIndicators: "high",
    avatar: null,
  },
  {
    id: "4",
    name: "David Park",
    email: "david.park@example.com",
    currentStage: "Active",
    attendanceRate: 92,
    chatbotMatch: "Coach AI v2.1",
    recentActivity: "30 minutes ago", 
    riskIndicators: "low",
    avatar: null,
  },
  {
    id: "5",
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@example.com",
    currentStage: "Completed",
    attendanceRate: 88,
    chatbotMatch: "Coach AI v2.0",
    recentActivity: "1 week ago",
    riskIndicators: "low",
    avatar: null,
  },
];

export function UserDataTable() {
  const t = useTranslations("dashboard.userManagement.table");
  const router = useRouter();
  const [users] = useState(mockUsers);

  const getRiskIndicatorIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "active":
        return "bg-success text-success-foreground";
      case "in progress":
        return "bg-primary text-primary-foreground";
      case "onboarding":
        return "bg-warning text-warning-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="rounded-md border bg-card">
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || ""} />
                    <AvatarFallback>
                      {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStageColor(user.currentStage)}>
                  {user.currentStage}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm font-medium">{user.attendanceRate}%</div>
                  <Progress value={user.attendanceRate} className="h-2 w-20" />
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{user.chatbotMatch}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-muted-foreground">
                  {user.recentActivity}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  {getRiskIndicatorIcon(user.riskIndicators)}
                  <span className="text-sm capitalize">{user.riskIndicators}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/dashboard/user-management/${user.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">{t("view")}</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">{t("edit")}</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}