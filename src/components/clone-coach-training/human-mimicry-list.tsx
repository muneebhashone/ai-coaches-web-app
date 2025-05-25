"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, User } from "lucide-react";

interface HumanMimicryStyle {
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
  createdAt: string;
}

interface HumanMimicryListProps {
  styles: HumanMimicryStyle[];
  selectedStyles: string[];
  onToggleSelection: (styleId: string) => void;
  onEdit: (styleId: string) => void;
  onDelete: (styleId: string) => void;
}

export function HumanMimicryList({
  styles,
  selectedStyles,
  onToggleSelection,
  onEdit,
  onDelete
}: HumanMimicryListProps) {
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  if (styles.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p className="text-sm">No human mimicry styles created yet.</p>
        <p className="text-xs">Add your first style to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {styles.map((style) => (
        <Card
          key={style.id}
          className={`transition-colors cursor-pointer ${
            selectedStyles.includes(style.id)
              ? "bg-primary/10 border-primary"
              : "hover:bg-muted/50"
          }`}
          onClick={() => onToggleSelection(style.id)}
          onKeyDown={(e) => handleKeyDown(e, () => onToggleSelection(style.id))}
          tabIndex={0}
          role="button"
          aria-pressed={selectedStyles.includes(style.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-base flex items-center">
                  <User className="h-4 w-4 mr-2 text-primary" />
                  {style.name}
                </CardTitle>
                {style.description && (
                  <CardDescription className="mt-1">
                    {style.description}
                  </CardDescription>
                )}
              </div>
              <div className="flex items-center space-x-1 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(style.id);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(style.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Personality traits */}
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  {style.personality.tone}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {style.personality.style}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {style.personality.approach}
                </Badge>
              </div>

              {/* Tone example */}
              {style.toneExample && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Tone Example:</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {style.toneExample}
                  </p>
                </div>
              )}

              {/* Writing example */}
              {style.writingExample && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Writing Example:</p>
                  <p className="text-xs text-muted-foreground line-clamp-3 italic">
                    &quot;{style.writingExample}&quot;
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Created: {style.createdAt}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 