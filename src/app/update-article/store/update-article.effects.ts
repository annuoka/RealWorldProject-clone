import {HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {Article} from '../../shared/models/article.interface';
import {SharedArticleService} from '../../shared/services/shared-article.service';
import {UpdateArticleService} from '../services/update-article.service';
import {updateArticleActions} from './update-article.actions';

export const getArticleEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    articleService: SharedArticleService = inject(SharedArticleService),
  ) => {
    return actions$.pipe(
      ofType(updateArticleActions.getArticle),
      switchMap(({slug}) => {
        return articleService.getUserProfile(slug).pipe(
          map((article: Article) => {
            return updateArticleActions.getArticleSuccess({article});
          }),
          catchError(() => of(updateArticleActions.getArticleFailure())),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const updateArticleEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    updateArticleService: UpdateArticleService = inject(UpdateArticleService),
  ) => {
    return actions$.pipe(
      ofType(updateArticleActions.updateArticle),
      switchMap(({request, slug}) => {
        return updateArticleService.updateArticle(request, slug).pipe(
          map((article: Article) => {
            return updateArticleActions.updateArticleSuccess({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              updateArticleActions.updateArticleFailure({
                errors: errorResponse.error.errors,
              }),
            );
          }),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const redirectAfterCreateEffect = createEffect(
  (actions$: Actions = inject(Actions), router: Router = inject(Router)) => {
    return actions$.pipe(
      ofType(updateArticleActions.updateArticleSuccess),
      tap(({article}) => {
        router.navigate(['/articles', article.slug]);
      }),
    );
  },
  {
    functional: true,
    dispatch: false,
  },
);
