"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { ConnectionList } from "@/components/messenger-management/connection-list";
import { MessageSquare, Settings, TestTube, Link, Unlink } from "lucide-react";

// Mock KakaoTalk integration data
const mockKakaoData = {
  isConnected: true,
  profileName: "AI Coach Sarah",
  profilePhoto: null,
  accountId: "@aicoach_sarah",
  connectedDate: "2025-05-20",
};

export function KakaoIntegrationPanel() {
  const t = useTranslations("dashboard.messengerManagement.kakaoIntegration");
  const [isConnected, setIsConnected] = useState(mockKakaoData.isConnected);
  const [profileName, setProfileName] = useState(mockKakaoData.profileName);
  const [enableLinkage, setEnableLinkage] = useState(true);
  const [testMessage, setTestMessage] = useState("");

  const handleConnect = () => {
    // KakaoTalk OAuth flow would be triggered here
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleSendTestMessage = () => {
    if (testMessage.trim()) {
      // Send test message logic
      console.log("Sending test message:", testMessage);
      setTestMessage("");
    }
  };

  return (
    <div className="space-y-6">
      {/* KakaoTalk Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">{t("connectionStatus")}</Label>
              <p className="text-sm text-muted-foreground">
                {isConnected ? t("connected") : t("disconnected")}
              </p>
            </div>
            <Badge className={isConnected ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
              {isConnected ? t("connected") : t("disconnected")}
            </Badge>
          </div>

          {!isConnected ? (
            <Button onClick={handleConnect} className="w-full">
              <Link className="h-4 w-4 mr-2" />
              {t("connect")}
            </Button>
          ) : (
            <div className="space-y-4">
              {/* Profile Configuration */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mockKakaoData.profilePhoto || ""} />
                    <AvatarFallback>
                      {profileName.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Label className="text-sm">{t("profileName")}</Label>
                    <Input
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm">{t("profilePhoto")}</Label>
                  <Input type="file" accept="image/*" className="mt-1" />
                </div>
              </div>

              {/* Test Messaging */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">{t("sendTestMessage")}</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter test message..."
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendTestMessage()}
                  />
                  <Button onClick={handleSendTestMessage}>
                    <TestTube className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Integration Settings */}
              <div className="space-y-3 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">{t("enableLinkage")}</Label>
                    <p className="text-xs text-muted-foreground">
                      Connect users to chatbots via KakaoTalk ID
                    </p>
                  </div>
                  <Switch
                    checked={enableLinkage}
                    onCheckedChange={setEnableLinkage}
                  />
                </div>

                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  {t("configureAssignments")}
                </Button>
              </div>

              {/* Disconnect Option */}
              <Button
                variant="outline"
                onClick={handleDisconnect}
                className="w-full text-destructive hover:text-destructive"
              >
                <Unlink className="h-4 w-4 mr-2" />
                {t("disconnect")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Client Connections */}
      {isConnected && <ConnectionList />}
    </div>
  );
}