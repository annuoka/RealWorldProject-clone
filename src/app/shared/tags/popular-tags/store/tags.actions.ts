import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {PopularTag} from '../../../models/article.interface';

export const tagsActions = createActionGroup({
  source: 'Tags',
  events: {
    'Get Tags': emptyProps(),
    'Get Tags Success': props<{tags: PopularTag[]}>(),
    'Get Tags Failure': emptyProps(),
  },
});
