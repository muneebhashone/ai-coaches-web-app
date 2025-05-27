import apiClient from "@/lib/api-client";
import type { GetSignedUrlSchemaType } from "./s3.schema";
import type { IGetSignedUrlResponse } from "./s3.types";

export const getSignedUrl = async (
  data: GetSignedUrlSchemaType
): Promise<IGetSignedUrlResponse> => {
  const response = await apiClient.post("/s3/signed-url", data);
  return response.data;
};