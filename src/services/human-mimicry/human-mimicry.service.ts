import apiClient from "@/lib/api-client";
import type {
  CreateHumanMimicrySchemaType,
  UpdateHumanMimicrySchemaType,
  GetHumanMimicryQuerySchemaType,
} from "./human-mimicry.schema";
import type {
  IGetHumanMimicryResponse,
  IGetHumanMimicryDetailResponse,
  ICreateHumanMimicryResponse,
  IUpdateHumanMimicryResponse,
  IDeleteHumanMimicryResponse,
} from "./human-mimicry.types";

export const getHumanMimicries = async (
  chatbotId: string,
  params?: GetHumanMimicryQuerySchemaType
): Promise<IGetHumanMimicryResponse> => {
  const response = await apiClient.get(`/human-mimicry/${chatbotId}`, { params });
  return response.data;
};

export const getHumanMimicry = async (
  chatbotId: string,
  humanMimicryId: string
): Promise<IGetHumanMimicryDetailResponse> => {
  const response = await apiClient.get(
    `/human-mimicry/${chatbotId}/${humanMimicryId}`
  );
  return response.data;
};

export const createHumanMimicry = async (
  chatbotId: string,
  data: CreateHumanMimicrySchemaType
): Promise<ICreateHumanMimicryResponse> => {
  const response = await apiClient.post(`/human-mimicry/${chatbotId}`, data);
  return response.data;
};

export const updateHumanMimicry = async (
  chatbotId: string,
  humanMimicryId: string,
  data: UpdateHumanMimicrySchemaType
): Promise<IUpdateHumanMimicryResponse> => {
  const response = await apiClient.put(
    `/human-mimicry/${chatbotId}/${humanMimicryId}`,
    data
  );
  return response.data;
};

export const deleteHumanMimicry = async (
  chatbotId: string,
  humanMimicryId: string
): Promise<IDeleteHumanMimicryResponse> => {
  const response = await apiClient.delete(
    `/human-mimicry/${chatbotId}/${humanMimicryId}`
  );
  return response.data;
};