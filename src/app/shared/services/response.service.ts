import { FiltersService } from './filters.service';
import { ApiResponse, ApiResponseDataPageMedia } from './../interfaces';
import { Injectable } from "@angular/core";

@Injectable()
export class ResponseService {
  public items: ApiResponseDataPageMedia[];

  constructor(
    private _filtersService: FiltersService,
  ) {}

  public parseApiResponse(apiResponse: ApiResponse) {
    const itemsLength: number = apiResponse.data.Page.media.length;
    const currentPage: number = apiResponse.data.Page.pageInfo.currentPage;

    this._filtersService.lastPage = currentPage + 1;

    this.items = apiResponse.data.Page.media;

    if (itemsLength === this._filtersService.perPage) {
      return;
    }

    this._filtersService.lastPage = currentPage;
  }
}