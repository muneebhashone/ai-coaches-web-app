"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TrainingMetric {
    name: string
    value: number
    change: number
    target: number
}

interface TrainingStatus {
    status: "training" | "ready" | "error"
    lastUpdated: string
    metrics: {
        accuracy: TrainingMetric
        responseTime: TrainingMetric
        consistency: TrainingMetric
    }
}

interface TrainingStatusDashboardProps {
    status: TrainingStatus
    language: "english" | "korean"
}

const getStatusColor = (status: TrainingStatus["status"]) => {
    switch (status) {
        case "training":
            return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20"
        case "ready":
            return "bg-green-500/20 text-green-500 hover:bg-green-500/20"
        case "error":
            return "bg-red-500/20 text-red-500 hover:bg-red-500/20"
        default:
            return ""
    }
}

const getStatusText = (status: TrainingStatus["status"], language: "english" | "korean") => {
    switch (status) {
        case "training":
            return language === "english" ? "Training in Progress" : "학습 진행 중"
        case "ready":
            return language === "english" ? "Ready" : "준비 완료"
        case "error":
            return language === "english" ? "Error" : "오류"
        default:
            return ""
    }
}

export function TrainingStatusDashboard({ status, language }: TrainingStatusDashboardProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                    {language === "english" ? "Training Status" : "학습 상태"}
                </h2>
                <Badge className={getStatusColor(status.status)}>
                    {getStatusText(status.status, language)}
                </Badge>
            </div>

            <div className="text-sm text-muted-foreground">
                {language === "english" ? "Last updated: " : "마지막 업데이트: "}
                {status.lastUpdated}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Accuracy Metric */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            {language === "english" ? "Accuracy" : "정확도"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold">
                                    {status.metrics.accuracy.value}%
                                </span>
                                <span className={status.metrics.accuracy.change >= 0 ? "text-green-500" : "text-red-500"}>
                                    {status.metrics.accuracy.change > 0 ? "+" : ""}
                                    {status.metrics.accuracy.change}%
                                </span>
                            </div>
                            <Progress
                                value={(status.metrics.accuracy.value / status.metrics.accuracy.target) * 100}
                                className="h-2"
                            />
                            <div className="text-xs text-muted-foreground">
                                {language === "english" ? "Target: " : "목표: "}
                                {status.metrics.accuracy.target}%
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Response Time Metric */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            {language === "english" ? "Response Time" : "응답 시간"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold">
                                    {status.metrics.responseTime.value}ms
                                </span>
                                <span className={status.metrics.responseTime.change <= 0 ? "text-green-500" : "text-red-500"}>
                                    {status.metrics.responseTime.change > 0 ? "+" : ""}
                                    {status.metrics.responseTime.change}ms
                                </span>
                            </div>
                            <Progress
                                value={
                                    ((status.metrics.responseTime.target - status.metrics.responseTime.value) /
                                        status.metrics.responseTime.target) *
                                    100
                                }
                                className="h-2"
                            />
                            <div className="text-xs text-muted-foreground">
                                {language === "english" ? "Target: " : "목표: "}
                                {status.metrics.responseTime.target}ms
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Consistency Metric */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            {language === "english" ? "Consistency" : "일관성"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold">
                                    {status.metrics.consistency.value}%
                                </span>
                                <span className={status.metrics.consistency.change >= 0 ? "text-green-500" : "text-red-500"}>
                                    {status.metrics.consistency.change > 0 ? "+" : ""}
                                    {status.metrics.consistency.change}%
                                </span>
                            </div>
                            <Progress
                                value={(status.metrics.consistency.value / status.metrics.consistency.target) * 100}
                                className="h-2"
                            />
                            <div className="text-xs text-muted-foreground">
                                {language === "english" ? "Target: " : "목표: "}
                                {status.metrics.consistency.target}%
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 