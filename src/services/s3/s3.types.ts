import type { IAPIResponse } from "../common/common.types";

export interface ISignedUrlData {
  signedUrl: string;
}

export type IGetSignedUrlResponse = IAPIResponse<ISignedUrlData>;

// Informational: List of supported file types from the documentation
export type SupportedDocumentFileType =
  | "pdf"
  | "docx"
  | "txt"
  | "csv"
  | "xlsx";
export type SupportedAudioFileType = "mp3" | "wav" | "m4a" | "aac";
export type SupportedImageFileType = "jpg" | "jpeg" | "png" | "gif";

export type SupportedFileType =
  | SupportedDocumentFileType
  | SupportedAudioFileType
  | SupportedImageFileType;

// This could be expanded with more specific types if needed, for example:
// export interface IS3UploadMetadata {
//   userId?: string;
//   documentId?: string;
//   [key: string]: string | undefined;
// }
