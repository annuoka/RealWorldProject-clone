import {CommonModule} from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import queryString from 'query-string';
import {combineLatest, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {ErrorMessageComponent} from '../../error-message/error-message.component';
import {LoadingComponent} from '../../loading/loading.component';
import {PaginationComponent} from '../../pagination/pagination.component';
import {TagListComponent} from '../../tags/tag-list/tag-list.component';
import {GetFeedResponseInterface} from '../models/getFeedResponse.interface';
import {feedActions} from '../store/feed.actions';
import {
  selectError,
  selectFeedData,
  selectIsLoading,
} from '../store/feed.reducers';
import {AddFavoriteComponent} from '../../add-favorite/components/add-favorite.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
    TagListComponent,
    AddFavoriteComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() apiUrl: string = '';
  baseUrl: string;
  currentPage: number = 0;
  limit: number = environment.limit;
  data$: Observable<{
    isLoading: boolean;
    error: string | null;
    feed: GetFeedResponseInterface | null;
  }>;

  constructor(
    private _store: Store,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.data$ = combineLatest({
      isLoading: this._store.select(selectIsLoading),
      error: this._store.select(selectError),
      feed: this._store.select(selectFeedData),
    });
    this.baseUrl = this._router.url.split('?')[0];
  }

  ngOnInit() {
    this._route.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.currentPage = Number(params['page'] || '1');
      this.fetchFeed();
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    const isApiUrlChanged =
      !changes['apiUrl'].isFirstChange() &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue;
    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = queryString.parseUrl(this.apiUrl);
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    console.log('offset', offset, parsedUrl);
    this._store.dispatch(feedActions.getFeed({url: apiWithParams}));
  }
}
