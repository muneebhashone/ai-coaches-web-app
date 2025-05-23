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
import { useClients } from "@/services/client/client.hooks";
import type { IClient } from "@/services/client/client.types";

export default function UsersPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english");
  const [searchString, setSearchString] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [programFilter, setProgramFilter] = useState<string>("all");

  // Fetch clients using the client hook
  const { data: clientsResponse, isLoading } = useClients({
    searchString,
    limit: 50,
  });

  // Use the data from API or empty array if not available
  const clients = clientsResponse?.data?.results || [];

  // Filter clients/users based on filters (status and program would need to be added to metadata)
  const filteredClients = clients.filter((client: IClient) => {
    // Status filter would be in metadata if available
    const clientStatus = (client.metadata?.status as string) || "active";
    const clientProgram = (client.metadata?.program as string) || "";

    const matchesStatus =
      statusFilter === "all" || clientStatus === statusFilter;
    const matchesProgram =
      programFilter === "all" || clientProgram === programFilter;

    return matchesStatus && matchesProgram;
  });

  // Get unique programs for filter dropdown
  const uniquePrograms = Array.from(
    new Set(
      clients
        .map((client: IClient) => client.metadata?.program as string)
        .filter(Boolean)
    )
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
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
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

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {language === "english" ? "Name" : "이름"}
                </TableHead>
                <TableHead>
                  {language === "english" ? "Email" : "이메일"}
                </TableHead>
                <TableHead>
                  {language === "english" ? "Phone" : "전화번호"}
                </TableHead>
                <TableHead>
                  {language === "english" ? "Joined" : "가입일"}
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
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    {language === "english"
                      ? "No users found"
                      : "사용자를 찾을 수 없습니다"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client: IClient) => (
                  <TableRow key={client._id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phoneNumber || "-"}</TableCell>
                    <TableCell>
                      {new Date(client.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          ((client.metadata?.status as string) || "active") ===
                          "active"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {((client.metadata?.status as string) || "active") ===
                        "active"
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
                        <Link href={`/dashboard/users/${client._id}`}>
                          {language === "english" ? "View" : "보기"}
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
