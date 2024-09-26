import {HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {CurrentUser} from '../../shared/models/currentUser.interface';
import {PersistenceService} from '../../shared/services/persistence.service';
import {AuthService} from '../auth.service';
import {authActions} from './auth.actions';

export const registerEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    authService: AuthService = inject(AuthService),
    persistenceService: PersistenceService = inject(PersistenceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({request}) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUser) => {
            persistenceService.set('accessToken', currentUser.token);
            return authActions.registerSuccess({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              }),
            );
          }),
        );
      }),
    );
  },
  {functional: true},
);

export const redirectAfterRegisterEffect = createEffect(
  (actions$: Actions = inject(Actions), router: Router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
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

export const loginEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    authService: AuthService = inject(AuthService),
    persistenceService: PersistenceService = inject(PersistenceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({request}) => {
        return authService.login(request).pipe(
          map((currentUser: CurrentUser) => {
            persistenceService.set('accessToken', currentUser.token);
            return authActions.loginSuccess({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({
                errors: errorResponse.error.errors,
              }),
            );
          }),
        );
      }),
    );
  },
  {functional: true},
);

export const redirectAfterLoginEffect = createEffect(
  (actions$: Actions = inject(Actions), router: Router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
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

export const getCurrentUserEffect = createEffect(
  (
    actions$: Actions = inject(Actions),
    authService: AuthService = inject(AuthService),
    persistenceService: PersistenceService = inject(PersistenceService),
  ) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = persistenceService.get('accessToken');

        if (!token) {
          return of(authActions.getCurrentUserFailure());
        }
        return authService.getCurrentUser().pipe(
          map((currentUser: CurrentUser) => {
            return authActions.getCurrentUserSuccess({currentUser});
          }),
          catchError(() => {
            return of(authActions.getCurrentUserFailure());
          }),
        );
      }),
    );
  },
  {
    functional: true,
  },
);
