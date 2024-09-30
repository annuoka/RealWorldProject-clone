import {AsyncPipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {combineLatest, filter, map, Observable} from 'rxjs';
import {ArticleFormComponent} from '../../shared/components/article-form/article-form.component';
import {ArticleFormValues} from '../../shared/components/article-form/models/articleFormValues.interface';
import {LoadingComponent} from '../../shared/components/loading/loading.component';
import {Article, ArticleRequest} from '../../shared/models/article.interface';
import {BackendErrors} from '../../shared/models/backendErrors.interface';
import {updateArticleActions} from '../store/update-article.actions';
import {
  selectValidationErrors,
  selectIsSubmitting,
  selectArticle,
  selectIsLoading,
} from '../store/update-article.reducers';

@Component({
  selector: 'app-update-article',
  standalone: true,
  imports: [ArticleFormComponent, AsyncPipe, LoadingComponent],
  templateUrl: './update-article.component.html',
  styleUrl: './update-article.component.scss',
})
export class UpdateArticleComponent implements OnInit {
  initialValues$: Observable<ArticleFormValues | null> = new Observable();
  slug: string;
  data$: Observable<{
    isLoading: boolean;
    initialValues: ArticleFormValues | null;
    errors: BackendErrors | null;
    isSubmitting: boolean;
  }> = new Observable();

  constructor(
    private _store: Store,
    private _route: ActivatedRoute,
  ) {
    this.slug = this._route.snapshot.paramMap.get('slug') || '';

    this.initialValues$ = this._store.pipe(
      select(selectArticle),
      filter((article: Article | null): article is Article => !!article),
      map((article: Article): ArticleFormValues => {
        return {
          title: article.title,
          description: article.description,
          body: article.body || '',
          tagList: article.tagList,
        };
      }),
    );

    this.data$ = combineLatest({
      isLoading: this._store.select(selectIsLoading),
      errors: this._store.select(selectValidationErrors),
      isSubmitting: this._store.select(selectIsSubmitting),
      initialValues: this.initialValues$,
    });
  }

  ngOnInit(): void {
    this._store.dispatch(updateArticleActions.getArticle({slug: this.slug}));
  }

  onSubmit(articleFormValues: ArticleFormValues): void {
    const request: ArticleRequest = {
      article: articleFormValues,
    };
    this._store.dispatch(
      updateArticleActions.updateArticle({request, slug: this.slug}),
    );
  }
}
