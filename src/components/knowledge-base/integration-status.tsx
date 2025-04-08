"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface IntegrationItem {
    id: string
    name: string
    type: "document" | "article" | "guide"
    status: "integrating" | "integrated" | "failed"
    progress?: number
}

interface IntegrationStatusProps {
    items: IntegrationItem[]
    language: "english" | "korean"
}

const getStatusColor = (status: IntegrationItem["status"]) => {
    switch (status) {
        case "integrating":
            return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20"
        case "integrated":
            return "bg-green-500/20 text-green-500 hover:bg-green-500/20"
        case "failed":
            return "bg-red-500/20 text-red-500 hover:bg-red-500/20"
        default:
            return ""
    }
}

const getStatusText = (status: IntegrationItem["status"], language: "english" | "korean") => {
    switch (status) {
        case "integrating":
            return language === "english" ? "Integrating" : "통합 중"
        case "integrated":
            return language === "english" ? "Integrated" : "통합됨"
        case "failed":
            return language === "english" ? "Failed" : "실패"
        default:
            return ""
    }
}

const getTypeText = (type: IntegrationItem["type"], language: "english" | "korean") => {
    switch (type) {
        case "document":
            return language === "english" ? "Document" : "문서"
        case "article":
            return language === "english" ? "Article" : "아티클"
        case "guide":
            return language === "english" ? "Guide" : "가이드"
        default:
            return ""
    }
}

export function IntegrationStatus({ items, language }: IntegrationStatusProps) {
    const totalItems = items.length
    const integratedItems = items.filter(item => item.status === "integrated").length
    const integrationProgress = Math.round((integratedItems / totalItems) * 100)

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>
                        {language === "english"
                            ? "Integration Progress"
                            : "통합 진행 상황"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                {integratedItems} / {totalItems}{" "}
                                {language === "english" ? "items integrated" : "항목 통합됨"}
                            </span>
                            <span className="text-sm font-medium">{integrationProgress}%</span>
                        </div>
                        <Progress value={integrationProgress} className="h-2" />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                {items.map((item) => (
                    <Card key={item.id}>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-medium">
                                    {item.name}
                                </CardTitle>
                                <Badge className={getStatusColor(item.status)}>
                                    {getStatusText(item.status, language)}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>{getTypeText(item.type, language)}</span>
                                {item.status === "integrating" && item.progress && (
                                    <span>{item.progress}%</span>
                                )}
                            </div>
                            {item.status === "integrating" && item.progress && (
                                <Progress value={item.progress} className="h-1 mt-2" />
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
} 