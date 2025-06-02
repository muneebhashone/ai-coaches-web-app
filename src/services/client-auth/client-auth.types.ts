import { IClient } from "../clients/client.types";
import type { IAPIResponse } from "../common/common.types";
import type { IUser } from "@/services/users/user.types";

export type IClientLoginResponse = IAPIResponse<{ token: string }>;

export type IClientRegisterResponse = IAPIResponse<IClient>;

export type IClientLogoutResponse = IAPIResponse<void>;

export type IClientChangePasswordResponse = IAPIResponse<void>;

export type IClientResetPasswordResponse = IAPIResponse<void>;

export type IClientForgetPasswordResponse = IAPIResponse<void>;

export type IClientGetMeResponse = IAPIResponse<IUser>;
