import {Route} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';
import * as createArticleEffects from './store/create-article.effects';
import {CreateArticleComponent} from './components/create-article.component';
import {CreateArticleService} from './services/create-article.service';
import {
  createArticleFeatureKey,
  createArticleReducer,
} from './store/create-article.reducers';

export const routes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
    providers: [
      CreateArticleService,
      provideEffects(createArticleEffects),
      provideState(createArticleFeatureKey, createArticleReducer),
    ],
  },
];
