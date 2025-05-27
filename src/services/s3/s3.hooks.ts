import { useMutation } from "@tanstack/react-query";
import { getSignedUrl } from "./s3.service";
import type { GetSignedUrlSchemaType } from "./s3.schema";

export function useGetSignedUrl() {
  return useMutation({
    mutationFn: (data: GetSignedUrlSchemaType) => getSignedUrl(data),
  });
}