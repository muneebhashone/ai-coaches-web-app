"use client"

import { useState } from "react"
import { IconUpload, IconFileCheck, IconFilePlus, IconX } from "@tabler/icons-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface EnhancedFileUploadProps {
    language: "english" | "korean"
    onFilesSelected: (files: File[]) => void
    acceptedFileTypes?: string[]
    maxFileSize?: number // in MB
}

export function EnhancedFileUpload({
    language,
    onFilesSelected,
    acceptedFileTypes = [".pdf", ".doc", ".docx", ".csv", ".zip"],
    maxFileSize = 10,
}: EnhancedFileUploadProps) {
    const [dragActive, setDragActive] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [errors, setErrors] = useState<string[]>([])

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const validateFiles = (files: File[]): { valid: File[], errors: string[] } => {
        const validFiles: File[] = []
        const newErrors: string[] = []

        for (const file of Array.from(files)) {
            const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`
            const fileSize = file.size / (1024 * 1024) // Convert to MB

            if (!acceptedFileTypes.includes(fileExtension)) {
                newErrors.push(`${file.name}: ${language === "english" ? "Invalid file type" : "잘못된 파일 유형"}`)
            } else if (fileSize > maxFileSize) {
                newErrors.push(`${file.name}: ${language === "english"
                    ? `File too large (max ${maxFileSize}MB)`
                    : `파일이 너무 큽니다 (최대 ${maxFileSize}MB)`}`)
            } else {
                validFiles.push(file)
            }
        }

        return { valid: validFiles, errors: newErrors }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const { valid, errors } = validateFiles(Array.from(e.dataTransfer.files))

            if (valid.length > 0) {
                setSelectedFiles(prev => [...prev, ...valid])
                onFilesSelected(valid)
            }

            if (errors.length > 0) {
                setErrors(errors)
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const { valid, errors } = validateFiles(Array.from(e.target.files))

            if (valid.length > 0) {
                setSelectedFiles(prev => [...prev, ...valid])
                onFilesSelected(valid)
            }

            if (errors.length > 0) {
                setErrors(errors)
            }
        }
    }

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    }

    const removeError = (index: number) => {
        setErrors(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="space-y-4">
            <div
                className={`border-2 border-dashed rounded-lg p-6 ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                    } transition-colors relative`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    accept={acceptedFileTypes.join(",")}
                    multiple
                />
                <div className="flex flex-col items-center justify-center text-center">
                    <IconUpload className="h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">
                        {language === "english"
                            ? "Drag files here or click to upload"
                            : "파일을 여기에 끌어다 놓거나 클릭하여 업로드"}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        {language === "english"
                            ? `Supports: ${acceptedFileTypes.join(", ")} up to ${maxFileSize}MB`
                            : `지원: ${acceptedFileTypes.join(", ")} 최대 ${maxFileSize}MB`}
                    </p>
                </div>
            </div>

            {/* Selected files */}
            {selectedFiles.length > 0 && (
                <Card>
                    <CardContent className="p-4">
                        <h4 className="font-medium mb-2">
                            {language === "english" ? "Selected files" : "선택된 파일"}
                        </h4>
                        <div className="space-y-2">
                            {selectedFiles.map((file) => (
                                <div
                                    key={`${file.name}-${file.size}-${file.lastModified}`}
                                    className="flex items-center justify-between bg-muted/50 p-2 rounded-md"
                                >
                                    <div className="flex items-center">
                                        <IconFileCheck className="h-4 w-4 text-primary mr-2" />
                                        <span className="text-sm">{file.name}</span>
                                        <Badge variant="outline" className="ml-2 text-xs">
                                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                                        </Badge>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 w-7 p-0"
                                        onClick={() => removeFile(selectedFiles.indexOf(file))}
                                    >
                                        <IconX className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <Button className="w-full">
                                <IconFilePlus className="h-4 w-4 mr-2" />
                                {language === "english" ? "Upload All Files" : "모든 파일 업로드"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Error messages */}
            {errors.length > 0 && (
                <div className="p-4 border border-red-500/25 bg-red-500/10 rounded-md">
                    <h4 className="font-medium text-red-500 mb-2">
                        {language === "english" ? "Errors" : "오류"}
                    </h4>
                    <div className="space-y-2">
                        {errors.map((error, index) => (
                            <div key={`error-${error}-${index}`} className="flex items-center justify-between">
                                <span className="text-sm text-red-500">{error}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0 text-red-500"
                                    onClick={() => removeError(index)}
                                >
                                    <IconX className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
} 