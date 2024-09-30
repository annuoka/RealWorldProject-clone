import {routerNavigatedAction} from '@ngrx/router-store';
import {createFeature, createReducer, on} from '@ngrx/store';
import {GetFeedResponseInterface} from '../models/getFeedResponse.interface';
import {feedActions} from './feed.actions';

export interface FeedState {
  isLoading: boolean;
  error: string | null;
  data: GetFeedResponseInterface | null;
}

const initialState: FeedState = {
  isLoading: false,
  error: null,
  data: null,
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedActions.getFeed, (state: FeedState) => ({
      ...state,
      isLoading: true,
    })),
    on(feedActions.getFeedSuccess, (state: FeedState, action) => ({
      ...state,
      isLoading: false,
      data: action.feed,
    })),
    on(feedActions.getFeedFailure, (state: FeedState) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigatedAction, () => initialState),
  ),
});

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectIsLoading,
  selectError,
  selectData: selectFeedData,
} = feedFeature;
