import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {PopularTag} from '../../../../models/article.interface';
import {TagsService} from '../../services/tags.service';
import {tagsActions} from './tags.actions';

export const getTagsEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    tagsService: TagsService = inject(TagsService),
  ) => {
    return actions$.pipe(
      ofType(tagsActions.getTags),
      switchMap(() => {
        return tagsService.getTags().pipe(
          map((tags: PopularTag[]) => {
            return tagsActions.getTagsSuccess({tags});
          }),
          catchError(() => of(tagsActions.getTagsFailure())),
        );
      }),
    );
  },
  {
    functional: true,
  },
);
