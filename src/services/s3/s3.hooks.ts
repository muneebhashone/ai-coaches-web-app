"use client";

import {
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { getSignedUrl } from "./s3.service";
import type { IGetSignedUrlResponse } from "./s3.types";
import type { GetSignedUrlSchemaType } from "./s3.schema";

export const s3Keys = {
  all: ["s3"] as const,
  getSignedUrl: () => [...s3Keys.all, "getSignedUrl"] as const,
};

// Since generating a signed URL is a POST request and typically not idempotent
// (it might involve some form of tracking or have expiry),
// it's best modeled as a mutation.
export const useGetSignedUrl = (
  options?: UseMutationOptions<
    IGetSignedUrlResponse,
    Error,
    GetSignedUrlSchemaType
  >
) => {
  return useMutation({
    mutationFn: getSignedUrl,
    mutationKey: s3Keys.getSignedUrl(), // Optional: provide a mutation key
    ...options,
  });
};
