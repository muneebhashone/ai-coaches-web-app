"use client";

import { useEffect, useState } from "react";
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
import {
  useCreateKnowledgeBase,
  useKnowledgeBasesByChatbotId,
  useUpdateKnowledgeBase,
} from "@/services/knowledge-bases/knowledge-base.hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChatbot } from "@/services/chatbots/chatbot.hooks";
import { useProgramByChatbotId } from "@/services/programs/program.hooks";
import { useSessions } from "@/services/sessions/session.hooks";

interface KnowledgeBaseCreationModalProps {
  chatbotId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function KnowledgeBaseCreationModal({
  isOpen,
  onClose,
  chatbotId,
}: KnowledgeBaseCreationModalProps) {
  const [isCreating, setIsCreating] = useState(false);

  const createKnowledgeBaseMutation = useCreateKnowledgeBase();
  const updateKnowledgeBaseMutation = useUpdateKnowledgeBase();

  const { data: chatbot } = useChatbot(chatbotId);

  const selectedChatbot = chatbot?.data;

  const { data: programData } = useProgramByChatbotId(chatbotId);

  const { data: sessions } = useSessions({
    programId: programData?.data?._id || "",
    page: 1,
    limit: 100,
  });

  const { data: knowledgeBase } = useKnowledgeBasesByChatbotId(chatbotId);

  const selectedSessions = sessions?.data?.results || [];

  const form = useForm({
    resolver: zodResolver(CreateKnowledgeBaseSchema),
    defaultValues: {
      name: knowledgeBase?.data?.name || "",
      description: knowledgeBase?.data?.description || "",
      chatbotId: chatbotId,
    },
  });

  useEffect(() => {
    if (chatbotId) {
      form.setValue("chatbotId", chatbotId);
    }

    if (knowledgeBase?.data) {
      form.setValue("name", knowledgeBase.data.name);
      form.setValue("description", knowledgeBase.data.description);
    }
  }, [chatbotId, form, knowledgeBase?.data]);

  const handleSubmit = async (data: any) => {
    if (!chatbotId) return;

    setIsCreating(true);

    try {
      let result: any;

      if (knowledgeBase?.data) {
        result = await updateKnowledgeBaseMutation.mutateAsync({
          ...data,
          _id: knowledgeBase.data._id,
        });
      } else {
        result = await createKnowledgeBaseMutation.mutateAsync(data);
      }

      if (result.success && result.data) {
        form.reset();
        onClose();
      }
    } catch (error) {
      console.error("Failed to create knowledge base:", error);
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Database className="h-6 w-6 mr-2 text-primary" />
            {knowledgeBase?.data ? "Edit" : "Create"} Knowledge Base
          </DialogTitle>
          <DialogDescription>
            Create a knowledge base to store documents and information that your
            chatbot can reference during conversations.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Context Info */}
              <div className="bg-muted/50 p-3 rounded-lg space-y-1">
                <p className="text-sm font-medium">
                  For Chatbot: {selectedChatbot?.name}
                </p>
                {selectedSessions.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    This knowledge base will be linked to your chatbot and{" "}
                    {selectedSessions.length} session
                    {selectedSessions.length !== 1 ? "s" : ""}.
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
                      Optional description of the knowledge base content and
                      purpose.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Info Note */}
              <div className="bg-primary/10 border border-primary/20 rounded-md p-3">
                <p className="text-sm text-primary">
                  📚 <strong>Next Steps:</strong> After creating this knowledge
                  base, you&apos;ll be able to upload documents and configure
                  human mimicry styles.
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
                  onClick={handleClose}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isCreating || !form.formState.isValid}
                >
                  {isCreating && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {knowledgeBase?.data ? "Update" : "Create"} Knowledge Base
                </Button>
              </div>
            </form>
          </Form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
