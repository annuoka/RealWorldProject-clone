import {AsyncPipe} from '@angular/common';
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {combineLatest, combineLatestAll, Observable} from 'rxjs';
import {ArticleFormComponent} from '../../shared/components/article-form/article-form.component';
import {ArticleFormValues} from '../../shared/components/article-form/models/articleFormValues.interface';
import {ArticleRequest} from '../../shared/models/article.interface';
import {BackendErrors} from '../../shared/models/backendErrors.interface';
import {createArticleActions} from '../store/create-article.actions';
import {
  selectValidationErrors,
  selectIsSubmitting,
} from '../store/create-article.reducers';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [ArticleFormComponent, AsyncPipe],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  data$: Observable<{
    errors: BackendErrors | null;
    isSubmitting: boolean;
  }> = new Observable();

  constructor(private _store: Store) {
    this.data$ = combineLatest({
      errors: this._store.select(selectValidationErrors),
      isSubmitting: this._store.select(selectIsSubmitting),
    });
  }

  onSubmit(articleFormValues: ArticleFormValues): void {
    const request: ArticleRequest = {
      article: articleFormValues,
    };
    this._store.dispatch(createArticleActions.createArticle({request}));
  }
}
