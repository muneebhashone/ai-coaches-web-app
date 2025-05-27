"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Target, Loader2, Plus, X } from "lucide-react";
// import { CreateProgramSchema, type CreateProgramSchemaType } from "@/services/programs/program.schema";
import { useCreateProgram } from "@/services/programs/program.hooks";
import { useChatbotFlowStore } from "@/stores/useChatbotFlowStore";

interface ProgramCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExplicitClose: () => void;
}

export function ProgramCreationModal({ isOpen, onClose, onExplicitClose }: ProgramCreationModalProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [goals, setGoals] = useState<string[]>([]);
  const [newGoal, setNewGoal] = useState("");
  
  const { selectedChatbot, setSelectedProgram } = useChatbotFlowStore();
  const createProgramMutation = useCreateProgram();

  const form = useForm({
    // resolver: zodResolver(CreateProgramSchema),
    defaultValues: {
      name: "",
      description: "",
      chatbotId: selectedChatbot?._id || "",
      goals: [],
      isActive: true,
    },
  });

  const handleSubmit = async (data: any) => {
    if (!selectedChatbot) return;

    setIsCreating(true);

    try {
      const programData = {
        ...data,
        chatbotId: selectedChatbot._id,
        goals: goals.join(","),
      };

      const result = await createProgramMutation.mutateAsync(programData);
      
      if (result.success && result.data) {
        // Set the newly created program in the flow store
        setSelectedProgram(result.data);
        
        // Reset form and close modal
        form.reset();
        setGoals([]);
        onClose();
      }
    } catch (error) {
      console.error('Failed to create program:', error);
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
    setGoals(goals.filter(goal => goal !== goalToRemove));
  };

  const handleClose = () => {
    if (!isCreating) {
      form.reset();
      setGoals([]);
      setNewGoal("");
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Target className="h-6 w-6 mr-2 text-primary" />
            Create Program for {selectedChatbot.name}
          </DialogTitle>
          <DialogDescription>
            Create a coaching program that will define the structure and goals for this chatbot&apos;s sessions.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                      Give your program a descriptive name that reflects its purpose.
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
                      Optional description of the program&apos;s objectives and approach.
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
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Active Status
                      </FormLabel>
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
                  Create Program
                </Button>
              </div>
            </form>
          </Form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}