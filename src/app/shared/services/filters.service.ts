import { FormGroup } from '@angular/forms';
import { FiltersData } from './../interfaces';
import { Injectable } from "@angular/core";

@Injectable()
export class FiltersService {
  public currentPage: number = 1;
  public lastPage: number = 250;
  public perPage: number = 5;
  public recentSearch: string;

  private _search: string;
  private _season: string;
  private _status: string;
  private _filtresForm: FormGroup;

  public get isLastPage(): boolean {
    return this.currentPage === this.lastPage;
  }

  public get filtresForm(): FormGroup {
    return this._filtresForm;
  }

  public get query(): string {
    return `query Users {
      Page(page: ${this.currentPage}, perPage: ${this.perPage}) {
        pageInfo {
          total
          currentPage
          perPage
          lastPage
        }
        media
          ${this._season || this._search || this._status ? `(
          ${this._search ? `search: "${this._search}",` : ''}
          ${this._season ? `season: ${this._season},` : ''}
          ${this._status ? `status: ${this._status},` : ''})` : ''} {
          id
          title {
            userPreferred
          }
          season
          status
        }
      }
    }`;
  }

  public parseFilters(filtersData: FiltersData): void {
    this._search = filtersData.search;
    this._season = filtersData.radio;
    this._status = filtersData.select;
  }

  public saveFiltresForm(form: FormGroup): void {
    this._filtresForm = form;
  }
}