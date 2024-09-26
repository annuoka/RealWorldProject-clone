import {Route} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';
import {ArticleComponent} from './components/article.component';
import {ArticleService} from './services/article.service';
import * as articleEffects from './store/article.effects';
import {articleFeatureKey, articleReducer} from './store/article.reducers';

export const routes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(articleEffects),
      provideState(articleFeatureKey, articleReducer),
      ArticleService,
    ],
  },
];
