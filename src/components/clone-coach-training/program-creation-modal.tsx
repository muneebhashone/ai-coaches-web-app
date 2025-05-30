"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Badge } from "@/components/ui/badge";
import { Target, Loader2, Plus, X } from "lucide-react";
import {
  useCreateProgram,
  useProgramByChatbotId,
  useUpdateProgram,
} from "@/services/programs/program.hooks";
import { useChatbot } from "@/services/chatbots/chatbot.hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProgramSchema } from "@/services/programs/program.schema";
import { ICreateProgramResponse } from "@/services/programs/program.types";
import { IUpdateProgramResponse } from "@/services/programs/program.types";

interface ProgramCreationModalProps {
  isOpen: boolean;
  chatbotId: string;
  onClose: () => void;
}

export function ProgramCreationModal({
  isOpen,
  onClose,
  chatbotId,
}: ProgramCreationModalProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [goals, setGoals] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState("");

  const createProgramMutation = useCreateProgram();
  const updateProgramMutation = useUpdateProgram();

  const { data: selectedChatbot } = useChatbot(chatbotId);

  const { data: program } = useProgramByChatbotId(chatbotId);

  const form = useForm({
    resolver: zodResolver(CreateProgramSchema),
    defaultValues: {
      name: program?.data?.name || "",
      description: program?.data?.description || "",
      chatbotId: chatbotId,
      goals: program?.data?.goals?.split(",") || [],
      active: program?.data?.active || true,
    },
  });

  const isEdit = !!program?.data?._id;

  useEffect(() => {
    if (program) {
      setGoals(program.data.goals?.split(",") || []);

      form.setValue("name", program.data.name);
      form.setValue("description", program.data.description || "");
      form.setValue("goals", program.data.goals?.split(",") || []);
      form.setValue("chatbotId", program.data.chatbotId);
      form.setValue("active", program.data.active);
    }
  }, [program, form]);

  const handleSubmit = async (data: any) => {
    if (!selectedChatbot) return;

    setIsCreating(true);

    try {
      let result: ICreateProgramResponse | IUpdateProgramResponse;
      if (isEdit) {
        result = await updateProgramMutation.mutateAsync({
          id: program?.data?._id,
          data,
        });
      } else {
        result = await createProgramMutation.mutateAsync(data);
      }

      if (result.success && result.data) {
        form.reset();
        setGoals([]);
        onClose();
      }
    } catch (error) {
      console.error("Failed to create program:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const addGoal = () => {
    if (newGoal.trim() && !goals.includes(newGoal.trim())) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal("");
    }
  };

  const removeGoal = (goalToRemove: string) => {
    setGoals(goals.filter((goal) => goal !== goalToRemove));
  };

  const handleClose = () => {
    if (!isCreating) {
      form.reset();
      setGoals([]);
      setNewGoal("");
      onClose();
    }
  };

  if (!selectedChatbot) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Target className="h-6 w-6 mr-2 text-primary" />
            {isEdit ? "Update Program" : "Create Program"} for{" "}
            {selectedChatbot.data.name}
          </DialogTitle>
          <DialogDescription>
            Create a coaching program that will define the structure and goals
            for this chatbot&apos;s sessions.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Program Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Stress Management Program"
                        {...field}
                        disabled={isCreating}
                      />
                    </FormControl>
                    <FormDescription>
                      Give your program a descriptive name that reflects its
                      purpose.
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
                        placeholder="Describe what this program aims to achieve..."
                        rows={3}
                        {...field}
                        disabled={isCreating}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional description of the program&apos;s objectives and
                      approach.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Goals Section */}
              <div className="space-y-3">
                <FormLabel>Program Goals</FormLabel>

                {/* Add Goal Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter a program goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addGoal();
                      }
                    }}
                    disabled={isCreating}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addGoal}
                    disabled={!newGoal.trim() || isCreating}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Goals List */}
                {goals.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Added Goals:</p>
                    <div className="flex flex-wrap gap-2">
                      {goals.map((goal, index) => (
                        <Badge
                          key={index.toString()}
                          variant="secondary"
                          className="flex items-center gap-1 py-1"
                        >
                          {goal}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => removeGoal(goal)}
                            disabled={isCreating}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <FormDescription>
                  Add specific goals this program should help users achieve.
                </FormDescription>
              </div>

              {/* Active Status */}
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active Status</FormLabel>
                      <FormDescription>
                        Enable this program for immediate use.
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
              {createProgramMutation.error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                  <p className="text-sm text-destructive">
                    Failed to create program. Please try again.
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
                <Button type="submit" disabled={isCreating}>
                  {isCreating && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {isEdit ? "Update Program" : "Create Program"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
