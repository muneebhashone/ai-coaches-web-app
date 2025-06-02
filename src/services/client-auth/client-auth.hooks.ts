"use client";

import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  clientChangePassword,
  clientGetMe,
  clientLogin,
  clientLogout,
  clientRegister,
  clientResetPassword,
} from "./client-auth.service";
import useClientAuthStore from "@/stores/useClientAuthStore";
import type {
  IClientChangePasswordResponse,
  IClientGetMeResponse,
  IClientLoginResponse,
  IClientLogoutResponse,
  IClientRegisterResponse,
  IClientResetPasswordResponse,
} from "./client-auth.types";
import type {
  ClientChangePasswordSchemaType,
  ClientLoginSchemaType,
  ClientRegisterSchemaType,
  ClientResetPasswordSchemaType,
} from "./client-auth.schema";

export const authKeys = {
  all: ["auth"] as const,
  me: (token: string | null) => [...authKeys.all, "me", token] as const,
} as const;

export const useClientGetMe = (
  options?: UseQueryOptions<IClientGetMeResponse>
) => {
  const { token } = useClientAuthStore();

  return useQuery({
    ...options,
    queryKey: authKeys.me(token),
    queryFn: () => clientGetMe(token),
    enabled: !!token,
  });
};

export const useClientLogin = (
  options?: UseMutationOptions<
    IClientLoginResponse,
    Error,
    ClientLoginSchemaType
  >
) => {
  return useMutation({
    ...options,
    mutationFn: clientLogin,
  });
};

export const useClientRegister = (
  options?: UseMutationOptions<
    IClientRegisterResponse,
    Error,
    ClientRegisterSchemaType
  >
) => {
  return useMutation({
    ...options,
    mutationFn: clientRegister,
  });
};

export const useClientLogout = (
  options?: UseMutationOptions<IClientLogoutResponse, Error>
) => {
  const { removeToken } = useClientAuthStore();

  return useMutation({
    ...options,
    mutationFn: clientLogout,
    onSuccess: (data, variables, context) => {
      removeToken();
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useClientChangePassword = (
  options?: UseMutationOptions<
    IClientChangePasswordResponse,
    Error,
    ClientChangePasswordSchemaType
  >
) => {
  return useMutation({
    ...options,
    mutationFn: clientChangePassword,
  });
};

export const useClientResetPassword = (
  options?: UseMutationOptions<
    IClientResetPasswordResponse,
    Error,
    ClientResetPasswordSchemaType
  >
) => {
  return useMutation({
    ...options,
    mutationFn: clientResetPassword,
  });
};
