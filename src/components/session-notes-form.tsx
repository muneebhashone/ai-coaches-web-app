"use client"

import * as React from "react"
import { useState } from "react"
import { IconCheck, IconLanguage, IconPlus } from "@tabler/icons-react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"

const sessionSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  userName: z.string().min(1, { message: "User name is required" }),
  sessionDate: z.string().min(1, { message: "Session date is required" }),
  coachName: z.string().min(1, { message: "Coach name is required" }),
  sessionNotes: z.string().min(1, { message: "Session notes are required" }),
  sessionNotesKorean: z.string().min(1, { message: "Korean session notes are required" }),
  progress: z.number().min(0).max(100),
  status: z.string().min(1, { message: "Status is required" }),
  tags: z.array(z.string()),
  nextSession: z.string().optional(),
})

type SessionFormData = z.infer<typeof sessionSchema>

export function SessionNotesForm() {
  const [language, setLanguage] = useState<"english" | "korean">("english")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [formData, setFormData] = useState<Partial<SessionFormData>>({
    sessionDate: new Date().toISOString().split("T")[0],
    progress: 0,
    status: "In Progress",
    tags: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProgressChange = (value: string) => {
    setFormData((prev) => ({ ...prev, progress: parseInt(value, 10) }))
  }

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag]
      setTags(updatedTags)
      setFormData((prev) => ({ ...prev, tags: updatedTags }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(updatedTags)
    setFormData((prev) => ({ ...prev, tags: updatedTags }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Validate form data
      sessionSchema.parse(formData)
      
      // Submit form data (in a real app, this would send to an API)
      console.log("Form submitted:", formData)
      toast.success("Session notes saved successfully!")
      
      // Reset form
      setFormData({
        sessionDate: new Date().toISOString().split("T")[0],
        progress: 0,
        status: "In Progress",
        tags: [],
      })
      setTags([])
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message).join(", ")
        toast.error(`Validation error: ${errorMessages}`)
      } else {
        toast.error("An error occurred while saving session notes")
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Session Notes</CardTitle>
          <Toggle
            aria-label="Toggle language"
            pressed={language === "korean"}
            onPressedChange={(pressed) => setLanguage(pressed ? "korean" : "english")}
          >
            <IconLanguage className="h-4 w-4 mr-2" />
            {language === "english" ? "English" : "한국어"}
          </Toggle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userId">{language === "english" ? "User ID" : "사용자 ID"}</Label>
              <Input
                id="userId"
                name="userId"
                value={formData.userId || ""}
                onChange={handleInputChange}
                placeholder={language === "english" ? "Enter user ID" : "사용자 ID 입력"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userName">{language === "english" ? "User Name" : "사용자 이름"}</Label>
              <Input
                id="userName"
                name="userName"
                value={formData.userName || ""}
                onChange={handleInputChange}
                placeholder={language === "english" ? "Enter user name" : "사용자 이름 입력"}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sessionDate">{language === "english" ? "Session Date" : "세션 날짜"}</Label>
              <Input
                id="sessionDate"
                name="sessionDate"
                type="date"
                value={formData.sessionDate || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coachName">{language === "english" ? "Coach Name" : "코치 이름"}</Label>
              <Input
                id="coachName"
                name="coachName"
                value={formData.coachName || ""}
                onChange={handleInputChange}
                placeholder={language === "english" ? "Enter coach name" : "코치 이름 입력"}
              />
            </div>
          </div>

          <Tabs defaultValue="english" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="english">English</TabsTrigger>
              <TabsTrigger value="korean">한국어</TabsTrigger>
            </TabsList>
            <TabsContent value="english" className="space-y-2">
              <Label htmlFor="sessionNotes">Session Notes</Label>
              <Textarea
                id="sessionNotes"
                name="sessionNotes"
                value={formData.sessionNotes || ""}
                onChange={handleInputChange}
                placeholder="Enter detailed session notes"
                rows={5}
              />
            </TabsContent>
            <TabsContent value="korean" className="space-y-2">
              <Label htmlFor="sessionNotesKorean">세션 노트</Label>
              <Textarea
                id="sessionNotesKorean"
                name="sessionNotesKorean"
                value={formData.sessionNotesKorean || ""}
                onChange={handleInputChange}
                placeholder="세션에 대한 자세한 노트를 입력하세요"
                rows={5}
              />
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="progress">{language === "english" ? "Progress" : "진행 상황"} ({formData.progress || 0}%)</Label>
              <Input
                id="progress"
                name="progress"
                type="range"
                min="0"
                max="100"
                value={formData.progress || 0}
                onChange={(e) => handleProgressChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">{language === "english" ? "Status" : "상태"}</Label>
              <Select
                value={formData.status || "In Progress"}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder={language === "english" ? "Select status" : "상태 선택"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Just Started">{language === "english" ? "Just Started" : "방금 시작됨"}</SelectItem>
                  <SelectItem value="In Progress">{language === "english" ? "In Progress" : "진행 중"}</SelectItem>
                  <SelectItem value="Completed">{language === "english" ? "Completed" : "완료됨"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nextSession">{language === "english" ? "Next Session Date" : "다음 세션 날짜"}</Label>
            <Input
              id="nextSession"
              name="nextSession"
              type="date"
              value={formData.nextSession || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">{language === "english" ? "Tags" : "태그"}</Label>
            <div className="flex gap-2">
              <Input
                id="newTag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder={language === "english" ? "Add a tag" : "태그 추가"}
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>
                <IconPlus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-muted text-muted-foreground px-2 py-1 rounded-md flex items-center gap-1"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            <IconCheck className="h-4 w-4 mr-2" />
            {language === "english" ? "Save Session Notes" : "세션 노트 저장"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
