"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { useFileUpload, type FileUploadProgress } from "@/hooks/useFileUpload";
import { IKnowledgeBase } from "@/services/knowledge-bases/knowledge-base.types";

interface FileUploadZoneProps {
  disabled?: boolean;
  className?: string;
  selectedKnowledgeBase: IKnowledgeBase;
}

export function FileUploadZone({
  disabled = false,
  className = "",
  selectedKnowledgeBase,
}: FileUploadZoneProps) {
  const {
    uploading,
    uploads,
    uploadFiles,
    removeUpload,
    retryUpload,
    clearUploads,
  } = useFileUpload({
    knowledgeBaseId: selectedKnowledgeBase?._id || "",
    onProgress: () => {
      setTimeout(() => {}, 2000);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (disabled || !selectedKnowledgeBase) return;
      uploadFiles(acceptedFiles);
    },
    [uploadFiles, disabled, selectedKnowledgeBase]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: true,
    disabled: disabled || uploading || !selectedKnowledgeBase,
  });

  const getStatusIcon = (status: FileUploadProgress["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "uploading":
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: FileUploadProgress["status"]) => {
    switch (status) {
      case "completed":
        return "border-success bg-success/10";
      case "error":
        return "border-destructive bg-destructive/10";
      case "uploading":
      case "processing":
        return "border-primary bg-primary/10";
      default:
        return "border-muted";
    }
  };

  if (!selectedKnowledgeBase) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Create a knowledge base first to upload documents.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Drop Zone */}
      <Card
        {...getRootProps()}
        className={`
          transition-colors cursor-pointer border-2 border-dashed
          ${isDragActive ? "border-primary bg-primary/5" : "border-muted"}
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-primary/50"
          }
        `}
      >
        <CardContent className="p-6 text-center">
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />

          {isDragActive ? (
            <p className="text-primary font-medium">
              Drop files here to upload
            </p>
          ) : (
            <div className="space-y-2">
              <p className="font-medium">
                {disabled
                  ? "Upload disabled"
                  : "Drop files here or click to browse"}
              </p>
              <p className="text-sm text-muted-foreground">
                Supports PDF, DOCX, TXT, XLSX files
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploads.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Upload Progress</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearUploads}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {uploads.map((upload, index) => (
                <div
                  key={`${upload.file.name}-${index}`}
                  className={`border rounded-lg p-3 ${getStatusColor(
                    upload.status
                  )}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      {getStatusIcon(upload.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {upload.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.round(upload.file.size / 1024)}KB
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          upload.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {upload.status === "uploading"
                          ? "Uploading"
                          : upload.status === "processing"
                          ? "Processing"
                          : upload.status === "completed"
                          ? "Done"
                          : upload.status === "error"
                          ? "Failed"
                          : "Pending"}
                      </Badge>

                      {upload.status === "error" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => retryUpload(index)}
                        >
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeUpload(index)}
                        disabled={upload.status === "uploading"}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {(upload.status === "uploading" ||
                    upload.status === "processing") && (
                    <Progress value={upload.progress} className="h-1" />
                  )}

                  {/* Error Message */}
                  {upload.status === "error" && upload.error && (
                    <p className="text-xs text-destructive mt-1">
                      {upload.error}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
