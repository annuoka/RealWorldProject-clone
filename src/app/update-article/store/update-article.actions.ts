import {createActionGroup, emptyProps, props} from '@ngrx/store';

import {Article, ArticleRequest} from '../../shared/models/article.interface';
import {BackendErrors} from './../../shared/models/backendErrors.interface';

export const updateArticleActions = createActionGroup({
  source: 'UpdateArticle',
  events: {
    'Get Article': props<{slug: string}>(),
    'Get Article Success': props<{article: Article}>(),
    'Get Article Failure': emptyProps(),

    'Update Article': props<{request: ArticleRequest; slug: string}>(),
    'Update Article Success': props<{article: Article}>(),
    'Update Article Failure': props<{errors: BackendErrors}>(),
  },
});
