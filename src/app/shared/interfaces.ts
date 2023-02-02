export interface ApiResponse {
  data: ApiResponseData;
}

export interface ApiResponseData {
  Page: ApiResponseDataPage;
}

export interface ApiResponseDataPage {
  pageInfo: ApiResponseDataPagePageInfo;
  media: ApiResponseDataPageMedia[];
}

export interface ApiResponseDataPagePageInfo {
  total: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
}

export interface ApiResponseDataPageMedia {
  id: number;
  title: ApiResponseDataPageMediaTitle;
  season: string;
  status: string;
}

export interface ApiResponseDataPageMediaTitle {
  userPreferred: string;
}

export interface FiltersData {
  radio: string;
  search: string;
  select: string;
}