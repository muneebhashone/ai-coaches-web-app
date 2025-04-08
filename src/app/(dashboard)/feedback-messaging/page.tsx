"use client"

import { useState } from "react"
import { IconMessageForward, IconLanguage } from "@tabler/icons-react"

import { Toggle } from "@/components/ui/toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { FeedbackMessageForm } from "@/components/feedback-messaging/feedback-message-form"
import { MessageHistory } from "@/components/feedback-messaging/message-history"
import { MessagePreview } from "@/components/feedback-messaging/message-preview"

export default function FeedbackMessagingPage() {
    const [language, setLanguage] = useState<"english" | "korean">("english")

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <IconMessageForward className="h-5 w-5 page-heading-icon" />
                    <h1 className="page-heading-text">
                        {language === "english" ? "Feedback Messaging" : "피드백 메시징"}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <Toggle
                        aria-label="Toggle language"
                        pressed={language === "korean"}
                        onPressedChange={(pressed) => setLanguage(pressed ? "korean" : "english")}
                    >
                        <IconLanguage className="h-4 w-4 mr-2" />
                        {language === "english" ? "English" : "한국어"}
                    </Toggle>
                </div>
            </div>

            <Tabs defaultValue="create" className="w-full mt-6">
                <TabsList className="mb-4">
                    <TabsTrigger value="create">
                        {language === "english" ? "Create New Message" : "새 메시지 작성"}
                    </TabsTrigger>
                    <TabsTrigger value="history">
                        {language === "english" ? "Message History" : "메시지 기록"}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <FeedbackMessageForm language={language} />
                        <MessagePreview language={language} />
                    </div>
                </TabsContent>

                <TabsContent value="history">
                    <MessageHistory language={language} />
                </TabsContent>
            </Tabs>
        </>
    )
} 