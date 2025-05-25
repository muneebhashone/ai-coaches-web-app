import type { IAPIResponse, IPagination } from "../common/common.types";
import type { AudioTranscriptionStatusSchema } from "./audio-transcribe.schema";
import type { z } from "zod";

export type AudioTranscriptionStatusType = z.infer<
  typeof AudioTranscriptionStatusSchema
>;

export interface IAudioTranscription {
  _id: string;
  fileName: string;
  fileSize: number;
  fileUrl: string;
  status: AudioTranscriptionStatusType;
  transcript: string | null;
  duration: number | null;
  processingTime: number | null;
  userId: string;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

export interface IAudioTranscriptionStats {
  totalTranscriptions: number;
  completedTranscriptions: number;
  pendingTranscriptions: number;
  failedTranscriptions: number;
  totalProcessingTime: number;
  averageProcessingTime: number;
  totalAudioDuration: number;
  totalFileSize: number;
}

// Response for GET /
export interface IGetAudioTranscriptionsData {
  data: IAudioTranscription[];
  pagination: IPagination;
}
export type IGetAudioTranscriptionsResponse =
  IAPIResponse<IGetAudioTranscriptionsData>;

// Response for POST /
export type ICreateAudioTranscriptionResponse = IAPIResponse<IAudioTranscription>;

// Response for GET /stats
export type IGetAudioTranscriptionStatsResponse =
  IAPIResponse<IAudioTranscriptionStats>;

// Response for GET /:id
export type IGetAudioTranscriptionByIdResponse =
  IAPIResponse<IAudioTranscription>;

// Response for GET /:id/transcript
export interface IGetAudioTranscriptionTranscriptData {
  transcript: string;
}
export type IGetAudioTranscriptionTranscriptResponse =
  IAPIResponse<IGetAudioTranscriptionTranscriptData>;

// Response for POST /:id/to-knowledge-base
export interface ICopyTranscriptToKnowledgeBaseData {
  documentId: string;
  message: string;
}
export type ICopyTranscriptToKnowledgeBaseResponse =
  IAPIResponse<ICopyTranscriptToKnowledgeBaseData>;

// Response for DELETE /:id
// Assuming a generic message response as per typical DELETE operations,
// but the API doc implies a structured response.
export type IDeleteAudioTranscriptionResponse = IAPIResponse<{ message: string }>;
