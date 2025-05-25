"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, Edit, StickyNote } from "lucide-react";

interface SpecialNotesCardProps {
  userId: string;
}

// Mock notes data
const mockNotes = {
  chatbotInstructions: `- Focus on stress management techniques during evening check-ins
- Remind user about breathing exercises when stress levels are high
- Avoid discussing work-related topics after 8 PM
- Use encouraging tone when user reports low mood scores`,
  importantNotes: `- User has anxiety about public speaking - be supportive
- Prefers visual exercises over audio-based techniques  
- Responds well to goal-setting and progress tracking
- Timezone: GMT+9 (Seoul)
- Prefers communication in Korean during stressful periods`,
};

export function SpecialNotesCard({ }: SpecialNotesCardProps) {
  const t = useTranslations("dashboard.userManagement.detail");
  const [isEditing, setIsEditing] = useState(false);
  const [chatbotInstructions, setChatbotInstructions] = useState(mockNotes.chatbotInstructions);
  const [importantNotes, setImportantNotes] = useState(mockNotes.importantNotes);

  const handleSave = () => {
    // Here you would typically save to API
    setIsEditing(false);
    // Show success toast
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <StickyNote className="h-5 w-5 mr-2 text-primary" />
            {t("specialNotes")}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4 mr-1" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chatbot Instructions */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            {t("chatbotInstructions")}
          </Label>
          {isEditing ? (
            <Textarea
              value={chatbotInstructions}
              onChange={(e) => setChatbotInstructions(e.target.value)}
              placeholder="Enter instructions for the chatbot..."
              className="min-h-[100px]"
            />
          ) : (
            <div className="bg-muted/50 rounded-md p-3 text-sm">
              <pre className="whitespace-pre-wrap font-sans text-sm">
                {chatbotInstructions}
              </pre>
            </div>
          )}
        </div>

        {/* Important Notes */}
        <div>
          <Label className="text-sm font-medium mb-2 block">
            {t("importantNotes")}
          </Label>
          {isEditing ? (
            <Textarea
              value={importantNotes}
              onChange={(e) => setImportantNotes(e.target.value)}
              placeholder="Enter important notes to remember..."
              className="min-h-[100px]"
            />
          ) : (
            <div className="bg-muted/50 rounded-md p-3 text-sm">
              <pre className="whitespace-pre-wrap font-sans text-sm">
                {importantNotes}
              </pre>
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} size="sm" className="flex-1">
              <Save className="h-4 w-4 mr-1" />
              Save Changes
            </Button>
          </div>
        )}

        {!isEditing && (
          <div className="bg-primary/10 rounded-md p-3 text-sm">
            <p className="text-primary font-medium mb-1">💡 Quick Tip:</p>
            <p className="text-primary/80">
              These notes help personalize the AI coaching experience. 
              Update them regularly based on session insights.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}