import type { IAPIResponse, IPagination } from "../common/common.types";
import type {
  DocumentFileTypeSchema,
  DocumentProcessingStatusSchema,
} from "./documents.schema";
import type { z } from "zod";

export type DocumentFileType = z.infer<typeof DocumentFileTypeSchema>;
export type DocumentProcessingStatusType = z.infer<
  typeof DocumentProcessingStatusSchema
>;

// This is the full Document Object as per the API documentation
export interface IDocument {
  _id: string;
  name: string;
  description: string | null;
  fileType: DocumentFileType;
  fileUrl: string;
  fileSize: number; // bytes
  processingStatus: DocumentProcessingStatusType;
  extractedText: string | null;
  vectorCount: number;
  knowledgeBaseId: string;
  user: string; // User ID
  uploadedAt: string; // ISO datetime string
  processedAt: string | null; // ISO datetime string
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

// This is the Document Summary object, used in paginated lists (GET /)
// The API docs show a slightly different structure for the list items,
// let's assume it's a summary. If it's the full IDocument, this can be adjusted.
export interface IDocumentSummary
  extends Pick<
    IDocument,
    | "_id"
    | "name"
    | "description" // description is in GET / example in docs
    | "fileType"
    | "fileUrl" // fileUrl is in GET / example in docs
    | "fileSize"
    | "processingStatus"
    | "extractedText" // extractedText is in GET / example in docs
    | "vectorCount"
    | "knowledgeBaseId" // knowledgeBaseId is in GET / example in docs
    | "user" // user is in GET / example in docs
    | "uploadedAt"
    | "processedAt"
    | "createdAt" // createdAt is in GET / example in docs
    | "updatedAt" // updatedAt is in GET / example in docs
  > {}

// Response for GET / (list documents)
export interface IGetDocumentsData {
  documents: IDocumentSummary[]; // Using summary for lists
  pagination: IPagination;
}
export type IGetDocumentsResponse = IAPIResponse<IGetDocumentsData>;

// Response for POST / (create document)
// Create response returns the full document object, but some fields are null/0 initially
export type ICreateDocumentResponse = IAPIResponse<IDocument>;

// Response for GET /:id (get document by ID)
export type IGetDocumentByIdResponse = IAPIResponse<IDocument>;

// Response for PUT /:id (update document)
export type IUpdateDocumentResponse = IAPIResponse<IDocument>;

// Response for DELETE /:id (delete document)
export interface IDeleteDocumentData {
  deletedVectors: number;
  freedSpace: number; // bytes
}
export type IDeleteDocumentResponse = IAPIResponse<IDeleteDocumentData>;
