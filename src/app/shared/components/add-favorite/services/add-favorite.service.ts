import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {Article, ArticleResponse} from '../../../models/article.interface';

@Injectable()
export class AddFavoriteService {
  constructor(private _http: HttpClient) {}

  addToFavorites(slug: string): Observable<Article> {
    const url = this._getUrl(slug);
    return this._http
      .post<ArticleResponse>(url, {})
      .pipe(map(this._getArticle));
  }

  removeFromFavorites(slug: string): Observable<Article> {
    const url = this._getUrl(slug);
    return this._http
      .delete<ArticleResponse>(url, {})
      .pipe(map(this._getArticle));
  }

  private _getUrl(slug: string): string {
    return `${environment.baseUrl}/articles/${slug}/favorite`;
  }

  private _getArticle(response: ArticleResponse): Article {
    return response.article;
  }
}
