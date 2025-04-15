"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconUsers,
  IconSearch,
  IconLanguage,
  IconFilter,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Progress } from "@/components/ui/progress";

// Mock data for users
const MOCK_USERS = [
  {
    id: "1",
    name: "Sara Johnson",
    program: "Stress Reduction Program",
    status: "active",
    progress: 72,
    lastActivity: "2025-04-10T10:30:00",
    alerts: 0,
  },
  {
    id: "2",
    name: "David Kim",
    program: "Career Coaching",
    status: "active",
    progress: 45,
    lastActivity: "2025-04-10T09:15:00",
    alerts: 1,
  },
  {
    id: "3",
    name: "Michael Chen",
    program: "Productivity Coaching",
    status: "active",
    progress: 89,
    lastActivity: "2025-04-09T14:20:00",
    alerts: 0,
  },
  {
    id: "4",
    name: "Emma Watson",
    program: "Stress Reduction Program",
    status: "inactive",
    progress: 30,
    lastActivity: "2025-04-05T11:45:00",
    alerts: 2,
  },
  {
    id: "5",
    name: "James Lee",
    program: "Career Coaching",
    status: "active",
    progress: 65,
    lastActivity: "2025-04-10T08:30:00",
    alerts: 0,
  },
  {
    id: "6",
    name: "Sophia Park",
    program: "Productivity Coaching",
    status: "active",
    progress: 52,
    lastActivity: "2025-04-09T16:45:00",
    alerts: 0,
  },
  {
    id: "7",
    name: "Robert Johnson",
    program: "Stress Reduction Program",
    status: "inactive",
    progress: 18,
    lastActivity: "2025-04-03T09:10:00",
    alerts: 3,
  },
];

// Function to format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

export default function UsersPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [programFilter, setProgramFilter] = useState<string>("all");

  // Filter users based on search query and filters
  const filteredUsers = MOCK_USERS.filter((user) => {
    // Search filter
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    // Program filter
    const matchesProgram =
      programFilter === "all" || user.program === programFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  // Get unique programs for filter dropdown
  const uniquePrograms = Array.from(
    new Set(MOCK_USERS.map((user) => user.program))
  );

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="flex items-center gap-2">
          <IconUsers className="h-5 w-5 page-heading-icon" />
          <h1 className="page-heading-text">
            {language === "english" ? "User Management" : "사용자 관리"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Toggle
            aria-label="Toggle language"
            pressed={language === "korean"}
            onPressedChange={(pressed) =>
              setLanguage(pressed ? "korean" : "english")
            }
          >
            <IconLanguage className="h-4 w-4 mr-2" />
            {language === "english" ? "English" : "한국어"}
          </Toggle>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={
              language === "english" ? "Search users..." : "사용자 검색..."
            }
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]">
              <IconFilter className="h-4 w-4 mr-2" />
              <SelectValue
                placeholder={language === "english" ? "Status" : "상태"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === "english" ? "All Status" : "모든 상태"}
              </SelectItem>
              <SelectItem value="active">
                {language === "english" ? "Active" : "활성"}
              </SelectItem>
              <SelectItem value="inactive">
                {language === "english" ? "Inactive" : "비활성"}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={programFilter} onValueChange={setProgramFilter}>
            <SelectTrigger className="w-[180px]">
              <IconFilter className="h-4 w-4 mr-2" />
              <SelectValue
                placeholder={language === "english" ? "Program" : "프로그램"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === "english" ? "All Programs" : "모든 프로그램"}
              </SelectItem>
              {uniquePrograms.map((program) => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === "english" ? "Name" : "이름"}</TableHead>
              <TableHead>
                {language === "english" ? "Program" : "프로그램"}
              </TableHead>
              <TableHead>
                {language === "english" ? "Status" : "상태"}
              </TableHead>
              <TableHead>
                {language === "english" ? "Progress" : "진행도"}
              </TableHead>
              <TableHead>
                {language === "english" ? "Last Activity" : "마지막 활동"}
              </TableHead>
              <TableHead>
                {language === "english" ? "Alerts" : "알림"}
              </TableHead>
              <TableHead className="text-right">
                {language === "english" ? "Actions" : "작업"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.program}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "active" ? "default" : "secondary"}
                  >
                    {user.status === "active"
                      ? language === "english"
                        ? "Active"
                        : "활성"
                      : language === "english"
                      ? "Inactive"
                      : "비활성"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={user.progress} className="h-2 w-[100px]" />
                    <span className="text-xs text-muted-foreground">
                      {user.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>{formatDate(user.lastActivity)}</TableCell>
                <TableCell>
                  {user.alerts > 0 ? (
                    <Badge variant="destructive" className="rounded-full px-2">
                      {user.alerts}
                    </Badge>
                  ) : (
                    "0"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" asChild>
                    <Link href={`/users/${user.id}`}>
                      {language === "english" ? "View" : "보기"}
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8">
        <AnimatedCard>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">
              {language === "english"
                ? "User Management Overview"
                : "사용자 관리 개요"}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {language === "english"
                ? "Click on a user to view a comprehensive dashboard with session summaries, goal tracking, and more."
                : "사용자를 클릭하여 세션 요약, 목표 추적 등이 포함된 종합 대시보드를 확인하세요."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium">
                  {language === "english" ? "Active Users" : "활성 사용자"}
                </h3>
                <span className="text-2xl font-bold mt-2">
                  {MOCK_USERS.filter((u) => u.status === "active").length}
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium">
                  {language === "english" ? "Average Progress" : "평균 진행도"}
                </h3>
                <span className="text-2xl font-bold mt-2">
                  {Math.round(
                    MOCK_USERS.reduce((sum, user) => sum + user.progress, 0) /
                      MOCK_USERS.length
                  )}
                  %
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium">
                  {language === "english" ? "Total Alerts" : "전체 알림"}
                </h3>
                <span className="text-2xl font-bold mt-2">
                  {MOCK_USERS.reduce((sum, user) => sum + user.alerts, 0)}
                </span>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </>
  );
}
