"use client";

import { useState } from "react";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconShieldLock,
  IconTrash,
  IconDownload,
  IconAlertCircle,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface PrivacySettingsProps {
  language: "english" | "korean";
}

export function PrivacySettings({ language }: PrivacySettingsProps) {
  const [consentChecked, setConsentChecked] = useState(true);
  const [dataRetention, setDataRetention] = useState("30");
  const [deleteRequested, setDeleteRequested] = useState(false);

  const handleDataDeletion = () => {
    setDeleteRequested(true);
    toast.success(
      language === "english"
        ? "Data deletion request submitted. This process may take up to 30 days."
        : "데이터 삭제 요청이 제출되었습니다. 이 과정은 최대 30일이 소요될 수 있습니다."
    );
  };

  const handleDataDownload = () => {
    toast.success(
      language === "english"
        ? "Your data export has been initiated. You will receive a download link via email."
        : "데이터 내보내기가 시작되었습니다. 이메일로 다운로드 링크를 받게 됩니다."
    );
  };

  return (
    <AnimatedCard>
      <CardHeader>
        <div className="flex items-center gap-2">
          <IconShieldLock className="h-5 w-5 text-primary" />
          <CardTitle>
            {language === "english"
              ? "Data Privacy Settings"
              : "데이터 개인 정보 설정"}
          </CardTitle>
        </div>
        <CardDescription>
          {language === "english"
            ? "Manage your data privacy preferences and GDPR compliance settings"
            : "데이터 개인 정보 기본 설정 및 GDPR 준수 설정 관리"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Consent Management */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {language === "english" ? "Consent Management" : "동의 관리"}
          </h3>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="data-collection">
              {language === "english"
                ? "Allow data collection for service improvement"
                : "서비스 개선을 위한 데이터 수집 허용"}
            </Label>
            <Switch
              id="data-collection"
              checked={consentChecked}
              onCheckedChange={setConsentChecked}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="first-interaction">
              {language === "english"
                ? "Show privacy notice on first interaction"
                : "첫 상호작용 시 개인정보 보호 알림 표시"}
            </Label>
            <Switch id="first-interaction" defaultChecked />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="personalized-coaching">
              {language === "english"
                ? "Allow personalized coaching recommendations"
                : "맞춤형 코칭 추천 허용"}
            </Label>
            <Switch id="personalized-coaching" defaultChecked />
          </div>
        </div>

        <Separator />

        {/* Data Retention */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {language === "english" ? "Data Retention" : "데이터 보존"}
          </h3>

          <div className="grid gap-2">
            <Label htmlFor="retention-period">
              {language === "english"
                ? "Conversation history retention period"
                : "대화 기록 보존 기간"}
            </Label>
            <Select value={dataRetention} onValueChange={setDataRetention}>
              <SelectTrigger id="retention-period">
                <SelectValue
                  placeholder={
                    language === "english" ? "Select period" : "기간 선택"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">
                  {language === "english" ? "7 days" : "7일"}
                </SelectItem>
                <SelectItem value="30">
                  {language === "english" ? "30 days" : "30일"}
                </SelectItem>
                <SelectItem value="90">
                  {language === "english" ? "90 days" : "90일"}
                </SelectItem>
                <SelectItem value="365">
                  {language === "english" ? "1 year" : "1년"}
                </SelectItem>
                <SelectItem value="forever">
                  {language === "english" ? "Forever" : "영구"}
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {language === "english"
                ? "Conversation data older than this period will be automatically deleted"
                : "이 기간보다 오래된 대화 데이터는 자동으로 삭제됩니다"}
            </p>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="auto-delete">
              {language === "english"
                ? "Automatically delete inactive user data"
                : "비활성 사용자 데이터 자동 삭제"}
            </Label>
            <Switch id="auto-delete" defaultChecked />
          </div>
        </div>

        <Separator />

        {/* Data Control */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            {language === "english" ? "Data Control" : "데이터 제어"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={handleDataDownload}
            >
              <IconDownload className="h-4 w-4" />
              {language === "english"
                ? "Download My Data"
                : "내 데이터 다운로드"}
            </Button>

            <Button
              variant="destructive"
              className="w-full flex items-center gap-2"
              onClick={handleDataDeletion}
              disabled={deleteRequested}
            >
              <IconTrash className="h-4 w-4" />
              {language === "english"
                ? "Request Data Deletion"
                : "데이터 삭제 요청"}
            </Button>
          </div>

          {deleteRequested && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start gap-2">
              <IconAlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">
                {language === "english"
                  ? "Your data deletion request is being processed. This may take up to 30 days to complete."
                  : "데이터 삭제 요청이 처리 중입니다. 완료하는 데 최대 30일이 소요될 수 있습니다."}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </AnimatedCard>
  );
}
