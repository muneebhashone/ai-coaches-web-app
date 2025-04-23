"use client";

import { useState } from "react";
import { IconUsers, IconLanguage, IconSearch } from "@tabler/icons-react";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  coach: {
    id: string;
    name: string;
  };
  status: "active" | "inactive" | "flagged";
  lastActive: string;
  joinDate: string;
  program: string;
}

const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john.smith@example.com",
    coach: {
      id: "coach-1",
      name: "Sarah Kim",
    },
    status: "active",
    lastActive: "2023-06-12T10:23:45",
    joinDate: "2023-01-15",
    program: "Weight Management",
  },
  {
    id: "user-2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    coach: {
      id: "coach-1",
      name: "Sarah Kim",
    },
    status: "active",
    lastActive: "2023-06-12T09:15:30",
    joinDate: "2023-02-20",
    program: "Stress Reduction",
  },
  {
    id: "user-3",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    coach: {
      id: "coach-2",
      name: "David Park",
    },
    status: "inactive",
    lastActive: "2023-06-10T16:42:12",
    joinDate: "2023-01-05",
    program: "Sleep Improvement",
  },
  {
    id: "user-4",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    coach: {
      id: "coach-2",
      name: "David Park",
    },
    status: "flagged",
    lastActive: "2023-06-11T14:30:00",
    joinDate: "2023-03-10",
    program: "Weight Management",
  },
  {
    id: "user-5",
    name: "Michael Brown",
    email: "m.brown@example.com",
    coach: {
      id: "coach-3",
      name: "Jessica Lee",
    },
    status: "active",
    lastActive: "2023-06-11T11:20:15",
    joinDate: "2023-02-01",
    program: "Nutrition Planning",
  },
  {
    id: "user-6",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    coach: {
      id: "coach-3",
      name: "Jessica Lee",
    },
    status: "active",
    lastActive: "2023-06-10T22:15:45",
    joinDate: "2023-03-15",
    program: "Stress Reduction",
  },
];

export default function AdminUsersPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [coachFilter, setCoachFilter] = useState<string>("all");
  const [programFilter, setProgramFilter] = useState<string>("all");

  // Get unique coaches for filter
  const coaches = Array.from(new Set(mockUsers.map((user) => user.coach.id)))
    .map((id) => {
      const user = mockUsers.find((user) => user.coach.id === id);
      return user ? { id, name: user.coach.name } : null;
    })
    .filter(Boolean) as { id: string; name: string }[];

  // Get unique programs for filter
  const programs = Array.from(new Set(mockUsers.map((user) => user.program)));

  // Apply filters
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesCoach = coachFilter === "all" || user.coach.id === coachFilter;
    const matchesProgram =
      programFilter === "all" || user.program === programFilter;

    return matchesSearch && matchesStatus && matchesCoach && matchesProgram;
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <IconUsers className="h-5 w-5 text-red-500" />
          <h1 className="text-2xl font-semibold tracking-tight">
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

      <Card className="mb-6">
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative w-full md:col-span-2">
            <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={
                language === "english" ? "Search users..." : "사용자 검색..."
              }
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 md:col-span-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue
                  placeholder={language === "english" ? "Status" : "상태"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>

            <Select value={coachFilter} onValueChange={setCoachFilter}>
              <SelectTrigger>
                <SelectValue
                  placeholder={language === "english" ? "Coach" : "코치"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Coaches</SelectItem>
                {coaches.map((coach) => (
                  <SelectItem key={coach.id} value={coach.id}>
                    {coach.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger>
                <SelectValue
                  placeholder={language === "english" ? "Program" : "프로그램"}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                {programs.map((program) => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Coach</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.coach.name}</TableCell>
                <TableCell>{user.program}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      user.status === "active"
                        ? "bg-green-500"
                        : user.status === "flagged"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(user.joinDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(user.lastActive).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/users/${user.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-4 text-muted-foreground"
                >
                  No users found matching the criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
