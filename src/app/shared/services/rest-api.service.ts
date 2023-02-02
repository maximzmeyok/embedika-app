import { FiltersService } from './filters.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, tap, from } from "rxjs";

@Injectable()
export class RestApiService {
  private _url: string = 'https://graphql.anilist.co/';

  constructor(
    private _http: HttpClient,
    private _filtersService: FiltersService,
  ) {}

  public getItems() {
    const query: string = this._filtersService.query;

    return from(
      fetch(this._url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ query: query })
      }).then((response) => response.json()));
  }

  public getById(id: string) {
    const query: string = `query User {
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
    }`;

    return from(
      fetch(this._url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ query: query })
      }).then((response) => response.json()));
  }
}