import {createFeature, createReducer, on} from '@ngrx/store';
import {PopularTag} from '../../../../models/article.interface';
import {tagsActions} from './tags.actions';

export interface TagsState {
  isLoading: boolean;
  error: string | null;
  data: PopularTag[] | null;
}

const initialState: TagsState = {
  isLoading: false,
  error: null,
  data: null,
};

const tagsFeature = createFeature({
  name: 'tags',
  reducer: createReducer(
    initialState,
    on(tagsActions.getTags, (state: TagsState) => ({
      ...state,
      isLoading: true,
    })),
    on(tagsActions.getTagsSuccess, (state: TagsState, action) => ({
      ...state,
      data: action.tags,
      isLoading: false,
    })),
    on(tagsActions.getTagsFailure, (state: TagsState) => ({
      ...state,
      data: null,
      isLoading: false,
    })),
  ),
});

export const {
  name: tagsFeatureKey,
  reducer: tagsReducer,
  selectData: selectTagsData,
  selectError: selectTagsError,
  selectIsLoading: selectTagsIsLoading,
} = tagsFeature;
