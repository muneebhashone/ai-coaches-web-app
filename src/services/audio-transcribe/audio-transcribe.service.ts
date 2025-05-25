import apiClient from "@/lib/api-client";
import type {
  IGetAudioTranscriptionsResponse,
  ICreateAudioTranscriptionResponse,
  IGetAudioTranscriptionStatsResponse,
  IGetAudioTranscriptionByIdResponse,
  IGetAudioTranscriptionTranscriptResponse,
  ICopyTranscriptToKnowledgeBaseResponse,
  IDeleteAudioTranscriptionResponse,
} from "./audio-transcribe.types";
import type {
  GetAudioTranscriptionsQuerySchemaType,
  CreateAudioTranscriptionSchemaType,
  CopyTranscriptToKnowledgeBaseSchemaType,
} from "./audio-transcribe.schema";
import type { IAPIResponse } from "../common/common.types";

const AUDIO_TRANSCRIBE_BASE_URL = "/audio-transcribe";

export const getAudioTranscriptions = async (
  params?: GetAudioTranscriptionsQuerySchemaType
): Promise<IGetAudioTranscriptionsResponse> => {
  const response = await apiClient.get(AUDIO_TRANSCRIBE_BASE_URL, { params });
  return response.data;
};

export const createAudioTranscription = async (
  data: CreateAudioTranscriptionSchemaType
): Promise<ICreateAudioTranscriptionResponse> => {
  const response = await apiClient.post(AUDIO_TRANSCRIBE_BASE_URL, data);
  return response.data;
};

export const getAudioTranscriptionStats =
  async (): Promise<IGetAudioTranscriptionStatsResponse> => {
    const response = await apiClient.get(`${AUDIO_TRANSCRIBE_BASE_URL}/stats`);
    return response.data;
  };

export const getAudioTranscriptionById = async (
  id: string
): Promise<IGetAudioTranscriptionByIdResponse> => {
  const response = await apiClient.get(`${AUDIO_TRANSCRIBE_BASE_URL}/${id}`);
  return response.data;
};

export const getAudioTranscriptionTranscript = async (
  id: string
): Promise<IGetAudioTranscriptionTranscriptResponse> => {
  const response = await apiClient.get(
    `${AUDIO_TRANSCRIBE_BASE_URL}/${id}/transcript`
  );
  return response.data;
};

export const copyTranscriptToKnowledgeBase = async (
  id: string,
  data: CopyTranscriptToKnowledgeBaseSchemaType
): Promise<ICopyTranscriptToKnowledgeBaseResponse> => {
  const response = await apiClient.post(
    `${AUDIO_TRANSCRIBE_BASE_URL}/${id}/to-knowledge-base`,
    data
  );
  return response.data;
};

export const deleteAudioTranscription = async (
  id: string
): Promise<IDeleteAudioTranscriptionResponse> => {
  const response = await apiClient.delete(`${AUDIO_TRANSCRIBE_BASE_URL}/${id}`);
  // The API docs specify a response body for DELETE, but typically DELETE might not return a body
  // or return a generic success message. Adjust if actual API behavior differs.
  // For now, assuming it returns IAPIResponse with a message.
  return response.data as IDeleteAudioTranscriptionResponse;
};
