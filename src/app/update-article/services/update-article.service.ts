import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {
  Article,
  ArticleRequest,
  ArticleResponse,
} from '../../shared/models/article.interface';

@Injectable({
  providedIn: 'root',
})
export class UpdateArticleService {
  constructor(private _http: HttpClient) {}

  updateArticle(
    articleRequest: ArticleRequest,
    slug: string,
  ): Observable<Article> {
    const fullUrl = `${environment.baseUrl}/articles/${slug}`;
    return this._http
      .put<ArticleResponse>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }
}
