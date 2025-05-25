"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Send, 
  Download, 
  MessageSquare, 
  Clock, 
  FileText,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

// Mock data
const mockTemplates = [
  { id: "1", name: "Daily Check-in", content: "Hi! How are you feeling today? Let's do a quick check-in.", usageCount: 45 },
  { id: "2", name: "Weekly Progress", content: "Great job this week! Let's review your progress and set goals for next week.", usageCount: 23 },
  { id: "3", name: "Motivation Boost", content: "Remember, every small step counts toward your goal. You're doing amazing! 🌟", usageCount: 67 },
];

const mockScheduledMessages = [
  { id: "1", template: "Daily Check-in", recipients: 15, scheduledFor: "2025-05-26 09:00", status: "Scheduled" },
  { id: "2", template: "Weekly Progress", recipients: 8, scheduledFor: "2025-05-27 18:00", status: "Scheduled" },
];

export function MessageManagementPanel() {
  const t = useTranslations("dashboard.messengerManagement.messageManagement");
  const [activeTab, setActiveTab] = useState("manual");
  const [manualMessage, setManualMessage] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState("all");
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateContent, setNewTemplateContent] = useState("");

  const handleSendManualMessage = () => {
    if (manualMessage.trim()) {
      // Send manual message logic
      console.log("Sending manual message:", { message: manualMessage, recipients: selectedRecipients });
      setManualMessage("");
    }
  };

  const handleCreateTemplate = () => {
    if (newTemplateName.trim() && newTemplateContent.trim()) {
      // Create template logic
      console.log("Creating template:", { name: newTemplateName, content: newTemplateContent });
      setNewTemplateName("");
      setNewTemplateContent("");
    }
  };

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
            <TabsTrigger value="manual">{t("manualMessage")}</TabsTrigger>
            <TabsTrigger value="scheduled">{t("scheduledMessages")}</TabsTrigger>
            <TabsTrigger value="templates">{t("messageTemplates")}</TabsTrigger>
            <TabsTrigger value="logs">{t("chatLogs")}</TabsTrigger>
          </TabsList>

          {/* Manual Message */}
          <TabsContent value="manual" className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Recipients</Label>
                <Select value={selectedRecipients} onValueChange={setSelectedRecipients}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Connected Clients (4)</SelectItem>
                    <SelectItem value="active">Active Clients Only (3)</SelectItem>
                    <SelectItem value="specific">Select Specific Clients</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Message</Label>
                <Textarea
                  placeholder="Type your message here..."
                  value={manualMessage}
                  onChange={(e) => setManualMessage(e.target.value)}
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <Button onClick={handleSendManualMessage} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                {t("sendMessage")}
              </Button>
            </div>
          </TabsContent>

          {/* Scheduled Messages */}
          <TabsContent value="scheduled" className="space-y-4">
            <div className="space-y-3">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                {t("scheduleMessage")}
              </Button>

              <div className="space-y-2">
                {mockScheduledMessages.map((scheduled) => (
                  <div key={scheduled.id} className="p-3 border rounded-lg bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{scheduled.template}</span>
                      <Badge variant="outline">{scheduled.status}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {scheduled.scheduledFor}
                      </p>
                      <p>{scheduled.recipients} recipients</p>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Message Templates */}
          <TabsContent value="templates" className="space-y-4">
            <div className="space-y-3">
              {/* Create New Template */}
              <div className="p-3 border rounded-lg bg-muted/50">
                <Label className="text-sm font-medium">Create New Template</Label>
                <div className="space-y-2 mt-2">
                  <Input
                    placeholder="Template name..."
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                  />
                  <Textarea
                    placeholder="Template content..."
                    value={newTemplateContent}
                    onChange={(e) => setNewTemplateContent(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <Button onClick={handleCreateTemplate} size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-1" />
                    Create Template
                  </Button>
                </div>
              </div>

              {/* Existing Templates */}
              <div className="space-y-2">
                {mockTemplates.map((template) => (
                  <div key={template.id} className="p-3 border rounded-lg bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{template.name}</span>
                      <Badge variant="outline">{template.usageCount} uses</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {template.content}
                    </p>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Send className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Chat Logs */}
          <TabsContent value="logs" className="space-y-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download All Logs
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Export by User
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Filter by Date Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" />
                  <Input type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Filter by Client</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clients</SelectItem>
                    <SelectItem value="sarah">Sarah Kim</SelectItem>
                    <SelectItem value="michael">Michael Chen</SelectItem>
                    <SelectItem value="emma">Emma Johnson</SelectItem>
                    <SelectItem value="david">David Park</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Generate Report
              </Button>

              <div className="bg-primary/10 rounded-md p-3 text-sm">
                <p className="text-primary font-medium mb-1">📊 Quick Stats:</p>
                <ul className="text-primary/80 text-xs space-y-1">
                  <li>• Total messages this month: 1,247</li>
                  <li>• Average response time: 2.3 minutes</li>
                  <li>• Most active client: Sarah Kim (342 messages)</li>
                  <li>• Download available for last 90 days</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}