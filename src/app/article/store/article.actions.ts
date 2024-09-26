import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Article, ArticleResponse} from '../../shared/models/article.interface';

export const articleActions = createActionGroup({
  source: 'Article',
  events: {
    'Get Article': props<{slug: string}>(),
    'Get Article Success': props<{article: Article}>(),
    'Get Article Failure': emptyProps(),

    'Delete Article': props<{slug: string}>(),
    'Delete Article Success': emptyProps(),
    'Delete Article Failure': emptyProps(),
  },
});
