import { ItemApiResponseRow, ItemsApiResponseRow } from './../interfaces';
import { FiltersService } from './filters.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class RestApiService {
  private _url: string = 'https://graphql.anilist.co/';

  constructor(
    private _http: HttpClient,
    private _filtersService: FiltersService,
  ) {}

  public getItems(): Observable<ItemsApiResponseRow> {
    const query: string = this._getItemsQuery();

    return this._http.post<ItemsApiResponseRow>(this._url,
      JSON.stringify({query: query}),
      {headers: { "Content-type": "application/json"}});
  }

  public getItem(id: string): Observable<ItemApiResponseRow> {
    const query: string = this._getItemQuery(id);

    return this._http.post<ItemApiResponseRow>(this._url,
      JSON.stringify({query: query}),
      {headers: {"Content-type": "application/json"}});
  }

  private _getItemsQuery(): string {
    return `query Users {
      Page(page: ${this._filtersService.currentPage}, perPage: ${this._filtersService.perPage}) {
        pageInfo {
          total
          currentPage
          perPage
          lastPage
        }
        media${this._filtersService.getMediaFilter()} {
          id
          title {
            userPreferred
          }
          season
          status
        }
      }
    }`
  }

  private _getItemQuery(id: string): string {
    return `query User {
      Media(id: ${id}) {
        title {
          userPreferred
        }
        status
        description
        season
        startDate {
          year
        }
        endDate {
          year
        }
      }
    }`
  }
}