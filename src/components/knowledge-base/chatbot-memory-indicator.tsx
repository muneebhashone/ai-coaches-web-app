"use client"

import { useState } from "react"
import { IconBrain, IconFilter } from "@tabler/icons-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ChatbotMemoryItem {
    id: string
    name: string
    category: string
    date: string
    type: string
    isActive: boolean
}

interface ChatbotMemoryIndicatorProps {
    language: "english" | "korean"
    items: ChatbotMemoryItem[]
    onToggleActive: (id: string, active: boolean) => void
}

export function ChatbotMemoryIndicator({
    language,
    items,
    onToggleActive
}: ChatbotMemoryIndicatorProps) {
    const [filter, setFilter] = useState<"all" | "active" | "inactive">("all")

    const filteredItems = items.filter(item => {
        if (filter === "active") return item.isActive
        if (filter === "inactive") return !item.isActive
        return true
    })

    const activeCount = items.filter(item => item.isActive).length

    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <IconBrain className="h-5 w-5 text-primary" />
                            {language === "english" ? "Chatbot Memory" : "챗봇 메모리"}
                        </CardTitle>
                        <CardDescription>
                            {language === "english"
                                ? "Materials integrated into the chatbot's knowledge"
                                : "챗봇 지식에 통합된 자료"}
                        </CardDescription>
                    </div>
                    <Badge variant="outline">
                        {activeCount} / {items.length}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-2">
                        <IconFilter className="h-4 w-4 text-muted-foreground" />
                        <Tabs value={filter} onValueChange={(value: string) => setFilter(value as "all" | "active" | "inactive")} className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="all">
                                    {language === "english" ? "All" : "전체"}
                                </TabsTrigger>
                                <TabsTrigger value="active">
                                    {language === "english" ? "Active" : "활성"}
                                </TabsTrigger>
                                <TabsTrigger value="inactive">
                                    {language === "english" ? "Inactive" : "비활성"}
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`p-3 rounded-md border flex items-center justify-between ${item.isActive ? "bg-primary/5 border-primary/30" : "bg-background"
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                                            <Badge variant="outline" className="text-xs py-0 px-1">
                                                {item.category}
                                            </Badge>
                                            <span>{item.type}</span>
                                            <span>•</span>
                                            <span>{item.date}</span>
                                        </div>
                                    </div>
                                    <Toggle
                                        pressed={item.isActive}
                                        onPressedChange={(pressed) => onToggleActive(item.id, pressed)}
                                        aria-label={`Toggle ${item.name}`}
                                    >
                                        {item.isActive
                                            ? (language === "english" ? "Active" : "활성")
                                            : (language === "english" ? "Inactive" : "비활성")}
                                    </Toggle>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                {language === "english"
                                    ? "No materials found matching the filter"
                                    : "필터와 일치하는 자료가 없습니다"}
                            </div>
                        )}
                    </div>

                    <Button variant="outline" className="w-full">
                        {language === "english" ? "Apply Memory Changes" : "메모리 변경 적용"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
} 