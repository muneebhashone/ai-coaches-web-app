import type { IAPIResponse, IPagination } from "../common/common.types";

export type KnowledgeBaseDocumentFileType =
  | "pdf"
  | "csv"
  | "docx"
  | "xlsx"
  | "txt";

export interface IKnowledgeBaseDocument {
  _id: string;
  name: string;
  fileType: KnowledgeBaseDocumentFileType;
  size: number; // bytes
  uploadedAt: string; // ISO datetime string
}

// As per API doc, "Knowledge Base Summary" is used in GET /
// and "Knowledge Base Object" (which includes documents) is used in GET /:id
export interface IKnowledgeBaseSummary {
  _id: string;
  name: string;
  description: string | null;
  chatbotId: string;
  documentCount: number;
  totalSize: number; // bytes
  lastUpdated: string | null; // ISO datetime string
  active: boolean;
  user: string; // User ID
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

export interface IKnowledgeBase extends IKnowledgeBaseSummary {
  documents: IKnowledgeBaseDocument[];
}

// Response for GET /
export interface IGetKnowledgeBasesData {
  knowledgeBases: IKnowledgeBaseSummary[];
  pagination: IPagination;
}
export type IGetKnowledgeBasesResponse = IAPIResponse<IGetKnowledgeBasesData>;

// Response for POST /
// The response for create includes a full KnowledgeBase object but without documents initially
export type ICreateKnowledgeBaseResponse = IAPIResponse<
  Omit<IKnowledgeBase, "documents"> & {
    documentCount: 0;
    totalSize: 0;
    lastUpdated: null;
  }
>;

// Response for GET /:id
export type IGetKnowledgeBaseByIdResponse = IAPIResponse<IKnowledgeBase>;

// Response for PUT /:id
// The response for update seems to be a summary object
export type IUpdateKnowledgeBaseResponse = IAPIResponse<IKnowledgeBaseSummary>;

// Response for DELETE /:id
export interface IDeleteKnowledgeBaseData {
  deletedDocuments: number;
  freedSpace: number; // bytes
}
export type IDeleteKnowledgeBaseResponse =
  IAPIResponse<IDeleteKnowledgeBaseData>;
