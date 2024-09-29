import {routerNavigatedAction} from '@ngrx/router-store';
import {createFeature, createReducer, on} from '@ngrx/store';
import {authActions} from '../../auth/store/auth.actions';
import {AuthState} from '../../auth/store/auth.reducers';
import {BackendErrors} from '../../shared/models/backendErrors.interface';

export interface SettingsState {
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}

const initialState: SettingsState = {
  isSubmitting: false,
  validationErrors: null,
};

const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,
    on(authActions.updateCurrentUser, (state: SettingsState) => ({
      ...state,
      isSubmitting: true,
    })),
    on(authActions.updateCurrentUserSuccess, (state: SettingsState) => ({
      ...state,
      isSubmitting: false,
    })),
    on(
      authActions.updateCurrentUserFailure,
      (state: SettingsState, action) => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      }),
    ),
    on(routerNavigatedAction, () => initialState),
  ),
});

export const {
  name: settingsFeatureKey,
  reducer: settingsReducer,
  selectSettingsState,
  selectValidationErrors,
} = settingsFeature;
