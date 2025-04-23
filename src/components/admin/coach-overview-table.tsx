"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { IconEye, IconMessageForward, IconUser } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type Coach = {
  id: string
  name: string
  usersCount: number
  activeUsersCount: number
  avgCheckInRate: number
  messagesSent: number
  flaggedUsers: number
  status: "active" | "inactive" | "training"
}

const mockCoaches: Coach[] = [
  {
    id: "coach-1",
    name: "Sarah Kim",
    usersCount: 42,
    activeUsersCount: 38,
    avgCheckInRate: 0.85,
    messagesSent: 126,
    flaggedUsers: 2,
    status: "active",
  },
  {
    id: "coach-2",
    name: "David Park",
    usersCount: 35,
    activeUsersCount: 30,
    avgCheckInRate: 0.79,
    messagesSent: 98,
    flaggedUsers: 5,
    status: "active",
  },
  {
    id: "coach-3",
    name: "Jessica Lee",
    usersCount: 28,
    activeUsersCount: 22,
    avgCheckInRate: 0.65,
    messagesSent: 76,
    flaggedUsers: 8,
    status: "inactive",
  },
  {
    id: "coach-4",
    name: "Michael Jung",
    usersCount: 15,
    activeUsersCount: 12,
    avgCheckInRate: 0.92,
    messagesSent: 45,
    flaggedUsers: 0,
    status: "training",
  },
]

export function CoachOverviewTable() {
  const [coaches] = useState<Coach[]>(mockCoaches)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Coach | null
    direction: "ascending" | "descending"
  }>({
    key: null,
    direction: "ascending",
  })

  const handleSort = (key: keyof Coach) => {
    let direction: "ascending" | "descending" = "ascending"
    
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    
    setSortConfig({ key, direction })
  }

  const sortedCoaches = [...coaches].sort((a, b) => {
    if (!sortConfig.key) return 0

    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1
    }
    return 0
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("name")} className="cursor-pointer">Coach Name</TableHead>
              <TableHead onClick={() => handleSort("usersCount")} className="cursor-pointer text-right">Total Users</TableHead>
              <TableHead onClick={() => handleSort("activeUsersCount")} className="cursor-pointer text-right">Active Users</TableHead>
              <TableHead onClick={() => handleSort("avgCheckInRate")} className="cursor-pointer text-right">Avg Check-in</TableHead>
              <TableHead onClick={() => handleSort("messagesSent")} className="cursor-pointer text-right">Messages Sent</TableHead>
              <TableHead onClick={() => handleSort("flaggedUsers")} className="cursor-pointer text-right">Flagged Users</TableHead>
              <TableHead onClick={() => handleSort("status")} className="cursor-pointer">Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCoaches.map((coach) => (
              <TableRow key={coach.id}>
                <TableCell className="font-medium">{coach.name}</TableCell>
                <TableCell className="text-right">{coach.usersCount}</TableCell>
                <TableCell className="text-right">{coach.activeUsersCount}</TableCell>
                <TableCell className="text-right">{(coach.avgCheckInRate * 100).toFixed(0)}%</TableCell>
                <TableCell className="text-right">{coach.messagesSent}</TableCell>
                <TableCell className="text-right">{coach.flaggedUsers}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      coach.status === "active"
                        ? "bg-green-500"
                        : coach.status === "training"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }
                  >
                    {coach.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/coaches/${coach.id}`}>
                        <IconEye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/users?coach=${coach.id}`}>
                        <IconUser className="h-4 w-4" />
                        <span className="sr-only">Users</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/messenger-management?coach=${coach.id}`}>
                        <IconMessageForward className="h-4 w-4" />
                        <span className="sr-only">Messages</span>
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}