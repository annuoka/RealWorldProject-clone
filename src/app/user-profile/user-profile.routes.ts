import {Route} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';
import {UserProfileComponent} from './components/user-profile.component';
import {UserProfileService} from './services/user-profile.service';
import {
  userProfileFeatureKey,
  userProfileReducer,
} from './store/user-profile.reducers';
import * as userProfileEffects from './store/user-profile.effects';

export const routes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
    providers: [
      UserProfileService,
      provideState(userProfileFeatureKey, userProfileReducer),
      provideEffects(userProfileEffects),
    ],
  },
];
