"use client";

import { useState } from "react";
// import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Bot, Loader2 } from "lucide-react";
// import { CreateChatbotSchema, type CreateChatbotSchemaType } from "@/services/chatbots/chatbot.schema";
import { useCreateChatbot } from "@/services/chatbots/chatbot.hooks";
import { useChatbotFlowStore } from "@/stores/useChatbotFlowStore";
import { CreateChatbotSchema } from "@/services/chatbots/chatbot.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface ChatbotCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatbotCreationModal({ isOpen, onClose }: ChatbotCreationModalProps) {
  // const t = useTranslations("dashboard.cloneCoachTraining.createChatbot");
  const [isCreating, setIsCreating] = useState(false);
  
  const { setSelectedChatbot, setIsCreating: setFlowCreating } = useChatbotFlowStore();
  const createChatbotMutation = useCreateChatbot();

  const form = useForm({
    resolver: zodResolver(CreateChatbotSchema),
    defaultValues: {
      name: "",
      description: "",
      active: true,
    },
  });

  const handleSubmit = async (data: any) => {
    setIsCreating(true);
    setFlowCreating(true);

    try {
      // Clean up empty optional fields
      const cleanData = {
        ...data,
        description: data.description?.trim() || undefined,
        prompt: data.prompt?.trim() || undefined,
      };
      
      const result = await createChatbotMutation.mutateAsync(cleanData);
      
      if (result.success && result.data) {
        // Set the newly created chatbot in the flow store
        setSelectedChatbot(result.data);
        
        // Reset form and close modal
        form.reset();
        onClose();
      }
    } catch (error) {
      console.error('Failed to create chatbot:', error);
      // Error handling will be shown via form state
    } finally {
      setIsCreating(false);
      setFlowCreating(false);
    }
  };

  const handleClose = () => {
    if (!isCreating) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Bot className="h-6 w-6 mr-2 text-primary" />
            Create New Chatbot
          </DialogTitle>
          <DialogDescription>
            Create a new AI coaching chatbot. You can configure advanced settings later in the training flow.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Chatbot Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chatbot Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Wellness Coach AI"
                        {...field}
                        disabled={isCreating}
                      />
                    </FormControl>
                    <FormDescription>
                      Give your chatbot a descriptive name that reflects its purpose.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what this chatbot is designed to help with..."
                        rows={3}
                        {...field}
                        disabled={isCreating}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional description to help you remember this chatbot&apos;s purpose.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

            

              {/* Active Status */}
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Active Status
                      </FormLabel>
                      <FormDescription>
                        Enable this chatbot for use immediately after creation.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isCreating}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Error Message */}
              {createChatbotMutation.error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                  <p className="text-sm text-destructive">
                    Failed to create chatbot. Please try again.
                  </p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating || !form.formState.isValid}
                >
                  {isCreating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Create Chatbot
                </Button>
              </div>
            </form>
          </Form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}