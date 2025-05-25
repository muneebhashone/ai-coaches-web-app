"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, TrendingUp } from "lucide-react";

interface UserDetailHeaderProps {
  userId: string;
}

// Mock user data - would be replaced with API call
const mockUser = {
  id: "1",
  name: "Sarah Kim",
  email: "sarah.kim@example.com",
  activeProgram: "Stress Management & Wellness",
  currentStage: "Active",
  progressPercentage: 75,
  goalAchievement: 68,
  avatar: null,
  attendanceHistory: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1], // 1 = present, 0 = absent
};

export function UserDetailHeader({ }: UserDetailHeaderProps) {

  return (
    <div className="space-y-4">
      {/* User Name and Active Program */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mockUser.avatar || ""} />
              <AvatarFallback className="text-lg">
                {mockUser.name.split(" ").map(n => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{mockUser.name}</h2>
              <p className="text-muted-foreground">{mockUser.email}</p>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{mockUser.activeProgram}</Badge>
                <Badge className="bg-success text-success-foreground">
                  {mockUser.currentStage}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress and Goal Achievement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
              Progress Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Progress</span>
                  <span className="font-medium">{mockUser.progressPercentage}%</span>
                </div>
                <Progress value={mockUser.progressPercentage} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Goal Achievement</span>
                  <span className="font-medium">{mockUser.goalAchievement}%</span>
                </div>
                <Progress value={mockUser.goalAchievement} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              Session Attendance History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-1">
              {mockUser.attendanceHistory.map((attended, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs font-medium ${
                    attended 
                      ? "bg-success text-success-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {attended ? "✓" : "○"}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Last 10 sessions (✓ = Present, ○ = Absent)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}