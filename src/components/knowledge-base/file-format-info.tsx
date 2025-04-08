"use client"

import { IconFileDescription, IconFileZip, IconFileCv, IconFile3d } from "@tabler/icons-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FileFormatInfoProps {
    language: "english" | "korean"
}

export function FileFormatInfo({ language }: FileFormatInfoProps) {
    const fileFormats = [
        {
            id: "pdf",
            name: language === "english" ? "PDF Documents" : "PDF 문서",
            icon: <IconFileDescription className="h-6 w-6 text-red-500" />,
            description: language === "english" ? "Research papers, guides, books" : "연구 논문, 가이드, 책",
            maxSize: "10 MB",
        },
        {
            id: "doc",
            name: language === "english" ? "Word Documents" : "워드 문서",
            icon: <IconFile3d className="h-6 w-6 text-blue-500" />,
            description: language === "english" ? "Coaching materials, program guides" : "코칭 자료, 프로그램 안내",
            maxSize: "10 MB",
        },
        {
            id: "csv",
            name: language === "english" ? "CSV Files" : "CSV 파일",
            icon: <IconFileCv className="h-6 w-6 text-green-500" />,
            description: language === "english" ? "Data tables, metrics" : "데이터 테이블, 메트릭",
            maxSize: "5 MB",
        },
        {
            id: "zip",
            name: language === "english" ? "ZIP Archives" : "ZIP 아카이브",
            icon: <IconFileZip className="h-6 w-6 text-amber-500" />,
            description: language === "english" ? "Multiple files bundled together" : "여러 파일을 함께 묶음",
            maxSize: "20 MB",
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>{language === "english" ? "Supported File Formats" : "지원되는 파일 형식"}</CardTitle>
                <CardDescription>
                    {language === "english"
                        ? "Files that can be uploaded to the knowledge base"
                        : "지식 베이스에 업로드할 수 있는 파일"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {fileFormats.map((format) => (
                        <TooltipProvider key={format.id}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted cursor-pointer transition-colors">
                                        {format.icon}
                                        <div className="mt-2 text-sm font-medium">{format.name}</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {language === "english" ? "Max" : "최대"}: {format.maxSize}
                                        </div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>{format.description}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                    <p>
                        {language === "english"
                            ? "Maximum 20 files can be uploaded per coach account."
                            : "코치 계정당 최대 20개의 파일을 업로드할 수 있습니다."}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
} 