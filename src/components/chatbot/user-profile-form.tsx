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
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const userProfileSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    age: z.string().refine((val) => !Number.isNaN(Number(val)) && Number(val) >= 18, {
        message: "Age must be 18 or above.",
    }),
    gender: z.enum(["male", "female", "other", "prefer_not_to_say"]),
    occupation: z.string().min(2, {
        message: "Occupation must be at least 2 characters.",
    }),
})

export type UserProfileData = z.infer<typeof userProfileSchema>

interface UserProfileFormProps {
    language: "english" | "korean"
    onSubmit: (data: z.infer<typeof userProfileSchema>) => void
}

export function UserProfileForm({ language, onSubmit }: UserProfileFormProps) {
    const form = useForm<z.infer<typeof userProfileSchema>>({
        resolver: zodResolver(userProfileSchema),
        defaultValues: {
            name: "",
            age: "",
            gender: "prefer_not_to_say",
            occupation: "",
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
                            <FormLabel>
                                {language === "english" ? "Name" : "이름"}
                            </FormLabel>
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
                            <FormLabel>
                                {language === "english" ? "Age" : "나이"}
                            </FormLabel>
                            <FormControl>
                                <Input placeholder={language === "english" ? "Enter your age" : "나이를 입력하세요"} {...field} />
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
                            <FormLabel>
                                {language === "english" ? "Gender" : "성별"}
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={language === "english" ? "Select gender" : "성별 선택"} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="male">
                                        {language === "english" ? "Male" : "남성"}
                                    </SelectItem>
                                    <SelectItem value="female">
                                        {language === "english" ? "Female" : "여성"}
                                    </SelectItem>
                                    <SelectItem value="other">
                                        {language === "english" ? "Other" : "기타"}
                                    </SelectItem>
                                    <SelectItem value="prefer_not_to_say">
                                        {language === "english" ? "Prefer not to say" : "응답하지 않음"}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {language === "english" ? "Occupation" : "직업"}
                            </FormLabel>
                            <FormControl>
                                <Input placeholder={language === "english" ? "Enter your occupation" : "직업을 입력하세요"} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">
                    {language === "english" ? "Continue" : "계속하기"}
                </Button>
            </form>
        </Form>
    )
} 