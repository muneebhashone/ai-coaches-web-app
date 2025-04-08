"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { LikertScaleForm } from "./likert-scale-form"
import type { LikertScaleData } from "./likert-scale-form"

interface PostSessionDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    language: "english" | "korean"
    onSubmit: (data: LikertScaleData) => void
}

export function PostSessionDialog({
    open,
    onOpenChange,
    language,
    onSubmit,
}: PostSessionDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {language === "english"
                            ? "Session Feedback"
                            : "세션 피드백"}
                    </DialogTitle>
                    <DialogDescription>
                        {language === "english"
                            ? "Please take a moment to reflect on your progress."
                            : "잠시 시간을 내어 진행 상황을 돌아보세요."}
                    </DialogDescription>
                </DialogHeader>
                <LikertScaleForm language={language} onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    )
} 