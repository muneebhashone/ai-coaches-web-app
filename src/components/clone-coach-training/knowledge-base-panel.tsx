"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Folder, Trash2, Download, Plus, User, Lock, AlertCircle } from "lucide-react";
import { HumanMimicryList } from "./human-mimicry-list";
import { HumanMimicryForm } from "./human-mimicry-form";
import { FileUploadZone } from "./file-upload-zone";
import { useChatbotFlowStore } from "@/stores/useChatbotFlowStore";
import { 
  useHumanMimicries, 
  useCreateHumanMimicry, 
  useUpdateHumanMimicry, 
  useDeleteHumanMimicry 
} from "@/services/human-mimicry/human-mimicry.hooks";
import type { CreateHumanMimicrySchemaType, UpdateHumanMimicrySchemaType } from "@/services/human-mimicry/human-mimicry.schema";
import { useDeleteDocument } from "@/services/documents/document.hooks";

export function KnowledgeBasePanel() {
  const t = useTranslations("dashboard.cloneCoachTraining.knowledgeBase");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedMimicryStyles, setSelectedMimicryStyles] = useState<string[]>([]);
  const [showMimicryForm, setShowMimicryForm] = useState(false);
  const [editingMimicryId, setEditingMimicryId] = useState<string | null>(null);

  const {mutateAsync: deleteDocument} = useDeleteDocument();

  const {
    selectedChatbot,
    selectedKnowledgeBase,
    documents,
    // humanMimicryStyles,
    // flowSteps,
    canAccessStep,
    // addDocument,
    removeDocument,
    // addHumanMimicryStyle,
    // removeHumanMimicryStyle,
  } = useChatbotFlowStore();

  const handleDeleteDocument = async (documentId: string) => {
    await deleteDocument({
      knowledgeBaseId: selectedKnowledgeBase?._id || "",
      documentId: documentId
    });

    removeDocument(documentId);
  };

  // API hooks
  const { data: humanMimicryData, isLoading: isLoadingMimicry } = useHumanMimicries(
    selectedChatbot?._id || "",
    { page: 1, limit: 100 }
  );
  const createMimicryMutation = useCreateHumanMimicry();
  const updateMimicryMutation = useUpdateHumanMimicry();
  const deleteMimicryMutation = useDeleteHumanMimicry();

  const humanMimicryStyles = humanMimicryData?.data?.results || [];

  // Check if this panel should be accessible
  const canAccessKnowledgeBase = canAccessStep('knowledge-base');
  const canAccessDocuments = canAccessStep('documents');
  const canAccessHumanMimicry = canAccessStep('human-mimicry');
  
  const isLocked = !selectedChatbot;


  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const toggleMimicrySelection = (styleId: string) => {
    setSelectedMimicryStyles(prev => 
      prev.includes(styleId) 
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  };

  const handleAddMimicryStyle = () => {
    if (!canAccessHumanMimicry) return;
    setEditingMimicryId(null);
    setShowMimicryForm(true);
  };

  const handleEditMimicryStyle = (styleId: string) => {
    if (!canAccessHumanMimicry) return;
    setEditingMimicryId(styleId);
    setShowMimicryForm(true);
  };

  const handleMimicryFormClose = () => {
    setShowMimicryForm(false);
    setEditingMimicryId(null);
  };

  const handleMimicryFormSave = async (data: any) => {
    if (!selectedChatbot?._id) return;

    try {
      if (editingMimicryId) {
        // Handle edit
        const updateData: UpdateHumanMimicrySchemaType = {
          name: data.name,
          description: data.description,
          style: data.style,
          examples: data.examples
        };

        await updateMimicryMutation.mutateAsync({
          chatbotId: selectedChatbot._id,
          humanMimicryId: editingMimicryId,
          data: updateData
        });
      } else {
        // Handle create
        const createData: CreateHumanMimicrySchemaType = {
          name: data.name,
          description: data.description,
          style: data.style,
          examples: data.examples,
        };

        await createMimicryMutation.mutateAsync({
          chatbotId: selectedChatbot._id,
          data: createData
        });
      }
      handleMimicryFormClose();
    } catch (error) {
      console.error("Error saving mimicry style:", error);
    }
  };

  const handleDeleteMimicryStyle = async (styleId: string) => {
    if (!selectedChatbot?._id) return;

    try {
      await deleteMimicryMutation.mutateAsync({
        chatbotId: selectedChatbot._id,
        humanMimicryId: styleId
      });
    } catch (error) {
      console.error("Error deleting mimicry style:", error);
    }
  };

  const FileList = ({ files }: { files: typeof documents }) => (
    <div className="space-y-2">
      {files.map((file) => (
        <button
          key={file._id}
          type="button"
          className={`flex items-center justify-between p-3 rounded-md border transition-colors cursor-pointer w-full text-left ${
            selectedFiles.includes(file._id) 
              ? "bg-primary/10 border-primary" 
              : "bg-card hover:bg-muted/50"
          }`}
          onClick={() => toggleFileSelection(file._id)}
          aria-pressed={selectedFiles.includes(file._id)}
        >
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {Math.round(file.fileSize / 1024)}KB • {new Date(file.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteDocument(file._id);
              }}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <Card className={`h-fit ${isLocked ? 'opacity-60' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Folder className="h-5 w-5 mr-2 text-primary" />
          {t("title")}
          {isLocked && <Lock className="h-4 w-4 ml-2 text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Locked State */}
        {isLocked && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Select a chatbot to configure knowledge base settings.
            </AlertDescription>
          </Alert>
        )}

        {/* Knowledge Base Not Ready State */}
        {!isLocked && !canAccessKnowledgeBase && (
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Complete chatbot and program setup to access knowledge base configuration.
            </AlertDescription>
          </Alert>
        )}
        <Tabs defaultValue="coach-style" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="coach-style" 
              disabled={!canAccessHumanMimicry}
            >
              {t("coachStyle")}
              {!canAccessHumanMimicry && <Lock className="h-3 w-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger 
              value="program-content"
              disabled={!canAccessDocuments}
            >
              {t("programContent")}
              {!canAccessDocuments && <Lock className="h-3 w-3 ml-1" />}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="coach-style" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Human Mimicry Styles
                </h4>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {isLoadingMimicry ? "..." : humanMimicryStyles.length} styles
                  </Badge>
                {humanMimicryStyles.length < 1 && <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleAddMimicryStyle}
                    disabled={!canAccessHumanMimicry || createMimicryMutation.isPending}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Style
                  </Button>}
                </div>
              </div>

              {showMimicryForm && (
                <HumanMimicryForm
                  editingId={editingMimicryId}
                  existingData={editingMimicryId ? humanMimicryStyles.find(s => s._id === editingMimicryId) : undefined}
                  onClose={handleMimicryFormClose}
                  onSave={handleMimicryFormSave}
                />
              )}

              <HumanMimicryList
                styles={humanMimicryStyles}
                selectedStyles={selectedMimicryStyles}
                onToggleSelection={toggleMimicrySelection}
                onEdit={handleEditMimicryStyle}
                onDelete={handleDeleteMimicryStyle}
                isLoading={isLoadingMimicry}
              />
            </div>
          </TabsContent>

          <TabsContent value="program-content" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{t("programContent")}</h4>
                <Badge variant="outline">{documents.length} files</Badge>
              </div>
              
              <FileUploadZone 
                disabled={!canAccessDocuments}
              />

              <FileList files={documents} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Selection actions for files */}
        {selectedFiles.length > 0 && (
          <div className="mt-4 p-3 bg-primary/10 rounded-md">
            <p className="text-sm text-primary font-medium">
              {selectedFiles.length} file(s) selected
            </p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline">
                {t("manageFiles")}
              </Button>
              <Button size="sm" variant="outline">
                Delete Selected
              </Button>
            </div>
          </div>
        )}

        {/* Selection actions for mimicry styles */}
        {selectedMimicryStyles.length > 0 && (
          <div className="mt-4 p-3 bg-primary/10 rounded-md">
            <p className="text-sm text-primary font-medium">
              {selectedMimicryStyles.length} style(s) selected
            </p>
            <div className="flex gap-2 mt-2">
              <Button 
                size="sm" 
                variant="outline"
                disabled={deleteMimicryMutation.isPending}
              >
                Manage Styles
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                disabled={deleteMimicryMutation.isPending}
                onClick={() => {
                  for (const styleId of selectedMimicryStyles) {
                    handleDeleteMimicryStyle(styleId);
                  }
                  setSelectedMimicryStyles([]);
                }}
              >
                Delete Selected
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}