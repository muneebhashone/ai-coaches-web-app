"use client";

import {  useEffect, useState } from "react";
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
import { Database, Loader2 } from "lucide-react";
import { CreateKnowledgeBaseSchema } from "@/services/knowledge-bases/knowledge-base.schema";
import { useCreateKnowledgeBase } from "@/services/knowledge-bases/knowledge-base.hooks";
import { useChatbotFlowStore } from "@/stores/useChatbotFlowStore";
import { zodResolver } from "@hookform/resolvers/zod";

interface KnowledgeBaseCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExplicitClose: () => void;
}

export function KnowledgeBaseCreationModal({ isOpen, onClose, onExplicitClose }: KnowledgeBaseCreationModalProps) {
  const [isCreating, setIsCreating] = useState(false);
  
  const { selectedSessions, selectedChatbot, setSelectedKnowledgeBase } = useChatbotFlowStore();
  const createKnowledgeBaseMutation = useCreateKnowledgeBase();

  const form = useForm({
    resolver: zodResolver(CreateKnowledgeBaseSchema),
    defaultValues: {
      name: "",
      description: "",
      chatbotId: selectedChatbot?._id || "",
    },
  });

  useEffect(() => {
    if (selectedChatbot) {
      form.setValue("chatbotId", selectedChatbot._id);
    }
  }, [selectedChatbot, form]);

  const handleSubmit = async (data: any) => {
    if (!selectedChatbot) return;

    setIsCreating(true);

    try {
      const result = await createKnowledgeBaseMutation.mutateAsync(data);
      
      if (result.success && result.data) {
        // Set the newly created knowledge base in the flow store
        setSelectedKnowledgeBase(result.data);
        
        // Reset form and close modal
        form.reset();
        onClose();
      }
    } catch (error) {
      console.error('Failed to create knowledge base:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    if (!isCreating) {
      form.reset();
      onClose();
    }
  };

  const handleExplicitClose = () => {
    onExplicitClose();
  };

  if (!selectedChatbot) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Database className="h-6 w-6 mr-2 text-primary" />
            Create Knowledge Base
          </DialogTitle>
          <DialogDescription>
            Create a knowledge base to store documents and information that your chatbot can reference during conversations.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Context Info */}
              <div className="bg-muted/50 p-3 rounded-lg space-y-1">
                <p className="text-sm font-medium">For Chatbot: {selectedChatbot.name}</p>
                {selectedSessions.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    This knowledge base will be linked to your chatbot and {selectedSessions.length} session{selectedSessions.length !== 1 ? 's' : ''}.
                  </p>
                )}
              </div>

              {/* Knowledge Base Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Knowledge Base Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Wellness Resources KB"
                        {...field}
                        disabled={isCreating}
                      />
                    </FormControl>
                    <FormDescription>
                      Give your knowledge base a descriptive name.
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
                        placeholder="Describe what type of knowledge and documents this base will contain..."
                        rows={4}
                        {...field}
                        disabled={isCreating}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional description of the knowledge base content and purpose.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Info Note */}
              <div className="bg-primary/10 border border-primary/20 rounded-md p-3">
                <p className="text-sm text-primary">
                  📚 <strong>Next Steps:</strong> After creating this knowledge base, you&apos;ll be able to upload documents and configure human mimicry styles.
                </p>
              </div>

              {/* Error Message */}
              {createKnowledgeBaseMutation.error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                  <p className="text-sm text-destructive">
                    Failed to create knowledge base. Please try again.
                  </p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleExplicitClose}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating || !form.formState.isValid}
                >
                  {isCreating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Create Knowledge Base
                </Button>
              </div>
            </form>
          </Form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}