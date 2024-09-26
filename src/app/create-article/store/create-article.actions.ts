import {createActionGroup, props} from '@ngrx/store';

import {Article, ArticleRequest} from '../../shared/models/article.interface';
import {BackendErrors} from './../../shared/models/backendErrors.interface';

export const createArticleActions = createActionGroup({
  source: 'CreateArticle',
  events: {
    'Create Article': props<{request: ArticleRequest}>(),
    'Create Article Success': props<{article: Article}>(),
    'Create Article Failure': props<{errors: BackendErrors}>(),
  },
});
