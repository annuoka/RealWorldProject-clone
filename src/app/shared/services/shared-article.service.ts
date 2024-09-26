import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs';
import {environment} from '../../../environments/environment.development';
import {ArticleResponse} from '../models/article.interface';

@Injectable({
  providedIn: 'root',
})
export class SharedArticleService {
  constructor(private _http: HttpClient) {}

  getArticle(slug: string) {
    const fullUrl = `${environment.baseUrl}/articles/${slug}`;
    return this._http
      .get<ArticleResponse>(fullUrl)
      .pipe(map((response) => response.article));
  }
}
