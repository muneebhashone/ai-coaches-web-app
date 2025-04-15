import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming ShadCN table path
import { Button } from "@/components/ui/button"; // Assuming ShadCN button path
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Assuming ShadCN card path

// Mock data for programs
const mockPrograms = [
  {
    id: "prog-101",
    name: "Stress Reduction Coaching Program",
    description:
      "A 12-week program focused on mindfulness and stress management techniques.",
    sessionCount: 12,
    userCount: 15,
  },
  {
    id: "prog-102",
    name: "Career Development Accelerator",
    description:
      "Intensive 8-week program to boost career growth and leadership skills.",
    sessionCount: 8,
    userCount: 10,
  },
  {
    id: "prog-103",
    name: "Wellness & Lifestyle Improvement",
    description:
      "6-month program covering nutrition, fitness, and mental well-being.",
    sessionCount: 24,
    userCount: 22,
  },
];

export default function ProgramsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Programs Management</CardTitle>
        <Button asChild>
          {/* Link to a future create program page */}
          <Link href="/dashboard/programs/create">Create New Program</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your coaching programs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Program Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Sessions</TableHead>
              <TableHead className="text-center">Users</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPrograms.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/programs/${program.id}`}
                    className="hover:underline"
                  >
                    {program.name}
                  </Link>
                </TableCell>
                <TableCell>{program.description}</TableCell>
                <TableCell className="text-center">
                  {program.sessionCount}
                </TableCell>
                <TableCell className="text-center">
                  {program.userCount}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/programs/${program.id}`}>View</Link>
                  </Button>
                  {/* Add Edit/Delete buttons later */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
