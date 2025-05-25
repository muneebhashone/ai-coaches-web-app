import apiClient from "@/lib/api-client";
import type {
  IKakaoLoginResponse,
  IKakaoCallbackResponse,
  IKakaoInfoResponse,
} from "./client-kakao.types";

export const kakaoLogin = async (): Promise<IKakaoLoginResponse> => {
  const response = await apiClient.get("/clients/kakao/login");
  return response.data;
};

export const kakaoCallback = async (
  code: string,
  state: string,
  error?: string
): Promise<IKakaoCallbackResponse> => {
  const params = new URLSearchParams();
  params.append("code", code);
  params.append("state", state);
  if (error) {
    params.append("error", error);
  }
  const response = await apiClient.get(`/clients/kakao/callback?${params.toString()}`);
  return response.data;
};

export const getKakaoInfo = async (): Promise<IKakaoInfoResponse> => {
  const response = await apiClient.get("/clients/kakao/info");
  return response.data;
};
