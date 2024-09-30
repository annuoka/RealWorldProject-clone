import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Article}                              from '../../../models/article.interface';

export const addFavoriteActions = createActionGroup({
  source: 'Add Favorite',
  events: {
    'Add Favorite': props<{isFavorited: boolean; slug: string}>(),
    'Add Favorite Success': props<{article: Article}>(),
    'Add Favorite Failure': emptyProps(),
  },
});
