export interface IAPIResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
