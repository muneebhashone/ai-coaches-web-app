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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const userProfileSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    age: z.string().refine((val) => {
        const parsedAge = Number.parseInt(val, 10);
        return !Number.isNaN(parsedAge) && parsedAge > 0;
    }, {
        message: "Please enter a valid age.",
    }),
    gender: z.string({
        required_error: "Please select a gender.",
    }),
    goals: z.string().min(10, {
        message: "Goals must be at least 10 characters.",
    }),
    preferredLanguage: z.string({
        required_error: "Please select your preferred language.",
    }),
})

type UserProfileFormProps = {
    onSubmit: (data: z.infer<typeof userProfileSchema>) => void
    language: "english" | "korean"
}

export function UserProfileForm({ onSubmit, language }: UserProfileFormProps) {
    const form = useForm<z.infer<typeof userProfileSchema>>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: {
            name: "",
            age: "",
            gender: "",
            goals: "",
            preferredLanguage: "",
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{language === "english" ? "Name" : "이름"}</FormLabel>
                            <FormControl>
                                <Input placeholder={language === "english" ? "Enter your name" : "이름을 입력하세요"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{language === "english" ? "Age" : "나이"}</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{language === "english" ? "Gender" : "성별"}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={language === "english" ? "Select gender" : "성별 선택"} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="male">{language === "english" ? "Male" : "남성"}</SelectItem>
                                    <SelectItem value="female">{language === "english" ? "Female" : "여성"}</SelectItem>
                                    <SelectItem value="other">{language === "english" ? "Other" : "기타"}</SelectItem>
                                    <SelectItem value="prefer_not_to_say">
                                        {language === "english" ? "Prefer not to say" : "밝히고 싶지 않음"}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{language === "english" ? "Your Goals" : "목표"}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={
                                        language === "english"
                                            ? "What do you want to achieve with your AI coach?"
                                            : "AI 코치와 함께 이루고 싶은 목표는 무엇인가요?"
                                    }
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                {language === "english"
                                    ? "This will help us personalize your coaching experience."
                                    : "이 정보는 코칭 경험을 개인화하는 데 도움이 됩니다."}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="preferredLanguage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{language === "english" ? "Preferred Language" : "선호하는 언어"}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={language === "english" ? "Select language" : "언어 선택"}
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="english">English</SelectItem>
                                    <SelectItem value="korean">한국어</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    {language === "english" ? "Save Profile" : "프로필 저장"}
                </Button>
            </form>
        </Form>
    )
} 