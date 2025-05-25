"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, MessageCircle, Settings } from "lucide-react";

// Mock connection data
const mockConnections = [
  {
    id: "1",
    clientName: "Sarah Kim",
    clientId: "@sarah_kim_99",
    chatbotName: "Coach AI v2.1",
    status: "Active",
    lastMessage: "2025-05-25 14:30",
    avatar: null,
  },
  {
    id: "2",
    clientName: "Michael Chen",
    clientId: "@mike_chen",
    chatbotName: "Wellness Coach",
    status: "Active",
    lastMessage: "2025-05-25 12:15",
    avatar: null,
  },
  {
    id: "3",
    clientName: "Emma Johnson",
    clientId: "@emma_j",
    chatbotName: "Coach AI v2.1",
    status: "Inactive",
    lastMessage: "2025-05-22 09:45",
    avatar: null,
  },
  {
    id: "4",
    clientName: "David Park",
    clientId: "@david_park_seoul",
    chatbotName: "Coach AI v2.1",
    status: "Active",
    lastMessage: "2025-05-25 16:20",
    avatar: null,
  },
];

export function ConnectionList() {
  const t = useTranslations("dashboard.messengerManagement.connections");

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-success text-success-foreground";
      case "inactive":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-primary" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("client")}</TableHead>
                <TableHead>{t("chatbot")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("lastMessage")}</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockConnections.map((connection) => (
                <TableRow key={connection.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={connection.avatar || ""} />
                        <AvatarFallback>
                          {connection.clientName.split(" ").map(n => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{connection.clientName}</div>
                        <div className="text-sm text-muted-foreground">
                          {connection.clientId}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{connection.chatbotName}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(connection.status)}>
                      {connection.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {connection.lastMessage}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4" />
                        <span className="sr-only">View Conversation</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">Configure</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          {mockConnections.length} client connections active
        </div>
      </CardContent>
    </Card>
  );
}