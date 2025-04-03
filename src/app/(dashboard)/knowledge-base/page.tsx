"use client"

import { useState } from "react"
import { 
  IconBook, 
  IconLanguage, 
  IconSearch,
  IconUpload,
  IconPlus,
  IconFolder,
  IconFile,
  IconFileCertificate,
  IconFileText
} from "@tabler/icons-react"

import { SiteHeader } from "@/components/site-header"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Mock data for documents
const documents = [
  {
    id: 1,
    name: "Getting Started Guide",
    type: "PDF",
    size: "1.2 MB",
    category: "Guides",
    updated: "2 days ago",
  },
  {
    id: 2,
    name: "Coaching Best Practices",
    type: "Word",
    size: "845 KB",
    category: "Templates",
    updated: "1 week ago",
  },
  {
    id: 3,
    name: "User Onboarding Flow",
    type: "PDF",
    size: "2.1 MB",
    category: "Guides",
    updated: "3 days ago",
  },
  {
    id: 4,
    name: "Session Scripts",
    type: "Text",
    size: "532 KB",
    category: "Templates",
    updated: "Yesterday",
  },
  {
    id: 5,
    name: "AI Training Guidelines",
    type: "PDF",
    size: "1.8 MB",
    category: "Guides",
    updated: "4 days ago",
  },
]

// Mock data for categories
const categories = [
  { id: 1, name: "Guides", count: 8 },
  { id: 2, name: "Templates", count: 5 },
  { id: 3, name: "Scripts", count: 3 },
  { id: 4, name: "References", count: 2 },
]

export default function KnowledgeBasePage() {
  const [language, setLanguage] = useState<"english" | "korean">("english")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <SiteHeader>
        <div className="flex items-center gap-2">
          <IconBook className="h-5 w-5" />
          <h1 className="text-xl font-semibold">
            {language === "english" ? "Knowledge Base" : "지식 베이스"}
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Toggle
            aria-label="Toggle language"
            pressed={language === "korean"}
            onPressedChange={(pressed) => setLanguage(pressed ? "korean" : "english")}
          >
            <IconLanguage className="h-4 w-4 mr-2" />
            {language === "english" ? "English" : "한국어"}
          </Toggle>
        </div>
      </SiteHeader>

      <div className="flex items-center justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === "english" ? "Search documents..." : "문서 검색..."}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <IconUpload className="h-4 w-4 mr-2" />
            {language === "english" ? "Upload" : "업로드"}
          </Button>
          <Button>
            <IconPlus className="h-4 w-4 mr-2" />
            {language === "english" ? "New Document" : "새 문서"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            {language === "english" ? "All Documents" : "모든 문서"}
          </TabsTrigger>
          <TabsTrigger value="recent">
            {language === "english" ? "Recent" : "최근"}
          </TabsTrigger>
          <TabsTrigger value="favorites">
            {language === "english" ? "Favorites" : "즐겨찾기"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>
                    {language === "english" ? "Categories" : "카테고리"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer">
                        <div className="flex items-center">
                          <IconFolder className="h-4 w-4 mr-2 text-primary" />
                          <span>{category.name}</span>
                        </div>
                        <Badge variant="outline">{category.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>

            <div className="lg:col-span-3">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>
                    {language === "english" ? "Documents" : "문서"}
                  </CardTitle>
                  <CardDescription>
                    {language === "english" 
                      ? "Manage your knowledge base documents" 
                      : "지식 베이스 문서 관리"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div key={doc.id}>
                        <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted cursor-pointer">
                          <div className="flex items-center">
                            {doc.type === "PDF" ? (
                              <IconFileCertificate className="h-5 w-5 mr-3 text-red-500" />
                            ) : doc.type === "Word" ? (
                              <IconFile className="h-5 w-5 mr-3 text-blue-500" />
                            ) : (
                              <IconFileText className="h-5 w-5 mr-3 text-green-500" />
                            )}
                            <div>
                              <div className="font-medium">{doc.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {doc.type} • {doc.size} • {language === "english" ? `Updated ${doc.updated}` : `${doc.updated} 업데이트됨`}
                              </div>
                            </div>
                          </div>
                          <Badge>{doc.category}</Badge>
                        </div>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AnimatedCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <AnimatedCard>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                {language === "english" 
                  ? "Showing your recently viewed or edited documents." 
                  : "최근에 보거나 편집한 문서를 표시합니다."}
              </p>
              <div className="mt-4 space-y-2">
                {documents.slice(0, 3).map((doc) => (
                  <div key={doc.id}>
                    <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted cursor-pointer">
                      <div className="flex items-center">
                        {doc.type === "PDF" ? (
                          <IconFileCertificate className="h-5 w-5 mr-3 text-red-500" />
                        ) : doc.type === "Word" ? (
                          <IconFile className="h-5 w-5 mr-3 text-blue-500" />
                        ) : (
                          <IconFileText className="h-5 w-5 mr-3 text-green-500" />
                        )}
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {doc.type} • {doc.size} • {language === "english" ? `Updated ${doc.updated}` : `${doc.updated} 업데이트됨`}
                          </div>
                        </div>
                      </div>
                      <Badge>{doc.category}</Badge>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="favorites">
          <AnimatedCard>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                {language === "english" 
                  ? "Your favorite documents for quick access." 
                  : "빠른 액세스를 위한 즐겨찾기 문서입니다."}
              </p>
              <div className="mt-4 space-y-2">
                {documents.slice(1, 3).map((doc) => (
                  <div key={doc.id}>
                    <div className="flex items-center justify-between p-3 rounded-md hover:bg-muted cursor-pointer">
                      <div className="flex items-center">
                        {doc.type === "PDF" ? (
                          <IconFileCertificate className="h-5 w-5 mr-3 text-red-500" />
                        ) : doc.type === "Word" ? (
                          <IconFile className="h-5 w-5 mr-3 text-blue-500" />
                        ) : (
                          <IconFileText className="h-5 w-5 mr-3 text-green-500" />
                        )}
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {doc.type} • {doc.size} • {language === "english" ? `Updated ${doc.updated}` : `${doc.updated} 업데이트됨`}
                          </div>
                        </div>
                      </div>
                      <Badge>{doc.category}</Badge>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </>
  )
} 