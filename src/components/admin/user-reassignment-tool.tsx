"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IconArrowRight, IconSearch, IconTransferIn } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"

type User = {
  id: string
  name: string
  email: string
  coachId: string
  status: "active" | "inactive" | "flagged"
  lastActive: string
}

type Coach = {
  id: string
  name: string
  usersCount: number
  maxCapacity: number
}

const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john.smith@example.com",
    coachId: "coach-1",
    status: "active",
    lastActive: "2023-06-12T10:23:45",
  },
  {
    id: "user-2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    coachId: "coach-1",
    status: "active",
    lastActive: "2023-06-12T09:15:30",
  },
  {
    id: "user-3",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    coachId: "coach-2",
    status: "inactive",
    lastActive: "2023-06-10T16:42:12",
  },
  {
    id: "user-4",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    coachId: "coach-2",
    status: "flagged",
    lastActive: "2023-06-11T14:30:00",
  },
  {
    id: "user-5",
    name: "Michael Brown",
    email: "m.brown@example.com",
    coachId: "coach-3",
    status: "active",
    lastActive: "2023-06-11T11:20:15",
  },
  {
    id: "user-6",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    coachId: "coach-3",
    status: "active",
    lastActive: "2023-06-10T22:15:45",
  },
]

const mockCoaches: Coach[] = [
  {
    id: "coach-1",
    name: "Sarah Kim",
    usersCount: 42,
    maxCapacity: 50,
  },
  {
    id: "coach-2",
    name: "David Park",
    usersCount: 35,
    maxCapacity: 45,
  },
  {
    id: "coach-3",
    name: "Jessica Lee",
    usersCount: 28,
    maxCapacity: 40,
  },
  {
    id: "coach-4",
    name: "Michael Jung",
    usersCount: 15,
    maxCapacity: 30,
  },
]

export function UserReassignmentTool() {
  const [users] = useState<User[]>(mockUsers)
  const [coaches] = useState<Coach[]>(mockCoaches)
  const [sourceCoach, setSourceCoach] = useState<string>("all")
  const [targetCoach, setTargetCoach] = useState<string>("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  
  const filteredUsers = users
    .filter(user => sourceCoach === "all" ? true : user.coachId === sourceCoach)
    .filter(user => 
      searchQuery ? 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) : 
        true
    )
  
  const selectedCoach = coaches.find(coach => coach.id === targetCoach)
  const currentSelected = selectedUsers.length
  const remainingCapacity = selectedCoach ? selectedCoach.maxCapacity - selectedCoach.usersCount : 0
  
  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }
  
  const handleTransferUsers = () => {
    // In a real application, this would send a request to update user assignments
    alert(`${selectedUsers.length} users successfully transferred to ${selectedCoach?.name}`)
    setSelectedUsers([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Reassignment</CardTitle>
        <CardDescription>Transfer users between coaches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div>
                <Label>Source Coach</Label>
                <Select 
                  value={sourceCoach} 
                  onValueChange={setSourceCoach}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a coach" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Coaches</SelectItem>
                    {coaches.map(coach => (
                      <SelectItem key={coach.id} value={coach.id}>
                        {coach.name} ({coach.usersCount} users)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Search Users</Label>
                <div className="relative">
                  <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label>Users ({filteredUsers.length})</Label>
                <ScrollArea className="h-[250px] border rounded-md">
                  <div className="p-2 space-y-2">
                    {filteredUsers.map(user => (
                      <div 
                        key={user.id} 
                        className={`p-2 rounded-md border cursor-pointer ${
                          selectedUsers.includes(user.id) ? 'bg-primary/10 border-primary' : ''
                        }`}
                        onClick={() => handleSelectUser(user.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
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
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Last active: {new Date(user.lastActive).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                    {filteredUsers.length === 0 && (
                      <div className="p-4 text-center text-muted-foreground">
                        No users found
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="space-y-4">
              <div>
                <Label>Target Coach</Label>
                <Select 
                  value={targetCoach} 
                  onValueChange={setTargetCoach}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a coach" />
                  </SelectTrigger>
                  <SelectContent>
                    {coaches.map(coach => (
                      <SelectItem key={coach.id} value={coach.id}>
                        {coach.name} ({coach.usersCount}/{coach.maxCapacity} users)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Selected Users:</span>
                  <Badge>{selectedUsers.length}</Badge>
                </div>
                
                {selectedCoach && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Coach Capacity:</span>
                      <span>{selectedCoach.usersCount}/{selectedCoach.maxCapacity}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>After Transfer:</span>
                      <span>{selectedCoach.usersCount + currentSelected}/{selectedCoach.maxCapacity}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Remaining Capacity:</span>
                      <span>{remainingCapacity - currentSelected}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-center mt-6">
                <IconArrowRight className="h-10 w-10 text-primary" />
              </div>
              
              <Button
                className="mt-auto"
                disabled={!targetCoach || selectedUsers.length === 0 || !selectedCoach || (selectedCoach.usersCount + selectedUsers.length > selectedCoach.maxCapacity)}
                onClick={handleTransferUsers}
              >
                <IconTransferIn className="mr-2 h-4 w-4" />
                Transfer {selectedUsers.length} Users
              </Button>
              
              {selectedCoach && selectedCoach.usersCount + selectedUsers.length > selectedCoach.maxCapacity && (
                <p className="text-sm text-red-500 mt-2">
                  Transfer would exceed coach capacity
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}