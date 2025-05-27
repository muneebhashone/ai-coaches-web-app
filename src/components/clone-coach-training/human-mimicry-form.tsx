"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save, User, Plus, Trash2 } from "lucide-react";
import type { IHumanMimicry } from "@/services/human-mimicry/human-mimicry.types";
import { CreateHumanMimicrySchema, CreateHumanMimicrySchemaType } from "@/services/human-mimicry/human-mimicry.schema";




interface HumanMimicryFormProps {
  editingId: string | null;
  existingData?: IHumanMimicry;
  onClose: () => void;
  onSave: (data: CreateHumanMimicrySchemaType) => void;
}

const styleOptions = [
  { value: "FORMAL", label: "Formal" },
  { value: "CASUAL", label: "Casual" },
  { value: "FRIENDLY", label: "Friendly" },
  { value: "PROFESSIONAL", label: "Professional" },
  { value: "ENTHUSIASTIC", label: "Enthusiastic" }
] as const;

export function HumanMimicryForm({
  editingId,
  existingData,
  onClose,
  onSave
}: HumanMimicryFormProps) {
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateHumanMimicrySchemaType>({
    resolver: zodResolver(CreateHumanMimicrySchema),
    defaultValues: {
      name: existingData?.name || "",
      description: existingData?.description || "",
      style: existingData?.style || "PROFESSIONAL",
      examples: existingData?.examples?.filter(ex => ex.trim()) || [""],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "examples" as never
  });

  // Reset form when existingData changes
  useEffect(() => {
    if (existingData) {
      reset({
        name: existingData.name,
        description: existingData.description || "",
        style: existingData.style,
        examples: existingData.examples?.filter(ex => ex.trim()) || [""],
      });
    }
  }, [existingData, reset]);

  const addExample = () => {
    append("");
  };

  const removeExample = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = (data: CreateHumanMimicrySchemaType) => {
    onSave(data);
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <User className="h-5 w-5 mr-2 text-primary" />
            {editingId ? "Edit Human Mimicry Style" : "Add New Human Mimicry Style"}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="e.g., Executive Communication Style"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Communication Style *</Label>
              <Controller
                name="style"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={errors.style ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {styleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.style && (
                <p className="text-xs text-destructive">{errors.style.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Brief description of this communication style..."
              rows={2}
            />
          </div>

          {/* Examples */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Communication Examples *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addExample}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Example
              </Button>
            </div>
            
            {errors.examples && (
              <p className="text-xs text-destructive">
                {errors.examples.message || errors.examples.root?.message}
              </p>
            )}

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <div className="flex-1">
                    <Textarea
                      {...register(`examples.${index}`)}
                      placeholder={`Example ${index + 1}: Provide a sample response or communication pattern...`}
                      rows={3}
                      className={errors.examples?.[index] ? "border-destructive" : ""}
                    />
                    {errors.examples?.[index] && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.examples[index]?.message}
                      </p>
                    )}
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExample(index)}
                      className="mt-1"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {editingId ? "Update Style" : "Create Style"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 