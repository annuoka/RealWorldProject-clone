import {Route} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';
import {UpdateArticleComponent} from './components/update-article.component';
import {UpdateArticleService} from './services/update-article.service';
import * as updateArticleEffects from './store/update-article.effects';
import {
  updateArticleFeatureKey,
  updateArticleReducer,
} from './store/update-article.reducers';

export const routes: Route[] = [
  {
    path: '',
    component: UpdateArticleComponent,
    providers: [
      UpdateArticleService,
      provideEffects(updateArticleEffects),
      provideState(updateArticleFeatureKey, updateArticleReducer),
    ],
  },
];
