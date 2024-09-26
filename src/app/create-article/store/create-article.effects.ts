import {HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {articleActions} from '../../article/store/article.actions';
import {Article} from '../../shared/models/article.interface';
import {CreateArticleService} from '../services/create-article.service';
import {createArticleActions} from './create-article.actions';

export const createArticleEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    createArticleService: CreateArticleService = inject(CreateArticleService),
  ) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticle),
      switchMap(({request}) => {
        return createArticleService.createArticle(request).pipe(
          map((article: Article) => {
            return createArticleActions.createArticleSuccess({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createArticleActions.createArticleFailure({
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
      ofType(createArticleActions.createArticleSuccess),
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
