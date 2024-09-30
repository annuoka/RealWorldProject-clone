import {AsyncPipe, CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, combineLatest, filter, map} from 'rxjs';
import {selectCurrentUser} from '../../auth/store/auth.reducers';
import {FeedComponent} from '../../shared/components/feed/components/feed.component';
import {CurrentUser} from '../../shared/models/currentUser.interface';
import {UserProfile} from '../models/user-profile.interface';
import {userProfileActions} from '../store/user-profile.actions';
import {
  selectError,
  selectIsLoading,
  selectUserProfileData,
} from '../store/user-profile.reducers';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FeedComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _store = inject(Store);
  private _router = inject(Router);

  slug: string = '';

  isCurrentUserProfile$ = combineLatest({
    currentUser: this._store.pipe(
      select(selectCurrentUser),
      filter((currentUser): currentUser is CurrentUser => Boolean(currentUser)),
    ),
    userProfile: this._store.pipe(
      select(selectUserProfileData),
      filter((userProfile): userProfile is UserProfile => Boolean(userProfile)),
    ),
  }).pipe(
    map(({currentUser, userProfile}) => {
      return currentUser.username === userProfile.username;
    }),
  );
  data$ = combineLatest({
    isLoading: this._store.select(selectIsLoading),
    error: this._store.select(selectError),
    userProfile: this._store.select(selectUserProfileData),
    isCurrentUserProfile: this.isCurrentUserProfile$,
  });

  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.slug = params['slug'];
    });

    this.fetchUserProfile();
  }

  fetchUserProfile() {
    this._store.dispatch(userProfileActions.getUserProfile({slug: this.slug}));
  }

  getApiUrl(): string {
    const isFavorites = this._router.url.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${this.slug}`
      : `/articles?author=${this.slug}`;
  }
}
