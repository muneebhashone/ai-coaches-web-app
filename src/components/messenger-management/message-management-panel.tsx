"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Send, Download, MessageSquare, Clock, FileText,
  Plus, Edit, Trash2, AlertTriangle, Loader2, Users, Info
} from "lucide-react";
import { useClients } from "@/services/client/client.hooks"; // Placeholder
import { useGetChats, useStartChat, useSendCoachMessage, chatsKeys, useGetChatMessages } from "@/services/chats/chats.hooks";
import type { IChat, IChatMessage } from "@/services/chats/chats.types";

// TODO: These IDs need to be dynamic, e.g., from auth context or selection
const TEMP_COACH_ID = "coach123"; // Placeholder for the logged-in coach/admin
const TEMP_CHATBOT_ID_FOR_MANUAL_SEND = "chatbotForManualMessages123"; // Placeholder chatbotId for starting new chats

// Mock client data (since useClients is a placeholder)
const mockClients = [
  { _id: "client1", name: "Sarah Kim (Mock)" },
  { _id: "client2", name: "Michael Chen (Mock)" },
  { _id: "client3", name: "Emma Johnson (Mock)" },
];

export function MessageManagementPanel() {
  const t = useTranslations("dashboard.messengerManagement.messageManagement");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState("manual");
  const [manualMessage, setManualMessage] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string | "all">("all");
  
  // --- Recipient (Client) Data ---
  // COMMENT: `useClients` is a placeholder hook and returns mock data or an empty array.
  // A real implementation would fetch actual client data.
  const { data: clientsData, isLoading: isLoadingClients } = useClients();
  const clients = useMemo(() => clientsData?.data || mockClients, [clientsData]);

  // --- Manual Message Sending ---
  const startChatMutation = useStartChat();
  // For sendCoachMessage, we need a chatId. This state will hold the target chatId.
  const [targetChatIdForManualSend, setTargetChatIdForManualSend] = useState<string | null>(null);
  
  const sendCoachMessageMutation = useSendCoachMessage(targetChatIdForManualSend || "", {
    enabled: !!targetChatIdForManualSend,
    onSuccess: () => {
      toast.success(t("manualSend.success"));
      setManualMessage("");
      if (targetChatIdForManualSend) {
        queryClient.invalidateQueries({ queryKey: chatsKeys.messagesList(targetChatIdForManualSend, {}) });
      }
    },
    onError: (error) => {
      toast.error(t("manualSend.error", { error: error.message }));
    },
  });

  const handleSendManualMessage = async () => {
    if (!manualMessage.trim()) {
      toast.error(t("manualSend.emptyMessageError"));
      return;
    }
    if (selectedClientId === "all") {
      // COMMENT: Bulk messaging to "all" or "active" clients is not supported by current chat services.
      // This would require a dedicated bulk messaging API.
      toast.error(t("manualSend.bulkNotSupportedError"));
      alert(t("manualSend.bulkNotSupportedAlert"));
      return;
    }
    if (!selectedClientId) {
      toast.error(t("manualSend.noRecipientError"));
      return;
    }

    // Strategy: 1. Find existing chat with client. 2. If none, start one. 3. Send message.
    // This is complex for a "manual message". A simpler "direct message" API might be better.
    try {
      // For simplicity, we'll try to start a chat directly.
      // A more robust solution would first query for existing chats.
      // The `startChat` API needs `chatbotId` and `clientId`.
      // `sessionId` in `StartChatSchema` also needs clarification, assuming it can be client ID for now or a new session.
      // This is a placeholder for a proper session ID generation strategy.
      const tempSessionIdForStartChat = selectedClientId; 

      const chatResponse = await startChatMutation.mutateAsync({
        sessionId: tempSessionIdForStartChat, // This is likely incorrect, API expects MongoID for session
        clientId: selectedClientId,
        // chatbotId: TEMP_CHATBOT_ID_FOR_MANUAL_SEND // API schema for startChat doesn't take chatbotId
      });

      if (chatResponse.success && chatResponse.data?._id) {
        setTargetChatIdForManualSend(chatResponse.data._id);
        // useEffect will trigger sendCoachMessageMutation if targetChatIdForManualSend is set
        // However, mutateAsync needs to be called directly after state update if we want immediate send
         sendCoachMessageMutation.mutate({ content: manualMessage, role: "coach" });
      } else {
        toast.error(t("manualSend.startChatError", { error: chatResponse.message || "Failed to get chat ID" }));
      }
    } catch (error: any) {
      toast.error(t("manualSend.startChatError", { error: error.message || "Unknown error" }));
    }
  };
  
  // --- Chat Logs ---
  const [logFilters, setLogFilters] = useState<{ clientId?: string; dateFrom?: string; dateTo?: string }>({});
  const { 
    data: chatLogPages, 
    fetchNextPage: fetchNextChatLogPage, 
    hasNextPage: hasNextChatLogPage, 
    isFetchingNextPage: isFetchingNextChatLogPage,
    isLoading: isLoadingChatLogs 
  } = useGetChats(
    { 
      clientId: logFilters.clientId || undefined, 
      // TODO: Add date filtering to GetChatsQuerySchema if API supports it
    },
    { enabled: activeTab === "logs" }
  );
  const chatLogs = useMemo(() => chatLogPages?.pages.flatMap(page => page.data.data) || [], [chatLogPages]);

  // For viewing messages of a specific chat log item
  const [viewingChatId, setViewingChatId] = useState<string | null>(null);
  const { data: viewingChatMessages, isLoading: isLoadingViewingMessages } = useGetChatMessages(
    viewingChatId || "", 
    { limitParam: 50, sortOrder: "asc" },
    { enabled: !!viewingChatId }
  );


  // --- Placeholder UI for Scheduled Messages & Templates ---
  const renderMissingFeature = (featureName: string, missingApis: string[]) => (
    <div className="p-6 border rounded-lg bg-muted/30 text-center space-y-3">
      <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto" />
      <h4 className="font-semibold text-lg">{t("featureUnavailableTitle", { feature: featureName })}</h4>
      <p className="text-sm text-muted-foreground">
        {t("featureUnavailableDescription")}
      </p>
      <div className="text-xs text-muted-foreground/80 pt-2">
        <p className="font-medium">{t("missingApiListTitle")}:</p>
        <ul className="list-disc list-inside">
          {missingApis.map(api => <li key={api}>{api}</li>)}
        </ul>
      </div>
      <Button disabled variant="outline">{t("comingSoonButton")}</Button>
    </div>
  );
  
  // Display client name for logs
  const getClientName = (clientId: string) => clients.find(c => c._id === clientId)?.name || clientId;


  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-primary" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="manual">{t("manualMessageTab")}</TabsTrigger>
            <TabsTrigger value="scheduled">{t("scheduledMessagesTab")}</TabsTrigger>
            <TabsTrigger value="templates">{t("messageTemplatesTab")}</TabsTrigger>
            <TabsTrigger value="logs">{t("chatLogsTab")}</TabsTrigger>
          </TabsList>

          {/* Manual Message */}
          <TabsContent value="manual" className="space-y-4">
            {/* COMMENT: Client service (`useClients`) is a placeholder. Recipient list is mock or empty. */}
            {/* Full client filtering/segmentation for recipients is missing. */}
            <div className="p-2 border-l-4 border-amber-500/30 bg-amber-500/5 my-2">
                <p className="text-xs text-amber-700/80">
                    <strong>{tCommon("noteTitle")}:</strong> {t("manualSend.clientServicePlaceholderNote")}
                </p>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">{t("manualSend.recipientsLabel")}</Label>
                <Select 
                  value={selectedClientId} 
                  onValueChange={setSelectedClientId}
                  disabled={isLoadingClients || startChatMutation.isPending || sendCoachMessageMutation.isPending}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder={t("manualSend.selectRecipientPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" disabled>{t("manualSend.allClientsOption")} ({t("manualSend.bulkNotSupportedError")})</SelectItem>
                    {clients.map(client => (
                      <SelectItem key={client._id} value={client._id}>{client.name}</SelectItem>
                    ))}
                    {clients.length === 0 && !isLoadingClients && (
                        <p className="p-2 text-xs text-muted-foreground">{t("manualSend.noClientsFound")}</p>
                    )}
                     {isLoadingClients && <Loader2 className="h-4 w-4 animate-spin mx-auto my-2" />}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">{t("manualSend.messageLabel")}</Label>
                <Textarea
                  placeholder={t("manualSend.messagePlaceholder")}
                  value={manualMessage}
                  onChange={(e) => setManualMessage(e.target.value)}
                  className="mt-1 min-h-[100px]"
                  disabled={startChatMutation.isPending || sendCoachMessageMutation.isPending}
                />
                 {/* COMMENT: Sending a "manual message" currently involves trying to start a new chat
                              or finding an existing one. This is more complex than a simple direct message.
                              The `useSendCoachMessage` hook sends a message as a "coach" to an existing chat.
                              If the goal is to send to any client regardless of existing chat,
                              the backend might need a more direct "send message to client" API
                              that handles chat creation implicitly.
                              The current `startChat` API schema also requires a `sessionId` which is a MongoID,
                              its exact meaning in this context (for starting a chat by a coach) needs clarification.
                              Using client ID as a placeholder for sessionId in startChat is likely incorrect.
                */}
                <p className="text-xs text-muted-foreground mt-1">{t("manualSend.sendLogicNote")}</p>
              </div>

              <Button 
                onClick={handleSendManualMessage} 
                className="w-full"
                disabled={startChatMutation.isPending || sendCoachMessageMutation.isPending || selectedClientId === "all"}
              >
                {(startChatMutation.isPending || sendCoachMessageMutation.isPending) ? 
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                {t("manualSend.sendMessageButton")}
              </Button>
            </div>
          </TabsContent>

          {/* Scheduled Messages */}
          <TabsContent value="scheduled" className="space-y-4">
            {renderMissingFeature(t("scheduledMessagesTab"), [
              "API: Create Scheduled Message",
              "API: List Scheduled Messages",
              "API: Update Scheduled Message",
              "API: Delete Scheduled Message",
              "Functionality: Recipient group management for scheduled messages"
            ])}
          </TabsContent>

          {/* Message Templates */}
          <TabsContent value="templates" className="space-y-4">
             {renderMissingFeature(t("messageTemplatesTab"), [
              "API: Create Message Template",
              "API: List Message Templates",
              "API: Update Message Template",
              "API: Delete Message Template",
              "API: Send Message from Template"
            ])}
          </TabsContent>

          {/* Chat Logs */}
          <TabsContent value="logs" className="space-y-4">
            <div className="p-2 border-l-4 border-blue-500/30 bg-blue-500/5 my-2">
                <p className="text-xs text-blue-700/80">
                    <strong>{tCommon("noteTitle")}:</strong> {t("chatLogs.functionalLimitationNote")}
                </p>
            </div>
            <div className="space-y-3">
              {/* Filters - Basic client filter example */}
              <div className="flex gap-2">
                <Select 
                    value={logFilters.clientId || "all"}
                    onValueChange={(value) => setLogFilters(prev => ({...prev, clientId: value === "all" ? undefined : value}))}
                    disabled={isLoadingClients || isLoadingChatLogs}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("chatLogs.filterByClientPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("chatLogs.allClientsOption")}</SelectItem>
                    {clients.map(client => (
                      <SelectItem key={client._id} value={client._id}>{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* TODO: Add Date Range Pickers - requires API support for date filtering */}
              </div>
              
              {/* Action buttons for logs (placeholder) */}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full" disabled>
                  <Download className="h-4 w-4 mr-2" /> {t("chatLogs.downloadAllButton")}
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  <FileText className="h-4 w-4 mr-2" /> {t("chatLogs.exportByUserButton")}
                </Button>
              </div>

              {isLoadingChatLogs && <div className="text-center py-4"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>}
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {chatLogs.length === 0 && !isLoadingChatLogs && (
                  <p className="text-center text-muted-foreground py-4">{t("chatLogs.noLogsFound")}</p>
                )}
                {chatLogs.map((chat) => (
                  <Card key={chat._id} className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{t("chatLogs.chatWithLabel")} {getClientName(chat.clientId)}</p>
                        <p className="text-xs text-muted-foreground">Chat ID: {chat._id}</p>
                        <p className="text-xs text-muted-foreground">Session ID: {chat.sessionId}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={chat.active ? "default" : "outline"}>
                          {chat.active ? t("chatLogs.statusActive") : t("chatLogs.statusInactive")}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{chat.messageCount} {t("chatLogs.messagesCountSuffix")}</p>
                        <p className="text-xs text-muted-foreground">{new Date(chat.updatedAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="link" onClick={() => setViewingChatId(chat._id)} className="mt-1 px-0">
                        {t("chatLogs.viewMessagesButton")}
                    </Button>
                  </Card>
                ))}
              </div>
              {hasNextChatLogPage && (
                <Button onClick={() => fetchNextChatLogPage()} disabled={isFetchingNextChatLogPage} className="w-full mt-2">
                  {isFetchingNextChatLogPage ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : tCommon("loadMore")}
                </Button>
              )}

              {/* Modal or section to display messages for `viewingChatId` */}
              {viewingChatId && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {t("chatLogs.messagesForChatTitle", { chatId: viewingChatId })}
                      <Button variant="ghost" size="sm" onClick={() => setViewingChatId(null)}><X className="h-4 w-4"/></Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-64 overflow-y-auto space-y-2">
                    {isLoadingViewingMessages && <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />}
                    {viewingChatMessages?.data.data.map((msg: IChatMessage) => (
                       <div key={msg._id} className={`p-2 rounded-md text-sm ${msg.role === 'coach' ? 'bg-primary/10 text-primary-foreground' : 'bg-muted'}`}>
                          <span className="font-semibold capitalize">{msg.role}: </span>{msg.content}
                          <p className="text-xs text-muted-foreground/70 mt-1">{new Date(msg.timestamp).toLocaleString()}</p>
                       </div>
                    ))}
                    {!isLoadingViewingMessages && viewingChatMessages?.data.data.length === 0 && (
                        <p className="text-muted-foreground text-center">{t("chatLogs.noMessagesInChat")}</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}