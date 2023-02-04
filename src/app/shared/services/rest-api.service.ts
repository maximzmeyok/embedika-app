import { FiltersService } from './filters.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from } from "rxjs";

@Injectable()
export class RestApiService {
  private _url: string = 'https://graphql.anilist.co/';

  constructor(
    private _http: HttpClient,
    private _filtersService: FiltersService,
  ) {}

  public getItems() {
    const query: string = this._getItemsQuery();

    return from(
      fetch(this._url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ query: query })
      }).then((response) => response.json()));
  }

  public getItem(id: string) {
    const query: string = this._getItemQuery(id);

    return from(
      fetch(this._url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ query: query })
      }).then((response) => response.json()));
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
          romaji
          english
          native
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