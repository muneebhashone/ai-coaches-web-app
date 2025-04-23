"use client"

import { useState } from "react"
import { IconSend } from "@tabler/icons-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ChatbotTestConsole() {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string; timestamp: Date }[]>([
    { role: 'bot', content: 'Hello! I\'m your AI coaching assistant. You can test my responses here.', timestamp: new Date() }
  ])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)

  const handleSendMessage = () => {
    if (!input.trim()) return
    
    // Add user message
    const userMessage = { role: 'user' as const, content: input, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsThinking(true)
    
    // Simulate bot thinking and then responding
    setTimeout(() => {
      const botResponses = [
        "That's a great question! Based on my training, I would suggest focusing on consistent small steps toward your goal.",
        "I understand how you feel. Many clients experience similar challenges. Let's break this down into manageable parts.",
        "I've noted your concerns. Would you like to discuss some strategies that have worked well for others in similar situations?",
        "According to my training data, this approach has shown positive results for many coaching clients. Would you like more specific guidance?",
        "That's excellent progress! I'd recommend continuing with the current strategy and perhaps adding one more small habit to build momentum."
      ]
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      const botMessage = { role: 'bot' as const, content: randomResponse, timestamp: new Date() }
      
      setMessages(prev => [...prev, botMessage])
      setIsThinking(false)
    }, 1500)
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm h-full flex flex-col">
      <div className="p-4 pb-0">
        <h2 className="text-lg font-semibold">Chatbot Test Console</h2>
        <p className="text-sm text-muted-foreground">
          Test your chatbot responses in real-time
        </p>
      </div>
      <div className="p-4 flex-1 flex flex-col h-[300px]">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === 'user' 
                      ? 'flex-row-reverse bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  } p-3 rounded-lg`}
                >
                  {message.role === 'bot' && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src="/globe.svg" alt="AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="animate-bounce h-2 w-2 bg-muted-foreground/50 rounded-full delay-100"></span>
                    <span className="animate-bounce h-2 w-2 bg-muted-foreground/50 rounded-full delay-200"></span>
                    <span className="animate-bounce h-2 w-2 bg-muted-foreground/50 rounded-full delay-300"></span>
                  </div>
                  <span className="text-xs text-muted-foreground">AI is thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="p-4 pt-0">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Type your test message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isThinking}
          >
            <IconSend className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}