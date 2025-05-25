"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save, User } from "lucide-react";

interface HumanMimicryFormData {
  name: string;
  description: string;
  toneExample: string;
  styleExample: string;
  writingExample: string;
  transcripts: string;
  personality: {
    tone: string;
    style: string;
    approach: string;
  };
}

interface HumanMimicryFormProps {
  editingId: string | null;
  existingData?: {
    id: string;
    name: string;
    description: string;
    toneExample: string;
    styleExample: string;
    writingExample: string;
    personality: {
      tone: string;
      style: string;
      approach: string;
    };
  };
  onClose: () => void;
  onSave: (data: HumanMimicryFormData) => void;
}

const toneOptions = [
  "professional", "empathetic", "casual", "authoritative", "supportive"
];

const styleOptions = [
  "structured", "conversational", "analytical", "creative", "direct"
];

const approachOptions = [
  "consultative", "directive", "collaborative", "person-centered", "solution-focused"
];

export function HumanMimicryForm({
  editingId,
  existingData,
  onClose,
  onSave
}: HumanMimicryFormProps) {
  const [formData, setFormData] = useState<HumanMimicryFormData>({
    name: existingData?.name || "",
    description: existingData?.description || "",
    toneExample: existingData?.toneExample || "",
    styleExample: existingData?.styleExample || "",
    writingExample: existingData?.writingExample || "",
    transcripts: "",
    personality: {
      tone: existingData?.personality.tone || "",
      style: existingData?.personality.style || "",
      approach: existingData?.personality.approach || ""
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handlePersonalityChange = (field: keyof HumanMimicryFormData['personality'], value: string) => {
    setFormData(prev => ({
      ...prev,
      personality: {
        ...prev.personality,
        [field]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.personality.tone) {
      newErrors.tone = "Tone is required";
    }

    if (!formData.personality.style) {
      newErrors.style = "Style is required";
    }

    if (!formData.personality.approach) {
      newErrors.approach = "Approach is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Executive Communication Style"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of this style"
              />
            </div>
          </div>

          {/* Personality Configuration */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Personality Configuration *</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select
                  value={formData.personality.tone}
                  onValueChange={(value) => handlePersonalityChange("tone", value)}
                >
                  <SelectTrigger className={errors.tone ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.tone && (
                  <p className="text-xs text-destructive">{errors.tone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">Style</Label>
                <Select
                  value={formData.personality.style}
                  onValueChange={(value) => handlePersonalityChange("style", value)}
                >
                  <SelectTrigger className={errors.style ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {styleOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.style && (
                  <p className="text-xs text-destructive">{errors.style}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="approach">Approach</Label>
                <Select
                  value={formData.personality.approach}
                  onValueChange={(value) => handlePersonalityChange("approach", value)}
                >
                  <SelectTrigger className={errors.approach ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select approach" />
                  </SelectTrigger>
                  <SelectContent>
                    {approachOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.approach && (
                  <p className="text-xs text-destructive">{errors.approach}</p>
                )}
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="toneExample">Tone Example</Label>
              <Textarea
                id="toneExample"
                value={formData.toneExample}
                onChange={(e) => handleInputChange("toneExample", e.target.value)}
                placeholder="Describe the tone characteristics..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="styleExample">Style Example</Label>
              <Textarea
                id="styleExample"
                value={formData.styleExample}
                onChange={(e) => handleInputChange("styleExample", e.target.value)}
                placeholder="Describe the communication style..."
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="writingExample">Writing Example</Label>
              <Textarea
                id="writingExample"
                value={formData.writingExample}
                onChange={(e) => handleInputChange("writingExample", e.target.value)}
                placeholder="Provide a sample response in this style..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transcripts">Sample Transcripts</Label>
              <Textarea
                id="transcripts"
                value={formData.transcripts}
                onChange={(e) => handleInputChange("transcripts", e.target.value)}
                placeholder="Coach: ... Client: ... Coach: ..."
                rows={3}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {editingId ? "Update Style" : "Create Style"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 