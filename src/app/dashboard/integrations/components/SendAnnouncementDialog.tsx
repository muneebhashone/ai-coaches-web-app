"use client"

import { IconSend } from "@tabler/icons-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { ChatBubble } from "./ChatBubble"
import { PreviewMockScreen } from "./PreviewMockScreen"

interface SendAnnouncementDialogProps {
    language: "english" | "korean"
}

export function SendAnnouncementDialog({ language }: SendAnnouncementDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center">
                    <IconSend className="mr-2 h-4 w-4" />
                    {language === "english" ? "Send Announcement" : "공지사항 보내기"}
                </Button>
            </DialogTrigger>
            <DialogContent className="!max-w-[800px] h-auto max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {language === "english" ? "Send Announcement or Bulk Message" : "공지사항 또는 일괄 메시지 보내기"}
                    </DialogTitle>
                    <DialogDescription>
                        {language === "english"
                            ? "Create and send announcements to users through KakaoTalk"
                            : "카카오톡을 통해 사용자에게 공지사항을 작성하고 보내기"}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="recipients" className="text-sm mb-1 block">
                                {language === "english" ? "Recipients" : "수신자"}
                            </label>
                            <select
                                id="recipients"
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="all">
                                    {language === "english" ? "All Users" : "모든 사용자"}
                                </option>
                                <option value="active">
                                    {language === "english" ? "Active Users" : "활성 사용자"}
                                </option>
                                <option value="inactive">
                                    {language === "english" ? "Inactive Users" : "비활성 사용자"}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="announcement-message" className="text-sm mb-1 block">
                                {language === "english" ? "Message" : "메시지"}
                            </label>
                            <Textarea
                                id="announcement-message"
                                placeholder={
                                    language === "english"
                                        ? "Type your announcement here..."
                                        : "여기에 공지사항을 입력하세요..."
                                }
                                rows={4}
                            />
                        </div>
                        <div>
                            <label htmlFor="delivery-time" className="text-sm mb-1 block">
                                {language === "english" ? "Delivery Time" : "전송 시간"}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input type="date" id="delivery-date" aria-labelledby="delivery-time" />
                                <Input type="time" id="delivery-time" aria-labelledby="delivery-time" />
                            </div>
                        </div>
                        <Button className="w-full flex items-center justify-center">
                            <IconSend className="mr-2 h-4 w-4" />
                            {language === "english" ? "Send Message" : "메시지 보내기"}
                        </Button>
                    </div>

                    <div>
                        <PreviewMockScreen
                            title={language === "english" ? "Announcement Preview" : "공지사항 미리보기"}
                            description={language === "english" ? "How announcement will appear to users" : "공지사항이 사용자에게 어떻게 표시될지 미리보기"}
                        >
                            <div className="border-b pb-2 mb-3">
                                <p className="text-xs font-medium">
                                    {language === "english" ? "March 15, 2023 - 10:00 AM" : "2023년 3월 15일 - 오전 10:00"}
                                </p>
                            </div>
                            <ChatBubble
                                message={language === "english"
                                    ? "🔔 Important Announcement: We're upgrading our coaching platform this weekend. The service will be unavailable from Saturday 8PM to Sunday 2AM. Thank you for your understanding!"
                                    : "🔔 중요 공지사항: 이번 주말에 코칭 플랫폼을 업그레이드합니다. 토요일 오후 8시부터 일요일 오전 2시까지 서비스를 이용할 수 없습니다. 양해해 주셔서 감사합니다!"}
                            />
                        </PreviewMockScreen>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 