import {routerNavigatedAction} from '@ngrx/router-store';
import {createFeature, createReducer, on} from '@ngrx/store';
import {Article} from '../../shared/models/article.interface';
import {BackendErrors} from '../../shared/models/backendErrors.interface';
import {updateArticleActions} from './update-article.actions';

export interface UpdateArticleState {
  article: Article | null;
  isLoading: boolean;
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}

const initialState: UpdateArticleState = {
  article: null,
  isLoading: false,
  isSubmitting: false,
  validationErrors: null,
};

const updateArticleFeature = createFeature({
  name: 'updateArticle',
  reducer: createReducer(
    initialState,

    on(updateArticleActions.getArticle, (state: UpdateArticleState) => ({
      ...state,
      isLoading: true,
    })),
    on(
      updateArticleActions.getArticleSuccess,
      (state: UpdateArticleState, action) => ({
        ...state,
        isLoading: false,
        article: action.article,
      }),
    ),
    on(updateArticleActions.getArticleFailure, (state: UpdateArticleState) => ({
      ...state,
      isLoading: false,
    })),

    on(updateArticleActions.updateArticle, (state: UpdateArticleState) => ({
      ...state,
      isSubmitting: true,
    })),
    on(
      updateArticleActions.updateArticleSuccess,
      (state: UpdateArticleState) => ({
        ...state,
        isSubmitting: false,
      }),
    ),
    on(
      updateArticleActions.updateArticleFailure,
      (state: UpdateArticleState, action) => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      }),
    ),
    on(routerNavigatedAction, () => initialState),
  ),
});

export const {
  name: updateArticleFeatureKey,
  reducer: updateArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
  selectIsLoading,
  selectArticle,
} = updateArticleFeature;
