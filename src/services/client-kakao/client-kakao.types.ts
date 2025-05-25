import type { IAPIResponse } from "../common/common.types";

// As per the documentation, GET /login redirects and does not return a JSON body
// However, to maintain consistency and allow for potential future API changes,
// we define a response type. For a 302 redirect, the 'data' field would typically not be applicable.
// The actual redirect mechanism will be handled by the browser or HTTP client.
export type IKakaoLoginResponse = IAPIResponse<undefined>; // Or specific redirect information if needed

interface IKakaoClient {
  _id: string;
  name: string;
  kakaoId: string;
  metadata: {
    email: string | null;
    phone: string | null;
  };
  activeProgramId: string | null;
  user: string; // Assuming this is a user ID
  active: boolean;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

interface IKakaoCallbackData {
  client: IKakaoClient;
  isNewClient: boolean;
  redirectUrl: string;
}

export type IKakaoCallbackResponse = IAPIResponse<IKakaoCallbackData>;

interface IKakaoIntegrationInfo {
  isConfigured: boolean;
  clientId: string;
  redirectUri: string;
  scopes: string[];
  loginUrl: string;
  supportedFeatures: string[];
}

export type IKakaoInfoResponse = IAPIResponse<IKakaoIntegrationInfo>;
