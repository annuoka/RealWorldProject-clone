import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {
  CurrentUser,
  CurrentUserRequest,
} from '../../shared/models/currentUser.interface';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../models/auth.models';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl: string = environment.baseUrl;
  constructor(private _http: HttpClient) {}

  private _getUser(response: AuthResponse): CurrentUser {
    return response.user;
  }

  getCurrentUser(): Observable<CurrentUser> {
    const url = this._baseUrl + '/user';
    return this._http.get<AuthResponse>(url).pipe(map(this._getUser));
  }

  register(data: RegisterRequest): Observable<CurrentUser> {
    const url = this._baseUrl + '/users';
    return this._http.post<AuthResponse>(url, data).pipe(map(this._getUser));
  }

  login(data: LoginRequest): Observable<CurrentUser> {
    const url = this._baseUrl + '/users/login';
    return this._http.post<AuthResponse>(url, data).pipe(map(this._getUser));
  }

  updateCurrentUser(
    currentUserRequest: CurrentUserRequest,
  ): Observable<CurrentUser> {
    const url = this._baseUrl + '/user';
    return this._http
      .put<AuthResponse>(url, currentUserRequest)
      .pipe(map(this._getUser));
  }
}
