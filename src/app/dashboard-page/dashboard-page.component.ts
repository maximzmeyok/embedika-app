import { FiltersService } from './../shared/services/filters.service';
import { of } from 'rxjs';
import { from } from 'rxjs';
import { ApiResponse, ApiResponseDataPageMedia, FiltersData } from './../shared/interfaces';
import { RestApiService } from './../shared/services/rest-api.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.submit();
  }

  public submit(): void {
    this._restApiService.getItems().subscribe((apiResponse: ApiResponse) => {
      this._responseService.parseResponse(apiResponse);
      this._changeDetector.markForCheck();
    });
  }

  public previousPage(): void {
    this._filtersService.currentPage--;
    this.submit();
  }

  public nextPage(): void {
    this._filtersService.currentPage++;
    this.submit();
  }
}
