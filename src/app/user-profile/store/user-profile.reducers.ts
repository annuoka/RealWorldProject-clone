import {routerNavigatedAction} from '@ngrx/router-store';
import {createFeature, createReducer, on} from '@ngrx/store';
import {UserProfile} from '../models/user-profile.interface';
import {userProfileActions} from './user-profile.actions';

export interface UserProfileState {
  isLoading: boolean;
  error: string | null;
  data: UserProfile | null;
}

const initialState: UserProfileState = {
  isLoading: false,
  error: null,
  data: null,
};

const userProfileFeature = createFeature({
  name: 'userProfile',
  reducer: createReducer(
    initialState,
    on(userProfileActions.getUserProfile, (state: UserProfileState) => ({
      ...state,
      isLoading: true,
    })),
    on(
      userProfileActions.getUserProfileSuccess,
      (state: UserProfileState, action) => ({
        ...state,
        isLoading: false,
        data: action.userProfile,
      }),
    ),
    on(userProfileActions.getUserProfileFailure, (state: UserProfileState) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigatedAction, () => initialState),
  ),
});

export const {
  name: userProfileFeatureKey,
  reducer: userProfileReducer,
  selectIsLoading,
  selectError,
  selectData: selectUserProfileData,
} = userProfileFeature;
