import {routerNavigatedAction} from '@ngrx/router-store';
import {createFeature, createReducer, on} from '@ngrx/store';
import {Article} from '../../shared/models/article.interface';
import {articleActions} from './article.actions';

export interface ArticleState {
  isLoading: boolean;
  error: string | null;
  data: Article | null;
}

const initialState: ArticleState = {
  isLoading: false,
  error: null,
  data: null,
};

const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    on(articleActions.getArticle, (state: ArticleState) => ({
      ...state,
      isLoading: true,
    })),
    on(articleActions.getArticleSuccess, (state: ArticleState, action) => ({
      ...state,
      isLoading: false,
      data: action.article,
    })),
    on(articleActions.getArticleFailure, (state: ArticleState) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigatedAction, () => initialState),
  ),
});

export const {
  name: articleFeatureKey,
  reducer: articleReducer,
  selectIsLoading,
  selectError,
  selectData: selectArticleData,
} = articleFeature;
