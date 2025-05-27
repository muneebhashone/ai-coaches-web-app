import type { IAPIResponse, IPagination } from "../common/common.types";

export interface IHumanMimicry {
  _id: string;
  name: string;
  description?: string;
  style: "FORMAL" | "CASUAL" | "FRIENDLY" | "PROFESSIONAL" | "ENTHUSIASTIC";
  examples: string[];
  chatbotId: string;
  createdAt: string;
  updatedAt: string;
}

export type IGetHumanMimicryResponse = IAPIResponse<{
  results: IHumanMimicry[];
  pagination: IPagination;
}>;

export type IGetHumanMimicryDetailResponse = IAPIResponse<IHumanMimicry>;

export type ICreateHumanMimicryResponse = IAPIResponse<IHumanMimicry>;

export type IUpdateHumanMimicryResponse = IAPIResponse<IHumanMimicry>;

export type IDeleteHumanMimicryResponse = IAPIResponse<{
  id: string;
  message: string;
}>;