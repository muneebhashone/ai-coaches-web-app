"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Folder, Trash2, Download } from "lucide-react";

// Mock knowledge base data
const mockCoachStyleFiles = [
  { id: "1", name: "Coaching_Philosophy.pdf", size: "2.3 MB", uploadedAt: "2025-05-20" },
  { id: "2", name: "Communication_Style.docx", size: "1.8 MB", uploadedAt: "2025-05-18" },
  { id: "3", name: "Session_Examples.txt", size: "450 KB", uploadedAt: "2025-05-15" },
];

const mockProgramContentFiles = [
  { id: "4", name: "Stress_Management_Guide.pdf", size: "5.2 MB", uploadedAt: "2025-05-22" },
  { id: "5", name: "Wellness_Exercises.docx", size: "3.1 MB", uploadedAt: "2025-05-20" },
  { id: "6", name: "Goal_Setting_Framework.xlsx", size: "890 KB", uploadedAt: "2025-05-17" },
  { id: "7", name: "Mindfulness_Scripts.txt", size: "1.2 MB", uploadedAt: "2025-05-14" },
];

export function KnowledgeBasePanel() {
  const t = useTranslations("dashboard.cloneCoachTraining.knowledgeBase");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

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

  const FileList = ({ files }: { files: typeof mockCoachStyleFiles }) => (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className={`flex items-center justify-between p-3 rounded-md border transition-colors cursor-pointer ${
            selectedFiles.includes(file.id) 
              ? "bg-primary/10 border-primary" 
              : "bg-card hover:bg-muted/50"
          }`}
          onClick={() => toggleFileSelection(file.id)}
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
        </div>
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
                <h4 className="text-sm font-medium">{t("coachStyle")}</h4>
                <Badge variant="outline">{mockCoachStyleFiles.length} files</Badge>
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
                  id="coach-style-upload"
                />
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="coach-style-upload" className="cursor-pointer">
                    Select Files
                  </label>
                </Button>
              </div>

              <FileList files={mockCoachStyleFiles} />
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
      </CardContent>
    </Card>
  );
}