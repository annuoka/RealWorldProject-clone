import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('./your-feed/your-feed.routes').then((m) => m.routes),
  },
  {
    path: 'tags/:slug',
    loadChildren: () => import('./tag-feed/tags.routes').then((m) => m.routes),
  },
  {
    path: 'articles/new',
    loadChildren: () =>
      import('./create-article/create-article.routes').then((m) => m.routes),
  },
  {
    path: 'articles/:slug',
    loadChildren: () =>
      import('./article/article.routes').then((m) => m.routes),
  },
  {
    path: 'articles/:slug/edit',
    loadChildren: () =>
      import('./update-article/update-article.routes').then((m) => m.routes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.routes').then((m) => m.routes),
  },
  {
    path: 'profiles/:slug',
    loadChildren: () =>
      import('./user-profile/user-profile.routes').then((m) => m.routes),
  },
  {
    path: 'profiles/:slug/favorites',
    loadChildren: () =>
      import('./user-profile/user-profile.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./global-feed/global-feed.routes').then((m) => m.routes),
  },
];
