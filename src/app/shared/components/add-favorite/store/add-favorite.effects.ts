import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {
  Article,
  ArticleResponse,
}                                       from '../../../models/article.interface';
import {AddFavoriteService}             from '../services/add-favorite.service';
import {addFavoriteActions}             from './add-favorite.actions';

export const addFavoriteEffects = createEffect(
  (
    actions$: Actions = inject(Actions),
    addFavoriteService: AddFavoriteService = inject(AddFavoriteService),
  ) => {
    return actions$.pipe(
      ofType(addFavoriteActions.addFavorite),
      switchMap(({isFavorited, slug}) => {
        const article$ = isFavorited
          ? addFavoriteService.removeFromFavorites(slug)
          : addFavoriteService.addToFavorites(slug);
        return article$.pipe(
          map((article: Article) => {
            return addFavoriteActions.addFavoriteSuccess({article});
          }),
          catchError(() => {
            return of(addFavoriteActions.addFavoriteFailure());
          }),
        );
      }),
    );
  },
  {functional: true},
);
