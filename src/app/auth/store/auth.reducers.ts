import {routerNavigatedAction} from '@ngrx/router-store';
import {createFeature, createReducer, on} from '@ngrx/store';
import {BackendErrors} from '../../shared/models/backendErrors.interface';
import {CurrentUser} from '../../shared/models/currentUser.interface';
import {authActions} from './auth.actions';

export interface AuthState {
  isSubmitting: boolean;
  currentUser: CurrentUser | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrors | null;
}

const initialState: AuthState = {
  isSubmitting: false,
  currentUser: null,
  isLoading: false,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state: AuthState) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state: AuthState, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state: AuthState, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    on(authActions.login, (state: AuthState) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state: AuthState, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state: AuthState, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    on(authActions.getCurrentUser, (state: AuthState) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getCurrentUserSuccess, (state: AuthState, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.getCurrentUserFailure, (state: AuthState) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),

    on(authActions.updateCurrentUserSuccess, (state: AuthState, action) => ({
      ...state,
      currentUser: action.currentUser,
    })),
    on(authActions.logout, (state: AuthState) => ({
      ...state,
      ...initialState,
      currentUser: null,
    })),

    on(routerNavigatedAction, (state: AuthState) => ({
      ...state,
      validationErrors: null,
    })),
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature;
