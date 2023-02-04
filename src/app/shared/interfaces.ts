export interface ApiResponseRow {
  data: ApiResponseRowData;
}

export interface ApiResponseRowData {
  Page: ApiResponse;
}

export interface ApiResponse {
  pageInfo: ApiResponsePageInfo;
  media: ApiResponseMedia[];
}

export interface ApiResponsePageInfo {
  total: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
}

export interface ApiResponseMedia {
  id: number;
  title: ApiResponseMediaTitle;
  season: string;
  status: string;
}

export interface ApiResponseMediaTitle {
  userPreferred: string;
}

export interface FiltersData {
  radio: string;
  search: string;
  select: string;
}