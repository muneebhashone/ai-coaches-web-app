import apiClient from "@/lib/api-client";
import type { IGetSignedUrlResponse } from "./s3.types";
import type { GetSignedUrlSchemaType } from "./s3.schema";

const S3_BASE_URL = "/s3";

export const getSignedUrl = async (
  data: GetSignedUrlSchemaType
): Promise<IGetSignedUrlResponse> => {
  const response = await apiClient.post(
    `${S3_BASE_URL}/get-signed-url`,
    data
  );
  return response.data;
};
