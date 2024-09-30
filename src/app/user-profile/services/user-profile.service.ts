import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs';
import {environment} from '../../../environments/environment';
import {GetUserProfileResponse} from '../models/user-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private _http: HttpClient) {}

  getUserProfile(slug: string) {
    const url = `${environment.baseUrl}/profiles/${slug}`;
    return this._http
      .get<GetUserProfileResponse>(url)
      .pipe(map((response) => response.profile));
  }
}
