"use client";

import {
  useQuery,
  type UseQueryOptions,
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";
import {
  kakaoLogin,
  kakaoCallback,
  getKakaoInfo,
} from "./client-kakao.service";
import type {
  IKakaoLoginResponse,
  IKakaoCallbackResponse,
  IKakaoInfoResponse,
} from "./client-kakao.types";
import type { KakaoCallbackQuerySchemaType } from "./client-kakao.schema";

export const clientKakaoKeys = {
  all: ["clientKakao"] as const,
  login: () => [...clientKakaoKeys.all, "login"] as const,
  callback: (params: KakaoCallbackQuerySchemaType) =>
    [...clientKakaoKeys.all, "callback", params] as const,
  info: () => [...clientKakaoKeys.all, "info"] as const,
};

// Hook for GET /clients/kakao/login
// This endpoint typically initiates a redirect.
// The actual data fetching part might not be directly used if the redirect is automatic.
export const useKakaoLogin = (
  options?: UseQueryOptions<IKakaoLoginResponse>
) => {
  return useQuery({
    queryKey: clientKakaoKeys.login(),
    queryFn: kakaoLogin,
    ...options,
    // It might be useful to disable automatic refetching for a login redirect
    refetchOnWindowFocus: false,
    retry: false,
  });
};

// Mutation hook for GET /clients/kakao/callback as it's typically triggered once with parameters
export const useKakaoCallback = (
  options?: UseMutationOptions<
    IKakaoCallbackResponse,
    Error,
    KakaoCallbackQuerySchemaType
  >
) => {
  return useMutation({
    mutationFn: (params: KakaoCallbackQuerySchemaType) =>
      kakaoCallback(params.code, params.state, params.error),
    ...options,
  });
};

// Hook for GET /clients/kakao/info
export const useGetKakaoInfo = (
  options?: UseQueryOptions<IKakaoInfoResponse>
) => {
  return useQuery({
    queryKey: clientKakaoKeys.info(),
    queryFn: getKakaoInfo,
    ...options,
  });
};
