import type { IAPIResponse } from "../common/common.types";
import type { IUser } from "@/services/user/user.types";

export type IRegisterUserByEmailResponse = IAPIResponse<IUser>;

export type IRegisterCoachByEmailResponse = IAPIResponse<IUser>;

export type ILoginUserByEmailResponse = IAPIResponse<{ token: string }>;

export type ILogoutResponse = IAPIResponse<void>;

export type IChangePasswordResponse = IAPIResponse<void>;

export type IResetPasswordResponse = IAPIResponse<void>;

export type IForgetPasswordResponse = IAPIResponse<void>;

export type IGetMeResponse = IAPIResponse<IUser>;
