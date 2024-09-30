import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {PopularTag} from '../../../models/article.interface';
import {GetTagsResponseInterface} from '../popular-tags/models/getTagsResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private _http: HttpClient) {}

  getTags(): Observable<PopularTag[]> {
    const url = environment.baseUrl + '/tags';
    return this._http
      .get<GetTagsResponseInterface>(url)
      .pipe(map((response: GetTagsResponseInterface) => response.tags));
  }
}
