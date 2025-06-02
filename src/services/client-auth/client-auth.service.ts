import type {
  ClientChangePasswordSchemaType,
  ClientForgetPasswordSchemaType,
  ClientLoginSchemaType,
  ClientRegisterSchemaType,
  ClientResetPasswordSchemaType,
} from "./client-auth.schema";
import apiClient from "@/lib/api-client";
import type {
  IClientLoginResponse,
  IClientLogoutResponse,
  IClientChangePasswordResponse,
  IClientResetPasswordResponse,
  IClientForgetPasswordResponse,
  IClientGetMeResponse,
  IClientRegisterResponse,
} from "./client-auth.types";

export const clientLogin = async (
  data: ClientLoginSchemaType
): Promise<IClientLoginResponse> => {
  const response = await apiClient.post("/auth/client/login", data);
  return response.data;
};

export const clientRegister = async (
  data: ClientRegisterSchemaType
): Promise<IClientRegisterResponse> => {
  const response = await apiClient.post("/auth/client/register", data);
  return response.data;
};

export const clientLogout = async (): Promise<IClientLogoutResponse> => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const clientChangePassword = async (
  data: ClientChangePasswordSchemaType
): Promise<IClientChangePasswordResponse> => {
  const response = await apiClient.post("/auth/client/change-password", data);
  return response.data;
};

export const clientResetPassword = async (
  data: ClientResetPasswordSchemaType
): Promise<IClientResetPasswordResponse> => {
  const response = await apiClient.post("/auth/client/reset-password", data);
  return response.data;
};

export const clientForgetPassword = async (
  data: ClientForgetPasswordSchemaType
): Promise<IClientForgetPasswordResponse> => {
  const response = await apiClient.post("/auth/client/forget-password", data);
  return response.data;
};

export const clientGetMe = async (
  accessToken?: string | null
): Promise<IClientGetMeResponse> => {
  const headers = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : undefined;

  const response = await apiClient.get("/auth/client/me", { headers });
  return response.data;
};
