"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCard } from "@/components/ui/animated-card";
import {
  IconCalendarTime,
  IconUserCircle,
  IconCalendarPlus,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock data for session recommendations
const sessionRecommendationsData = [
  {
    id: 1,
    userId: "user-123",
    userName: "Alex Kim",
    reason: {
      english:
        "User has completed all assigned tasks and is ready for the next phase",
      korean: "사용자가 모든 할당된 작업을 완료하고 다음 단계를 준비했습니다",
    },
    suggestedTimeframe: {
      english: "This week",
      korean: "이번 주",
    },
    priority: "high",
  },
  {
    id: 2,
    userId: "user-456",
    userName: "Jamie Park",
    reason: {
      english: "User has been consistently active and making good progress",
      korean: "사용자가 지속적으로 활동하며 좋은 진전을 보이고 있습니다",
    },
    suggestedTimeframe: {
      english: "Next week",
      korean: "다음 주",
    },
    priority: "medium",
  },
  {
    id: 3,
    userId: "user-789",
    userName: "Taylor Lee",
    reason: {
      english: "User engagement has dropped in the past 2 weeks",
      korean: "지난 2주 동안 사용자 참여도가 감소했습니다",
    },
    suggestedTimeframe: {
      english: "As soon as possible",
      korean: "가능한 빨리",
    },
    priority: "high",
  },
];

interface SessionRecommendationsProps {
  language: "english" | "korean";
}

export function SessionRecommendations({
  language,
}: SessionRecommendationsProps) {
  const [recommendations] = useState(sessionRecommendationsData);

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-50";
      case "medium":
        return "text-yellow-500 bg-yellow-50";
      default:
        return "text-green-500 bg-green-50";
    }
  };

  return (
    <AnimatedCard>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconCalendarTime className="h-5 w-5 text-primary" />
            <CardTitle>
              {language === "english" ? "Session Recommendations" : "세션 추천"}
            </CardTitle>
          </div>
          <Badge variant="outline">
            {recommendations.length}{" "}
            {language === "english" ? "suggestions" : "제안"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.length > 0 ? (
            recommendations.map((item) => (
              <div key={item.id} className="p-3 rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <IconUserCircle className="h-5 w-5 text-primary" />
                    <span className="font-medium">{item.userName}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${getPriorityClass(item.priority)}`}
                  >
                    {item.suggestedTimeframe[language]}
                  </Badge>
                </div>
                <p className="text-sm mb-3">{item.reason[language]}</p>
                <div className="flex justify-end">
                  <Button size="sm" className="gap-1" asChild>
                    <Link href="/sessions/schedule">
                      <IconCalendarPlus className="h-4 w-4" />
                      {language === "english"
                        ? "Schedule Session"
                        : "세션 예약"}
                    </Link>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              {language === "english"
                ? "No session recommendations at this time"
                : "현재 세션 추천이 없습니다"}
            </div>
          )}
        </div>
      </CardContent>
    </AnimatedCard>
  );
}
