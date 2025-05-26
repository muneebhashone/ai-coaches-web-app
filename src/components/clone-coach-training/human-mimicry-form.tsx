"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { X, Save, User } from "lucide-react";
import {
  PersonalityApproachSchema,
  PersonalityStyleSchema,
  PersonalityToneSchema,
  type CreateHumanMimicryDataSchemaType,
} from "@/services/human-mimicry/human-mimicry.schema";

// Extended schema for form validation, including personality (which might be stripped for API)
const humanMimicryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  toneExample: z.string().optional(),
  styleExample: z.string().optional(),
  writingExample: z.string().optional(),
  transcripts: z.string().optional(), // This field is in the form but not in API schema
  personality: z.object({
    tone: PersonalityToneSchema.min(1, "Tone is required"),
    style: PersonalityStyleSchema.min(1, "Style is required"),
    approach: PersonalityApproachSchema.min(1, "Approach is required"),
  }),
});

export type HumanMimicryFormValues = z.infer<typeof humanMimicryFormSchema>;

// This type represents the data structure the API expects for create/update
// (excluding personality as per current API schema)
export type HumanMimicryApiData = CreateHumanMimicryDataSchemaType;


interface HumanMimicryFormProps {
  editingId: string | null;
  existingData?: Partial<HumanMimicryFormValues> & { id?: string }; // Allow partial for create
  onClose: () => void;
  onSave: (data: HumanMimicryApiData, id?: string) => void; // id is present for updates
  isLoading?: boolean;
}

const toneOptions = PersonalityToneSchema.options;
const styleOptions = PersonalityStyleSchema.options;
const approachOptions = PersonalityApproachSchema.options;

export function HumanMimicryForm({
  editingId,
  existingData,
  onClose,
  onSave,
  isLoading = false,
}: HumanMimicryFormProps) {
  const t = useTranslations("dashboard.cloneCoachTraining.knowledgeBase.mimicryForm");
  const tValidation = useTranslations("validation");


  const form = useForm<HumanMimicryFormValues>({
    resolver: zodResolver(humanMimicryFormSchema),
    defaultValues: {
      name: existingData?.name || "",
      description: existingData?.description || "",
      toneExample: existingData?.toneExample || "",
      styleExample: existingData?.styleExample || "",
      writingExample: existingData?.writingExample || "",
      transcripts: existingData?.transcripts || "", // Not in API schema, form-only
      personality: {
        tone: existingData?.personality?.tone || "",
        style: existingData?.personality?.style || "",
        approach: existingData?.personality?.approach || "",
      },
    },
  });

  useEffect(() => {
    form.reset({
      name: existingData?.name || "",
      description: existingData?.description || "",
      toneExample: existingData?.toneExample || "",
      styleExample: existingData?.styleExample || "",
      writingExample: existingData?.writingExample || "",
      transcripts: existingData?.transcripts || "",
      personality: {
        tone: existingData?.personality?.tone || "",
        style: existingData?.personality?.style || "",
        approach: existingData?.personality?.approach || "",
      },
    });
  }, [existingData, form]);

  const onSubmit = (values: HumanMimicryFormValues) => {
    // COMMENT: Personality is part of the form but not the API create/update schema.
    // For now, we collect it in the form. If the API were to support it,
    // it would be included here. Otherwise, it's stripped.
    // The current HumanMimicryApiData type reflects this by omitting personality.
    const apiData: HumanMimicryApiData = {
      name: values.name,
      description: values.description,
      toneExample: values.toneExample,
      styleExample: values.styleExample,
      writingExample: values.writingExample,
      transcripts: values.transcripts, // This field is also not in the provided API schema for create/update
    };
    onSave(apiData, editingId || undefined);
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <User className="h-5 w-5 mr-2 text-primary" />
            {editingId ? t("editTitle") : t("addTitle")}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("nameLabel")} *</FormLabel>
                    <FormControl>
                      <Input placeholder={t("namePlaceholder")} {...field} disabled={isLoading} />
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
                    <FormLabel>{t("descriptionLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("descriptionPlaceholder")} {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Personality Configuration */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">{t("personalityLabel")} *</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="personality.tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("toneLabel")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("tonePlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {toneOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {t(`toneOptions.${option}` as any, option)}
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
                  name="personality.style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("styleLabel")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("stylePlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {styleOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {t(`styleOptions.${option}` as any, option)}
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
                  name="personality.approach"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("approachLabel")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("approachPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {approachOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {t(`approachOptions.${option}` as any, option)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Examples */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="toneExample"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("toneExampleLabel")}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t("toneExamplePlaceholder")} {...field} rows={2} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="styleExample"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("styleExampleLabel")}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t("styleExamplePlaceholder")} {...field} rows={2} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="writingExample"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("writingExampleLabel")}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t("writingExamplePlaceholder")} {...field} rows={3} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* COMMENT: 'transcripts' field is not in the API schema for create/update HumanMimicryData.
                  It's included here as it was in the original form.
                  If it's needed, the API schema would need to be updated.
              */}
              <FormField
                control={form.control}
                name="transcripts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("transcriptsLabel")}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t("transcriptsPlaceholder")} {...field} rows={3} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                {t("cancelButton")}
              </Button>
              <Button type="submit" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? t("savingButton") : (editingId ? t("updateButton") : t("createButton"))}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}