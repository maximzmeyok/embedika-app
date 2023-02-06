import { ItemApiResponseRow } from './../shared/interfaces';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { RestApiService } from './../shared/services/rest-api.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemPageComponent {
  public item$: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _postService: RestApiService,
  ) {}

  public ngOnInit(): void {
    this.item$ = this._route.params.pipe(
      switchMap((params: Params) => {
        return this._postService.getItem(params['id']);
      }),
      map((response: ItemApiResponseRow) => response.data.Media)
    );
  }
}
