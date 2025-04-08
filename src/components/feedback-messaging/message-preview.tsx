"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IconCheck, IconClock } from "@tabler/icons-react"

type MessagePreviewProps = {
    language: "english" | "korean";
};

export function MessagePreview({ language }: MessagePreviewProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {language === "english" ? "Message Preview" : "메시지 미리보기"}
                </CardTitle>
                <CardDescription>
                    {language === "english"
                        ? "How your message will appear to users"
                        : "사용자에게 표시되는 메시지 미리보기"}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="rounded-lg border p-4 shadow-sm">
                    <div className="flex items-start gap-4">
                        <Avatar>
                            <AvatarImage src="/coach-avatar.png" alt="Coach" />
                            <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">AI Coaches</span>
                                <span className="text-xs text-muted-foreground">
                                    {language === "english" ? "System Message" : "시스템 메시지"}
                                </span>
                            </div>
                            <div className="rounded-lg bg-muted p-3 text-sm">
                                <h3 className="font-medium mb-2">
                                    {language === "english"
                                        ? "March Coaching Satisfaction Survey"
                                        : "3월 코칭 만족도 설문조사"}
                                </h3>
                                <p className="text-muted-foreground">
                                    {language === "english"
                                        ? "Please take a moment to rate your coaching experience this month. Your feedback helps us improve our service."
                                        : "이번 달 코칭 경험을 평가하는 데 잠시 시간을 내주세요. 귀하의 피드백은 서비스 개선에 도움이 됩니다."}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center text-xs">
                                        <IconClock className="mr-1 h-3.5 w-3.5" />
                                        <span>
                                            {language === "english" ? "Just now" : "방금 전"}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-xs text-primary">
                                        <IconCheck className="mr-1 h-3.5 w-3.5" />
                                        <span>
                                            {language === "english" ? "Response required" : "응답 필수"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium mb-2">
                        {language === "english" ? "Important notes" : "중요 사항"}
                    </h3>
                    <ul className="text-sm space-y-2">
                        <li className="flex items-start gap-2">
                            <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                <IconCheck className="h-3 w-3 text-primary" />
                            </div>
                            <span>
                                {language === "english"
                                    ? "Messages can be scheduled to send at optimal times"
                                    : "최적의 시간에 메시지 전송 예약 가능"}
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                <IconCheck className="h-3 w-3 text-primary" />
                            </div>
                            <span>
                                {language === "english"
                                    ? "All users will receive the message at the same time"
                                    : "모든 사용자가 동시에 메시지를 수신"}
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                <IconCheck className="h-3 w-3 text-primary" />
                            </div>
                            <span>
                                {language === "english"
                                    ? "Response rates will be tracked automatically"
                                    : "응답률이 자동으로 추적됨"}
                            </span>
                        </li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
} 