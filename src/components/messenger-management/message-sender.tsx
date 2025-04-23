"use client";

import { useState } from "react";
import { IconSend, IconTemplate } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for user selection
const users = [
  { id: "1", name: "Kim Min-ji" },
  { id: "2", name: "Park Ji-sung" },
  { id: "3", name: "Lee Soo-jin" },
];

// Mock data for template messages
const templates = [
  {
    id: "1",
    name: "Session Reminder",
    content:
      "Hello! This is a reminder about our coaching session scheduled for tomorrow at 2 PM. Looking forward to speaking with you!",
  },
  {
    id: "2",
    name: "Weekly Progress Check",
    content:
      "Hi there! How has your progress been with the goals we set last week? Is there anything specific you'd like to discuss in our next session?",
  },
  {
    id: "3",
    name: "Motivational Message",
    content:
      "Just a quick note to remind you that you're making great progress! Keep up the good work and remember to practice the techniques we discussed.",
  },
];

export function MessageSender() {
  const [selectedUser, setSelectedUser] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSelectTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setMessageContent(template.content);
    }
  };

  const handleSendMessage = () => {
    if (!selectedUser || !messageContent.trim()) return;

    setIsSending(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSending(false);
      setMessageContent("");
      setShowSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <div className="p-4 pb-0">
        <h2 className="text-lg font-semibold">Manual Message Sender</h2>
        <p className="text-sm text-muted-foreground">
          Send personalized messages to users
        </p>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <IconTemplate className="mr-2 h-4 w-4" />
                  Templates
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Message Templates</DialogTitle>
                  <DialogDescription>
                    Select a template to use as a starting point for your
                    message.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => {
                        handleSelectTemplate(template.id);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSelectTemplate(template.id);
                        }
                      }}
                    >
                      <div className="font-medium mb-1">{template.name}</div>
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {template.content}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Textarea
            placeholder="Type your message here..."
            rows={5}
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />

          <div className="flex justify-between items-center">
            <div>
              {showSuccess && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <IconSend className="h-3 w-3" />
                  Message sent successfully!
                </span>
              )}
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!selectedUser || !messageContent.trim() || isSending}
            >
              {isSending ? (
                <>Sending...</>
              ) : (
                <>
                  <IconSend className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
