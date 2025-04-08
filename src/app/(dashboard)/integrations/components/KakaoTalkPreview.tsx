"use client"

import { useState } from "react"
import { IconEye, IconMessage } from "@tabler/icons-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ChatBubble } from "./ChatBubble"
import { PreviewMockScreen } from "./PreviewMockScreen"

interface KakaoTalkPreviewProps {
    language: "english" | "korean"
}

export function KakaoTalkPreviewDialog({ language }: KakaoTalkPreviewProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <IconEye className="mr-2 h-4 w-4" />
                    {language === "english" ? "Preview" : "미리보기"}
                </Button>
            </DialogTrigger>
            <KakaoTalkPreview language={language} />
        </Dialog>
    )
}

export function KakaoTalkPreview({ language }: KakaoTalkPreviewProps) {
    const [activeTab, setActiveTab] = useState("user")

    return (
        <DialogContent className="!max-w-[800px] h-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>
                    {language === "english" ? "KakaoTalk Integration Preview" : "카카오톡 통합 미리보기"}
                </DialogTitle>
                <DialogDescription>
                    {language === "english"
                        ? "See how your AI coach will appear in KakaoTalk for both users and coaches."
                        : "AI 코치가 사용자와 코치 모두에게 카카오톡에서 어떻게 표시되는지 확인하세요."}
                </DialogDescription>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start mb-6">
                    <TabsTrigger value="user">
                        {language === "english" ? "User View" : "사용자 보기"}
                    </TabsTrigger>
                    <TabsTrigger value="coach">
                        {language === "english" ? "Coach View" : "코치 보기"}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="user" className="w-full">
                    <div className="flex flex-col md:flex-row gap-6 justify-between">
                        <div className="flex-1">
                            <PreviewMockScreen
                                title={language === "english" ? "AI Coach" : "AI 코치"}
                                description={language === "english" ? "User's view of AI Coach chat" : "사용자가 보는 AI 코치 채팅"}
                            >
                                <ChatBubble message={language === "english"
                                    ? "Hello! How are you feeling today?"
                                    : "안녕하세요! 오늘 기분이 어떠세요?"}
                                />
                                <ChatBubble
                                    message={language === "english"
                                        ? "I'm doing well, thanks for asking!"
                                        : "잘 지내고 있어요, 물어봐 주셔서 감사합니다!"}
                                    isUser={true}
                                />
                                <ChatBubble
                                    message={language === "english"
                                        ? "Great! Would you like to review your progress on last week's goals?"
                                        : "좋아요! 지난 주 목표에 대한 진행 상황을 검토하시겠어요?"}
                                />
                            </PreviewMockScreen>
                        </div>
                        <div className="flex flex-col flex-1 gap-2 justify-center">
                            <div className="p-4 border rounded-lg mb-4">
                                <h3 className="font-medium mb-2">
                                    {language === "english" ? "Profile Settings" : "프로필 설정"}
                                </h3>
                                <div className="flex items-center gap-2 mb-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="/images/ai-coach-avatar.png" alt="AI Coach" />
                                        <AvatarFallback>AC</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">
                                            {language === "english" ? "AI Coach Name" : "AI 코치 이름"}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {language === "english" ? "As seen by user" : "사용자에게 보이는 대로"}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        placeholder={language === "english" ? "AI Coach Name" : "AI 코치 이름"}
                                        defaultValue={language === "english" ? "Growth Coach" : "성장 코치"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="coach" className="w-full">
                    <div className="flex flex-col md:flex-row gap-6 justify-between">
                        <div className="flex-1">
                            <PreviewMockScreen
                                title={language === "english" ? "User Conversation" : "사용자 대화"}
                                description={language === "english" ? "Coach's view of user conversation" : "코치가 보는 사용자 대화"}
                            >
                                <div className="mb-3 border-b pb-2">
                                    <p className="text-xs text-muted-foreground">
                                        {language === "english" ? "User: Kim Min-ji" : "사용자: 김민지"}
                                    </p>
                                </div>
                                <ChatBubble
                                    message={language === "english"
                                        ? "Hello! How are you feeling today?"
                                        : "안녕하세요! 오늘 기분이 어떠세요?"}
                                />
                                <ChatBubble
                                    message={language === "english"
                                        ? "I'm doing well, thanks for asking!"
                                        : "잘 지내고 있어요, 물어봐 주셔서 감사합니다!"}
                                    isUser={true}
                                />
                                <ChatBubble
                                    message={language === "english"
                                        ? "Great! Would you like to review your progress on last week's goals?"
                                        : "좋아요! 지난 주 목표에 대한 진행 상황을 검토하시겠어요?"}
                                />
                                <div className="mt-3 pt-2 border-t">
                                    <p className="text-xs text-muted-foreground">
                                        {language === "english" ? "AI responding to user..." : "AI가 사용자에게 응답 중..."}
                                    </p>
                                </div>
                            </PreviewMockScreen>
                        </div>
                        <div className="flex flex-col flex-1 gap-2 justify-center">
                            <div className="p-4 border rounded-lg mb-4">
                                <h3 className="font-medium mb-2">
                                    {language === "english" ? "Coach Controls" : "코치 제어"}
                                </h3>
                                <div className="grid gap-2">
                                    <Button variant="outline" size="sm" className="justify-start">
                                        <IconEye className="mr-2 h-4 w-4" />
                                        {language === "english" ? "View All Conversations" : "모든 대화 보기"}
                                    </Button>
                                    <Button variant="outline" size="sm" className="justify-start">
                                        <IconMessage className="mr-2 h-4 w-4" />
                                        {language === "english" ? "Add Coach Note" : "코치 노트 추가"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </DialogContent>
    )
} 