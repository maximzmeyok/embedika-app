import { FiltersService } from './../shared/services/filters.service';
import { ApiResponse, ApiResponseDataPageMedia } from './../shared/interfaces';
import { RestApiService } from './../shared/services/rest-api.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ResponseService } from '../shared/services/response.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {

  public get hasItems(): boolean {
    return !!this._responseService.items;
  }

  public get foundItems(): ApiResponseDataPageMedia[] {
    return this._responseService.items;
  }

  public get currentpage(): number {
    return this._filtersService.currentPage;
  }

  public get isFirstPage(): boolean {
    return this._filtersService.currentPage === 1;
  }

  public get isLastPage(): boolean {
    return this._filtersService.isLastPage;
  }

  constructor(
    private _restApiService: RestApiService,
    private _responseService: ResponseService,
    private _changeDetector: ChangeDetectorRef,
    private _filtersService: FiltersService,
  ) {}

  public ngOnInit(): void {
    this.searchItems();
  }

  public searchItems(): void {
    this._restApiService.getItems().subscribe((apiResponse: ApiResponse) => {
      this._responseService.parseApiResponse(apiResponse);
      this._changeDetector.markForCheck();
    });
  }

  public nextPage(): void {
    this._filtersService.nextPage();
    this.searchItems();
  }

  public previousPage(): void {
    this._filtersService.previousPage();
    this.searchItems();
  }

  public searchItemsByFilters(): void {
    this._filtersService.resetPages();
    this.searchItems();
  }

  public trackItemsByFn(index: number, item: ApiResponseDataPageMedia): number {
    return item.id;
  }
}
