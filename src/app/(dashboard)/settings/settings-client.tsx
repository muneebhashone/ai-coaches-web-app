"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  IconSettings,
  IconLanguage,
  IconUser,
  IconBell,
  IconLock,
  IconWorld,
  IconPalette,
  IconDeviceDesktop,
  IconBrandKakoTalk,
  IconKey,
  IconMoon,
  IconSun,
  IconShieldLock,
} from "@tabler/icons-react";

import { AnimatedCard } from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PrivacySettings } from "@/components/settings/privacy-settings";

export default function SettingsPage() {
  const [language, setLanguage] = useState<"english" | "korean">("english");
  const [darkMode, setDarkMode] = useState(true);
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (
      tab &&
      [
        "account",
        "appearance",
        "notifications",
        "security",
        "privacy",
        "integrations",
      ].includes(tab)
    ) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <>
      <div className="flex items-center gap-2">
        <IconSettings className="h-5 w-5" />
        <h1 className="text-xl font-semibold">
          {language === "english" ? "Settings" : "설정"}
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Toggle
          aria-label="Toggle language"
          pressed={language === "korean"}
          onPressedChange={(pressed) =>
            setLanguage(pressed ? "korean" : "english")
          }
        >
          <IconLanguage className="h-4 w-4 mr-2" />
          {language === "english" ? "English" : "한국어"}
        </Toggle>
      </div>

      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account">
            <IconUser className="h-4 w-4 mr-2" />
            {language === "english" ? "Account" : "계정"}
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <IconPalette className="h-4 w-4 mr-2" />
            {language === "english" ? "Appearance" : "모양"}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <IconBell className="h-4 w-4 mr-2" />
            {language === "english" ? "Notifications" : "알림"}
          </TabsTrigger>
          <TabsTrigger value="security">
            <IconLock className="h-4 w-4 mr-2" />
            {language === "english" ? "Security" : "보안"}
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <IconShieldLock className="h-4 w-4 mr-2" />
            {language === "english" ? "Privacy" : "개인정보"}
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <IconBrandKakoTalk className="h-4 w-4 mr-2" />
            {language === "english" ? "Integrations" : "통합"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Profile" : "프로필"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Manage your account information"
                  : "계정 정보 관리"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      {language === "english" ? "Change Avatar" : "아바타 변경"}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "JPG, GIF or PNG. 1MB max."
                        : "JPG, GIF 또는 PNG. 최대 1MB."}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="first-name"
                        className="text-sm font-medium"
                      >
                        {language === "english" ? "First Name" : "이름"}
                      </label>
                      <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="last-name"
                        className="text-sm font-medium"
                      >
                        {language === "english" ? "Last Name" : "성"}
                      </label>
                      <Input id="last-name" defaultValue="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {language === "english" ? "Email" : "이메일"}
                    </label>
                    <Input id="email" defaultValue="john.doe@example.com" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="job-title" className="text-sm font-medium">
                      {language === "english" ? "Job Title" : "직함"}
                    </label>
                    <Input id="job-title" defaultValue="Senior Coach" />
                  </div>
                </div>

                <Button>
                  {language === "english" ? "Save Changes" : "변경사항 저장"}
                </Button>
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Preferences" : "환경설정"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Customize your coaching dashboard experience"
                  : "코칭 대시보드 경험 사용자 정의"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label htmlFor="language" className="text-sm font-medium">
                      {language === "english" ? "Language" : "언어"}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Select your preferred language"
                        : "선호하는 언어 선택"}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <IconWorld className="h-5 w-5 mr-2 text-muted-foreground" />
                    <select className="bg-background border rounded-md py-1 px-2">
                      <option value="english" selected={language === "english"}>
                        English
                      </option>
                      <option value="korean" selected={language === "korean"}>
                        한국어
                      </option>
                    </select>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label htmlFor="time-zone" className="text-sm font-medium">
                      {language === "english" ? "Time Zone" : "시간대"}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Set your local time zone"
                        : "로컬 시간대 설정"}
                    </p>
                  </div>
                  <select className="bg-background border rounded-md py-1 px-2">
                    <option value="Asia/Seoul">Asia/Seoul (UTC+9)</option>
                    <option value="America/New_York">
                      America/New_York (UTC-4)
                    </option>
                    <option value="Europe/London">Europe/London (UTC+1)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>{language === "english" ? "Theme" : "테마"}</CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Customize the appearance of the dashboard"
                  : "대시보드의 모양 사용자 정의"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label htmlFor="dark-mode" className="text-sm font-medium">
                      {language === "english" ? "Dark Mode" : "다크 모드"}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Toggle between light and dark theme"
                        : "라이트 및 다크 테마 전환"}
                    </p>
                  </div>
                  <Toggle
                    aria-label="Toggle theme"
                    pressed={darkMode}
                    onPressedChange={setDarkMode}
                    className="data-[state=on]:bg-primary"
                  >
                    {darkMode ? (
                      <IconMoon className="h-4 w-4" />
                    ) : (
                      <IconSun className="h-4 w-4" />
                    )}
                  </Toggle>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label htmlFor="color-scheme" className="text-sm font-medium">
                    {language === "english" ? "Color Scheme" : "색상 구성표"}
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      "#0ea5e9",
                      "#8b5cf6",
                      "#10b981",
                      "#f97316",
                      "#ef4444",
                    ].map((color) => (
                      <div
                        key={color}
                        className="w-full aspect-square rounded-md cursor-pointer hover:ring-2 hover:ring-primary"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <Button>
                  {language === "english" ? "Save Appearance" : "모양 저장"}
                </Button>
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Layout" : "레이아웃"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Customize the dashboard layout"
                  : "대시보드 레이아웃 사용자 정의"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="compact-mode"
                      className="text-sm font-medium"
                    >
                      {language === "english" ? "Compact Mode" : "컴팩트 모드"}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Reduce spacing and size of elements"
                        : "요소의 간격 및 크기 축소"}
                    </p>
                  </div>
                  <Toggle />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="sidebar-collapsed"
                      className="text-sm font-medium"
                    >
                      {language === "english"
                        ? "Sidebar Collapsed by Default"
                        : "기본적으로 사이드바 축소"}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Start with a collapsed sidebar"
                        : "축소된 사이드바로 시작"}
                    </p>
                  </div>
                  <Toggle />
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Notification Settings" : "알림 설정"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Configure when and how you receive notifications"
                  : "알림을 받는 시기와 방법 구성"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">
                    {language === "english"
                      ? "Email Notifications"
                      : "이메일 알림"}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="new-sessions" className="text-sm">
                        {language === "english" ? "New Sessions" : "새 세션"}
                      </label>
                      <Toggle defaultPressed />
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="session-reminders" className="text-sm">
                        {language === "english"
                          ? "Session Reminders"
                          : "세션 알림"}
                      </label>
                      <Toggle defaultPressed />
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="user-feedback" className="text-sm">
                        {language === "english"
                          ? "User Feedback"
                          : "사용자 피드백"}
                      </label>
                      <Toggle defaultPressed />
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="system-updates" className="text-sm">
                        {language === "english"
                          ? "System Updates"
                          : "시스템 업데이트"}
                      </label>
                      <Toggle />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">
                    {language === "english"
                      ? "In-App Notifications"
                      : "앱 내 알림"}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="new-messages" className="text-sm">
                        {language === "english" ? "New Messages" : "새 메시지"}
                      </label>
                      <Toggle defaultPressed />
                    </div>

                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="session-status-changes"
                        className="text-sm"
                      >
                        {language === "english"
                          ? "Session Status Changes"
                          : "세션 상태 변경"}
                      </label>
                      <Toggle defaultPressed />
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="system-alerts" className="text-sm">
                        {language === "english"
                          ? "System Alerts"
                          : "시스템 경고"}
                      </label>
                      <Toggle defaultPressed />
                    </div>
                  </div>
                </div>

                <Button>
                  {language === "english"
                    ? "Save Notification Settings"
                    : "알림 설정 저장"}
                </Button>
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Password" : "비밀번호"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Update your password"
                  : "비밀번호 업데이트"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="current-password"
                    className="text-sm font-medium"
                  >
                    {language === "english"
                      ? "Current Password"
                      : "현재 비밀번호"}
                  </label>
                  <Input type="password" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-sm font-medium">
                    {language === "english" ? "New Password" : "새 비밀번호"}
                  </label>
                  <Input type="password" />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirm-new-password"
                    className="text-sm font-medium"
                  >
                    {language === "english"
                      ? "Confirm New Password"
                      : "새 비밀번호 확인"}
                  </label>
                  <Input type="password" />
                </div>

                <Button>
                  {language === "english"
                    ? "Update Password"
                    : "비밀번호 업데이트"}
                </Button>
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english"
                  ? "Two-Factor Authentication"
                  : "이중 인증"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Add an extra layer of security to your account"
                  : "계정에 추가 보안 레이어 추가"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="enable-two-factor"
                      className="text-sm font-medium"
                    >
                      {language === "english"
                        ? "Enable Two-Factor Authentication"
                        : "이중 인증 활성화"}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {language === "english"
                        ? "Secure your account with 2FA"
                        : "2FA로 계정 보안 유지"}
                    </p>
                  </div>
                  <Toggle />
                </div>

                <Button variant="outline" className="w-full">
                  <IconKey className="h-4 w-4 mr-2" />
                  {language === "english"
                    ? "Setup Two-Factor Authentication"
                    : "이중 인증 설정"}
                </Button>
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "Sessions" : "세션"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Manage your active sessions"
                  : "활성 세션 관리"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <IconDeviceDesktop className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <div className="text-sm font-medium">
                          Windows PC - Chrome
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Seoul, South Korea • Current session
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" disabled>
                      {language === "english" ? "Current" : "현재"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <IconDeviceDesktop className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">
                          MacBook Pro - Safari
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Seoul, South Korea • Last active: 2 days ago
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {language === "english" ? "Revoke" : "취소"}
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  {language === "english"
                    ? "Log Out All Other Sessions"
                    : "다른 모든 세션 로그아웃"}
                </Button>
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <PrivacySettings language={language} />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english"
                  ? "Connected Services"
                  : "연결된 서비스"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Manage services connected to your account"
                  : "계정에 연결된 서비스 관리"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <IconBrandKakoTalk className="h-8 w-8 mr-4 text-primary" />
                    <div>
                      <div className="font-medium">KakaoTalk</div>
                      <div className="text-xs text-muted-foreground">
                        {language === "english"
                          ? "Connected on April 2, 2023"
                          : "2023년 4월 2일에 연결됨"}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {language === "english" ? "Disconnect" : "연결 해제"}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center">
                    <IconWorld className="h-8 w-8 mr-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Google Calendar</div>
                      <div className="text-xs text-muted-foreground">
                        {language === "english"
                          ? "Not connected"
                          : "연결되지 않음"}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {language === "english" ? "Connect" : "연결"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>

          {/* <AnimatedCard>
            <CardHeader>
              <CardTitle>
                {language === "english" ? "API Access" : "API 액세스"}
              </CardTitle>
              <CardDescription>
                {language === "english"
                  ? "Manage API tokens for your account"
                  : "계정의 API 토큰 관리"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="font-medium">Personal API Token</div>
                      <div className="text-xs text-muted-foreground">
                        {language === "english" ? "Created on April 1, 2023" : "2023년 4월 1일에 생성됨"}
                      </div>
                    </div>
                    <Button variant="destructive" size="sm">
                      {language === "english" ? "Revoke" : "취소"}
                    </Button>
                  </div>
                  <div className="bg-muted/50 p-2 rounded text-muted-foreground">
                    •••••••••••••••••••••••••••••
                  </div>
                </div>

                <Button variant="outline">
                  {language === "english" ? "Generate New API Token" : "새 API 토큰 생성"}
                </Button>
              </div>
            </CardContent>
          </AnimatedCard> */}
        </TabsContent>
      </Tabs>
    </>
  );
}
