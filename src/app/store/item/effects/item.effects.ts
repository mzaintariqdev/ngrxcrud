import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';

import * as ItemActions from '../actions/item.actions';
import { ApiService } from '../../../core/api.service';

@Injectable()
export class ItemEffects {
  private actions$ = inject(Actions);
  private api = inject(ApiService);

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.loadItems),
      mergeMap(() =>
        this.api.getItems().pipe(map((items) => ItemActions.loadItemsSuccess({ items }))),
      ),
    ),
  );
}
