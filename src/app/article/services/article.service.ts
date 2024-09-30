import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private _http: HttpClient) {}

  deleteArticle(slug: string): Observable<{}> {
    const fullUrl = `${environment.baseUrl}/articles/${slug}`;
    return this._http.delete(fullUrl);
  }
}
