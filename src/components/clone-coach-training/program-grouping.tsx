"use client";

import { useState } from "react";
import {
  IconFolder,
  IconFile,
  IconFileCertificate,
  IconFileText,
  IconPlus,
  IconEdit,
  IconTrash,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";
import { AnimatedCard } from "@/components/ui/animated-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProgramGroupingProps {
  programs: {
    id: string;
    name: string;
    fileCount: number;
    description: string;
  }[];
  files: {
    id: string;
    name: string;
    type: string;
    size: string;
    tags: string[];
    program: string;
    uploadDate: string;
  }[];
  language: "english" | "korean";
}

export function ProgramGrouping({
  programs,
  files,
  language,
}: ProgramGroupingProps) {
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const [newProgramDialogOpen, setNewProgramDialogOpen] = useState(false);
  const [editProgramDialogOpen, setEditProgramDialogOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<{
    id: string;
    name: string;
    description: string;
  } | null>(null);
  const [newProgramName, setNewProgramName] = useState("");
  const [newProgramDescription, setNewProgramDescription] = useState("");

  const toggleProgram = (programId: string) => {
    if (expandedProgram === programId) {
      setExpandedProgram(null);
    } else {
      setExpandedProgram(programId);
    }
  };

  const handleEditProgram = (program: (typeof programs)[0]) => {
    setCurrentProgram({
      id: program.id,
      name: program.name,
      description: program.description,
    });
    setNewProgramName(program.name);
    setNewProgramDescription(program.description);
    setEditProgramDialogOpen(true);
  };

  const handleSaveProgram = () => {
    // In a real app, this would save the program to the backend
    console.log("Saving program:", {
      id: currentProgram?.id || "new",
      name: newProgramName,
      description: newProgramDescription,
    });

    // Close the dialog
    setNewProgramDialogOpen(false);
    setEditProgramDialogOpen(false);

    // Reset form
    setNewProgramName("");
    setNewProgramDescription("");
    setCurrentProgram(null);
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "PDF":
        return <IconFileCertificate className="h-4 w-4 text-red-500" />;
      case "Word":
        return <IconFile className="h-4 w-4 text-blue-500" />;
      default:
        return <IconFileText className="h-4 w-4 text-green-500" />;
    }
  };

  const getProgramFiles = (programName: string) => {
    return files.filter((file) => file.program === programName);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          {language === "english" ? "Program Groups" : "프로그램 그룹"}
        </h3>
        <Button onClick={() => setNewProgramDialogOpen(true)}>
          <IconPlus className="h-4 w-4 mr-2" />
          {language === "english" ? "New Program" : "새 프로그램"}
        </Button>
      </div>

      <div className="space-y-4">
        {programs.map((program) => (
          <AnimatedCard key={program.id} className="overflow-hidden">
            <button
              type="button"
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleProgram(program.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleProgram(program.id);
                }
              }}
              tabIndex={0}
              aria-expanded={expandedProgram === program.id}
            >
              <div className="flex items-center gap-2">
                <IconFolder className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-medium">{program.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {program.fileCount}{" "}
                    {language === "english"
                      ? `file${program.fileCount !== 1 ? "s" : ""}`
                      : "파일"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditProgram(program);
                  }}
                >
                  <IconEdit className="h-4 w-4" />
                  <span className="sr-only">
                    {language === "english" ? "Edit" : "편집"}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    // In a real app, this would delete the program
                    console.log("Delete program:", program.id);
                  }}
                >
                  <IconTrash className="h-4 w-4" />
                  <span className="sr-only">
                    {language === "english" ? "Delete" : "삭제"}
                  </span>
                </Button>
                {expandedProgram === program.id ? (
                  <IconChevronDown className="h-4 w-4" />
                ) : (
                  <IconChevronRight className="h-4 w-4" />
                )}
              </div>
            </button>

            {expandedProgram === program.id && (
              <div className="px-4 pb-4">
                <Separator className="mb-4" />
                <p className="text-sm mb-4">{program.description}</p>

                <h5 className="text-sm font-medium mb-2">
                  {language === "english"
                    ? "Files in this program"
                    : "이 프로그램의 파일"}
                </h5>
                <div className="space-y-2">
                  {getProgramFiles(program.name).length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      {language === "english"
                        ? "No files in this program yet."
                        : "아직 이 프로그램에 파일이 없습니다."}
                    </p>
                  ) : (
                    getProgramFiles(program.name).map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                      >
                        <div className="flex items-center gap-2">
                          {getFileIcon(file.type)}
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {file.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {file.size}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </AnimatedCard>
        ))}
      </div>

      {/* New Program Dialog */}
      <Dialog
        open={newProgramDialogOpen}
        onOpenChange={setNewProgramDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {language === "english"
                ? "Create New Program"
                : "새 프로그램 만들기"}
            </DialogTitle>
            <DialogDescription>
              {language === "english"
                ? "Create a new program to group related files."
                : "관련 파일을 그룹화하기 위한 새 프로그램을 만듭니다."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="program-name" className="text-sm font-medium">
                {language === "english" ? "Program Name" : "프로그램 이름"}
              </label>
              <Input
                id="program-name"
                value={newProgramName}
                onChange={(e) => setNewProgramName(e.target.value)}
                placeholder={
                  language === "english"
                    ? "e.g., Stress Management Program"
                    : "예: 스트레스 관리 프로그램"
                }
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="program-description"
                className="text-sm font-medium"
              >
                {language === "english" ? "Description" : "설명"}
              </label>
              <Textarea
                id="program-description"
                value={newProgramDescription}
                onChange={(e) => setNewProgramDescription(e.target.value)}
                placeholder={
                  language === "english"
                    ? "Describe the purpose of this program..."
                    : "이 프로그램의 목적을 설명하세요..."
                }
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNewProgramDialogOpen(false)}
            >
              {language === "english" ? "Cancel" : "취소"}
            </Button>
            <Button onClick={handleSaveProgram}>
              {language === "english" ? "Create Program" : "프로그램 만들기"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Program Dialog */}
      <Dialog
        open={editProgramDialogOpen}
        onOpenChange={setEditProgramDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {language === "english" ? "Edit Program" : "프로그램 편집"}
            </DialogTitle>
            <DialogDescription>
              {language === "english"
                ? "Update program details."
                : "프로그램 세부 정보를 업데이트합니다."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label
                htmlFor="edit-program-name"
                className="text-sm font-medium"
              >
                {language === "english" ? "Program Name" : "프로그램 이름"}
              </label>
              <Input
                id="edit-program-name"
                value={newProgramName}
                onChange={(e) => setNewProgramName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="edit-program-description"
                className="text-sm font-medium"
              >
                {language === "english" ? "Description" : "설명"}
              </label>
              <Textarea
                id="edit-program-description"
                value={newProgramDescription}
                onChange={(e) => setNewProgramDescription(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditProgramDialogOpen(false)}
            >
              {language === "english" ? "Cancel" : "취소"}
            </Button>
            <Button onClick={handleSaveProgram}>
              {language === "english" ? "Save Changes" : "변경 사항 저장"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
