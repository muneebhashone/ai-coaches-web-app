"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { UpdateChatbotSchema, type UpdateChatbotSchemaType } from "@/services/chatbots/chatbot.schema";
import { useUpdateChatbot } from "@/services/chatbots/chatbot.hooks";
import type { IChatbot } from "@/services/chatbots/chatbot.types";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

interface ChatbotUpdateFormProps {
  chatbot: IChatbot;
  onSuccess?: () => void;
}

export function ChatbotUpdateForm({ chatbot, onSuccess }: ChatbotUpdateFormProps) {
  const t = useTranslations("dashboard.cloneCoachTraining.promptConfiguration");
  const tCommon = useTranslations("common");
  
  const updateChatbotMutation = useUpdateChatbot();

  const form = useForm<UpdateChatbotSchemaType>({
    resolver: zodResolver(UpdateChatbotSchema),
    defaultValues: {
      name: chatbot.name,
      description: chatbot.description || "",
      prompt: chatbot.prompt || "",
      active: chatbot.active,
    },
  });

  const onSubmit = async (data: UpdateChatbotSchemaType) => {
    try {
      await updateChatbotMutation.mutateAsync({
        id: chatbot._id,
        data,
      });
      
      toast.success(tCommon("success"));
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : tCommon("error"));
    }
  };

  const isLoading = updateChatbotMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("form.namePlaceholder")}
                  disabled={isLoading}
                  {...field}
                />
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
              <FormLabel>{t("form.description")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("form.descriptionPlaceholder")}
                  disabled={isLoading}
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("form.descriptionHelper")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("form.systemPrompt")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("form.systemPromptPlaceholder")}
                  disabled={isLoading}
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("form.systemPromptHelper")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>{t("form.active")}</FormLabel>
                <FormDescription>
                  {t("form.activeHelper")}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {tCommon("saving")}
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {tCommon("save")}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
} 