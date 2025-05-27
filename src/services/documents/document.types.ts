import type { IAPIResponse, IPagination } from "../common/common.types";

export const FileTypeEnum = {
  PDF: 'pdf',
  CSV: 'csv',
  DOCX: 'docx',
  XLSX: 'xlsx',
  TXT: 'txt',
} as const;

export type FileType = (typeof FileTypeEnum)[keyof typeof FileTypeEnum];

export interface IDocument {
  _id: string;
  name: string;
  fileUrl: string;
  fileType: FileType;
  fileSize: number;
  status: "PROCESSING" | "COMPLETED" | "FAILED";
  extractedText?: string;
  vectorCount?: number;
  errorMessage?: string;
  knowledgeBaseId: string;
  createdAt: string;
  updatedAt: string;
}

export type IGetDocumentsResponse = IAPIResponse<{
  results: IDocument[];
  pagination: IPagination;
}>;

export type IGetDocumentResponse = IAPIResponse<IDocument>;

export type ICreateDocumentResponse = IAPIResponse<IDocument>;

export type IUpdateDocumentResponse = IAPIResponse<IDocument>;

export type IDeleteDocumentResponse = IAPIResponse<{
  id: string;
  message: string;
}>;