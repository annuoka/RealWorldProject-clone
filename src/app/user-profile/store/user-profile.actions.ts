import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {UserProfile} from '../models/user-profile.interface';

export const userProfileActions = createActionGroup({
  source: 'User Profile',
  events: {
    'Get User Profile': props<{slug: string}>(),
    'Get User Profile Success': props<{userProfile: UserProfile}>(),
    'Get User Profile Failure': emptyProps(),
  },
});
