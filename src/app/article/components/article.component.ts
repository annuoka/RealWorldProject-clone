import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {combineLatest, filter, map, Observable} from 'rxjs';
import {selectCurrentUser} from '../../auth/store/auth.reducers';
import {ErrorMessageComponent} from '../../shared/components/error-message/error-message.component';
import {LoadingComponent} from '../../shared/components/loading/loading.component';
import {TagListComponent} from '../../shared/components/tags/tag-list/tag-list.component';
import {Article} from '../../shared/models/article.interface';
import {CurrentUser} from '../../shared/models/currentUser.interface';
import {articleActions} from '../store/article.actions';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../store/article.reducers';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  slug: string;
  isAuthor$: Observable<boolean> = new Observable();
  data$: Observable<{
    isLoading: boolean;
    error: string | null;
    article: Article | null;
    isAuthor: boolean;
  }> = new Observable();

  constructor(
    private _store: Store,
    private _route: ActivatedRoute,
  ) {
    this.slug = this._route.snapshot.paramMap.get('slug') || '';

    this.isAuthor$ = combineLatest({
      article: this._store.select(selectArticleData),
      currentUser: this._store
        .select(selectCurrentUser)
        .pipe(
          filter(
            (currentUser): currentUser is CurrentUser | null =>
              currentUser !== undefined,
          ),
        ),
    }).pipe(
      map(({article, currentUser}) => {
        return (
          !!article &&
          !!currentUser &&
          article.author.username === currentUser.username
        );
      }),
    );

    this.data$ = combineLatest({
      isLoading: this._store.select(selectIsLoading),
      error: this._store.select(selectError),
      article: this._store.select(selectArticleData),
      isAuthor: this.isAuthor$,
    });
  }

  ngOnInit() {
    this._store.dispatch(articleActions.getArticle({slug: this.slug}));
  }

  deleteArticle(): void {
    this._store.dispatch(articleActions.deleteArticle({slug: this.slug}));
  }
}
