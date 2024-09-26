import {routerNavigatedAction} from '@ngrx/router-store';
import {createFeature, createReducer, on} from '@ngrx/store';
import {articleActions} from '../../article/store/article.actions';
import {ArticleState} from '../../article/store/article.reducers';
import {Article} from '../../shared/models/article.interface';
import {BackendErrors} from '../../shared/models/backendErrors.interface';
import {createArticleActions} from './create-article.actions';

export interface CreateArticleState {
  isSubmitting: boolean;
  validationErrors: BackendErrors | null;
}

const initialState: CreateArticleState = {
  isSubmitting: false,
  validationErrors: null,
};

const createArticleFeature = createFeature({
  name: 'createArticle',
  reducer: createReducer(
    initialState,
    on(createArticleActions.createArticle, (state: CreateArticleState) => ({
      ...state,
      isSubmitting: true,
    })),
    on(
      createArticleActions.createArticleSuccess,
      (state: CreateArticleState, action) => ({
        ...state,
        isSubmitting: false,
      }),
    ),
    on(
      createArticleActions.createArticleFailure,
      (state: CreateArticleState, action) => ({
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      }),
    ),
    on(routerNavigatedAction, () => initialState),
  ),
});

export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createArticleFeature;
