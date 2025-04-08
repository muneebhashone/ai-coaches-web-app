"use client"

import { useState } from "react"
import {
    IconCalendarEvent,
    IconCheck,
    IconClockHour4,
    IconEye,
    IconMessageCircle,
    IconSearch,
    IconTrash,
    IconUsers
} from "@tabler/icons-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

type MessageHistoryProps = {
    language: "english" | "korean";
};

// Sample data for message history
const sampleMessages = [
    {
        id: "msg-1",
        title: "March Coaching Satisfaction Survey",
        sendDate: "2023-03-15T10:00:00Z",
        audience: "all",
        responseRate: 85,
        status: "completed",
    },
    {
        id: "msg-2",
        title: "Weekly Goal Check-in",
        sendDate: "2023-03-08T15:30:00Z",
        audience: "selected",
        responseRate: 92,
        status: "completed",
    },
    {
        id: "msg-3",
        title: "New Module Introduction",
        sendDate: "2023-03-01T09:00:00Z",
        audience: "all",
        responseRate: 78,
        status: "completed",
    },
    {
        id: "msg-4",
        title: "April Program Feedback",
        sendDate: "2023-04-05T14:00:00Z",
        audience: "all",
        responseRate: 0,
        status: "scheduled",
    },
    {
        id: "msg-5",
        title: "Low Response Users Follow-up",
        sendDate: "2023-03-20T11:00:00Z",
        audience: "selected",
        responseRate: 63,
        status: "completed",
    },
];

export function MessageHistory({ language }: MessageHistoryProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedMessage, setSelectedMessage] = useState<typeof sampleMessages[0] | null>(null)

    // Filter messages based on search query and status
    const filteredMessages = sampleMessages.filter(message => {
        const matchesSearch = message.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || message.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={language === "english" ? "Search messages..." : "메시지 검색..."}
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                >
                    <SelectTrigger className="w-[180px] shrink-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            {language === "english" ? "All Messages" : "모든 메시지"}
                        </SelectItem>
                        <SelectItem value="completed">
                            {language === "english" ? "Completed" : "완료됨"}
                        </SelectItem>
                        <SelectItem value="scheduled">
                            {language === "english" ? "Scheduled" : "예약됨"}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                {language === "english" ? "Message Title" : "메시지 제목"}
                            </TableHead>
                            <TableHead>
                                {language === "english" ? "Date" : "날짜"}
                            </TableHead>
                            <TableHead>
                                {language === "english" ? "Audience" : "대상"}
                            </TableHead>
                            <TableHead>
                                {language === "english" ? "Response Rate" : "응답률"}
                            </TableHead>
                            <TableHead>
                                {language === "english" ? "Status" : "상태"}
                            </TableHead>
                            <TableHead className="text-right">
                                {language === "english" ? "Actions" : "작업"}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredMessages.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    {language === "english"
                                        ? "No messages found. Try adjusting your filters."
                                        : "메시지를 찾을 수 없습니다. 필터를 조정해 보세요."}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredMessages.map((message) => (
                                <TableRow key={message.id}>
                                    <TableCell className="font-medium">{message.title}</TableCell>
                                    <TableCell>
                                        {new Date(message.sendDate).toLocaleDateString(
                                            language === "english" ? "en-US" : "ko-KR",
                                            { year: "numeric", month: "short", day: "numeric" }
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="flex items-center gap-1 w-fit">
                                            <IconUsers className="h-3 w-3" />
                                            {message.audience === "all"
                                                ? language === "english" ? "All Users" : "모든 사용자"
                                                : language === "english" ? "Selected Users" : "선택된 사용자"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {message.status === "scheduled" ? (
                                            <span className="text-muted-foreground text-sm">
                                                {language === "english" ? "Pending" : "대기 중"}
                                            </span>
                                        ) : (
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Progress value={message.responseRate} className="h-2" />
                                                    <span className="text-sm font-medium">{message.responseRate}%</span>
                                                </div>
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={message.status === "completed" ? "default" : "outline"}>
                                            {message.status === "completed"
                                                ? language === "english" ? "Completed" : "완료됨"
                                                : language === "english" ? "Scheduled" : "예약됨"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setSelectedMessage(message)}
                                            >
                                                <IconEye className="h-4 w-4" />
                                                <span className="sr-only">
                                                    {language === "english" ? "View" : "보기"}
                                                </span>
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <IconTrash className="h-4 w-4" />
                                                <span className="sr-only">
                                                    {language === "english" ? "Delete" : "삭제"}
                                                </span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Message Detail Dialog */}
            <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
                {selectedMessage && (
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>{selectedMessage.title}</DialogTitle>
                            <DialogDescription>
                                {language === "english" ? "Message details and response metrics" : "메시지 세부 정보 및 응답 지표"}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                    <IconCalendarEvent className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        {new Date(selectedMessage.sendDate).toLocaleDateString(
                                            language === "english" ? "en-US" : "ko-KR",
                                            { year: "numeric", month: "long", day: "numeric" }
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IconClockHour4 className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        {new Date(selectedMessage.sendDate).toLocaleTimeString(
                                            language === "english" ? "en-US" : "ko-KR",
                                            { hour: "2-digit", minute: "2-digit" }
                                        )}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IconUsers className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        {selectedMessage.audience === "all"
                                            ? language === "english" ? "All Users" : "모든 사용자"
                                            : language === "english" ? "Selected Users" : "선택된 사용자"}
                                    </span>
                                </div>
                            </div>

                            {selectedMessage.status === "completed" && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">
                                        {language === "english" ? "Response Metrics" : "응답 지표"}
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="rounded-lg border p-4">
                                            <div className="text-sm text-muted-foreground mb-1">
                                                {language === "english" ? "Response Rate" : "응답률"}
                                            </div>
                                            <div className="text-2xl font-bold">
                                                {selectedMessage.responseRate}%
                                            </div>
                                        </div>

                                        <div className="rounded-lg border p-4">
                                            <div className="text-sm text-muted-foreground mb-1">
                                                {language === "english" ? "Average Time" : "평균 시간"}
                                            </div>
                                            <div className="text-2xl font-bold">3.2 {language === "english" ? "min" : "분"}</div>
                                        </div>

                                        <div className="rounded-lg border p-4">
                                            <div className="text-sm text-muted-foreground mb-1">
                                                {language === "english" ? "Completion Rate" : "완료율"}
                                            </div>
                                            <div className="text-2xl font-bold">
                                                {selectedMessage.responseRate - Math.floor(Math.random() * 10)}%
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" className="gap-1">
                                            <IconMessageCircle className="h-4 w-4" />
                                            {language === "english" ? "View Responses" : "응답 보기"}
                                        </Button>
                                        <Button variant="outline" size="sm" className="gap-1">
                                            <IconCheck className="h-4 w-4" />
                                            {language === "english" ? "Export Results" : "결과 내보내기"}
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {selectedMessage.status === "scheduled" && (
                                <div className="rounded-lg border p-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">
                                            {language === "english" ? "Message is scheduled" : "메시지가 예약되었습니다"}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {language === "english"
                                                ? "This message will be sent at the scheduled time."
                                                : "이 메시지는 예약된 시간에 전송됩니다."}
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        {language === "english" ? "Cancel Schedule" : "예약 취소"}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    )
} 