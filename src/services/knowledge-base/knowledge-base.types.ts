import type { IAPIResponse } from "../common/common.types";

export interface IDocument {
  name: string;
  mimeType: string;
  size: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IKnowledgeBase {
  _id: string;
  knowledgeBaseIndexId: string;
  knowledgeBaseNameSpace: string;
  name: string;
  description?: string;
  documents?: IDocument[];
  createdAt: string;
  updatedAt: string;
}

export interface IPaginatorInfo {
  currentPage: number;
  perPage: number;
  firstPage: number;
  lastPage: number;
  total: number;
  from: number;
  to: number;
  hasMorePages: boolean;
}

export interface IKnowledgeBaseList {
  results: IKnowledgeBase[];
  paginatorInfo: IPaginatorInfo;
}

export type ICreateKnowledgeBaseResponse = IAPIResponse<IKnowledgeBase>;
export type IGetKnowledgeBaseResponse = IAPIResponse<IKnowledgeBase>;
export type IGetKnowledgeBasesResponse = IAPIResponse<{
  results: IKnowledgeBase[];
  paginatorInfo: IPaginatorInfo;
}>;
export type IDeleteKnowledgeBaseResponse = IAPIResponse<void>;
export type IAddDocumentResponse = IAPIResponse<IKnowledgeBase>;
export type IUploadDocumentResponse = IAPIResponse<IKnowledgeBase>;
