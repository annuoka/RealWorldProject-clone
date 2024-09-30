import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {Article} from '../../shared/models/article.interface';
import {SharedArticleService} from '../../shared/services/shared-article.service';
import {ArticleService} from '../services/article.service';
import {articleActions} from './article.actions';

export const getArticleEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    articleService: SharedArticleService = inject(SharedArticleService),
  ) => {
    return actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({slug}) => {
        return articleService.getUserProfile(slug).pipe(
          map((article: Article) => {
            return articleActions.getArticleSuccess({article});
          }),
          catchError(() => of(articleActions.getArticleFailure())),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const deleteArticleEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    articleService: ArticleService = inject(ArticleService),
  ) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticle),
      switchMap(({slug}) => {
        return articleService.deleteArticle(slug).pipe(
          map(() => {
            return articleActions.deleteArticleSuccess();
          }),
          catchError(() => of(articleActions.deleteArticleFailure())),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const redirectAfterDeleteEffect = createEffect(
  (actions$: Actions = inject(Actions), router: Router = inject(Router)) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticleSuccess),
      tap(() => {
        router.navigateByUrl('/');
      }),
    );
  },
  {
    functional: true,
    dispatch: false,
  },
);
