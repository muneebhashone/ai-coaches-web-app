"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Folder, Trash2, Download, Plus, User } from "lucide-react";
import { HumanMimicryList } from "./human-mimicry-list";
import { HumanMimicryForm } from "./human-mimicry-form";

// Mock human mimicry data
const mockHumanMimicryStyles = [
  {
    id: "1",
    name: "Executive Communication Style",
    description: "Professional communication patterns for executive-level coaching",
    toneExample: "Confident, direct, yet empathetic. Uses strategic vocabulary and speaks with authority while maintaining approachability.",
    styleExample: "Structured responses with clear frameworks. Often uses analogies and real-world examples to illustrate points.",
    writingExample: "Let's examine this challenge through a strategic lens. Consider three key factors: market dynamics, team capabilities, and resource allocation. How might we approach each of these systematically?",
    personality: {
      tone: "professional",
      style: "structured",
      approach: "consultative"
    },
    createdAt: "2025-05-20"
  },
  {
    id: "2",
    name: "Empathetic Mentor Style",
    description: "Warm, supportive communication patterns for personal development coaching",
    toneExample: "Warm, encouraging, patient. Uses inclusive language and validates emotions while gently challenging growth areas.",
    styleExample: "Reflective questions, active listening responses, and gentle guidance. Often acknowledges feelings before offering solutions.",
    writingExample: "I hear that this situation is really weighing on you. It's completely understandable to feel overwhelmed when facing such significant changes. What would feel like the most supportive next step for you right now?",
    personality: {
      tone: "empathetic",
      style: "supportive",
      approach: "person-centered"
    },
    createdAt: "2025-05-18"
  }
];

// Mock program content files (keeping existing structure)
const mockProgramContentFiles = [
  { id: "4", name: "Stress_Management_Guide.pdf", size: "5.2 MB", uploadedAt: "2025-05-22" },
  { id: "5", name: "Wellness_Exercises.docx", size: "3.1 MB", uploadedAt: "2025-05-20" },
  { id: "6", name: "Goal_Setting_Framework.xlsx", size: "890 KB", uploadedAt: "2025-05-17" },
  { id: "7", name: "Mindfulness_Scripts.txt", size: "1.2 MB", uploadedAt: "2025-05-14" },
];

export function KnowledgeBasePanel() {
  const t = useTranslations("dashboard.cloneCoachTraining.knowledgeBase");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedMimicryStyles, setSelectedMimicryStyles] = useState<string[]>([]);
  const [showMimicryForm, setShowMimicryForm] = useState(false);
  const [editingMimicryId, setEditingMimicryId] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle file upload logic here
      console.log("Uploading files:", files);
    }
  };

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
    setEditingMimicryId(null);
    setShowMimicryForm(true);
  };

  const handleEditMimicryStyle = (styleId: string) => {
    setEditingMimicryId(styleId);
    setShowMimicryForm(true);
  };

  const handleMimicryFormClose = () => {
    setShowMimicryForm(false);
    setEditingMimicryId(null);
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
                  Human Mimicry Styles
                </h4>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{mockHumanMimicryStyles.length} styles</Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleAddMimicryStyle}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Style
                  </Button>
                </div>
              </div>

              {showMimicryForm && (
                <HumanMimicryForm
                  editingId={editingMimicryId}
                  existingData={editingMimicryId ? mockHumanMimicryStyles.find(s => s.id === editingMimicryId) : undefined}
                  onClose={handleMimicryFormClose}
                  onSave={(data: any) => {
                    console.log("Saving mimicry style:", data);
                    handleMimicryFormClose();
                  }}
                />
              )}

              <HumanMimicryList
                styles={mockHumanMimicryStyles}
                selectedStyles={selectedMimicryStyles}
                onToggleSelection={toggleMimicrySelection}
                onEdit={handleEditMimicryStyle}
                onDelete={(styleId: string) => {
                  console.log("Deleting style:", styleId);
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="program-content" className="space-y-4">
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
              <Button size="sm" variant="outline">
                Manage Styles
              </Button>
              <Button size="sm" variant="outline">
                Delete Selected
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}