"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconSend } from "@tabler/icons-react";
import { useChatbot, chatbotKeys } from "@/services/chatbot/chatbot.hooks";
import {
  useCreateSession,
  useSession,
  useAddMessage,
  useProcessMessage,
  useEndSession,
  sessionKeys,
} from "@/services/session/session.hooks";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useCreateClient } from "@/services/client/client.hooks";
import { z } from "zod";
import { createClientSchema } from "@/services/client/client.schema";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  id: string; // Unique id for key prop
}

// Local storage keys
const SESSION_ID_KEY = "chat_session_id";
const CHATBOT_ID_KEY = "chat_chatbot_id";
const MESSAGES_KEY = "chat_messages";
const CLIENT_ID_KEY = "chat_client_id";

// Generate a unique ID
const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Default welcome message
const DEFAULT_WELCOME_MESSAGE = "Hello! How can I help you today?";

// Client registration dialog component
function ClientRegistrationDialog({
  isOpen,
  onClose,
  onRegister,
  chatbotName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (clientId: string) => void;
  chatbotName?: string;
}) {
  const { chatbotId } = useParams<{ chatbotId: string }>();
  const [formData, setFormData] = useState({
    chatbotId: chatbotId as string,
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: createClient } = useCreateClient({
    onSuccess: (data) => {
      if (data.success && data.data) {
        // Save client ID to localStorage
        localStorage.setItem(CLIENT_ID_KEY, data.data._id);
        onRegister(data.data._id);
      }
    },
    onError: () => {
      toast.error("Failed to register. Please try again.");
      setIsSubmitting(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate the form data
      const validated = createClientSchema.parse(formData);
      await createClient(validated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to form errors
        const formErrors: Record<string, string> = {};
        for (const err of error.errors) {
          if (err.path[0]) {
            formErrors[err.path[0] as string] = err.message;
          }
        }
        setErrors(formErrors);
      } else {
        toast.error("An unexpected error occurred");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Register to chat with {chatbotName || "AI Coach"}
          </DialogTitle>
          <DialogDescription>
            Please provide your information to start the conversation
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number (optional)</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-destructive">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register & Start Chat"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function ChatPage() {
  const { chatbotId } = useParams<{ chatbotId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [showClientDialog, setShowClientDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get chatbot details
  const { data: chatbotResponse, isLoading: isLoadingChatbot } = useChatbot(
    chatbotId as string,
    {
      queryKey: chatbotKeys.detail(chatbotId as string),
      enabled: !!chatbotId,
    }
  );

  // Get existing session if available
  const { isLoading: isLoadingSession } = useSession(sessionId || "", {
    queryKey: sessionId ? sessionKeys.detail(sessionId) : ["session", "none"],
    enabled: !!sessionId,
  });

  // Session mutations
  const { mutateAsync: createSession } = useCreateSession();
  const { mutateAsync: addMessage } = useAddMessage(sessionId || "");
  const { mutateAsync: processMessage } = useProcessMessage(sessionId || "");
  const { mutateAsync: endSession } = useEndSession();

  // Load client ID from localStorage on initial render
  useEffect(() => {
    const storedClientId = localStorage.getItem(CLIENT_ID_KEY);
    if (storedClientId) {
      setClientId(storedClientId);
    }
  }, []);

  // Load session from localStorage on initial render
  useEffect(() => {
    const loadSessionFromStorage = () => {
      try {
        const storedSessionId = localStorage.getItem(SESSION_ID_KEY);
        const storedChatbotId = localStorage.getItem(CHATBOT_ID_KEY);

        // Only restore session if it's for the current chatbot
        if (storedSessionId && storedChatbotId === chatbotId) {
          setSessionId(storedSessionId);

          // Load stored messages
          const storedMessages = localStorage.getItem(MESSAGES_KEY);
          if (storedMessages) {
            const parsedMessages = JSON.parse(storedMessages);
            // Convert timestamps back to Date objects
            const messagesWithDateObjects = parsedMessages.map(
              (msg: Message) => ({
                ...msg,
                timestamp: new Date(msg.timestamp),
                id: msg.id || generateId(), // Ensure ID exists
              })
            );
            setMessages(messagesWithDateObjects);
          }
        } else if (storedSessionId && storedChatbotId !== chatbotId) {
          // If user switched to a different chatbot, end the previous session
          endSession(storedSessionId).catch(console.error);
          clearSessionStorage();
        }
      } catch (error) {
        console.error("Error loading session from localStorage:", error);
        clearSessionStorage();
      }
    };

    loadSessionFromStorage();
  }, [chatbotId, endSession]);

  // Show client registration dialog if chatbot is loaded and client is not registered
  useEffect(() => {
    if (chatbotResponse?.data && !sessionId && !clientId) {
      setShowClientDialog(true);
    }
  }, [chatbotResponse, sessionId, clientId]);

  // Initialize chat session if needed
  useEffect(() => {
    const initSession = async () => {
      if (chatbotId && clientId && !sessionId) {
        try {
          const result = await createSession({
            chatbotId: chatbotId as string,
            clientId: clientId,
          });

          if (result.success && result.data) {
            const newSessionId = result.data._id;
            setSessionId(newSessionId);

            // Save session to localStorage
            localStorage.setItem(SESSION_ID_KEY, newSessionId);
            localStorage.setItem(CHATBOT_ID_KEY, chatbotId as string);

            // Create a greeting message - check if there's metadata with greeting
            let greetingText = DEFAULT_WELCOME_MESSAGE;

            // Try to get greeting from chatbot
            if (chatbotResponse?.data?.metadata?.greeting) {
              greetingText = chatbotResponse.data.metadata.greeting as string;
            }

            const greetingMessage = {
              role: "assistant" as const,
              content: greetingText,
              timestamp: new Date(),
              id: generateId(),
            };

            setMessages([greetingMessage]);
            localStorage.setItem(
              MESSAGES_KEY,
              JSON.stringify([greetingMessage])
            );
          }
        } catch (error) {
          toast.error("Failed to start chat session");
          console.error(error);
        }
      }
    };

    if (chatbotResponse?.data && clientId && !sessionId) {
      initSession();
    }
  }, [chatbotId, chatbotResponse, createSession, sessionId, clientId]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0 && sessionId) {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    }
  }, [messages, sessionId]);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleRegistrationComplete = (newClientId: string) => {
    setClientId(newClientId);
    setShowClientDialog(false);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
      id: generateId(),
    };

    // Add user message to UI
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    try {
      // Send message to backend
      await addMessage({
        message: {
          role: "user",
          content: userMessage.content,
          timestamp: new Date().toISOString(),
        },
      });

      // Process message to get chatbot response
      const response = await processMessage({
        content: userMessage.content,
      });

      if (response.success && response.data) {
        // Add bot response to UI
        const botMessage: Message = {
          role: "assistant",
          content: response.data.content,
          timestamp: new Date(),
          id: generateId(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      toast.error("Failed to process message");
      console.error(error);
    } finally {
      setIsThinking(false);
    }
  };

  const clearSessionStorage = () => {
    localStorage.removeItem(SESSION_ID_KEY);
    localStorage.removeItem(CHATBOT_ID_KEY);
    localStorage.removeItem(MESSAGES_KEY);
    // Note: We don't clear CLIENT_ID_KEY so users don't have to re-register
  };

  // const handleEndChat = async () => {
  //   if (sessionId) {
  //     try {
  //       await endSession(sessionId);
  //       toast.success("Chat session ended");
  //     } catch (error) {
  //       console.error("Error ending session:", error);
  //     } finally {
  //       clearSessionStorage();
  //       setSessionId(null);
  //       setMessages([]);
  //     }
  //   }
  // };

  // Handle window unload to save session state
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (sessionId && messages.length > 0) {
        localStorage.setItem(SESSION_ID_KEY, sessionId);
        localStorage.setItem(CHATBOT_ID_KEY, chatbotId as string);
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [sessionId, chatbotId, messages]);

  if (isLoadingChatbot || isLoadingSession) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading chatbot...</p>
        </div>
      </div>
    );
  }

  if (!chatbotResponse?.data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold">Chatbot not found</h1>
          <p className="mt-2 text-muted-foreground">
            The chatbot you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </p>
        </div>
      </div>
    );
  }

  const chatbot = chatbotResponse.data;

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col overflow-hidden p-4">
      {/* Client registration dialog */}
      <ClientRegistrationDialog
        isOpen={showClientDialog}
        onClose={() => setShowClientDialog(false)}
        onRegister={handleRegistrationComplete}
        chatbotName={chatbot.name}
      />

      {/* Chat header */}
      <div className="mb-4 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/images/ai-coach-avatar.png" alt={chatbot.name} />
            <AvatarFallback>{chatbot.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">{chatbot.name}</h1>
            {chatbot.description && (
              <p className="text-sm text-muted-foreground">
                {chatbot.description}
              </p>
            )}
          </div>
        </div>

        {/* {sessionId && (
          <Button variant="ghost" size="sm" onClick={handleEndChat}>
            End Chat
          </Button>
        )} */}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4 p-1 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarImage src="/images/ai-coach-avatar.png" alt="AI" />
                    <AvatarFallback>{chatbot.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div
                    className={`text-sm whitespace-pre-wrap ${
                      message.role === "user"
                        ? ""
                        : "prose dark:prose-invert prose-sm max-w-none"
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        p: (props) => <p className="mb-1" {...props} />,
                        ul: (props) => <ul className="my-1 pl-4" {...props} />,
                        ol: (props) => <ol className="my-1 pl-4" {...props} />,
                        li: (props) => <li className="mb-0.5" {...props} />,
                        h1: (props) => (
                          <h1
                            className="text-lg font-semibold my-1"
                            {...props}
                          />
                        ),
                        h2: (props) => (
                          <h2
                            className="text-base font-semibold my-1"
                            {...props}
                          />
                        ),
                        h3: (props) => (
                          <h3
                            className="text-sm font-semibold my-1"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                  <p className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.role === "user" && (
                  <Avatar className="ml-2 h-8 w-8">
                    <AvatarImage src="/images/user-avatar.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src="/images/ai-coach-avatar.png" alt="AI" />
                  <AvatarFallback>{chatbot.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="animate-bounce h-2 w-2 bg-muted-foreground/50 rounded-full delay-100" />
                    <span className="animate-bounce h-2 w-2 bg-muted-foreground/50 rounded-full delay-200" />
                    <span className="animate-bounce h-2 w-2 bg-muted-foreground/50 rounded-full delay-300" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Thinking...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Chat input */}
      <div className="mt-4 flex gap-2">
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!sessionId || isThinking}
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
          disabled={!sessionId || !input.trim() || isThinking}
          type="submit"
        >
          <IconSend className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
