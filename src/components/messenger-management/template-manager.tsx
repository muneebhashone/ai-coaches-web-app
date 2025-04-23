"use client"

import { useState } from "react"
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for template messages
const initialTemplates = [
  { 
    id: "1", 
    name: "Session Reminder", 
    content: "Hello! This is a reminder about our coaching session scheduled for tomorrow at 2 PM. Looking forward to speaking with you!",
    category: "reminder",
    createdBy: "Admin"
  },
  { 
    id: "2", 
    name: "Weekly Progress Check", 
    content: "Hi there! How has your progress been with the goals we set last week? Is there anything specific you'd like to discuss in our next session?",
    category: "follow-up",
    createdBy: "Admin"
  },
  { 
    id: "3", 
    name: "Motivational Message", 
    content: "Just a quick note to remind you that you're making great progress! Keep up the good work and remember to practice the techniques we discussed.",
    category: "motivational",
    createdBy: "Coach"
  }
]

export function TemplateManager() {
  const [templates, setTemplates] = useState(initialTemplates)
  const [editingTemplate, setEditingTemplate] = useState<any>(null)
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    content: "",
    category: "reminder"
  })
  const [activeTab, setActiveTab] = useState("all")

  const filteredTemplates = templates.filter(template => {
    if (activeTab === "all") return true
    return template.category === activeTab
  })

  const handleNewTemplate = () => {
    const template = {
      id: Date.now().toString(),
      name: newTemplate.name,
      content: newTemplate.content,
      category: newTemplate.category,
      createdBy: "Coach" // In a real app, this would come from the authenticated user
    }
    
    setTemplates([...templates, template])
    setNewTemplate({
      name: "",
      content: "",
      category: "reminder"
    })
  }

  const handleUpdateTemplate = () => {
    if (!editingTemplate) return
    
    setTemplates(templates.map(t => 
      t.id === editingTemplate.id ? editingTemplate : t
    ))
    
    setEditingTemplate(null)
  }

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id))
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <h2 className="text-xl font-semibold">Template Message System</h2>
          <p className="text-sm text-muted-foreground">
            Create and manage message templates
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <IconPlus className="mr-2 h-4 w-4" />
              Add Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Add a new message template for quick messaging.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Template Name</label>
                <Input 
                  id="name" 
                  placeholder="e.g., Session Reminder" 
                  value={newTemplate.name}
                  onChange={e => setNewTemplate({...newTemplate, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <select 
                  id="category"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={newTemplate.category}
                  onChange={e => setNewTemplate({...newTemplate, category: e.target.value})}
                >
                  <option value="reminder">Reminder</option>
                  <option value="follow-up">Follow-up</option>
                  <option value="motivational">Motivational</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">Message Content</label>
                <Textarea 
                  id="content" 
                  rows={5} 
                  placeholder="Enter your template message..."
                  value={newTemplate.content}
                  onChange={e => setNewTemplate({...newTemplate, content: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleNewTemplate}
                disabled={!newTemplate.name || !newTemplate.content}
              >
                Save Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="reminder">Reminders</TabsTrigger>
            <TabsTrigger value="follow-up">Follow-ups</TabsTrigger>
            <TabsTrigger value="motivational">Motivational</TabsTrigger>
            <TabsTrigger value="announcement">Announcements</TabsTrigger>
          </TabsList>
          
          <div className="space-y-3">
            {filteredTemplates.map(template => (
              <div 
                key={template.id} 
                className="p-3 border rounded-lg space-y-2"
              >
                <div className="flex justify-between">
                  <div className="font-medium">{template.name}</div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <IconEdit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Template</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label htmlFor="edit-name" className="text-sm font-medium">Template Name</label>
                            <Input 
                              id="edit-name" 
                              value={editingTemplate?.name || template.name}
                              onChange={e => setEditingTemplate({...editingTemplate || template, name: e.target.value})}
                              onFocus={() => !editingTemplate && setEditingTemplate(template)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="edit-category" className="text-sm font-medium">Category</label>
                            <select 
                              id="edit-category"
                              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              value={editingTemplate?.category || template.category}
                              onChange={e => setEditingTemplate({...editingTemplate || template, category: e.target.value})}
                              onFocus={() => !editingTemplate && setEditingTemplate(template)}
                            >
                              <option value="reminder">Reminder</option>
                              <option value="follow-up">Follow-up</option>
                              <option value="motivational">Motivational</option>
                              <option value="announcement">Announcement</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="edit-content" className="text-sm font-medium">Message Content</label>
                            <Textarea 
                              id="edit-content" 
                              rows={5} 
                              value={editingTemplate?.content || template.content}
                              onChange={e => setEditingTemplate({...editingTemplate || template, content: e.target.value})}
                              onFocus={() => !editingTemplate && setEditingTemplate(template)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            onClick={handleUpdateTemplate}
                          >
                            Update Template
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      <IconTrash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {template.content}
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="capitalize">
                    {template.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Created by: {template.createdBy}</span>
                </div>
              </div>
            ))}
            
            {filteredTemplates.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                No templates found in this category.
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  )
}