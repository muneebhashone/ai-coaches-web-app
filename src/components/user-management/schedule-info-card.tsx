"use client";

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Upload, Loader2 } from "lucide-react";
import { useGetSignedUrl } from "@/services/s3/s3.hooks";
import { useCreateAudioTranscription } from "@/services/audio-transcribe/audio-transcribe.hooks";
import type { CreateAudioTranscriptionSchemaType } from "@/services/audio-transcribe/audio-transcribe.schema";

// TODO: This bucket name might need to come from config or backend
const S3_AUDIO_BUCKET_NAME = "clone-coach-dev-audio"; // Example bucket for audio

interface ScheduleInfoCardProps {
  userId: string; // This prop is crucial and assumed to be passed correctly
}

// Mock schedule data (can be replaced with actual data fetching if needed)
const mockSchedule = {
  plannedTotalSessions: 12,
  currentSession: 3,
  totalWeeks: 12,
  dateScheduled: "2025.May.25 13:00",
  cloneCoachSchedule: "Mon-Sun (9:00 PM)",
};

export function ScheduleInfoCard({ userId }: ScheduleInfoCardProps) {
  const t = useTranslations("dashboard.userManagement.detail");
  const tCommon = useTranslations("common");
  const tErrors = useTranslations("errors");

  const [selectedAudioFile, setSelectedAudioFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const getSignedUrlMutation = useGetSignedUrl();
  const createTranscriptionMutation = useCreateAudioTranscription();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedAudioFile(event.target.files[0]);
    } else {
      setSelectedAudioFile(null);
    }
  };

  const handleUploadAndTranscribe = async () => {
    if (!selectedAudioFile) {
      toast.error(t("audioMessages.noFileSelected"));
      return;
    }

    if (!userId) {
      toast.error(t("audioMessages.missingUserIdError")); // Should ideally not happen if prop is enforced
      return;
    }

    setIsUploading(true);
    toast.info(t("audioMessages.uploadStarting"));

    try {
      // 1. Get signed URL for S3
      const s3Key = `audio-transcriptions/${userId}/${Date.now()}_${selectedAudioFile.name}`;
      const signedUrlResponse = await getSignedUrlMutation.mutateAsync({
        // bucket: S3_AUDIO_BUCKET_NAME, // Assuming backend determines the bucket
        key: s3Key,
        contentType: selectedAudioFile.type,
      });

      if (!signedUrlResponse.success || !signedUrlResponse.data?.signedUrl) {
        toast.error(t("audioMessages.signedUrlError", { error: signedUrlResponse.message || "No URL" }));
        setIsUploading(false);
        return;
      }

      const { signedUrl, fileAccessUrl } = signedUrlResponse.data;

      // 2. Upload to S3
      const s3UploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: selectedAudioFile,
        headers: {
          "Content-Type": selectedAudioFile.type,
        },
      });

      if (!s3UploadResponse.ok) {
        toast.error(t("audioMessages.s3UploadError", { name: selectedAudioFile.name, error: s3UploadResponse.statusText }));
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
      toast.success(t("audioMessages.s3UploadSuccess", { name: selectedAudioFile.name }));

      // 3. Create audio transcription record
      setIsTranscribing(true);
      toast.info(t("audioMessages.transcriptionStarting"));

      const transcriptionPayload: CreateAudioTranscriptionSchemaType = {
        fileName: selectedAudioFile.name,
        fileSize: selectedAudioFile.size,
        // Use the direct access URL if available, otherwise construct from S3 key or initial part of signed URL
        fileUrl: fileAccessUrl || signedUrl.split('?')[0], 
        // TODO: Add userId to payload if API requires it.
        // The current CreateAudioTranscriptionSchema does not include userId,
        // but the IAudioTranscription response type has userId.
        // This implies the backend might associate the user via auth context.
      };

      await createTranscriptionMutation.mutateAsync(transcriptionPayload, {
        onSuccess: (response) => {
          if (response.success) {
            toast.success(t("audioMessages.transcriptionSuccess"));
            setSelectedAudioFile(null); // Clear file input on full success
          } else {
            toast.error(response.message || t("audioMessages.transcriptionErrorGeneric"));
          }
          setIsTranscribing(false);
        },
        onError: (error) => {
          toast.error(error.message || t("audioMessages.transcriptionErrorGeneric"));
          setIsTranscribing(false);
        },
      });

    } catch (error: any) {
      toast.error(error.message || tErrors("defaultApiError"));
      setIsUploading(false);
      setIsTranscribing(false);
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-primary" />
          {t("scheduleInfo")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing schedule info - unchanged */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <Label className="text-muted-foreground">
              {t("plannedTotalSessions")}
            </Label>
            <p className="font-medium">
              {mockSchedule.plannedTotalSessions} weeks
            </p>
          </div>
          <div>
            <Label className="text-muted-foreground">
              {t("currentSession")}
            </Label>
            <p className="font-medium">
              {mockSchedule.currentSession}/{mockSchedule.totalWeeks}
            </p>
          </div>
        </div>
        <div>
          <Label className="text-muted-foreground">
            {t("dateScheduled")}
          </Label>
          <p className="font-medium flex items-center mt-1">
            <Clock className="h-4 w-4 mr-1" />
            {mockSchedule.dateScheduled}
          </p>
        </div>
        <div>
          <Label className="text-muted-foreground">
            {t("cloneCoachSchedule")}
          </Label>
          <p className="font-medium">{mockSchedule.cloneCoachSchedule}</p>
        </div>

        {/* Audio Upload Section */}
        <div className="border-t pt-4">
          <Label htmlFor="sessionAudioUpload" className="text-sm font-medium mb-2 block">
            {t("uploadSessionAudio")}
          </Label>
          <div className="space-y-2">
            <Input
              id="sessionAudioUpload"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              disabled={isUploading || isTranscribing}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
            {selectedAudioFile && (
              <p className="text-xs text-muted-foreground">
                {t("selectedFileLabel")}: {selectedAudioFile.name} ({(selectedAudioFile.size / (1024*1024)).toFixed(2)} MB)
              </p>
            )}
            <Button
              size="sm"
              className="w-full"
              onClick={handleUploadAndTranscribe}
              disabled={!selectedAudioFile || isUploading || isTranscribing}
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : isTranscribing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {isUploading
                ? t("uploadingButton")
                : isTranscribing
                ? t("transcribingButton")
                : t("uploadAndTranscribeButton")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}