"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChatbotListModal } from "@/components/clone-coach-training/chatbot-list-modal";
import { Settings, Bot, Save } from "lucide-react";

// Mock chatbot data
const mockChatbots = [
  {
    id: "1",
    name: "Coach AI v2.1",
    linkedUsers: 15,
    trainingStatus: "Trained",
    lastUsed: "2025-05-25",
    knowledgeBase: "Stress Management KB"
  },
  {
    id: "2", 
    name: "Wellness Coach",
    linkedUsers: 8,
    trainingStatus: "Training",
    lastUsed: "2025-05-24",
    knowledgeBase: "Wellness Program KB"
  },
];

export function PromptConfigurationPanel() {
  const t = useTranslations("dashboard.cloneCoachTraining.promptConfiguration");
  const [selectedChatbotId, setSelectedChatbotId] = useState("1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prompts, setPrompts] = useState({
    systemPrompt: `You are an AI coaching assistant specializing in stress management and wellness. Your role is to:

1. Provide empathetic and supportive responses
2. Guide users through evidence-based techniques
3. Help users set and track realistic goals
4. Encourage consistent practice and self-reflection

Tone: Warm, professional, encouraging
Focus: Practical strategies, mindfulness, goal achievement`,
    
    persona: `Coach Sarah Kim - A certified wellness coach with 10+ years of experience in stress management and mindfulness training. Known for her gentle yet effective approach to helping professionals achieve work-life balance.

Personality Traits:
- Empathetic and understanding
- Solution-oriented
- Encouraging without being pushy
- Uses gentle humor when appropriate
- Focuses on small, achievable steps`
  });

  const selectedChatbot = mockChatbots.find(bot => bot.id === selectedChatbotId);

  const handleSave = () => {
    // Save prompts logic here
    console.log("Saving prompts for chatbot:", selectedChatbotId, prompts);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2 text-primary" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chatbot Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("selectedChatbot")}</Label>
          <div className="flex gap-2">
            <Select value={selectedChatbotId} onValueChange={setSelectedChatbotId}>
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockChatbots.map((chatbot) => (
                  <SelectItem key={chatbot.id} value={chatbot.id}>
                    {chatbot.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(true)}
            >
              {t("listChatbots")}
            </Button>
          </div>
          
          {selectedChatbot && (
            <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
              <p><strong>Status:</strong> {selectedChatbot.trainingStatus}</p>
              <p><strong>Linked Users:</strong> {selectedChatbot.linkedUsers}</p>
              <p><strong>Knowledge Base:</strong> {selectedChatbot.knowledgeBase}</p>
            </div>
          )}
        </div>

        {/* System Prompt Configuration */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("prompts")}</Label>
          <Textarea
            placeholder="Enter system prompt instructions..."
            value={prompts.systemPrompt}
            onChange={(e) => setPrompts(prev => ({ ...prev, systemPrompt: e.target.value }))}
            className="min-h-[150px] text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Define how the AI should behave, respond, and interact with users.
          </p>
        </div>

        {/* Persona Configuration */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("persona")}</Label>
          <Textarea
            placeholder="Define the AI's personality and background..."
            value={prompts.persona}
            onChange={(e) => setPrompts(prev => ({ ...prev, persona: e.target.value }))}
            className="min-h-[120px] text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Describe the AI&apos;s personality, background, and communication style.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button onClick={handleSave} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
          <Button variant="outline">
            <Bot className="h-4 w-4 mr-2" />
            Test Prompts
          </Button>
        </div>

        {/* Training Status */}
        <div className="bg-primary/10 rounded-md p-3 text-sm">
          <p className="text-primary font-medium mb-1">📚 Training Status:</p>
          <p className="text-primary/80">
            {selectedChatbot?.trainingStatus === "Trained" 
              ? "Your chatbot is ready to use with the current configuration."
              : "Training in progress. Changes will be applied after training completes."
            }
          </p>
        </div>
      </CardContent>

      <ChatbotListModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        chatbots={mockChatbots}
        onSelect={(chatbotId) => {
          setSelectedChatbotId(chatbotId);
          setIsModalOpen(false);
        }}
      />
    </Card>
  );
}