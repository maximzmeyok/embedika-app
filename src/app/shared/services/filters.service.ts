import { FormGroup } from '@angular/forms';
import { FiltersData } from './../interfaces';
import { Injectable } from "@angular/core";

@Injectable()
export class FiltersService {
  public currentPage: number = 1;
  public lastPage: number = 2;
  public perPage: number = 5;
  public filtersForm: FormGroup;

  private _searchFilter: string;
  private _seasonFilter: string;
  private _statusFilter: string;

  public parseFilters(filtersData: FiltersData): void {
    this._searchFilter = filtersData.search;
    this._seasonFilter = filtersData.radio;
    this._statusFilter = filtersData.select;
  }

  public saveFiltersForm(form: FormGroup): void {
    this.filtersForm = form;
  }

  public makeCurrentPageLast(): void {
    this.lastPage = this.currentPage;
  }

  public resetPages(): void {
    this.currentPage = 1;
    this.lastPage = 2;
  }

  public nextPage() {
    this.currentPage++;
    this.lastPage++;
  }

  public previousPage() {
    this.currentPage--;
    this.lastPage--;
  }

  public getMediaFilter(): string {
    return this._hasFilters() ? this._combineFilters() : '';
  }

  private _hasFilters(): boolean {
    return !!(this._seasonFilter || this._searchFilter || this._statusFilter);
  }

  private _combineFilters(): string {
    return `(${this._createSearchFilter()}${this._createSeasonFilter()}${this._createStatusFilter()})`;
  }

  private _createSearchFilter(): string {
    return this._searchFilter ? `search: "${this._searchFilter}",` : '';
  }

  private _createSeasonFilter(): string {
    return this._seasonFilter ? `season: ${this._seasonFilter},` : '';
  }

  private _createStatusFilter(): string {
    return this._statusFilter ? `status: ${this._statusFilter}` : '';
  }
}