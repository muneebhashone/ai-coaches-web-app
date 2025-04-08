"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const likertScaleSchema = z.object({
    actionPlanProgress: z.string().min(1, {
        message: "Please select a response.",
    }),
    emotionalState: z.string().min(1, {
        message: "Please select a response.",
    }),
    goalProgress: z.string().min(1, {
        message: "Please select a response.",
    }),
})

export type LikertScaleData = z.infer<typeof likertScaleSchema>

interface LikertScaleFormProps {
    language: "english" | "korean"
    onSubmit: (data: LikertScaleData) => void
}

const likertOptions = [
    { value: "1", label: { english: "Strongly Disagree", korean: "매우 동의하지 않음" } },
    { value: "2", label: { english: "Disagree", korean: "동의하지 않음" } },
    { value: "3", label: { english: "Neutral", korean: "보통" } },
    { value: "4", label: { english: "Agree", korean: "동의함" } },
    { value: "5", label: { english: "Strongly Agree", korean: "매우 동의함" } },
]

export function LikertScaleForm({ language, onSubmit }: LikertScaleFormProps) {
    const form = useForm<LikertScaleData>({
        resolver: zodResolver(likertScaleSchema),
        defaultValues: {
            actionPlanProgress: "",
            emotionalState: "",
            goalProgress: "",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="actionPlanProgress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {language === "english"
                                    ? "I followed through with my action plan"
                                    : "나는 실행 계획을 잘 따랐다"}
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    {likertOptions.map((option) => (
                                        <FormItem
                                            key={option.value}
                                            className="flex items-center space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                                <RadioGroupItem value={option.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {option.label[language]}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="emotionalState"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {language === "english"
                                    ? "I feel positive about my progress"
                                    : "나는 내 진전에 대해 긍정적으로 느낀다"}
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    {likertOptions.map((option) => (
                                        <FormItem
                                            key={option.value}
                                            className="flex items-center space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                                <RadioGroupItem value={option.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {option.label[language]}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="goalProgress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {language === "english"
                                    ? "I am making progress towards my goals"
                                    : "나는 목표를 향해 진전을 이루고 있다"}
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    {likertOptions.map((option) => (
                                        <FormItem
                                            key={option.value}
                                            className="flex items-center space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                                <RadioGroupItem value={option.value} />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {option.label[language]}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    {language === "english" ? "Submit Feedback" : "피드백 제출"}
                </Button>
            </form>
        </Form>
    )
} 