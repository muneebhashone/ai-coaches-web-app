"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserProfileForm, UserProfileData } from "./user-profile-form";

interface InitialProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: "english" | "korean";
  onSubmit: (data: UserProfileData) => void;
}

export function InitialProfileDialog({
  open,
  onOpenChange,
  language,
  onSubmit,
}: InitialProfileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {language === "english" ? "Welcome!" : "환영합니다!"}
          </DialogTitle>
          <DialogDescription>
            {language === "english"
              ? "Please tell us a bit about yourself to get started."
              : "시작하기 전에 자신에 대해 간단히 알려주세요."}
          </DialogDescription>
        </DialogHeader>
        <UserProfileForm language={language} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
