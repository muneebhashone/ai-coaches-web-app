"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, Edit, StickyNote, Loader2, User, AlertTriangle } from "lucide-react";
import { useClient } from "@/services/client/client.hooks"; // Placeholder hook
// import { useUpdateClient } from "@/services/client/client.hooks"; // Placeholder if it existed

// Assuming ClientUser might have a 'specialNotes' field or similar
// If not, this component relies entirely on mock data for save/load.
interface ClientSpecialNotes {
  chatbotInstructions?: string;
  importantNotes?: string;
}
interface ClientUserWithNotes { // Hypothetical structure
  _id: string;
  name?: string; // For context
  specialNotes?: ClientSpecialNotes;
}


// Mock notes data if API is not available or doesn't support notes
const mockNotesData: ClientSpecialNotes = {
  chatbotInstructions: `- Focus on stress management techniques during evening check-ins (Mock Data)
- Remind user about breathing exercises when stress levels are high (Mock Data)`,
  importantNotes: `- User has anxiety about public speaking - be supportive (Mock Data)
- Prefers visual exercises over audio-based techniques (Mock Data)`,
};

interface SpecialNotesCardProps {
  userId: string;
}

export function SpecialNotesCard({ userId }: SpecialNotesCardProps) {
  const t = useTranslations("dashboard.userManagement.detail.specialNotesCard");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");

  const [isEditing, setIsEditing] = useState(false);
  const [chatbotInstructions, setChatbotInstructions] = useState("");
  const [importantNotes, setImportantNotes] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true); // For initial load simulation
  const [isSaving, setIsSaving] = useState(false);

  // COMMENT: `useClient(userId)` is a placeholder. We'll attempt to use it.
  // If it were real, it might return a client object with a `specialNotes` field.
  // An `useUpdateClient` hook would be needed for saving.
  const { data: clientApiResponse, isLoading: isLoadingClientData } = useClient(userId);
  // const updateClientMutation = useUpdateClient(); // Placeholder for mutation

  useEffect(() => {
    setIsLoadingData(isLoadingClientData);
    if (clientApiResponse?.success && clientApiResponse.data) {
      // @ts-ignore Assuming data might have specialNotes: ClientSpecialNotes
      const notes = clientApiResponse.data.specialNotes || mockNotesData;
      setChatbotInstructions(notes.chatbotInstructions || "");
      setImportantNotes(notes.importantNotes || "");
    } else {
      // Fallback to mock data if API is placeholder or fails
      setChatbotInstructions(mockNotesData.chatbotInstructions || "");
      setImportantNotes(mockNotesData.importantNotes || "");
      if (!isLoadingClientData) setIsLoadingData(false); // Done "loading" mock
    }
  }, [clientApiResponse, isLoadingClientData]);


  const handleSave = () => {
    setIsSaving(true);
    // COMMENT: This is a placeholder for saving notes.
    // A real implementation would use a mutation like `updateClientMutation.mutateAsync(...)`
    // passing the `userId` and the notes data. The `client` service/model would need
    // to support storing these notes.
    console.log("Saving notes for user:", userId, { chatbotInstructions, importantNotes });
    toast.info(t("saveNotesProgress"));
    
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast.success(t("saveNotesSuccessPlaceholder"));
      // If using a real API, you might refetch client data here:
      // queryClient.invalidateQueries(['client', userId]);
      alert(tErrors("client.missingUpdateApiForNotes"));
    }, 1500);
  };
  
  if (isLoadingData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <StickyNote className="h-5 w-5 mr-2 text-primary" />
            {t("cardTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2 text-muted-foreground">{tCommon("loading")}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <StickyNote className="h-5 w-5 mr-2 text-primary" />
            {t("cardTitle")}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            disabled={isSaving}
          >
            {isSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Edit className="h-4 w-4 mr-1" />}
            {isEditing ? tCommon("cancel") : tCommon("edit")}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md text-amber-700/90">
            <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 mt-0.5"/>
                <div>
                    <h5 className="text-xs font-semibold">{t("apiLimitationTitle")}</h5>
                    <p className="text-xs">{t("apiLimitationDescription")}</p>
                </div>
            </div>
        </div>

        {/* Chatbot Instructions */}
        <div>
          <Label htmlFor="chatbotInstructionsArea" className="text-sm font-medium mb-2 block">
            {t("chatbotInstructionsLabel")}
          </Label>
          {isEditing ? (
            <Textarea
              id="chatbotInstructionsArea"
              value={chatbotInstructions}
              onChange={(e) => setChatbotInstructions(e.target.value)}
              placeholder={t("chatbotInstructionsPlaceholder")}
              className="min-h-[100px]"
              disabled={isSaving}
            />
          ) : (
            <div className="bg-muted/50 rounded-md p-3 text-sm min-h-[100px]">
              {chatbotInstructions ? (
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {chatbotInstructions}
                </pre>
              ) : <p className="text-muted-foreground italic">{t("noInstructionsPlaceholder")}</p>}
            </div>
          )}
        </div>

        {/* Important Notes */}
        <div>
          <Label htmlFor="importantNotesArea" className="text-sm font-medium mb-2 block">
            {t("importantNotesLabel")}
          </Label>
          {isEditing ? (
            <Textarea
              id="importantNotesArea"
              value={importantNotes}
              onChange={(e) => setImportantNotes(e.target.value)}
              placeholder={t("importantNotesPlaceholder")}
              className="min-h-[100px]"
              disabled={isSaving}
            />
          ) : (
             <div className="bg-muted/50 rounded-md p-3 text-sm min-h-[100px]">
              {importantNotes ? (
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {importantNotes}
                </pre>
              ) : <p className="text-muted-foreground italic">{t("noNotesPlaceholder")}</p>}
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} size="sm" className="flex-1" disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
              {isSaving ? tCommon("saving") : t("saveChangesButton")}
            </Button>
          </div>
        )}

        {!isEditing && (
          <div className="bg-primary/10 rounded-md p-3 text-sm">
            <p className="text-primary font-medium mb-1">💡 {t("quickTipTitle")}</p>
            <p className="text-primary/80">
              {t("quickTipContent")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}