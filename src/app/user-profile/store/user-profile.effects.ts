import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {UserProfile} from '../models/user-profile.interface';
import {UserProfileService} from '../services/user-profile.service';
import {userProfileActions} from './user-profile.actions';

export const getUserProfileEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    userProfileService: UserProfileService = inject(UserProfileService),
  ) => {
    return actions$.pipe(
      ofType(userProfileActions.getUserProfile),
      switchMap(({slug}) => {
        return userProfileService.getUserProfile(slug).pipe(
          map((userProfile: UserProfile) => {
            return userProfileActions.getUserProfileSuccess({userProfile});
          }),
          catchError(() => {
            return of(userProfileActions.getUserProfileFailure());
          }),
        );
      }),
    );
  },
  {
    functional: true,
  },
);
