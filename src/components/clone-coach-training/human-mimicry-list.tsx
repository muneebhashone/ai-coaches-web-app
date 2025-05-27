"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, User, Loader2 } from "lucide-react";
import type { IHumanMimicry } from "@/services/human-mimicry/human-mimicry.types";

interface HumanMimicryListProps {
  styles: IHumanMimicry[];
  selectedStyles: string[];
  onToggleSelection: (styleId: string) => void;
  onEdit: (styleId: string) => void;
  onDelete: (styleId: string) => void;
  isLoading?: boolean;
}

export function HumanMimicryList({
  styles,
  selectedStyles,
  onToggleSelection,
  onEdit,
  onDelete,
  isLoading = false
}: HumanMimicryListProps) {
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin" />
        <p className="text-sm">Loading human mimicry styles...</p>
      </div>
    );
  }

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
          key={style._id}
          className={`transition-colors cursor-pointer ${
            selectedStyles.includes(style._id)
              ? "bg-primary/10 border-primary"
              : "hover:bg-muted/50"
          }`}
          onClick={() => onToggleSelection(style._id)}
          onKeyDown={(e) => handleKeyDown(e, () => onToggleSelection(style._id))}
          tabIndex={0}
          role="button"
          aria-pressed={selectedStyles.includes(style._id)}
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
                    onEdit(style._id);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(style._id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Style badge */}
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  {style?.style?.toLowerCase()}
                </Badge>
              </div>

              {/* Examples */}
              {style.examples && style.examples.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Examples:</p>
                  <div className="space-y-1">
                    {style.examples.slice(0, 2).map((example) => (
                      <p key={example.slice(0, 50)} className="text-xs text-muted-foreground line-clamp-2 italic">
                        &quot;{example}&quot;
                      </p>
                    ))}
                    {style.examples.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{style.examples.length - 2} more examples
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Created: {new Date(style.createdAt).toLocaleDateString()}</span>
                <span>{style.examples?.length || 0} examples</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 