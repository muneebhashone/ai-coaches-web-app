import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PageProps } from "../../../../../.next/types/app/layout";

// Mock data for a single program (fetch based on params.id later)
const mockProgramDetail = {
  id: "prog-101",
  name: "Stress Reduction Coaching Program",
  description:
    "A 12-week program focused on mindfulness and stress management techniques. Designed to equip participants with practical tools to handle daily stressors and improve overall well-being.",
  sessions: [
    {
      id: "sess-001",
      title: "Week 1: Introduction to Mindfulness",
      date: "2024-05-01",
      type: "Human Coach",
    },
    {
      id: "sess-002",
      title: "Week 1: Mindfulness Check-in",
      date: "2024-05-03",
      type: "Chatbot",
    },
    {
      id: "sess-003",
      title: "Week 2: Body Scan Meditation",
      date: "2024-05-08",
      type: "Human Coach",
    },
  ],
  users: [
    {
      id: "user-001",
      name: "Alice Wonderland",
      email: "alice@example.com",
      status: "Active",
    },
    {
      id: "user-002",
      name: "Bob The Builder",
      email: "bob@example.com",
      status: "Active",
    },
    {
      id: "user-003",
      name: "Charlie Chaplin",
      email: "charlie@example.com",
      status: "Paused",
    },
  ],
};

export default async function ProgramDetailPage({ params }: PageProps) {
  // In real implementation, fetch program details based on params.id
  const program = (await params).id === "prog-101" ? mockProgramDetail : null; // Use mock data for now

  if (!program) {
    // Handle case where program is not found
    return <div>Program not found.</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl mb-1">{program.name}</CardTitle>
            <CardDescription>{program.description}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Edit Program</Button>
            {/* Add other actions like Delete */}
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="sessions">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="users">Assigned Users</TabsTrigger>
          </TabsList>
          {/* Contextual buttons based on selected tab could go here */}
        </div>

        <TabsContent value="sessions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Program Sessions</CardTitle>
              <Button>Add New Session</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Session Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {program.sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">
                        {/* Link to session detail page later */}
                        {session.title}
                      </TableCell>
                      <TableCell>{session.date}</TableCell>
                      <TableCell>{session.type}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Assigned Users</CardTitle>
              <Button>Assign New User</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {program.users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/dashboard/users/${user.id}`}
                          className="hover:underline"
                        >
                          {user.name}
                        </Link>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/users/${user.id}`}>View</Link>
                        </Button>
                        {/* Add Unassign button later */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
