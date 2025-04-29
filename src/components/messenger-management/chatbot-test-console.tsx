"use client";

import { useState, useRef } from "react";
import { IconSend, IconMessageChatbot } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useCreateChatbot,
  useChatbot,
  useChatbots,
} from "@/services/chatbot/chatbot.hooks";
import {
  useCreateSession,
  useAddMessage,
  useProcessMessage,
} from "@/services/session/session.hooks";
import { useCreateClient, useClients } from "@/services/client/client.hooks";
import { toast } from "sonner";
import { chatbotKeys } from "@/services/chatbot/chatbot.hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function ChatbotTestConsole() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string; timestamp: Date }[]
  >([
    {
      role: "bot",
      content:
        "Hello! I'm your AI coaching assistant. You can test my responses here.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [selectedChatbotId, setSelectedChatbotId] = useState<string | null>(
    null
  );
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [testClientId, setTestClientId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("setup");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get all chatbots
  const { data: chatbotsResponse, isLoading: isLoadingChatbots } = useChatbots({
    status: "ACTIVE",
  });

  // Get all clients for potential reuse
  const { data: clientsResponse } = useClients({
    searchString: "Test Client",
  });

  // Create test client mutation
  const { mutate: createClient, isPending: isCreatingClient } = useCreateClient(
    {
      onSuccess: (response) => {
        if (response.success && response.data) {
          setTestClientId(response.data._id);
          toast.success("Test client created");
        }
      },
      onError: () => {
        toast.error("Failed to create test client");
      },
    }
  );

  // Create chatbot mutation
  const { mutate: createChatbot, isPending: isCreating } = useCreateChatbot({
    onSuccess: (response) => {
      if (response.success && response.data) {
        handleChatbotChange(response.data._id);
        toast.success("Test chatbot created successfully!");
      }
    },
    onError: () => {
      toast.error("Failed to create test chatbot");
    },
  });

  // Get chatbot details
  const { data: chatbotResponse } = useChatbot(selectedChatbotId || "", {
    enabled: !!selectedChatbotId,
    queryKey: chatbotKeys.detail(selectedChatbotId || ""),
  });

  const handleChatbotChange = (chatbotId: string) => {
    setSelectedChatbotId(chatbotId);
    setCurrentSessionId(null);
    resetMessages();
  };

  const resetMessages = () => {
    setMessages([
      {
        role: "bot",
        content:
          "Hello! I'm your AI coaching assistant. You can test my responses here.",
        timestamp: new Date(),
      },
    ]);
    // Scroll to bottom on reset
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCreateTestClient = () => {
    createClient({
      name: "Test Client",
      email: "test@example.com",
      metadata: {
        isTestClient: true,
      },
    });
  };

  // Session management
  const { mutate: createSession } = useCreateSession({
    onSuccess: (response) => {
      if (response.success && response.data) {
        setCurrentSessionId(response.data._id);
        toast.success("Test session started");
        // Automatically switch to chat tab when session starts
        setActiveTab("chat");
        // Scroll to bottom when tab changes
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    },
    onError: () => {
      toast.error("Failed to start test session");
    },
  });

  const startTestSession = () => {
    if (selectedChatbotId && testClientId && !currentSessionId) {
      createSession({
        chatbotId: selectedChatbotId,
        clientId: testClientId,
        title: "Test Session",
      });
    }
  };

  const { mutate: addMessage } = useAddMessage(currentSessionId || "", {
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  const { mutate: processMessage } = useProcessMessage(currentSessionId || "", {
    onSuccess: (response) => {
      if (response.success && response.data) {
        const botMessage = {
          role: "bot" as const,
          content: response.data.content,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        // Scroll to bottom after receiving response
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      setIsThinking(false);
    },
    onError: () => {
      toast.error("Failed to process message");
      setIsThinking(false);
    },
  });

  const handleCreateTestChatbot = () => {
    createChatbot({
      name: "Test Chatbot",
      description: "A chatbot for testing purposes",
      persona: {
        name: "Test Assistant",
        description: "A test chatbot for development",
        promptTemplate: "You are a test assistant. {input}",
        systemInstructions:
          "You are in test mode. Keep responses brief and helpful.",
      },
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !currentSessionId) return;

    const userMessage = {
      role: "user" as const,
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // Scroll to bottom after sending user message
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    try {
      // Add message to session
      await addMessage({
        message: {
          role: "user",
          content: input,
          timestamp: new Date().toISOString(),
        },
      });

      // Process message to get bot response
      await processMessage({
        content: input,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      toast.error(`Failed to get response from the chatbot: ${errorMessage}`);
      setIsThinking(false);
    }
  };

  // Helper function to determine setup completion status
  const getSetupStatus = () => {
    if (!testClientId) return "client";
    if (!selectedChatbotId) return "chatbot";
    if (!currentSessionId) return "session";
    return "complete";
  };

  return (
    <>
      <Card
        className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2">
          <IconMessageChatbot className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-medium">Chatbot Test Console</h3>
            <p className="text-sm text-muted-foreground">
              Test your chatbot responses in real-time
            </p>
          </div>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[85vh] flex flex-col overflow-scroll">
          <DialogHeader className="px-0 pt-0">
            <DialogTitle>Chatbot Test Console</DialogTitle>
            <DialogDescription>
              Test your chatbot responses in real-time
              {chatbotResponse?.data && (
                <Badge variant="outline" className="ml-2">
                  {chatbotResponse.data.name}
                </Badge>
              )}
            </DialogDescription>
          </DialogHeader>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="setup" disabled={isThinking}>
                Setup
                {getSetupStatus() !== "complete" && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    Required
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                disabled={getSetupStatus() !== "complete" || isThinking}
              >
                Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="mt-0 flex-1 overflow-auto">
              <div className="space-y-4">
                {/* Test Client Selection */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    1. Select or Create Test Client
                  </h3>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      {clientsResponse?.data?.results &&
                      clientsResponse.data.results.length > 0 ? (
                        <Select
                          value={testClientId || ""}
                          onValueChange={(value) => setTestClientId(value)}
                          disabled={isCreatingClient}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a test client" />
                          </SelectTrigger>
                          <SelectContent>
                            {clientsResponse.data.results.map((client) => (
                              <SelectItem key={client._id} value={client._id}>
                                {client.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No test clients available
                        </p>
                      )}
                    </div>
                    <Button
                      onClick={handleCreateTestClient}
                      disabled={isCreatingClient}
                      variant="outline"
                      size="sm"
                    >
                      {isCreatingClient ? "Creating..." : "Create Test Client"}
                    </Button>
                  </div>
                </div>

                {/* Chatbot Selection */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    2. Select or Create Chatbot
                  </h3>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      {chatbotsResponse?.data?.results &&
                      chatbotsResponse.data.results.length > 0 ? (
                        <Select
                          value={selectedChatbotId || ""}
                          onValueChange={(value) => handleChatbotChange(value)}
                          disabled={!testClientId || isCreatingClient}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a chatbot" />
                          </SelectTrigger>
                          <SelectContent>
                            {chatbotsResponse.data.results.map((chatbot) => (
                              <SelectItem key={chatbot._id} value={chatbot._id}>
                                {chatbot.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        !isLoadingChatbots && (
                          <Button
                            onClick={handleCreateTestChatbot}
                            disabled={
                              isCreating || !testClientId || isCreatingClient
                            }
                            variant="outline"
                            className="w-full"
                          >
                            {isCreating ? "Creating..." : "Create Test Chatbot"}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Session Creation */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">3. Start Test Session</h3>
                  <Button
                    onClick={startTestSession}
                    disabled={
                      !selectedChatbotId ||
                      !testClientId ||
                      !!currentSessionId ||
                      isCreatingClient
                    }
                    className="w-full"
                  >
                    {currentSessionId ? "Session Active" : "Start Test Session"}
                  </Button>
                  {currentSessionId && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Session is active. Switch to the Chat tab to test your
                      chatbot.
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="chat"
              className="mt-0 flex-1 flex flex-col h-[50vh] overflow-scroll"
            >
              <div className="flex-1 overflow-scroll relative">
                <ScrollArea className="absolute inset-0 pr-2">
                  <div className="space-y-4 p-1 pb-4">
                    {messages.map((message, index) => (
                      <div
                        key={index.toString()}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${
                            message.role === "user"
                              ? "flex-row-reverse bg-primary text-primary-foreground"
                              : "bg-muted"
                          } p-3 rounded-lg`}
                        >
                          {message.role === "bot" && (
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage src="/globe.svg" alt="AI" />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <p className="text-sm whitespace-pre-wrap">
                              {message.content}
                            </p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isThinking && (
                      <div className="flex justify-start">
                        <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                          <div className="flex gap-1">
                            <span className="animate-bounce h-2 w-2 bg-muted-foreground/50 rounded-full delay-100" />
                            <span className="animate-bounce h-2 w-2 bg-muted-foreground/50 rounded-full delay-200" />
                            <span className="animate-bounce h-2 w-2 bg-muted-foreground/50 rounded-full delay-300" />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            AI is thinking...
                          </span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>

              <div className="flex w-full gap-2 mt-4">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={!currentSessionId || isThinking}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentSessionId || !input.trim() || isThinking}
                  type="submit"
                >
                  <IconSend className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
