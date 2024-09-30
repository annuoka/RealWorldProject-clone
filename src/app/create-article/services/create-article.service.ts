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
export class CreateArticleService {
  constructor(private _http: HttpClient) {}

  createArticle(articleRequest: ArticleRequest): Observable<Article> {
    const fullUrl = environment.baseUrl + '/articles';
    return this._http
      .post<ArticleResponse>(fullUrl, articleRequest)
      .pipe(map((response) => response.article));
  }
}
