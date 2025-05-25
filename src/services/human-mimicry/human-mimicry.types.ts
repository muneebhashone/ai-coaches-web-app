import type { IAPIResponse, IPagination } from "../common/common.types";
import type { PersonalitySchemaType } from "./human-mimicry.schema";

export interface IHumanMimicryPersonality extends PersonalitySchemaType {}

export interface IHumanMimicry {
  _id: string;
  name: string;
  description: string | null;
  toneExample: string | null;
  styleExample: string | null;
  writingExample: string | null;
  transcripts: string | null;
  personality: IHumanMimicryPersonality;
  chatbotId: string;
  user: string; // User ID
  active: boolean;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

// Response for GET / (list human mimicry data)
export interface IGetHumanMimicryDataPayload {
  humanMimicryData: IHumanMimicry[];
  pagination: IPagination;
}
export type IGetHumanMimicryDataResponse =
  IAPIResponse<IGetHumanMimicryDataPayload>;

// Response for POST / (create human mimicry data)
export type ICreateHumanMimicryDataResponse = IAPIResponse<IHumanMimicry>;

// Response for GET /:id (get human mimicry data by ID) - Added for consistency
export type IGetHumanMimicryByIdResponse = IAPIResponse<IHumanMimicry>;

// Response for PUT /:id (update human mimicry data)
export type IUpdateHumanMimicryDataResponse = IAPIResponse<IHumanMimicry>;

// Response for DELETE /:id (delete human mimicry data)
export type IDeleteHumanMimicryDataResponse = IAPIResponse<{ message: string }>;
