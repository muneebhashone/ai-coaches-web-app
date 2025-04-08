"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { CoachInstructionsForm } from "./coach-instructions-form"
import type { CoachInstructionsData } from "./coach-instructions-form"

interface CoachInstructionsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    language: "english" | "korean"
    onSubmit: (data: CoachInstructionsData) => void
    defaultValues?: Partial<CoachInstructionsData>
}

export function CoachInstructionsDialog({
    open,
    onOpenChange,
    language,
    onSubmit,
    defaultValues,
}: CoachInstructionsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        {language === "english"
                            ? "User-Specific Instructions"
                            : "사용자별 지침"}
                    </DialogTitle>
                    <DialogDescription>
                        {language === "english"
                            ? "Configure how the AI should interact with this specific user."
                            : "AI가 이 특정 사용자와 어떻게 상호작용해야 하는지 구성하세요."}
                    </DialogDescription>
                </DialogHeader>
                <CoachInstructionsForm
                    language={language}
                    onSubmit={onSubmit}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    )
} 