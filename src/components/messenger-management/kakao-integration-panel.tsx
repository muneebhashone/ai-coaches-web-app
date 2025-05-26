"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { ConnectionList } from "@/components/messenger-management/connection-list";
import { MessageSquare, Settings, TestTube, Link, Unlink, Loader2, ExternalLink } from "lucide-react";
import { useGetKakaoInfo } from "@/services/client-kakao/client-kakao.hooks";
import type { IKakaoIntegrationInfo } from "@/services/client-kakao/client-kakao.types";

export function KakaoIntegrationPanel() {
  const t = useTranslations("dashboard.messengerManagement.kakaoIntegration");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");

  // 'isConnected' now refers to whether the Kakao OAuth app is configured on the backend.
  // It does NOT reflect if a specific user has linked their Kakao account.
  const [isKakaoConfigured, setIsKakaoConfigured] = useState(false);
  const [kakaoLoginUrl, setKakaoLoginUrl] = useState<string | null>(null);
  
  // These states remain for UI appearance but are not fully functional due to API gaps.
  const [profileName, setProfileName] = useState("AI Coach"); // Placeholder
  const [enableLinkage, setEnableLinkage] = useState(true); // Mock state
  const [testMessage, setTestMessage] = useState(""); // Mock state

  const { 
    data: kakaoInfoData, 
    isLoading: isLoadingKakaoInfo, 
    isError: isErrorKakaoInfo,
    error: kakaoInfoError,
  } = useGetKakaoInfo({
    // Auto-refetch might not be needed frequently for this kind of config data
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (kakaoInfoData?.success && kakaoInfoData.data) {
      setIsKakaoConfigured(kakaoInfoData.data.isConfigured);
      if (kakaoInfoData.data.isConfigured && kakaoInfoData.data.loginUrl) {
        setKakaoLoginUrl(kakaoInfoData.data.loginUrl);
      } else {
        setKakaoLoginUrl(null);
      }
    } else if (kakaoInfoData && !kakaoInfoData.success) {
      // Handle case where API returns success:false
      setIsKakaoConfigured(false);
      setKakaoLoginUrl(null);
      toast.error(t("fetchConfigError", { error: kakaoInfoData.message || tErrors("defaultApiError") }));
    }
  }, [kakaoInfoData, t, tErrors]);

  useEffect(() => {
    if (isErrorKakaoInfo && kakaoInfoError) {
      toast.error(t("fetchConfigError", { error: (kakaoInfoError as Error).message || tErrors("defaultApiError") }));
    }
  }, [isErrorKakaoInfo, kakaoInfoError, t, tErrors]);


  const handleConnect = () => {
    if (kakaoLoginUrl) {
      // Redirect user to Kakao's OAuth login page
      window.location.href = kakaoLoginUrl;
    } else if (isLoadingKakaoInfo) {
      toast.info(tCommon("loadingPleaseWait"));
    }
     else {
      toast.error(t("loginUrlNotAvailableError"));
    }
  };

  const handleDisconnect = () => {
    // Simulate disconnect locally as there's no API endpoint for it.
    // For a real disconnect, an API call to revoke tokens/deauthorize would be needed.
    setIsKakaoConfigured(false); // This is a simplification.
                               // In reality, the overall config might still be true,
                               // but a specific user's connection would be revoked.
    setKakaoLoginUrl(null); // Might need to refetch info to get this back
    toast.info(t("disconnectInfoPlaceholder")); 
    // TODO: Add comment about missing API for actual disconnection.
  };

  const handleSendTestMessage = () => {
    // COMMENT: This functionality depends on the 'chats' service and a selected user/chatbot.
    // It's not directly part of 'client-kakao' integration.
    if (testMessage.trim()) {
      console.log("Sending test message:", testMessage);
      toast.info("Test message sending is a placeholder.");
      setTestMessage("");
    }
  };
  
  if (isLoadingKakaoInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">{tCommon("loading")}</p>
        </CardContent>
      </Card>
    );
  }

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
                {/* This now reflects if Kakao OAuth app is configured, not if a user is linked */}
                {isKakaoConfigured ? t("configuredStatus") : t("notConfiguredStatus")}
              </p>
            </div>
            <Badge className={isKakaoConfigured ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
              {isKakaoConfigured ? t("configuredStatus") : t("notConfiguredStatus")}
            </Badge>
          </div>

          {!isKakaoConfigured ? (
            <Button onClick={handleConnect} className="w-full" disabled={!kakaoLoginUrl && !isErrorKakaoInfo /* Disable if no login URL and not in error state */}>
              <Link className="h-4 w-4 mr-2" />
              {t("connectButton")}
            </Button>
          ) : (
            <div className="space-y-4">
              {/* COMMENT: The following UI for profile name/photo is mostly placeholder
                           as `client-kakao` service does not provide APIs to GET/UPDATE
                           specific connected Kakao user's profile details for this panel.
                           This would typically come from an API call after successful OAuth callback,
                           perhaps storing relevant details in the `Client` model.
              */}
              <div className="p-3 bg-muted/30 rounded-md text-sm text-muted-foreground">
                {t("profileManagementPlaceholder")}
              </div>
              {/* Profile Configuration (Placeholder) */}
              <div className="space-y-3 opacity-50 cursor-not-allowed">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={""} /> {/* No actual photo URL from API */}
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
                      disabled // Disabled as no API to update
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm">{t("profilePhoto")}</Label>
                  <Input type="file" accept="image/*" className="mt-1" disabled /> {/* Disabled */}
                </div>
                 {/* Display Kakao Login URL if available for informational purposes */}
                 {kakaoLoginUrl && (
                    <div className="space-y-1">
                        <Label className="text-sm">{t("kakaoLoginUrlLabel")}</Label>
                        <div className="flex items-center space-x-2">
                            <Input value={kakaoLoginUrl} readOnly disabled className="bg-muted/50"/>
                            <Button variant="ghost" size="sm" asChild>
                                <a href={kakaoLoginUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </div>
                  )}
              </div>

              {/* Test Messaging (Placeholder) */}
              {/* COMMENT: Test message functionality depends on 'chats' service and user/chatbot context, not 'client-kakao'. */}
              <div className="space-y-2 opacity-50 cursor-not-allowed">
                <Label className="text-sm font-medium">{t("sendTestMessage")}</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter test message..."
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendTestMessage()}
                    disabled
                  />
                  <Button onClick={handleSendTestMessage} disabled>
                    <TestTube className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Integration Settings (Placeholder) */}
              {/* COMMENT: User linkage and assignment configuration depend on the 'client' service (currently placeholder)
                           and potentially more specific APIs beyond 'client-kakao'.
              */}
              <div className="space-y-3 pt-2 border-t opacity-50 cursor-not-allowed">
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
                    disabled
                  />
                </div>
                <Button variant="outline" className="w-full" disabled>
                  <Settings className="h-4 w-4 mr-2" />
                  {t("configureAssignments")}
                </Button>
              </div>

              {/* Disconnect Option */}
              {/* COMMENT: Actual disconnection requires a backend API to revoke tokens/deauthorize.
                           This button currently simulates a local disconnect.
              */}
              <Button
                variant="outline"
                onClick={handleDisconnect}
                className="w-full text-destructive hover:text-destructive"
              >
                <Unlink className="h-4 w-4 mr-2" />
                {t("disconnectButtonPlaceholder")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Client Connections List (Placeholder) */}
      {/* COMMENT: The ConnectionList component would list actual user connections.
                   This requires APIs to fetch linked users, which are not part of 'client-kakao'
                   and would likely come from the 'client' service.
      */}
      {isKakaoConfigured && <div className="opacity-50"><ConnectionList /></div>}
    </div>
  );
}