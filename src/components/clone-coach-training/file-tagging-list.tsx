"use client";

import { useState } from "react";
import {
  IconFile,
  IconFileCertificate,
  IconFileText,
  IconPlus,
  IconX,
  IconEdit,
  // IconTrash,
  IconFolder,
} from "@tabler/icons-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FileTaggingListProps {
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

export function FileTaggingList({ files, language }: FileTaggingListProps) {
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");

  const handleEditTags = (fileId: string, tags: string[], program: string) => {
    setEditingFile(fileId);
    setCurrentTags([...tags]);
    setSelectedProgram(program);
    setEditDialogOpen(true);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !currentTags.includes(newTag.trim())) {
      setCurrentTags([...currentTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setCurrentTags(currentTags.filter((t) => t !== tag));
  };

  const handleSaveTags = () => {
    // In a real app, this would save the tags to the backend
    console.log("Saving tags for file", editingFile, ":", currentTags);
    console.log("Selected program:", selectedProgram);
    setEditDialogOpen(false);
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "PDF":
        return <IconFileCertificate className="h-5 w-5 text-red-500" />;
      case "Word":
        return <IconFile className="h-5 w-5 text-blue-500" />;
      default:
        return <IconFileText className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {language === "english" ? "File Name" : "파일 이름"}
              </TableHead>
              <TableHead>{language === "english" ? "Type" : "유형"}</TableHead>
              <TableHead>{language === "english" ? "Size" : "크기"}</TableHead>
              <TableHead>{language === "english" ? "Tags" : "태그"}</TableHead>
              <TableHead>
                {language === "english" ? "Program" : "프로그램"}
              </TableHead>
              <TableHead>
                {language === "english" ? "Upload Date" : "업로드 날짜"}
              </TableHead>
              <TableHead className="text-right">
                {language === "english" ? "Actions" : "작업"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  {language === "english"
                    ? "No files found. Upload files to get started."
                    : "파일을 찾을 수 없습니다. 파일을 업로드하여 시작하세요."}
                </TableCell>
              </TableRow>
            ) : (
              files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.type)}
                      <span>{file.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{file.type}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {file.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{file.program}</Badge>
                  </TableCell>
                  <TableCell>{file.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleEditTags(file.id, file.tags, file.program)
                        }
                      >
                        <IconEdit className="h-4 w-4" />
                        <span className="sr-only">
                          {language === "english" ? "Edit" : "편집"}
                        </span>
                      </Button>
                      {/* <Button variant="ghost" size="icon">
                        <IconTrash className="h-4 w-4" />
                        <span className="sr-only">
                          {language === "english" ? "Delete" : "삭제"}
                        </span>
                      </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Tags Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {language === "english"
                ? "Edit Tags & Program"
                : "태그 및 프로그램 편집"}
            </DialogTitle>
            <DialogDescription>
              {language === "english"
                ? "Add or remove tags and assign to a program."
                : "태그를 추가하거나 제거하고 프로그램에 할당하세요."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">
                {language === "english" ? "Tags" : "태그"}
              </h4>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[80px]">
                {currentTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <IconX
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder={
                  language === "english"
                    ? "Add a new tag..."
                    : "새 태그 추가..."
                }
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" onClick={handleAddTag}>
                <IconPlus className="h-4 w-4 mr-2" />
                {language === "english" ? "Add" : "추가"}
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">
                {language === "english" ? "Program" : "프로그램"}
              </h4>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant={
                    selectedProgram === "Stress Program" ? "default" : "outline"
                  }
                  className="justify-start"
                  onClick={() => setSelectedProgram("Stress Program")}
                >
                  <IconFolder className="h-4 w-4 mr-2" />
                  Stress Program
                </Button>
                <Button
                  variant={
                    selectedProgram === "Sleep Program" ? "default" : "outline"
                  }
                  className="justify-start"
                  onClick={() => setSelectedProgram("Sleep Program")}
                >
                  <IconFolder className="h-4 w-4 mr-2" />
                  Sleep Program
                </Button>
                <Button
                  variant={
                    selectedProgram === "Wellness Program"
                      ? "default"
                      : "outline"
                  }
                  className="justify-start"
                  onClick={() => setSelectedProgram("Wellness Program")}
                >
                  <IconFolder className="h-4 w-4 mr-2" />
                  Wellness Program
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              {language === "english" ? "Cancel" : "취소"}
            </Button>
            <Button onClick={handleSaveTags}>
              {language === "english" ? "Save Changes" : "변경 사항 저장"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
