import type { IAPIResponse } from "../common/common.types";
import type { VectorMetadataSchemaType } from "./vector-store.schema";

export interface IVectorMatch {
  id: string;
  score: number;
  values?: number[]; // Optional based on includeValues
  metadata?: VectorMetadataSchemaType; // Optional based on includeMetadata
}

export interface ISearchVectorsData {
  matches: IVectorMatch[];
  usage?: {
    readUnits: number;
  };
}
export type ISearchVectorsResponse = IAPIResponse<ISearchVectorsData>;

export interface IInsertVectorsData {
  upsertedCount: number;
  vectorIds: string[];
}
export type IInsertVectorsResponse = IAPIResponse<IInsertVectorsData>;

export interface IUpdateVectorsData {
  updatedCount: number;
  vectorIds: string[];
}
export type IUpdateVectorsResponse = IAPIResponse<IUpdateVectorsData>;

export interface IDeleteVectorsByIdsData {
  deletedCount: number;
  vectorIds: string[];
}
export type IDeleteVectorsByIdsResponse = IAPIResponse<IDeleteVectorsByIdsData>;

export interface IDeleteVectorsByFilterData {
  deletedCount: number;
  message: string;
}
export type IDeleteVectorsByFilterResponse =
  IAPIResponse<IDeleteVectorsByFilterData>;

export interface INamespaceStats {
  dimension: number;
  indexFullness: number;
  namespaces: Record<string, { vectorCount: number }>;
  totalVectorCount: number;
}
export type IGetNamespaceStatsResponse = IAPIResponse<INamespaceStats>;

export interface IDeleteNamespaceData {
  message: string;
  namespace: string;
}
export type IDeleteNamespaceResponse = IAPIResponse<IDeleteNamespaceData>;

export interface INamespaceInfo {
  name: string;
  vectorCount: number;
  dimension: number;
}
export interface IListNamespacesData {
  namespaces: INamespaceInfo[];
  totalNamespaces: number;
  totalVectors: number;
}
export type IListNamespacesResponse = IAPIResponse<IListNamespacesData>;

// Individual vector structure (matches VectorInsertSchema but used in responses)
export interface IVector {
  id: string;
  values: number[];
  metadata?: VectorMetadataSchemaType;
}
