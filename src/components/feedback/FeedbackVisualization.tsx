"use client"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"
import type { TooltipProps } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

interface FeedbackData {
    id: string
    value: number
    question: {
        english: string
        korean: string
    }
}

interface FeedbackVisualizationProps {
    data: FeedbackData[]
    language: "english" | "korean"
}

export function FeedbackVisualization({ data, language }: FeedbackVisualizationProps) {
    const chartData = data.map((item) => ({
        name: item.question[language],
        value: item.value,
    }))

    const customTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background border rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-sm text-muted-foreground">
                        {language === "english" ? "Rating" : "평가"}: {payload[0].value}
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    {language === "english" ? "Feedback Analysis" : "피드백 분석"}
                </CardTitle>
                <CardDescription>
                    {language === "english"
                        ? "Visual representation of session feedback"
                        : "세션 피드백의 시각적 표현"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 60,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                                height={80}
                            />
                            <YAxis
                                domain={[0, 5]}
                                ticks={[1, 2, 3, 4, 5]}
                                label={{
                                    value: language === "english" ? "Rating" : "평가",
                                    angle: -90,
                                    position: "insideLeft",
                                }}
                            />
                            <Tooltip content={customTooltip} />
                            <Legend />
                            <Bar
                                dataKey="value"
                                fill="var(--primary)"
                                name={language === "english" ? "Response" : "응답"}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
} 