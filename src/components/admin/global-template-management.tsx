"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { 
  IconEdit, 
  IconTrash, 
  IconPlus, 
  IconCheck, 
  IconX, 
  IconUsers, 
  IconMessage, 
  IconMessageCircle, 
  IconAlertCircle 
} from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

type TemplateCategory = 'welcome' | 'follow-up' | 'reminder' | 'alert' | 'general'
type TemplateUsage = 'all' | 'auto' | 'manual'

interface Template {
  id: string
  name: string
  content: string
  category: TemplateCategory
  usage: TemplateUsage
  createdBy: string
  createdAt: string
  updatedAt: string
  isGlobal: boolean
}

const mockTemplates: Template[] = [
  {
    id: "template-1",
    name: "Welcome Message",
    content: "안녕하세요 {{user.name}}님, AI 코칭 프로그램에 오신 것을 환영합니다! 저는 당신의 목표 달성을 돕기 위해 여기 있습니다. 시작하기 전에 간단한 질문 몇 가지만 해도 될까요?",
    category: "welcome",
    usage: "auto",
    createdBy: "Admin",
    createdAt: "2023-05-01",
    updatedAt: "2023-05-10",
    isGlobal: true
  },
  {
    id: "template-2",
    name: "Weekly Check-in",
    content: "{{user.name}}님, 안녕하세요! 지난 주 목표에 대한 진행 상황이 어떤지 확인하러 왔습니다. 어떻게 지내셨나요? 도움이 필요한 부분이 있으신가요?",
    category: "follow-up",
    usage: "auto",
    createdBy: "Admin",
    createdAt: "2023-05-02",
    updatedAt: "2023-05-12",
    isGlobal: true
  },
  {
    id: "template-3",
    name: "Upcoming Session Reminder",
    content: "안녕하세요 {{user.name}}님, 내일 {{session.time}}에 예정된 코칭 세션이 있다는 것을 상기시켜 드립니다. 준비되셨나요?",
    category: "reminder",
    usage: "auto",
    createdBy: "Admin",
    createdAt: "2023-05-03",
    updatedAt: "2023-05-15",
    isGlobal: true
  },
  {
    id: "template-4",
    name: "Goal Completion Celebration",
    content: "축하합니다 {{user.name}}님! {{goal.name}} 목표를 달성하셨습니다. 정말 멋진 성과입니다! 이 성공을 축하하고 다음 단계를 어떻게 진행할지 이야기해 볼까요?",
    category: "general",
    usage: "auto",
    createdBy: "Admin",
    createdAt: "2023-05-04",
    updatedAt: "2023-05-18",
    isGlobal: true
  },
  {
    id: "template-5",
    name: "Inactivity Follow-up",
    content: "{{user.name}}님, 안녕하세요. 최근에 활동이 뜸한 것 같아 연락드립니다. 모든 것이 괜찮으신가요? 도움이 필요하시거나 질문이 있으시면 언제든지 알려주세요.",
    category: "follow-up",
    usage: "manual",
    createdBy: "Admin",
    createdAt: "2023-05-05",
    updatedAt: "2023-05-20",
    isGlobal: true
  },
  {
    id: "template-6",
    name: "Progress Update Request",
    content: "안녕하세요 {{user.name}}님, {{goal.name}}에 대한 진행 상황을 업데이트해 주시겠어요? 어떤 성과가 있었는지, 어떤 어려움을 겪고 계신지 알려주시면 더 효과적인 지원을 제공해 드릴 수 있습니다.",
    category: "general",
    usage: "manual",
    createdBy: "Sarah Kim",
    createdAt: "2023-05-06",
    updatedAt: "2023-05-22",
    isGlobal: false
  },
  {
    id: "template-7",
    name: "Urgent Wellness Check",
    content: "{{user.name}}님, 안녕하세요. 우려되는 몇 가지 징후가 감지되어 연락드립니다. 현재 기분이 어떠신지, 도움이 필요하신지 알려주시겠어요? 당신의 웰빙이 저희에게 가장 중요합니다.",
    category: "alert",
    usage: "manual",
    createdBy: "Admin",
    createdAt: "2023-05-07",
    updatedAt: "2023-05-25",
    isGlobal: true
  },
  {
    id: "template-8",
    name: "New Resource Recommendation",
    content: "{{user.name}}님, 안녕하세요! {{topic}}에 관한 흥미로운 새로운 자료를 찾았습니다. 당신의 목표에 도움이 될 것 같아 공유해 드립니다. 확인해 보시겠어요?",
    category: "general",
    usage: "manual",
    createdBy: "David Park",
    createdAt: "2023-05-08",
    updatedAt: "2023-05-28",
    isGlobal: false
  }
]

