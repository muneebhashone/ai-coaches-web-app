"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChatbotSchema,
  type CreateChatbotSchemaType,
} from "@/services/chatbot/chatbot.schema";
import {
  useCreateChatbot,
  useUpdateChatbot,
  useChatbot,
  useDefaultPersona,
} from "@/services/chatbot/chatbot.hooks";
import { getKnowledgeBases } from "@/services/knowledge-base/knowledge-base.service";
import type { IKnowledgeBase } from "@/services/knowledge-base/knowledge-base.types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

interface ChatbotFormProps {
  isCreating: boolean;
  editingId: string | null;
  onCancel: (isCreating: boolean) => void;
}

export function ChatbotForm({
  isCreating,
  editingId,
  onCancel,
}: ChatbotFormProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedKnowledgeBases, setSelectedKnowledgeBases] = useState<
    string[]
  >([]);

  const form = useForm<CreateChatbotSchemaType>({
    resolver: zodResolver(createChatbotSchema),
    defaultValues: {
      name: "",
      description: "",
      persona: {
        name: "",
        description: "",
        promptTemplate: "",
        systemInstructions: "",
      },
      apiSettings: {
        model: "gpt-4",
        temperature: 0.7,
        maxTokens: 1000,
      },
      knowledgeBases: [],
    },
  });

  // Fetch knowledge bases
  const { data: knowledgeBasesResponse, isLoading: isLoadingKnowledgeBases } =
    useQuery({
      queryKey: ["knowledgeBases"],
      queryFn: () => getKnowledgeBases(),
    });

  // Fetch default persona
  const { data: defaultPersonaResponse } = useDefaultPersona();

  // Fetch chatbot data when editing
  const { data: chatbotResponse, isLoading: isLoadingChatbot } = useChatbot(
    editingId || "",
    {
      enabled: !!editingId,
      queryKey: ["chatbot", editingId],
    }
  );

  // Handle chatbot creation
  const { mutate: createChatbot, isPending: isCreatingChatbot } =
    useCreateChatbot({
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Chatbot created successfully");
          form.reset();
          onCancel(false);
        }
      },
      onError: () => {
        toast.error("Failed to create chatbot");
      },
    });

  // Handle chatbot update
  const { mutate: updateChatbot, isPending: isUpdatingChatbot } =
    useUpdateChatbot(editingId || "", {
      onSuccess: (response) => {
        if (response.success) {
          toast.success("Chatbot updated successfully");
          onCancel(false);
        }
      },
      onError: () => {
        toast.error("Failed to update chatbot");
      },
    });

  // Set default persona values when creating a new chatbot
  useEffect(() => {
    if (isCreating && defaultPersonaResponse?.data) {
      const { defaultPersona } = defaultPersonaResponse.data;
      form.setValue("persona.name", defaultPersona.name);
      form.setValue("persona.description", defaultPersona.description);
      form.setValue("persona.promptTemplate", defaultPersona.promptTemplate);
      form.setValue(
        "persona.systemInstructions",
        defaultPersona.systemInstructions
      );
    }
  }, [isCreating, defaultPersonaResponse, form]);

  // Set form values when editing a chatbot
  useEffect(() => {
    if (editingId && chatbotResponse?.data) {
      const chatbot = chatbotResponse.data;
      form.reset({
        name: chatbot.name,
        description: chatbot.description,
        persona: {
          name: chatbot.persona.name,
          description: chatbot.persona.description,
          promptTemplate: chatbot.persona.promptTemplate,
          systemInstructions: chatbot.persona.systemInstructions,
        },
        apiSettings: {
          model: chatbot.apiSettings.model,
          temperature: chatbot.apiSettings.temperature,
          maxTokens: chatbot.apiSettings.maxTokens,
        },
        knowledgeBases: chatbot.knowledgeBases,
      });
      setSelectedKnowledgeBases(chatbot.knowledgeBases);
    }
  }, [editingId, chatbotResponse, form]);

  const handleKnowledgeBaseSelect = (kbId: string) => {
    const newSelected = selectedKnowledgeBases.includes(kbId)
      ? selectedKnowledgeBases.filter((id) => id !== kbId)
      : [...selectedKnowledgeBases, kbId];

    setSelectedKnowledgeBases(newSelected);
    form.setValue("knowledgeBases", newSelected);
  };

  const onSubmit = (data: CreateChatbotSchemaType) => {
    // Ensure knowledgeBases is included in the submission
    const submissionData = {
      ...data,
      knowledgeBases: selectedKnowledgeBases,
    };

    if (isCreating) {
      createChatbot(submissionData);
    } else if (editingId) {
      updateChatbot(submissionData);
    }
  };

  if (!isCreating && !editingId) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">Chatbot Management</h3>
        <p className="text-muted-foreground mb-4">
          Create a new chatbot or select one to edit.
        </p>
        <Button onClick={() => onCancel(true)}>Create New Chatbot</Button>
      </div>
    );
  }

  if (editingId && isLoadingChatbot) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="basic" className="flex-1">
                Basic
              </TabsTrigger>
              <TabsTrigger value="persona" className="flex-1">
                Persona
              </TabsTrigger>
              <TabsTrigger value="api" className="flex-1">
                API Settings
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex-1">
                Knowledge Base
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter chatbot name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter chatbot description"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="persona" className="space-y-4">
              <FormField
                control={form.control}
                name="persona.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Persona Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter persona name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="persona.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Persona Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter persona description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="persona.promptTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt Template</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter prompt template"
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="persona.systemInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>System Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter system instructions"
                        {...field}
                        value={field.value || ""}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="api" className="space-y-4">
              <FormField
                control={form.control}
                name="apiSettings.model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter model name"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apiSettings.temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temperature (0-1)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="1"
                        step="0.1"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                        value={field.value || 0.7}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apiSettings.maxTokens"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Tokens</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value, 10))
                        }
                        value={field.value || 1000}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="knowledge" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">
                    Selected Knowledge Bases
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    {selectedKnowledgeBases.length} selected
                  </span>
                </div>

                {isLoadingKnowledgeBases ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <ScrollArea className="h-[300px] rounded-md border p-4">
                    <div className="space-y-2">
                      {knowledgeBasesResponse?.data?.results.map(
                        (kb: IKnowledgeBase) => (
                          <button
                            type="button"
                            key={kb._id}
                            className="w-full flex items-center justify-between p-2 hover:bg-accent rounded-lg text-left"
                            onClick={() => handleKnowledgeBaseSelect(kb._id)}
                          >
                            <div>
                              <p className="font-medium">{kb.name}</p>
                              {kb.description && (
                                <p className="text-sm text-muted-foreground">
                                  {kb.description}
                                </p>
                              )}
                            </div>
                            {selectedKnowledgeBases.includes(kb._id) && (
                              <Badge>Selected</Badge>
                            )}
                          </button>
                        )
                      )}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onCancel(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isCreatingChatbot || isUpdatingChatbot}
            >
              {(isCreatingChatbot || isUpdatingChatbot) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isCreating ? "Create Chatbot" : "Update Chatbot"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
