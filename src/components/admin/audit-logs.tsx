"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconSearch,
  IconKey,
  IconMessageDots,
  IconFile,
  IconUser,
  IconSettings,
} from "@tabler/icons-react";

interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: {
    id: string;
    name: string;
    role: "admin" | "coach";
  };
  resourceType: "user" | "message" | "setting" | "file" | "auth";
  resourceId: string;
  details: string;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: "log-1",
    timestamp: "2023-06-12T10:23:45",
    action: "User Login",
    user: {
      id: "admin-1",
      name: "Admin User",
      role: "admin",
    },
    resourceType: "auth",
    resourceId: "session-123",
    details: "Admin login from 192.168.1.100",
  },
  {
    id: "log-2",
    timestamp: "2023-06-12T09:15:30",
    action: "User Assignment Changed",
    user: {
      id: "admin-1",
      name: "Admin User",
      role: "admin",
    },
    resourceType: "user",
    resourceId: "user-287",
    details: "Transferred user from coach David Park to coach Sarah Kim",
  },
  {
    id: "log-3",
    timestamp: "2023-06-11T16:42:12",
    action: "Message Template Created",
    user: {
      id: "coach-2",
      name: "David Park",
      role: "coach",
    },
    resourceType: "message",
    resourceId: "template-45",
    details: "Created new template 'Weekly Check-in'",
  },
  {
    id: "log-4",
    timestamp: "2023-06-11T14:30:00",
    action: "File Uploaded",
    user: {
      id: "coach-1",
      name: "Sarah Kim",
      role: "coach",
    },
    resourceType: "file",
    resourceId: "file-128",
    details: "Uploaded nutrition guide for knowledge base",
  },
  {
    id: "log-5",
    timestamp: "2023-06-11T11:20:15",
    action: "User Profile Updated",
    user: {
      id: "coach-3",
      name: "Jessica Lee",
      role: "coach",
    },
    resourceType: "user",
    resourceId: "user-391",
    details: "Updated user profile with new health goals",
  },
  {
    id: "log-6",
    timestamp: "2023-06-10T22:15:45",
    action: "System Setting Changed",
    user: {
      id: "admin-1",
      name: "Admin User",
      role: "admin",
    },
    resourceType: "setting",
    resourceId: "setting-chatbot",
    details: "Modified AI response template settings",
  },
  {
    id: "log-7",
    timestamp: "2023-06-10T19:45:22",
    action: "User Flagged",
    user: {
      id: "coach-2",
      name: "David Park",
      role: "coach",
    },
    resourceType: "user",
    resourceId: "user-178",
    details: "Flagged user for low engagement",
  },
  {
    id: "log-8",
    timestamp: "2023-06-10T18:30:10",
    action: "Message Template Edited",
    user: {
      id: "admin-1",
      name: "Admin User",
      role: "admin",
    },
    resourceType: "message",
    resourceId: "template-12",
    details: "Updated global welcome message template",
  },
  {
    id: "log-9",
    timestamp: "2023-06-10T17:20:05",
    action: "File Deleted",
    user: {
      id: "coach-1",
      name: "Sarah Kim",
      role: "coach",
    },
    resourceType: "file",
    resourceId: "file-87",
    details: "Removed outdated exercise guide",
  },
  {
    id: "log-10",
    timestamp: "2023-06-10T15:10:45",
    action: "System Setting Changed",
    user: {
      id: "admin-1",
      name: "Admin User",
      role: "admin",
    },
    resourceType: "setting",
    resourceId: "setting-privacy",
    details: "Updated data retention policy",
  },
];

export function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [resourceFilter, setResourceFilter] = useState<string>("all");
  const [userFilter, setUserFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");

  // Get unique users for filter
  const users = Array.from(new Set(mockAuditLogs.map((log) => log.user.id)))
    .map((id) => {
      const log = mockAuditLogs.find((log) => log.user.id === id);
      return log ? { id, name: log.user.name, role: log.user.role } : null;
    })
    .filter(Boolean) as { id: string; name: string; role: "admin" | "coach" }[];

  // Apply filters
  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      searchQuery === "" ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesResource =
      resourceFilter === "all" || log.resourceType === resourceFilter;
    const matchesUser = userFilter === "all" || log.user.id === userFilter;

    // Date filtering
    let matchesDate = true;
    if (dateRange !== "all") {
      const logDate = new Date(log.timestamp);

      if (dateRange === "today") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        matchesDate = logDate >= today;
      } else if (dateRange === "week") {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        matchesDate = logDate >= lastWeek;
      } else if (dateRange === "month") {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        matchesDate = logDate >= lastMonth;
      }
    }

    return matchesSearch && matchesResource && matchesUser && matchesDate;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "user":
        return <IconUser className="h-4 w-4" />;
      case "message":
        return <IconMessageDots className="h-4 w-4" />;
      case "file":
        return <IconFile className="h-4 w-4" />;
      case "setting":
        return <IconSettings className="h-4 w-4" />;
      case "auth":
        return <IconKey className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Logs</CardTitle>
        <CardDescription>
          Comprehensive tracking of system access and changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative w-full md:col-span-2">
            <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={resourceFilter} onValueChange={setResourceFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Resource Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resources</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="message">Message</SelectItem>
              <SelectItem value="file">File</SelectItem>
              <SelectItem value="setting">Setting</SelectItem>
              <SelectItem value="auth">Authentication</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex space-x-4">
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger>
                <SelectValue placeholder="User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getResourceIcon(log.resourceType)}
                    <div>
                      <p className="font-medium">{log.action}</p>
                      <div className="flex gap-2 items-center mt-1">
                        <Badge variant="outline">{log.resourceType}</Badge>
                        <Badge
                          variant="outline"
                          className={
                            log.user.role === "admin"
                              ? "border-red-500 text-red-500"
                              : "border-blue-500 text-blue-500"
                          }
                        >
                          {log.user.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>

                <div className="mt-2 text-sm">
                  <p className="text-muted-foreground">{log.details}</p>
                </div>

                <div className="mt-2 text-xs text-muted-foreground">
                  <span>
                    By: <strong>{log.user.name}</strong>
                  </span>
                  {log.resourceId && (
                    <span className="ml-2">
                      Resource ID: <code>{log.resourceId}</code>
                    </span>
                  )}
                </div>
              </div>
            ))}
            {filteredLogs.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                No audit logs found matching the criteria
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
