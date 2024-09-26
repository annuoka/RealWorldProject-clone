import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {BackendErrors} from '../../shared/models/backendErrors.interface';
import {CurrentUser} from '../../shared/models/currentUser.interface';
import {LoginRequest, RegisterRequest} from '../models/auth.models';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    Register: props<{request: RegisterRequest}>(),
    'Register Success': props<{currentUser: CurrentUser}>(),
    'Register Failure': props<{errors: BackendErrors}>(),

    Login: props<{request: LoginRequest}>(),
    'Login Success': props<{currentUser: CurrentUser}>(),
    'Login Failure': props<{errors: BackendErrors}>(),

    'Get Current User': emptyProps(),
    'Get Current User Success': props<{currentUser: CurrentUser}>(),
    'Get Current User Failure': emptyProps(),
  },
});
