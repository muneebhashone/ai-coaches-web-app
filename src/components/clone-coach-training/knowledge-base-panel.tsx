"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Folder, Trash2, Download, Plus, User, Loader2 } from "lucide-react";
import { HumanMimicryList } from "./human-mimicry-list";
import { HumanMimicryForm, type HumanMimicryApiData, type HumanMimicryFormValues } from "./human-mimicry-form";
import {
  useGetHumanMimicryData,
  useCreateHumanMimicryData,
  useUpdateHumanMimicryData,
  useDeleteHumanMimicryData,
  humanMimicryKeys,
} from "@/services/human-mimicry/human-mimicry.hooks";
import type { IHumanMimicryData } from "@/services/human-mimicry/human-mimicry.types";
import {
  useGetDocuments,
  useCreateDocument,
  useDeleteDocument,
  documentsKeys,
} from "@/services/documents/documents.hooks";
import { useGetSignedUrl } from "@/services/s3/s3.hooks";
import type { IDocumentSummary } from "@/services/documents/documents.types";
import { CreateDocumentSchemaType } from "@/services/documents/documents.schema";


// TODO: Replace this with actual chatbotId from context or props
// For documents, we need a knowledgeBaseId. We are assuming TEMP_CHATBOT_ID can serve as,
// or be used to derive, the knowledgeBaseId for now. This needs clarification.
const TEMP_CHATBOT_ID = "660f00c4d92a778a6a9b3e7e"; // Example ID, using as knowledgeBaseId
const TEMP_KNOWLEDGE_BASE_ID = TEMP_CHATBOT_ID; // Explicitly state assumption

// TODO: This bucket name might need to come from config or backend
const S3_BUCKET_NAME = "clone-coach-dev-docs";


