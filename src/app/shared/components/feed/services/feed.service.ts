import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {GetFeedResponseInterface} from '../models/getFeedResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private _http: HttpClient) {}

  getFeed(url: string) {
    const fullUrl = environment.baseUrl + url;
    return this._http.get<GetFeedResponseInterface>(fullUrl);
  }
}
