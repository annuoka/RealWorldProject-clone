import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {from} from 'rxjs';
import {appRoutes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {authFeatureKey, authReducer} from './auth/store/auth.reducers';
import {provideEffects} from '@ngrx/effects';
import * as authEffects from './auth/store/auth.effects';
import * as feedEffects from './shared/feed/store/feed.effects';
import * as tagsEffects from './shared/tags/popular-tags/store/tags.effects';
import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import {feedFeatureKey, feedReducer} from './shared/feed/store/feed.reducers';
import {authInterceptor} from './shared/services/authInterceptor';
import {
  tagsFeatureKey,
  tagsReducer,
} from './shared/tags/popular-tags/store/tags.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({router: routerReducer}),
    provideEffects(authEffects, feedEffects, tagsEffects),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(tagsFeatureKey, tagsReducer),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideEffects(),
    provideRouterStore(),
  ],
};
