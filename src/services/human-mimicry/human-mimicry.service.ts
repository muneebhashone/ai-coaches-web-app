import apiClient from "@/lib/api-client";
import type {
  IGetHumanMimicryDataResponse,
  ICreateHumanMimicryDataResponse,
  IUpdateHumanMimicryDataResponse,
  IDeleteHumanMimicryDataResponse,
  IGetHumanMimicryByIdResponse, // Added for consistency, assuming GET by ID might be needed
} from "./human-mimicry.types";
import type {
  GetHumanMimicryDataQuerySchemaType,
  CreateHumanMimicryDataSchemaType,
  UpdateHumanMimicryDataSchemaType,
} from "./human-mimicry.schema";

const getHumanMimicryBaseUrl = (chatbotId: string) =>
  `/chatbots/${chatbotId}/human-mimicry`;

export const getHumanMimicryData = async (
  chatbotId: string,
  params?: GetHumanMimicryDataQuerySchemaType
): Promise<IGetHumanMimicryDataResponse> => {
  const response = await apiClient.get(getHumanMimicryBaseUrl(chatbotId), {
    params,
  });
  return response.data;
};

export const createHumanMimicryData = async (
  chatbotId: string,
  data: CreateHumanMimicryDataSchemaType
): Promise<ICreateHumanMimicryDataResponse> => {
  const response = await apiClient.post(
    getHumanMimicryBaseUrl(chatbotId),
    data
  );
  return response.data;
};

// Assuming a GET by ID endpoint might exist or be added, similar to other services
export const getHumanMimicryDataById = async (
  chatbotId: string,
  id: string
): Promise<IGetHumanMimicryByIdResponse> => {
  const response = await apiClient.get(
    `${getHumanMimicryBaseUrl(chatbotId)}/${id}`
  );
  return response.data;
};

export const updateHumanMimicryData = async (
  chatbotId: string,
  id: string,
  data: UpdateHumanMimicryDataSchemaType
): Promise<IUpdateHumanMimicryDataResponse> => {
  const response = await apiClient.put(
    `${getHumanMimicryBaseUrl(chatbotId)}/${id}`,
    data
  );
  return response.data;
};

export const deleteHumanMimicryData = async (
  chatbotId: string,
  id: string
): Promise<IDeleteHumanMimicryDataResponse> => {
  const response = await apiClient.delete(
    `${getHumanMimicryBaseUrl(chatbotId)}/${id}`
  );
  return response.data;
};
