import { FiltersService } from './filters.service';
import { ApiResponse, ApiResponseMedia } from './../interfaces';
import { Injectable } from "@angular/core";

@Injectable()
export class ResponseService {
  public foundItems: ApiResponseMedia[];

  constructor(
    private _filtersService: FiltersService,
  ) {}

  public parseApiResponse(apiResponse: ApiResponse): void {
    const itemsNumber: number = apiResponse.media.length;
    const itemsPerPage: number = apiResponse.pageInfo.perPage;
    const hasMoreItems: boolean = itemsNumber === itemsPerPage;

    this.foundItems = apiResponse.media;

    if (hasMoreItems) {
      return;
    }

    this._filtersService.makeCurrentPageLast();
  }
}