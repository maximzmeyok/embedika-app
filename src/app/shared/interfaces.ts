export interface ItemsApiResponseRow {
  data: {
    Page: ItemsApiResponse
  };
}

export interface ItemsApiResponse {
  pageInfo: {
    total: number;
    currentPage: number;
    perPage: number;
    lastPage: number;
  };
  media: ItemsApiResponseMedia[];
}

export interface ItemsApiResponseMedia {
  id: number;
  title: {
    userPreferred: string;
  };
  season: string;
  status: string;
}

export interface FiltersData {
  season: string;
  search: string;
  status: string;
}

export interface ItemApiResponseRow {
  data: {
    Media: ItemApiResponse;
  };
}

export interface ItemApiResponse {
  description: string;
  season: string;
  status: string;
  startDate: {
    year: number;
  };
  endDate: {
    year: number;
  };
  title: {
    userPreferred: string;
  };
}