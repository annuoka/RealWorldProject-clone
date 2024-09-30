import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {GetFeedResponseInterface} from '../models/getFeedResponse.interface';
import {FeedService} from '../services/feed.service';
import {feedActions} from './feed.actions';

export const getFeedEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    feedService: FeedService = inject(FeedService),
  ) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({url}) => {
        return feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return feedActions.getFeedSuccess({feed});
          }),
          catchError(() => of(feedActions.getFeedFailure())),
        );
      }),
    );
  },
  {
    functional: true,
  },
);
