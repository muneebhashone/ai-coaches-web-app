import type { IAPIResponse } from "../common/common.types";

export interface ISignedUrl {
  signedUrl: string;
  fileUrl: string;
  expiresIn: number;
}

export type IGetSignedUrlResponse = IAPIResponse<ISignedUrl>;