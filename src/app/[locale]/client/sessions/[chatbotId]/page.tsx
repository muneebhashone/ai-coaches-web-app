"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useCreateChatsForClient } from "@/services/chats/chat.hooks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, MessageSquare, ArrowRight } from "lucide-react";

export default function JoinProgramPage() {
  const params = useParams();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const chatbotId = params.chatbotId as string;

  const createChatsMutation = useCreateChatsForClient();

  const handleJoinProgram = async () => {
    if (!chatbotId) {
      toast.error("Invalid program ID");
      return;
    }

    setIsCreating(true);

    createChatsMutation.mutate(chatbotId, {
      onSuccess: () => {
        toast.success("Successfully joined the program!");
        router.push("/client/sessions");
      },
      onError: (error) => {
        console.error("Failed to create chat session:", error);
        toast.error(
          error?.message || "Failed to join program. Please try again."
        );
        setIsCreating(false);
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Join Program</CardTitle>
          <CardDescription>
            Ready to start your coaching sessions? Click below to join the
            program and begin your journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isCreating ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-medium mb-2">
                Creating Your Sessions
              </h3>
              <p className="text-sm text-muted-foreground">
                Please wait while we set up your personalized coaching
                environment...
              </p>
            </div>
          ) : (
            <>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium">What happens next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your personalized coaching sessions will be created</li>
                  <li>• You&apos;ll be redirected to your session dashboard</li>
                  <li>
                    • You can start chatting with your AI coach immediately
                  </li>
                </ul>
              </div>

              <Button
                onClick={handleJoinProgram}
                className="w-full"
                size="lg"
                disabled={isCreating}
              >
                Join Program
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