export function GlobalTemplateManagement({ language = "english" }: { language?: "english" | "korean" }) {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)
  
  // Filter templates based on search and category
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      searchQuery === "" || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })
  
  const handleEditClick = (template: Template) => {
    setEditingTemplate({...template})
    setIsDialogOpen(true)
  }
  
  const handleNewTemplate = () => {
    setEditingTemplate({
      id: `template-${templates.length + 1}`,
      name: "",
      content: "",
      category: "general",
      usage: "manual",
      createdBy: "Admin",
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      isGlobal: true
    })
    setIsDialogOpen(true)
  }
  
  const handleSaveTemplate = () => {
    if (!editingTemplate) return
    
    const now = new Date().toISOString().split('T')[0]
    
    if (templates.find(t => t.id === editingTemplate.id)) {
      // Update existing template
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id ? {...editingTemplate, updatedAt: now} : t
      ))
    } else {
      // Add new template
      setTemplates([...templates, {...editingTemplate, updatedAt: now}])
    }
    
    setIsDialogOpen(false)
    setEditingTemplate(null)
  }
  
  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id))
  }
  
  const getTemplateIcon = (category: TemplateCategory) => {
    switch (category) {
      case "welcome":
        return <IconUsers className="h-4 w-4" />
      case "follow-up":
        return <IconMessage className="h-4 w-4" />
      case "reminder":
        return <IconMessageCircle className="h-4 w-4" />
      case "alert":
        return <IconAlertCircle className="h-4 w-4" />
      case "general":
      default:
        return <IconMessage className="h-4 w-4" />
    }
  }
  
  const getCategoryLabel = (category: TemplateCategory) => {
    switch (category) {
      case "welcome":
        return language === "english" ? "Welcome" : "환영"
      case "follow-up":
        return language === "english" ? "Follow-up" : "후속"
      case "reminder":
        return language === "english" ? "Reminder" : "알림"
      case "alert":
        return language === "english" ? "Alert" : "경고"
      case "general":
      default:
        return language === "english" ? "General" : "일반"
    }
  }
  
  const getUsageLabel = (usage: TemplateUsage) => {
    switch (usage) {
      case "auto":
        return language === "english" ? "Automated" : "자동"
      case "manual":
        return language === "english" ? "Manual" : "수동"
      case "all":
      default:
        return language === "english" ? "All" : "모두"
    }
  }
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="templates">
        <TabsList className="mb-4">
          <TabsTrigger value="templates">
            {language === "english" ? "Message Templates" : "메시지 템플릿"}
          </TabsTrigger>
          <TabsTrigger value="usage">
            {language === "english" ? "Usage Statistics" : "사용 통계"}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder={language === "english" ? "Search templates..." : "템플릿 검색..."}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-80"
              />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={language === "english" ? "Category" : "카테고리"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === "english" ? "All Categories" : "모든 카테고리"}</SelectItem>
                  <SelectItem value="welcome">{language === "english" ? "Welcome" : "환영"}</SelectItem>
                  <SelectItem value="follow-up">{language === "english" ? "Follow-up" : "후속"}</SelectItem>
                  <SelectItem value="reminder">{language === "english" ? "Reminder" : "알림"}</SelectItem>
                  <SelectItem value="alert">{language === "english" ? "Alert" : "경고"}</SelectItem>
                  <SelectItem value="general">{language === "english" ? "General" : "일반"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleNewTemplate}>
              <IconPlus className="h-4 w-4 mr-2" />
              {language === "english" ? "New Template" : "새 템플릿"}
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === "english" ? "Template Name" : "템플릿 이름"}</TableHead>
                  <TableHead>{language === "english" ? "Category" : "카테고리"}</TableHead>
                  <TableHead>{language === "english" ? "Usage" : "사용법"}</TableHead>
                  <TableHead>{language === "english" ? "Created By" : "생성자"}</TableHead>
                  <TableHead>{language === "english" ? "Last Updated" : "마지막 업데이트"}</TableHead>
                  <TableHead className="text-right">{language === "english" ? "Actions" : "작업"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.map(template => (
                  <TableRow key={template.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setPreviewTemplate(template)}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getTemplateIcon(template.category)}
                        <span>{template.name}</span>
                        {template.isGlobal && (
                          <Badge variant="outline" className="ml-2">
                            {language === "english" ? "Global" : "전역"}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          template.category === "alert" 
                            ? "bg-red-500" 
                            : template.category === "welcome" 
                            ? "bg-green-500" 
                            : "bg-blue-500"
                        }
                      >
                        {getCategoryLabel(template.category)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getUsageLabel(template.usage)}
                      </Badge>
                    </TableCell>
                    <TableCell>{template.createdBy}</TableCell>
                    <TableCell>{new Date(template.updatedAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(template);
                          }}
                        >
                          <IconEdit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTemplate(template.id);
                          }}
                        >
                          <IconTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTemplates.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      {language === "english" 
                        ? "No templates found matching the criteria" 
                        : "검색 기준과 일치하는 템플릿이 없습니다"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="usage">
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">
                {language === "english" 
                  ? "Template usage statistics will be implemented in a future update" 
                  : "템플릿 사용 통계는 향후 업데이트에서 구현될 예정입니다"}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Edit/New Template Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingTemplate?.name 
                ? language === "english" ? "Edit Template" : "템플릿 편집" 
                : language === "english" ? "New Template" : "새 템플릿"}
            </DialogTitle>
            <DialogDescription>
              {language === "english" 
                ? "Create or modify a message template" 
                : "메시지 템플릿 생성 또는 수정"}
            </DialogDescription>
          </DialogHeader>
          
          {editingTemplate && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === "english" ? "Template Name" : "템플릿 이름"}
                </label>
                <Input 
                  value={editingTemplate.name} 
                  onChange={e => setEditingTemplate({...editingTemplate, name: e.target.value})}
                  placeholder={language === "english" ? "Enter template name" : "템플릿 이름 입력"}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === "english" ? "Category" : "카테고리"}
                </label>
                <Select 
                  value={editingTemplate.category} 
                  onValueChange={value => setEditingTemplate({
                    ...editingTemplate, 
                    category: value as TemplateCategory
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === "english" ? "Select category" : "카테고리 선택"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">{language === "english" ? "Welcome" : "환영"}</SelectItem>
                    <SelectItem value="follow-up">{language === "english" ? "Follow-up" : "후속"}</SelectItem>
                    <SelectItem value="reminder">{language === "english" ? "Reminder" : "알림"}</SelectItem>
                    <SelectItem value="alert">{language === "english" ? "Alert" : "경고"}</SelectItem>
                    <SelectItem value="general">{language === "english" ? "General" : "일반"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === "english" ? "Usage" : "사용법"}
                </label>
                <Select 
                  value={editingTemplate.usage} 
                  onValueChange={value => setEditingTemplate({
                    ...editingTemplate, 
                    usage: value as TemplateUsage
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === "english" ? "Select usage" : "사용법 선택"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">{language === "english" ? "Automated" : "자동"}</SelectItem>
                    <SelectItem value="manual">{language === "english" ? "Manual" : "수동"}</SelectItem>
                    <SelectItem value="all">{language === "english" ? "All" : "모두"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === "english" ? "Message Content" : "메시지 내용"}
                </label>
                <Textarea 
                  value={editingTemplate.content} 
                  onChange={e => setEditingTemplate({...editingTemplate, content: e.target.value})}
                  placeholder={language === "english" ? "Enter message content..." : "메시지 내용 입력..."}
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  {language === "english" 
                    ? "Use {{user.name}} to include the user's name, and other variables like {{goal.name}} for goal name."
                    : "사용자 이름을 포함하려면 {{user.name}}을 사용하고, 목표 이름 등 다른 변수는 {{goal.name}}과 같이 사용하세요."}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <IconX className="h-4 w-4 mr-2" />
              {language === "english" ? "Cancel" : "취소"}
            </Button>
            <Button onClick={handleSaveTemplate} disabled={!editingTemplate?.name || !editingTemplate.content}>
              <IconCheck className="h-4 w-4 mr-2" />
              {language === "english" ? "Save" : "저장"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Template Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={(open) => !open && setPreviewTemplate(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {previewTemplate?.name}
            </DialogTitle>
            <DialogDescription>
              {getCategoryLabel(previewTemplate?.category as TemplateCategory)} • {getUsageLabel(previewTemplate?.usage as TemplateUsage)}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[200px] rounded-md border p-4">
            <div className="whitespace-pre-wrap">
              {previewTemplate?.content}
            </div>
          </ScrollArea>
          
          <div className="flex justify-between text-sm text-muted-foreground pt-2">
            <span>{language === "english" ? "Created by" : "생성자"}: {previewTemplate?.createdBy}</span>
            <span>{language === "english" ? "Last updated" : "마지막 업데이트"}: {previewTemplate ? new Date(previewTemplate.updatedAt).toLocaleDateString() : ""}</span>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
              <IconX className="h-4 w-4 mr-2" />
              {language === "english" ? "Close" : "닫기"}
            </Button>
            <Button onClick={() => {
              if (previewTemplate) {
                handleEditClick(previewTemplate);
                setPreviewTemplate(null);
              }
            }}>
              <IconEdit className="h-4 w-4 mr-2" />
              {language === "english" ? "Edit" : "편집"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}