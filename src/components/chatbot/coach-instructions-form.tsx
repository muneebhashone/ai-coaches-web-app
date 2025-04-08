"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

const coachInstructionsSchema = z.object({
    userNotes: z.string().min(10, {
        message: "User notes should be at least 10 characters.",
    }),
    communicationStyle: z.string().min(10, {
        message: "Communication style should be at least 10 characters.",
    }),
    sensitiveTopics: z.string().min(1, {
        message: "Please list any sensitive topics.",
    }),
    preferredApproach: z.string().min(10, {
        message: "Preferred approach should be at least 10 characters.",
    }),
})

export type CoachInstructionsData = z.infer<typeof coachInstructionsSchema>

interface CoachInstructionsFormProps {
    language: "english" | "korean"
    onSubmit: (data: CoachInstructionsData) => void
    defaultValues?: Partial<CoachInstructionsData>
}

export function CoachInstructionsForm({
    language,
    onSubmit,
    defaultValues,
}: CoachInstructionsFormProps) {
    const form = useForm<CoachInstructionsData>({
        resolver: zodResolver(coachInstructionsSchema),
        defaultValues: defaultValues || {
            userNotes: "",
            communicationStyle: "",
            sensitiveTopics: "",
            preferredApproach: "",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="userNotes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {language === "english" ? "User Notes" : "사용자 노트"}
                            </FormLabel>
                            <FormDescription>
                                {language === "english"
                                    ? "Add any specific notes about this user that the AI should be aware of."
                                    : "AI가 알아야 할 이 사용자에 대한 특별한 참고사항을 추가하세요."}
                            </FormDescription>
                            <FormControl>
                                <Textarea
                                    placeholder={
                                        language === "english"
                                            ? "E.g., User prefers direct communication"
                                            : "예: 사용자는 직접적인 의사소통을 선호함"
                                    }
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="communicationStyle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {language === "english"
                                    ? "Communication Style"
                                    : "의사소통 스타일"}
                            </FormLabel>
                            <FormDescription>
                                {language === "english"
                                    ? "Specify how the AI should communicate with this user."
                                    : "AI가 이 사용자와 어떻게 소통해야 하는지 지정하세요."}
                            </FormDescription>
                            <FormControl>
                                <Textarea
                                    placeholder={
                                        language === "english"
                                            ? "E.g., Use empathetic language and positive reinforcement"
                                            : "예: 공감적인 언어와 긍정적인 강화를 사용"
                                    }
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sensitiveTopics"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {language === "english"
                                    ? "Sensitive Topics"
                                    : "민감한 주제"}
                            </FormLabel>
                            <FormDescription>
                                {language === "english"
                                    ? "List topics that should be handled with extra care."
                                    : "특별한 주의가 필요한 주제를 나열하세요."}
                            </FormDescription>
                            <FormControl>
                                <Input
                                    placeholder={
                                        language === "english"
                                            ? "E.g., Health issues, family relationships"
                                            : "예: 건강 문제, 가족 관계"
                                    }
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="preferredApproach"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {language === "english"
                                    ? "Preferred Coaching Approach"
                                    : "선호하는 코칭 접근 방식"}
                            </FormLabel>
                            <FormDescription>
                                {language === "english"
                                    ? "Describe the coaching approach that works best for this user."
                                    : "이 사용자에게 가장 효과적인 코칭 접근 방식을 설명하세요."}
                            </FormDescription>
                            <FormControl>
                                <Textarea
                                    placeholder={
                                        language === "english"
                                            ? "E.g., Goal-oriented with regular check-ins"
                                            : "예: 정기적인 확인이 있는 목표 지향적 접근"
                                    }
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    {language === "english" ? "Save Instructions" : "지침 저장"}
                </Button>
            </form>
        </Form>
    )
} 