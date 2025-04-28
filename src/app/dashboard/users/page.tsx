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
import { Progress } from "@/components/ui/progress";

// Mock data for users with updated fields
const MOCK_USERS = [
  {
    id: "1",
    name: "Sara Johnson",
    age: 32,
    occupation: "Marketing Manager",
    program: "Stress Reduction Program",
    status: "active",
    progress: 72,
    sessions: 8,
  },
  {
    id: "2",
    name: "David Kim",
    age: 28,
    occupation: "Software Engineer",
    program: "Career Coaching",
    status: "active",
    progress: 45,
    sessions: 5,
  },
  {
    id: "3",
    name: "Michael Chen",
    age: 41,
    occupation: "Finance Director",
    program: "Productivity Coaching",
    status: "active",
    progress: 89,
    sessions: 12,
  },
  {
    id: "4",
    name: "Emma Watson",
    age: 35,
    occupation: "HR Specialist",
    program: "Stress Reduction Program",
    status: "inactive",
    progress: 30,
    sessions: 3,
  },
  {
    id: "5",
    name: "James Lee",
    age: 45,
    occupation: "Project Manager",
    program: "Career Coaching",
    status: "active",
    progress: 65,
    sessions: 7,
  },
  {
    id: "6",
    name: "Sophia Park",
    age: 29,
    occupation: "UX Designer",
    program: "Productivity Coaching",
    status: "active",
    progress: 52,
    sessions: 6,
  },
  {
    id: "7",
    name: "Robert Johnson",
    age: 38,
    occupation: "Sales Director",
    program: "Stress Reduction Program",
    status: "inactive",
    progress: 18,
    sessions: 2,
  },
];

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
              <TableHead>{language === "english" ? "Age" : "나이"}</TableHead>
              <TableHead>
                {language === "english" ? "Occupation" : "직업"}
              </TableHead>
              <TableHead>
                {language === "english" ? "Sessions" : "세션"}
              </TableHead>
              <TableHead>
                {language === "english" ? "Goal Progress" : "목표 진행도"}
              </TableHead>
              <TableHead>
                {language === "english" ? "Status" : "상태"}
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
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.occupation}</TableCell>
                <TableCell>{user.sessions}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={user.progress} className="h-2 w-[100px]" />
                    <span className="text-xs text-muted-foreground">
                      {user.progress}%
                    </span>
                  </div>
                </TableCell>
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
    </>
  );
}
