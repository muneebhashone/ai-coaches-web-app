"use client";

import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCard } from "@/components/ui/animated-card";
import { IconUsers, IconArrowUp, IconArrowDown } from "@tabler/icons-react";

// Mock data for user segments
const userSegmentData = [
  {
    id: 1,
    name: "High Progress",
    count: 18,
    percentage: 42,
    change: 5,
    color: "bg-green-500",
    description: {
      english: "Users with consistent engagement and goal achievement",
      korean: "일관된 참여와 목표 달성을 보이는 사용자",
    },
  },
  {
    id: 2,
    name: "Low Response",
    count: 15,
    percentage: 36,
    change: -2,
    color: "bg-yellow-500",
    description: {
      english: "Users with minimal interaction in the past week",
      korean: "지난 주에 최소한의 상호작용을 한 사용자",
    },
  },
  {
    id: 3,
    name: "Stalled",
    count: 9,
    percentage: 22,
    change: -3,
    color: "bg-red-500",
    description: {
      english: "Users with no activity in the past 2 weeks",
      korean: "지난 2주 동안 활동이 없는 사용자",
    },
  },
];

interface UserSegmentationProps {
  language: "english" | "korean";
}

export function UserSegmentation({ language }: UserSegmentationProps) {
  return (
    <AnimatedCard>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconUsers className="h-5 w-5 text-primary" />
            <CardTitle>
              {language === "english"
                ? "User Auto-Segmentation"
                : "사용자 자동 세분화"}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userSegmentData.map((segment) => (
            <div key={segment.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium">{segment.name}</span>
                  <Badge variant="outline" className="ml-2">
                    {segment.count}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">
                    {segment.percentage}%
                  </span>
                  {segment.change > 0 ? (
                    <span className="text-xs text-green-500 flex items-center">
                      <IconArrowUp className="h-3 w-3" />
                      {segment.change}%
                    </span>
                  ) : (
                    <span className="text-xs text-red-500 flex items-center">
                      <IconArrowDown className="h-3 w-3" />
                      {Math.abs(segment.change)}%
                    </span>
                  )}
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                {segment.description[language]}
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full ${segment.color}`}
                  style={{ width: `${segment.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </AnimatedCard>
  );
}
