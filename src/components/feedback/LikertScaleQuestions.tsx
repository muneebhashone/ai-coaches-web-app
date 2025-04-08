"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface LikertQuestion {
    id: string
    question: {
        english: string
        korean: string
    }
}

const likertQuestions: LikertQuestion[] = [
    {
        id: "satisfaction",
        question: {
            english: "How satisfied are you with today's coaching session?",
            korean: "오늘의 코칭 세션에 대해 얼마나 만족하시나요?",
        },
    },
    {
        id: "helpfulness",
        question: {
            english: "How helpful was the AI coach in achieving your goals?",
            korean: "AI 코치가 목표 달성에 얼마나 도움이 되었나요?",
        },
    },
    {
        id: "clarity",
        question: {
            english: "How clear were the AI coach's responses and guidance?",
            korean: "AI 코치의 응답과 안내가 얼마나 명확했나요?",
        },
    },
    {
        id: "progress",
        question: {
            english: "How much progress do you feel you made in this session?",
            korean: "이번 세션에서 얼마나 발전했다고 느끼시나요?",
        },
    },
]

const likertOptions = [
    { value: "1", labelEn: "Very Dissatisfied", labelKo: "매우 불만족" },
    { value: "2", labelEn: "Dissatisfied", labelKo: "불만족" },
    { value: "3", labelEn: "Neutral", labelKo: "보통" },
    { value: "4", labelEn: "Satisfied", labelKo: "만족" },
    { value: "5", labelEn: "Very Satisfied", labelKo: "매우 만족" },
]

interface LikertScaleQuestionsProps {
    language: "english" | "korean"
    onSubmit: (responses: Record<string, string>) => void
}

export function LikertScaleQuestions({ language, onSubmit }: LikertScaleQuestionsProps) {
    const [responses, setResponses] = useState<Record<string, string>>({})

    const handleSubmit = () => {
        if (Object.keys(responses).length === likertQuestions.length) {
            onSubmit(responses)
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>
                    {language === "english" ? "Session Feedback" : "세션 피드백"}
                </CardTitle>
                <CardDescription>
                    {language === "english"
                        ? "Please rate your experience with today's coaching session"
                        : "오늘의 코칭 세션 경험을 평가해 주세요"}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {likertQuestions.map((q) => (
                    <div key={q.id} className="space-y-3">
                        <Label>{q.question[language]}</Label>
                        <RadioGroup
                            onValueChange={(value) =>
                                setResponses((prev) => ({ ...prev, [q.id]: value }))
                            }
                            className="flex justify-between"
                        >
                            {likertOptions.map((option) => (
                                <div key={option.value} className="flex flex-col items-center gap-2">
                                    <RadioGroupItem
                                        value={option.value}
                                        id={`${q.id}-${option.value}`}
                                        className="peer"
                                    />
                                    <Label
                                        htmlFor={`${q.id}-${option.value}`}
                                        className="text-xs text-center peer-data-[state=checked]:text-primary"
                                    >
                                        {language === "english" ? option.labelEn : option.labelKo}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                ))}
                <Button
                    onClick={handleSubmit}
                    className="w-full mt-6"
                    disabled={Object.keys(responses).length !== likertQuestions.length}
                >
                    {language === "english" ? "Submit Feedback" : "피드백 제출"}
                </Button>
            </CardContent>
        </Card>
    )
} 