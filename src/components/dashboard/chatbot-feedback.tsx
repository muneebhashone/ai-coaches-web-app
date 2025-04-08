"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedCard } from "@/components/ui/animated-card";
import {
  IconRobot,
  IconAlertCircle,
  IconInfoCircle,
  IconCheck,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

// Mock data for chatbot feedback
const chatbotFeedbackData = [
  {
    id: 1,
    userId: "user-123",
    userName: "Alex Kim",
    message: {
      english:
        "This user may need special attention in the next session. They've expressed frustration with their progress.",
      korean:
        "이 사용자는 다음 세션에서 특별한 관심이 필요할 수 있습니다. 그들은 자신의 진행 상황에 대해 좌절감을 표현했습니다.",
    },
    priority: "high",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    userId: "user-456",
    userName: "Jamie Park",
    message: {
      english:
        "Consider scheduling a follow-up session this week. User has made significant progress and is ready for next steps.",
      korean:
        "이번 주에 후속 세션을 예약하는 것을 고려하세요. 사용자가 상당한 진전을 이루었고 다음 단계를 준비하고 있습니다.",
    },
    priority: "medium",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: 3,
    userId: "user-789",
    userName: "Taylor Lee",
    message: {
      english:
        "User has not responded to the last 3 prompts. Consider reaching out directly.",
      korean:
        "사용자가 마지막 3개의 프롬프트에 응답하지 않았습니다. 직접 연락하는 것을 고려하세요.",
    },
    priority: "high",
    timestamp: "2 days ago",
    read: false,
  },
];

interface ChatbotFeedbackProps {
  language: "english" | "korean";
}

export function ChatbotFeedback({ language }: ChatbotFeedbackProps) {
  const [feedback, setFeedback] = useState(chatbotFeedbackData);

  const markAsRead = (id: number) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <IconAlertCircle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <IconInfoCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <IconCheck className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <AnimatedCard>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconRobot className="h-5 w-5 text-primary" />
            <CardTitle>
              {language === "english" ? "Chatbot Feedback" : "챗봇 피드백"}
            </CardTitle>
          </div>
          <Badge variant="outline">
            {feedback.filter((item) => !item.read).length}{" "}
            {language === "english" ? "new" : "새로운"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedback.length > 0 ? (
            feedback.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg border ${
                  item.read ? "bg-background" : "bg-primary/5 border-primary/20"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(item.priority)}
                    <span className="font-medium">{item.userName}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-sm mb-3">{item.message[language]}</p>
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsRead(item.id)}
                    disabled={item.read}
                  >
                    {language === "english" ? "Mark as read" : "읽음으로 표시"}
                  </Button>
                  <Button variant="link" size="sm" className="text-primary">
                    {language === "english" ? "View user" : "사용자 보기"}
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              {language === "english"
                ? "No feedback available at this time"
                : "현재 사용 가능한 피드백이 없습니다"}
            </div>
          )}
        </div>
      </CardContent>
    </AnimatedCard>
  );
}