export function KnowledgeBasePanel() {
  const t = useTranslations("dashboard.cloneCoachTraining.knowledgeBase");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");
  const queryClient = useQueryClient();

  const [selectedLocalFiles, setSelectedLocalFiles] = useState<FileList | null>(null);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([]);
  const [selectedMimicryStyles, setSelectedMimicryStyles] = useState<string[]>([]);
  const [showMimicryForm, setShowMimicryForm] = useState(false);
  const [editingMimicryStyle, setEditingMimicryStyle] = useState<HumanMimicryFormValues & { id: string } | undefined>(undefined);


  // --- Human Mimicry Data & Mutations (from previous step) ---
  const {
    data: humanMimicryDataPages,
    fetchNextPage: fetchNextMimicryPage,
    hasNextPage: hasNextMimicryPage,
    isFetchingNextPage: isFetchingNextMimicryPage,
    isLoading: isLoadingMimicryData,
    isError: isErrorMimicryData,
  } = useGetHumanMimicryData(TEMP_CHATBOT_ID, { limitParam: 10 });

  const humanMimicryStyles = useMemo(() => {
    return humanMimicryDataPages?.pages.flatMap(page => page.data.items) || [];
  }, [humanMimicryDataPages]);

  const createMimicryMutation = useCreateHumanMimicryData(TEMP_CHATBOT_ID, {
    onSuccess: () => {
      toast.success(t("mimicryMessages.createSuccess"));
      queryClient.invalidateQueries({ queryKey: humanMimicryKeys.lists(TEMP_CHATBOT_ID) });
      setShowMimicryForm(false);
    },
    onError: (error) => { toast.error(error.message || tErrors("defaultApiError")); },
  });

  const updateMimicryMutation = useUpdateHumanMimicryData(TEMP_CHATBOT_ID, {
    onSuccess: () => {
      toast.success(t("mimicryMessages.updateSuccess"));
      queryClient.invalidateQueries({ queryKey: humanMimicryKeys.lists(TEMP_CHATBOT_ID) });
      setShowMimicryForm(false);
      setEditingMimicryStyle(undefined);
    },
    onError: (error) => { toast.error(error.message || tErrors("defaultApiError")); },
  });

  const deleteMimicryMutation = useDeleteHumanMimicryData(TEMP_CHATBOT_ID, {
    onSuccess: () => {
      toast.success(t("mimicryMessages.deleteSuccess"));
      queryClient.invalidateQueries({ queryKey: humanMimicryKeys.lists(TEMP_CHATBOT_ID) });
      setSelectedMimicryStyles([]);
    },
    onError: (error) => { toast.error(error.message || tErrors("defaultApiError")); },
  });

  // --- Document Data & Mutations ---
  const {
    data: documentsDataPages,
    fetchNextPage: fetchNextDocumentPage,
    hasNextPage: hasNextDocumentPage,
    isFetchingNextPage: isFetchingNextDocumentPage,
    isLoading: isLoadingDocuments,
    isError: isErrorDocuments,
  } = useGetDocuments(TEMP_KNOWLEDGE_BASE_ID, { limitParam: 10 });

  const documents = useMemo(() => {
    return documentsDataPages?.pages.flatMap(page => page.data.documents) || [];
  }, [documentsDataPages]);

  const getSignedUrlMutation = useGetSignedUrl({
    onError: (error) => {
      toast.error(t("fileMessages.signedUrlError", { error: error.message }));
    },
  });

  const createDocumentMutation = useCreateDocument(TEMP_KNOWLEDGE_BASE_ID, {
    onSuccess: () => {
      toast.success(t("fileMessages.createSuccess"));
      queryClient.invalidateQueries({ queryKey: documentsKeys.lists(TEMP_KNOWLEDGE_BASE_ID) });
    },
    onError: (error) => {
      toast.error(t("fileMessages.createError", { error: error.message }));
    },
  });

  const deleteDocumentMutation = useDeleteDocument(TEMP_KNOWLEDGE_BASE_ID, {
    onSuccess: () => {
      toast.success(t("fileMessages.deleteSuccess"));
      queryClient.invalidateQueries({ queryKey: documentsKeys.lists(TEMP_KNOWLEDGE_BASE_ID) });
      setSelectedDocumentIds([]);
    },
    onError: (error) => {
      toast.error(t("fileMessages.deleteError", { error: error.message }));
    },
  });


  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedLocalFiles(event.target.files);
      // Trigger upload immediately for simplicity, or could wait for a button click
      handleFileUpload(event.target.files);
    }
    event.target.value = ""; // Reset file input
  };
  
  const handleFileUpload = async (files: FileList) => {
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      try {
        // 1. Get signed URL
        const signedUrlResponse = await getSignedUrlMutation.mutateAsync({
          // bucket: S3_BUCKET_NAME, // Backend should determine the bucket
          key: `documents/${TEMP_KNOWLEDGE_BASE_ID}/${file.name}`, // Example key structure
          contentType: file.type,
        });

        if (!signedUrlResponse.success || !signedUrlResponse.data?.signedUrl) {
          toast.error(t("fileMessages.signedUrlError", { error: signedUrlResponse.message || "No URL" }));
          continue;
        }
        
        // 2. Upload to S3
        const s3UploadResponse = await fetch(signedUrlResponse.data.signedUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!s3UploadResponse.ok) {
          toast.error(t("fileMessages.s3UploadError", { name: file.name, error: s3UploadResponse.statusText }));
          continue;
        }

        // 3. Create document record in DB
        const createDocPayload: CreateDocumentSchemaType = {
          name: file.name,
          fileType: file.type, // This should be validated/mapped to enum on backend
          fileUrl: signedUrlResponse.data.fileAccessUrl || s3UploadResponse.url.split('?')[0], // URL without query params
          fileSize: file.size,
          knowledgeBaseId: TEMP_KNOWLEDGE_BASE_ID,
          // description, processingStatus, etc., will be set by backend or later
        };
        await createDocumentMutation.mutateAsync(createDocPayload);
        toast.success(t("fileMessages.uploadSuccess", { name: file.name }));

      } catch (error: any) {
        toast.error(t("fileMessages.uploadFailed", { name: file.name, error: error.message || "Unknown error" }));
      }
    }
    setSelectedLocalFiles(null); // Clear selection after attempting upload
  };


  const toggleDocumentSelection = (docId: string) => {
    setSelectedDocumentIds(prev =>
      prev.includes(docId)
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const toggleMimicrySelection = (styleId: string) => { // Unchanged from previous step
    setSelectedMimicryStyles(prev =>
      prev.includes(styleId)
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  };

  // Unchanged Human Mimicry handlers from previous step
  const handleAddMimicryStyle = () => {
    setEditingMimicryStyle(undefined);
    setShowMimicryForm(true);
  };

  const handleEditMimicryStyle = (styleId: string) => {
    const styleToEdit = humanMimicryStyles.find(s => s._id === styleId);
    if (styleToEdit) {
      // COMMENT: The API response for IHumanMimicryData includes `personality`
      // but the Create/Update schemas do not. The form expects `personality`.
      // We need to ensure the `existingData` prop for HumanMimicryForm gets this.
      // If personality is not part of the API's update/creation, this transformation is fine.
      // However, if the API *should* save personality, the schemas and backend need update.
      setEditingMimicryStyle({
        id: styleToEdit._id,
        name: styleToEdit.name,
        description: styleToEdit.description,
        toneExample: styleToEdit.toneExample,
        styleExample: styleToEdit.styleExample,
        writingExample: styleToEdit.writingExample,
        transcripts: styleToEdit.transcripts, // Assuming transcripts might be part of IHumanMimicryData
        // Safely access personality, providing defaults if undefined
        personality: styleToEdit.personality ? {
          tone: styleToEdit.personality.tone || "",
          style: styleToEdit.personality.style || "",
          approach: styleToEdit.personality.approach || ""
        } : { tone: "", style: "", approach: "" },
      });
      setShowMimicryForm(true);
    }
  };
  
  const handleDeleteMimicryStyle = (styleId: string) => {
    // TODO: Add confirmation dialog
    deleteMimicryMutation.mutate(styleId);
  };

  const handleDeleteSelectedMimicryStyles = () => {
    if (selectedMimicryStyles.length === 0) return;
    // TODO: Add confirmation dialog for multiple deletions
    selectedMimicryStyles.forEach(id => deleteMimicryMutation.mutate(id));
    // Consider batch delete API if available and preferred
  };


  const handleMimicryFormClose = () => {
    setShowMimicryForm(false);
    setEditingMimicryStyle(undefined);
  };

  const handleMimicryFormSave = (data: HumanMimicryApiData, id?: string) => {
    // COMMENT: As noted, 'personality' is not part of HumanMimicryApiData due to API schema.
    // 'transcripts' is also not in the provided API schema for create/update.
    // If these are meant to be saved, API and its schema (CreateHumanMimicryDataSchemaType) need updates.
    if (id) {
      updateMimicryMutation.mutate({ id, data });
    } else {
      createMimicryMutation.mutate(data);
    }
  };


  const FileList = ({ files }: { files: typeof mockProgramContentFiles }) => (
    <div className="space-y-2">
      {files.map((file) => (
        <button
          key={file.id}
          type="button"
          className={`flex items-center justify-between p-3 rounded-md border transition-colors cursor-pointer w-full text-left ${
            selectedFiles.includes(file.id)
              ? "bg-primary/10 border-primary"
              : "bg-card hover:bg-muted/50"
          }`}
          onClick={() => toggleFileSelection(file.id)}
          aria-pressed={selectedFiles.includes(file.id)}
        >
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {file.size} • {file.uploadedAt}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Folder className="h-5 w-5 mr-2 text-primary" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="coach-style" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="coach-style">{t("coachStyle")}</TabsTrigger>
            <TabsTrigger value="program-content">{t("programContent")}</TabsTrigger>
          </TabsList>

          <TabsContent value="coach-style" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {t("mimicryStylesTitle")}
                </h4>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{humanMimicryStyles.length} {t("stylesBadge")}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddMimicryStyle}
                    disabled={createMimicryMutation.isPending || updateMimicryMutation.isPending}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    {t("addStyleButton")}
                  </Button>
                </div>
              </div>

              {showMimicryForm && (
                <HumanMimicryForm
                  editingId={editingMimicryStyle?.id || null}
                  existingData={editingMimicryStyle}
                  onClose={handleMimicryFormClose}
                  onSave={handleMimicryFormSave}
                  isLoading={createMimicryMutation.isPending || updateMimicryMutation.isPending}
                />
              )}
              
              {isLoadingMimicryData && (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <p className="ml-2 text-muted-foreground">{tCommon("loading")}</p>
                </div>
              )}

              {isErrorMimicryData && !isLoadingMimicryData && (
                 <div className="text-center py-4 text-destructive">
                   <p>{tErrors("mimicry.fetchFailed")}</p>
                 </div>
              )}

              {!isLoadingMimicryData && !isErrorMimicryData && !showMimicryForm && (
                <HumanMimicryList
                  // TODO: The HumanMimicryList component expects 'styles' prop with a specific structure.
                  // The API response (IHumanMimicryData) needs to be mapped to this structure.
                  // Specifically, the API returns `_id` while the component might expect `id`.
                  // Also, `createdAt` formatting might be needed.
                  // For now, we pass the raw items, assuming HumanMimicryList can handle it or will be updated.
                  styles={humanMimicryStyles.map(s => ({
                    ...s,
                    id: s._id, // Map _id to id
                    // personality might need transformation if its structure differs from form/list expectations
                    // createdAt: new Date(s.createdAt).toLocaleDateString(), // Example formatting
                  })) as any} // Cast to any temporarily if type mismatch
                  selectedStyles={selectedMimicryStyles}
                  onToggleSelection={toggleMimicrySelection}
                  onEdit={handleEditMimicryStyle}
                  onDelete={handleDeleteMimicryStyle}
                  isLoading={deleteMimicryMutation.isPending}
                />
              )}
              
              {hasNextMimicryPage && !isFetchingNextMimicryPage && !showMimicryForm && (
                <Button onClick={() => fetchNextMimicryPage()} variant="outline" className="w-full mt-4">
                  {tCommon("loadMore")}
                </Button>
              )}
              {isFetchingNextMimicryPage && (
                 <div className="flex items-center justify-center py-4">
                   <Loader2 className="h-5 w-5 animate-spin text-primary" />
                 </div>
              )}

            </div>
          </TabsContent>

          <TabsContent value="program-content" className="space-y-4">
            {/* This section remains unchanged for now, focuses on Human Mimicry integration */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{t("programContent")}</h4>
                <Badge variant="outline">{mockProgramContentFiles.length} files</Badge>
              </div>

              <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  {t("uploadDocument")}
                </p>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.txt,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="program-content-upload"
                />
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="program-content-upload" className="cursor-pointer">
                    Select Files
                  </label>
                </Button>
              </div>

              <FileList files={mockProgramContentFiles} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Selection actions for files - unchanged */}
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
        {selectedMimicryStyles.length > 0 && !showMimicryForm && (
          <div className="mt-4 p-3 bg-primary/10 rounded-md">
            <p className="text-sm text-primary font-medium">
              {selectedMimicryStyles.length} {selectedMimicryStyles.length === 1 ? t("styleSelectedSingular") : t("styleSelectedPlural")}
            </p>
            <div className="flex gap-2 mt-2">
              {/* <Button size="sm" variant="outline">
                Manage Styles
              </Button> */}
              <Button 
                size="sm" 
                variant="destructiveOutline"
                onClick={handleDeleteSelectedMimicryStyles}
                disabled={deleteMimicryMutation.isPending}
              >
                {deleteMimicryMutation.isPending && selectedMimicryStyles.some(id => deleteMimicryMutation.variables === id) 
                  ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> 
                  : <Trash2 className="h-4 w-4 mr-1" /> }
                {t("deleteSelectedButton")}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}