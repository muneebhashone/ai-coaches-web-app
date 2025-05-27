"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Loader2, 
  Plus, 
  Trash2, 
  Clock, 
  Users, 
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { 
  CreateMultipleSessionsSchema, 
  SessionTemplateSchema,
  durations,
  type CreateMultipleSessionsSchemaType,
  type SessionTemplateSchemaType 
} from "@/services/sessions/session.schema";
import { SessionStatusEnum } from "@/services/sessions/session.types";
import { useCreateMultipleSessions } from "@/services/sessions/session.hooks";
import { useChatbotFlowStore } from "@/stores/useChatbotFlowStore";
import { 
  generateSessions, 
  quickGenerationPresets,
  convertDatetimeLocalToISO,
  type SessionGenerationOptions 
} from "@/utils/session-utils";

interface SessionCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExplicitClose: () => void;
}

export function SessionCreationModal({ isOpen, onClose, onExplicitClose }: SessionCreationModalProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [creationResults, setCreationResults] = useState<any>(null);
  const [showTemplate, setShowTemplate] = useState(true);
  
  const { selectedProgram, addSession } = useChatbotFlowStore();
  const createMultipleSessionsMutation = useCreateMultipleSessions();

  // Main form for multiple sessions
  const form = useForm<CreateMultipleSessionsSchemaType>({
    resolver: zodResolver(CreateMultipleSessionsSchema),
    defaultValues: {
      programId: selectedProgram?._id || "",
      chatbotId: selectedProgram?.chatbotId || "",
      sessions: [{
        sessionDate: "",
        name: "",
        duration: "1hr" as const,
        status: SessionStatusEnum.NEXT,
        active: true,
      }],
    },
  });

  useEffect(() => {
    if (selectedProgram) {
      form.setValue("programId", selectedProgram._id);
      form.setValue("chatbotId", selectedProgram.chatbotId);
    }
  }, [selectedProgram, form]);

  // Template form for quick generation
  const templateForm = useForm<SessionTemplateSchemaType>({
    resolver: zodResolver(SessionTemplateSchema),
    defaultValues: {
      namePattern: "Session {number}",
      duration: "1hr" as const,
      status: SessionStatusEnum.NEXT,
      active: true,
    },
  });

  console.log({errors: form.formState.errors});
  console.log({selectedProgram});
  
  // Debug: Log current form values
  const watchedSessions = form.watch("sessions");
  console.log('Current sessions in form:', watchedSessions);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sessions",
  });

  const handleSubmit = async (data: CreateMultipleSessionsSchemaType) => {
    console.log('Original data:', data);

    if (!selectedProgram) return;

    setIsCreating(true);
    setCreationResults(null);

    try {
      // Convert datetime-local format to ISO format for API
      const formattedData = {
        ...data,
        sessions: data.sessions.map(session => ({
          ...session,
          sessionDate: convertDatetimeLocalToISO(session.sessionDate)
        }))
      };

      console.log('Formatted data for API:', formattedData);

      const result = await createMultipleSessionsMutation.mutateAsync(formattedData);
      setCreationResults(result);
      
      // Add successful sessions to the flow store
      for (const sessionResult of result.results) {
        if (sessionResult.success && sessionResult.data) {
          addSession(sessionResult.data);
        }
      }

      // If all sessions were created successfully, close modal
      if (result.results.every(r => r.success)) {
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to create sessions:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleQuickGenerate = (preset: typeof quickGenerationPresets[0]) => {
    const template = templateForm.getValues();
    const startDate = new Date();
    startDate.setHours(startDate.getHours() + 1); // Start from next hour

    const options: SessionGenerationOptions = {
      startDate,
      count: preset.count,
      interval: preset.interval,
      template,
    };

    const generatedSessions = generateSessions(options);
    
    // Replace current sessions with generated ones
    form.setValue("sessions", generatedSessions);
    setShowTemplate(false);
  };

  const handleAddSession = () => {
    const template = templateForm.getValues();
    const existingSessions = form.getValues("sessions");
    const nextNumber = existingSessions.length + 1;
    
    const newSession = {
      sessionDate: "",
      name: template.namePattern.includes('{number}') 
        ? template.namePattern.replace('{number}', nextNumber.toString())
        : `${template.namePattern} ${nextNumber}`,
      duration: template.duration,
      status: template.status,
      active: template.active,
    };

    append(newSession);
  };

  const handleClose = () => {
    if (!isCreating) {
      form.reset();
      templateForm.reset();
      setCreationResults(null);
      setShowTemplate(true);
      onClose();
    }
  };

  const getTodayDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  if (!selectedProgram) {
    return null;
  }

  const handleExplicitClose = () => {
    onExplicitClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Calendar className="h-6 w-6 mr-2 text-primary" />
            Create Sessions for {selectedProgram.name}
          </DialogTitle>
          <DialogDescription>
            Create multiple sessions for this program. Use the template to quickly generate sessions or add them individually.
          </DialogDescription>
        </DialogHeader>

        <DialogBody className="space-y-6">
          {/* Program Info */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedProgram.name}</p>
                  {selectedProgram.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedProgram.description}
                    </p>
                  )}
                </div>
                <Badge variant="secondary">
                  <Users className="h-3 w-3 mr-1" />
                  Program
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Session Template Section */}
          {showTemplate && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Zap className="h-5 w-5 mr-2" />
                  Session Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Form {...templateForm}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={templateForm.control}
                      name="namePattern"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name Pattern</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Session {number}"
                              {...field}
                              disabled={isCreating}
                            />
                          </FormControl>
                          <FormDescription>
                            Use {"{number}"} for auto-numbering
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={templateForm.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Duration</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger disabled={isCreating}>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {durations.map((duration) => (
                                <SelectItem key={duration} value={duration}>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    {duration}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Quick Generation Buttons */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Quick Generate:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickGenerationPresets.map((preset) => (
                        <Button
                          key={preset.label}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickGenerate(preset)}
                          disabled={isCreating}
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Sessions Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Sessions ({fields.length})
                </div>
                <div className="flex gap-2">
                  {!showTemplate && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTemplate(true)}
                      disabled={isCreating}
                    >
                      Show Template
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddSession}
                    disabled={isCreating}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Session
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {fields.map((field, index) => (
                      <Card key={field.id} className="border-l-4 border-l-primary/20">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">Session {index + 1}</h4>
                            {fields.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => remove(index)}
                                disabled={isCreating}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`sessions.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Session Name *</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter session name"
                                      {...field}
                                      disabled={isCreating}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`sessions.${index}.duration`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Duration *</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger disabled={isCreating}>
                                        <SelectValue placeholder="Select duration" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {durations.map((duration) => (
                                        <SelectItem key={duration} value={duration}>
                                          <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2" />
                                            {duration}
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name={`sessions.${index}.sessionDate`}
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Session Date & Time *</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="datetime-local"
                                      min={getTodayDateTime()}
                                      {...field}
                                      disabled={isCreating}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Creation Results */}
                  {creationResults && (
                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          {creationResults.success ? (
                            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
                          )}
                          Creation Results
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {creationResults.results.map((result: any, index: number) => (
                            <div key={`result-${result.sessionData.name}-${index}`} className="flex items-center justify-between p-2 rounded border">
                              <span className="text-sm">{result.sessionData.name}</span>
                              {result.success ? (
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Created
                                </Badge>
                              ) : (
                                <Badge variant="destructive">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Failed
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {creationResults.results.some((r: any) => !r.success) && (
                          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                            <p className="text-sm text-yellow-800">
                              Some sessions failed to create. You can try creating them again or modify the details.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Form Actions */}
                  <Separator />
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleExplicitClose}
                      disabled={isCreating}
                    >
                      {creationResults ? 'Close' : 'Cancel'}
                    </Button>
                    
                      <Button
                        type="submit"
                        disabled={isCreating || fields.length === 0}
                      >
                        {isCreating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                        Create {fields.length} Session{fields.length !== 1 ? 's' : ''}
                      </Button>

                    
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}