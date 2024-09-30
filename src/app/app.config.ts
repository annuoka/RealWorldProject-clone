import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {appRoutes} from './app.routes';
import * as authEffects from './auth/store/auth.effects';
import {authFeatureKey, authReducer} from './auth/store/auth.reducers';
import {AddFavoriteService} from './shared/components/add-favorite/services/add-favorite.service';
import * as addFavoriteEffects from './shared/components/add-favorite/store/add-favorite.effects';
import * as feedEffects from './shared/components/feed/store/feed.effects';
import {
  feedFeatureKey,
  feedReducer,
} from './shared/components/feed/store/feed.reducers';
import * as tagsEffects from './shared/components/tags/popular-tags/store/tags.effects';
import {authInterceptor} from './shared/services/authInterceptor';
import {
  tagsFeatureKey,
  tagsReducer,
} from './shared/components/tags/popular-tags/store/tags.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({router: routerReducer}),
    provideEffects(authEffects, feedEffects, tagsEffects, addFavoriteEffects),
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
    AddFavoriteService,
  ],
};
