"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconEdit, IconTrash, IconPlus, IconCheck, IconX } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

type Program = {
  id: string
  name: string
  description: string
  status: 'active' | 'draft' | 'archived'
  totalUsers: number
  completionRate: number
  createdAt: string
  updatedAt: string
}

const mockPrograms: Program[] = [
  {
    id: "prog-1",
    name: "Stress Management",
    description: "A 6-week program focusing on stress reduction and mindfulness techniques.",
    status: "active",
    totalUsers: 48,
    completionRate: 75,
    createdAt: "2023-03-15",
    updatedAt: "2023-05-20"
  },
  {
    id: "prog-2",
    name: "Sleep Improvement",
    description: "An 8-week program for better sleep habits and quality.",
    status: "active",
    totalUsers: 32,
    completionRate: 68,
    createdAt: "2023-02-10",
    updatedAt: "2023-05-18"
  },
  {
    id: "prog-3",
    name: "Weight Management",
    description: "A 12-week program for healthy weight management and nutrition.",
    status: "active",
    totalUsers: 56,
    completionRate: 82,
    createdAt: "2023-01-05",
    updatedAt: "2023-05-22"
  },
  {
    id: "prog-4",
    name: "Productivity Enhancement",
    description: "A 4-week program to improve focus and work efficiency.",
    status: "draft",
    totalUsers: 0,
    completionRate: 0,
    createdAt: "2023-05-12",
    updatedAt: "2023-05-12"
  },
  {
    id: "prog-5",
    name: "Nutrition Planning",
    description: "A comprehensive nutrition program with meal planning.",
    status: "draft",
    totalUsers: 0,
    completionRate: 0,
    createdAt: "2023-05-08",
    updatedAt: "2023-05-15"
  },
  {
    id: "prog-6",
    name: "Anxiety Reduction",
    description: "Specific techniques for managing anxiety and panic attacks.",
    status: "draft",
    totalUsers: 0,
    completionRate: 0,
    createdAt: "2023-05-01",
    updatedAt: "2023-05-10"
  },
  {
    id: "prog-7",
    name: "Physical Fitness",
    description: "Basic fitness program for beginners.",
    status: "draft",
    totalUsers: 0,
    completionRate: 0,
    createdAt: "2023-04-25",
    updatedAt: "2023-05-05"
  },
  {
    id: "prog-8",
    name: "Workplace Wellness",
    description: "Program focused on maintaining wellness in office environments.",
    status: "draft",
    totalUsers: 0,
    completionRate: 0,
    createdAt: "2023-04-20",
    updatedAt: "2023-05-02"
  }
]

export function ProgramManagement({ language = "english" }: { language?: "english" | "korean" }) {
  const [programs, setPrograms] = useState<Program[]>(mockPrograms)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  
  // Filter programs based on search and status
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = 
      searchQuery === "" || 
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || program.status === statusFilter
    
    return matchesSearch && matchesStatus
  })
  
  const handleEditClick = (program: Program) => {
    setEditingProgram({...program})
    setIsDialogOpen(true)
  }
  
  const handleNewProgram = () => {
    setEditingProgram({
      id: `prog-${programs.length + 1}`,
      name: "",
      description: "",
      status: "draft",
      totalUsers: 0,
      completionRate: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    })
    setIsDialogOpen(true)
  }
  
  const handleSaveProgram = () => {
    if (!editingProgram) return
    
    if (programs.find(p => p.id === editingProgram.id)) {
      // Update existing program
      setPrograms(programs.map(p => 
        p.id === editingProgram.id ? editingProgram : p
      ))
    } else {
      // Add new program
      setPrograms([...programs, editingProgram])
    }
    
    setIsDialogOpen(false)
    setEditingProgram(null)
  }
  
  const handleDeleteProgram = (id: string) => {
    setPrograms(programs.filter(p => p.id !== id))
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder={language === "english" ? "Search programs..." : "프로그램 검색..."}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-80"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === "english" ? "Status" : "상태"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === "english" ? "All" : "모두"}</SelectItem>
              <SelectItem value="active">{language === "english" ? "Active" : "활성화"}</SelectItem>
              <SelectItem value="draft">{language === "english" ? "Draft" : "초안"}</SelectItem>
              <SelectItem value="archived">{language === "english" ? "Archived" : "보관됨"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleNewProgram}>
          <IconPlus className="h-4 w-4 mr-2" />
          {language === "english" ? "New Program" : "새 프로그램"}
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === "english" ? "Program" : "프로그램"}</TableHead>
              <TableHead>{language === "english" ? "Status" : "상태"}</TableHead>
              <TableHead className="text-right">{language === "english" ? "Users" : "사용자"}</TableHead>
              <TableHead>{language === "english" ? "Completion" : "완료율"}</TableHead>
              <TableHead>{language === "english" ? "Updated" : "업데이트"}</TableHead>
              <TableHead>{language === "english" ? "Actions" : "작업"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrograms.map(program => (
              <TableRow key={program.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{program.name}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{program.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    className={
                      program.status === "active" 
                        ? "bg-green-500" 
                        : program.status === "draft" 
                        ? "bg-amber-500" 
                        : "bg-slate-500"
                    }
                  >
                    {program.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{program.totalUsers}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={program.completionRate} className="h-2 w-24" />
                    <span className="text-sm">{program.completionRate}%</span>
                  </div>
                </TableCell>
                <TableCell>{new Date(program.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(program)}>
                      <IconEdit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDeleteProgram(program.id)}
                      disabled={program.status === "active" && program.totalUsers > 0}
                    >
                      <IconTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredPrograms.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  {language === "english" 
                    ? "No programs found matching the criteria" 
                    : "검색 기준과 일치하는 프로그램이 없습니다"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Edit/New Program Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingProgram?.name 
                ? language === "english" ? "Edit Program" : "프로그램 편집" 
                : language === "english" ? "New Program" : "새 프로그램"}
            </DialogTitle>
            <DialogDescription>
              {language === "english" 
                ? "Create or modify a coaching program" 
                : "코칭 프로그램 생성 또는 수정"}
            </DialogDescription>
          </DialogHeader>
          
          {editingProgram && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === "english" ? "Program Name" : "프로그램 이름"}
                </label>
                <Input 
                  value={editingProgram.name} 
                  onChange={e => setEditingProgram({...editingProgram, name: e.target.value})}
                  placeholder={language === "english" ? "Enter program name" : "프로그램 이름 입력"}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === "english" ? "Description" : "설명"}
                </label>
                <Input 
                  value={editingProgram.description} 
                  onChange={e => setEditingProgram({...editingProgram, description: e.target.value})}
                  placeholder={language === "english" ? "Enter description" : "설명 입력"}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === "english" ? "Status" : "상태"}
                </label>
                <Select 
                  value={editingProgram.status} 
                  onValueChange={value => setEditingProgram({
                    ...editingProgram, 
                    status: value as 'active' | 'draft' | 'archived'
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === "english" ? "Select status" : "상태 선택"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{language === "english" ? "Active" : "활성화"}</SelectItem>
                    <SelectItem value="draft">{language === "english" ? "Draft" : "초안"}</SelectItem>
                    <SelectItem value="archived">{language === "english" ? "Archived" : "보관됨"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <IconX className="h-4 w-4 mr-2" />
              {language === "english" ? "Cancel" : "취소"}
            </Button>
            <Button onClick={handleSaveProgram} disabled={!editingProgram?.name}>
              <IconCheck className="h-4 w-4 mr-2" />
              {language === "english" ? "Save" : "저장"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}