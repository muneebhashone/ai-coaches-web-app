"use client"

import { useState } from "react"
import { IconCalendarTime, IconSend } from "@tabler/icons-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

type FeedbackMessageFormProps = {
    language: "english" | "korean";
};

export function FeedbackMessageForm({ language }: FeedbackMessageFormProps) {
    // Form state
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [audienceType, setAudienceType] = useState<"all" | "selected">("all")
    const [schedule, setSchedule] = useState<"now" | "scheduled">("now")
    const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined)
    const [sendAs, setSendAs] = useState<"system" | "coach">("system")
    const [requireResponse, setRequireResponse] = useState(false)
    const [userGroup, setUserGroup] = useState<string>("")
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        // Here would be the API call to send the message
        console.log({
            title,
            message,
            audienceType,
            userGroup: audienceType === "selected" ? userGroup : undefined,
            schedule,
            scheduledDate: schedule === "scheduled" ? scheduledDate : undefined,
            sendAs,
            requireResponse
        })

        toast.success(
            language === "english"
                ? "Message prepared for sending"
                : "메시지가 전송 준비되었습니다"
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {language === "english" ? "Create Feedback Message" : "피드백 메시지 작성"}
                </CardTitle>
                <CardDescription>
                    {language === "english"
                        ? "Send surveys or questions to all users or selected groups"
                        : "모든 사용자 또는 선택된 그룹에 설문 또는 질문 보내기"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">
                            {language === "english" ? "Message Title" : "메시지 제목"}
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={language === "english" ? "e.g. March Coaching Satisfaction Survey" : "예: 3월 코칭 만족도 설문조사"}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">
                            {language === "english" ? "Message Content" : "메시지 내용"}
                        </Label>
                        <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={language === "english" ? "Enter the message or questions to send to users..." : "사용자에게 보낼 메시지나 질문을 입력하세요..."}
                            className="min-h-[120px]"
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <Label>
                            {language === "english" ? "Select Audience" : "대상 선택"}
                        </Label>
                        <RadioGroup
                            value={audienceType}
                            onValueChange={(value) => setAudienceType(value as "all" | "selected")}
                            className="flex flex-col space-y-1"
                        >
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="all" id="all-users" />
                                <Label htmlFor="all-users" className="font-normal">
                                    {language === "english" ? "All Users" : "모든 사용자"}
                                </Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="selected" id="selected-users" />
                                <Label htmlFor="selected-users" className="font-normal">
                                    {language === "english" ? "Selected Users" : "선택된 사용자"}
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {audienceType === "selected" && (
                        <div className="space-y-2">
                            <Label htmlFor="user-groups">
                                {language === "english" ? "User Groups" : "사용자 그룹"}
                            </Label>
                            <Select value={userGroup} onValueChange={setUserGroup}>
                                <SelectTrigger id="user-groups" className="w-full">
                                    <SelectValue
                                        placeholder={language === "english" ? "Select user groups" : "사용자 그룹 선택"}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high-progress">
                                        {language === "english" ? "High Progress Users" : "높은 진척도 사용자"}
                                    </SelectItem>
                                    <SelectItem value="low-response">
                                        {language === "english" ? "Low Response Users" : "낮은 응답률 사용자"}
                                    </SelectItem>
                                    <SelectItem value="stalled">
                                        {language === "english" ? "Stalled Users" : "정체된 사용자"}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="space-y-3">
                        <Label>
                            {language === "english" ? "When to Send" : "전송 시기"}
                        </Label>
                        <RadioGroup
                            value={schedule}
                            onValueChange={(value) => setSchedule(value as "now" | "scheduled")}
                            className="flex flex-col space-y-1"
                        >
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="now" id="send-now" />
                                <Label htmlFor="send-now" className="font-normal">
                                    {language === "english" ? "Send Immediately" : "즉시 전송"}
                                </Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="scheduled" id="send-later" />
                                <Label htmlFor="send-later" className="font-normal">
                                    {language === "english" ? "Schedule for Later" : "나중에 전송"}
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {schedule === "scheduled" && (
                        <div className="space-y-2">
                            <Label>
                                {language === "english" ? "Schedule Date & Time" : "예약 날짜 및 시간"}
                            </Label>
                            <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                    >
                                        <IconCalendarTime className="mr-2 h-4 w-4" />
                                        {scheduledDate ? (
                                            scheduledDate.toLocaleDateString()
                                        ) : (
                                            language === "english" ? "Select date and time" : "날짜 및 시간 선택"
                                        )}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="p-0">
                                    <Calendar
                                        mode="single"
                                        selected={scheduledDate}
                                        onSelect={(date) => {
                                            setScheduledDate(date)
                                            setIsCalendarOpen(false)
                                        }}
                                        initialFocus
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="send-as">
                            {language === "english" ? "Send As" : "전송자"}
                        </Label>
                        <Select value={sendAs} onValueChange={(value) => setSendAs(value as "system" | "coach")}>
                            <SelectTrigger id="send-as" className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="system">
                                    {language === "english" ? "System Message" : "시스템 메시지"}
                                </SelectItem>
                                <SelectItem value="coach">
                                    {language === "english" ? "From Coach" : "코치로부터"}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-start space-x-3 py-4">
                        <Checkbox
                            id="require-response"
                            checked={requireResponse}
                            onCheckedChange={(checked) => setRequireResponse(checked === true)}
                        />
                        <div className="space-y-1 leading-none">
                            <Label htmlFor="require-response">
                                {language === "english" ? "Require Response" : "응답 필수"}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                {language === "english"
                                    ? "Users must respond to receive their next coaching session"
                                    : "사용자가 다음 코칭 세션을 받기 위해 응답해야 합니다"}
                            </p>
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        <IconSend className="mr-2 h-4 w-4" />
                        {language === "english" ? "Prepare Message" : "메시지 준비"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
} 