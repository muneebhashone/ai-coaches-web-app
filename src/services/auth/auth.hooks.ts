"use client";

import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  changePassword,
  getMe,
  loginEmail,
  logout,
  registerEmail,
  registerCoachEmail,
  resetPassword,
} from "./auth.service";
import useAuthStore from "@/stores/useAuthStore";
import type {
  IChangePasswordResponse,
  IGetMeResponse,
  ILoginUserByEmailResponse,
  ILogoutResponse,
  IRegisterCoachByEmailResponse,
  IRegisterUserByEmailResponse,
  IResetPasswordResponse,
} from "./auth.types";
import type {
  ChangePasswordSchemaType,
  LoginUserByEmailSchemaType,
  RegisterUserByEmailSchemaType,
  RegisterCoachByEmailSchemaType,
  ResetPasswordSchemaType,
} from "./auth.schema";

export const authKeys = {
  all: ["auth"] as const,
  me: (token: string | null) => [...authKeys.all, "me", token] as const,
} as const;

export const useGetMe = (options?: UseQueryOptions<IGetMeResponse>) => {
  const { token } = useAuthStore();

  console.log({ token });

  return useQuery({
    ...options,
    queryKey: authKeys.me(token),
    queryFn: () => getMe(token),
    enabled: !!token,
  });
};

export const useLoginEmail = (
  options?: UseMutationOptions<
    ILoginUserByEmailResponse,
    Error,
    LoginUserByEmailSchemaType
  >
) => {
  return useMutation({
    ...options,
    mutationFn: loginEmail,
  });
};

export const useRegisterEmail = (
  options?: UseMutationOptions<
    IRegisterUserByEmailResponse,
    Error,
    RegisterUserByEmailSchemaType
  >
) => {
  return useMutation({
    ...options,
    mutationFn: registerEmail,
  });
};

export const useRegisterCoachEmail = (
  options?: UseMutationOptions<
    IRegisterCoachByEmailResponse,
    Error,
    RegisterCoachByEmailSchemaType
  >
) => {
  return useMutation({
    ...options,
    mutationFn: registerCoachEmail,
  });
};

export const useLogout = (
  options?: UseMutationOptions<ILogoutResponse, Error>
) => {
  const { removeToken } = useAuthStore();

  return useMutation({
    ...options,
    mutationFn: logout,
    onSuccess: (data, variables, context) => {
      removeToken();
      options?.onSuccess?.(data, variables, context);
    },
  });
};

export const useChangePassword = (
  options?: UseMutationOptions<
    IChangePasswordResponse,
    Error,
    ChangePasswordSchemaType
  >
) => {
  return useMutation({
    ...options,
    mutationFn: changePassword,
  });
};

export const useResetPassword = (
  options?: UseMutationOptions<
    IResetPasswordResponse,
    Error,
    ResetPasswordSchemaType
  >
) => {
  return useMutation({
    ...options,
    mutationFn: resetPassword,
  });
};
