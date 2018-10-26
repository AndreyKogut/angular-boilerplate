import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '../constants';
import { Authentication, User } from '../models';

import UserProfile = User.UserProfile;
import RegistrationFormData = Authentication.RegistrationFormData;
import LoginFormData = Authentication.LoginFormData;
import LoginResponse = Authentication.LoginResponse;

const setTokens = (tokenName: string, value: string) => {
  localStorage.setItem(tokenName, value);
  // For remember me handling
  sessionStorage.setItem(tokenName, value);
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _accessToken;
  private _refreshToken;
  private _user: UserProfile;

  user = new ReplaySubject<UserProfile>();

  constructor(private http: HttpClient, private router: Router) {}

  get accessToken() {
    return this._accessToken || localStorage.getItem(ACCESS_TOKEN_NAME) || sessionStorage.getItem(ACCESS_TOKEN_NAME);
  }

  get refreshToken() {
    return this._refreshToken || localStorage.getItem(REFRESH_TOKEN_NAME) || sessionStorage.getItem(REFRESH_TOKEN_NAME);
  }

  register(userObj: RegistrationFormData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('', userObj).pipe(tap(this.handleUserAuthorization.bind(this)));
  }

  refreshAccessToken(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>('').pipe(tap(this.handleUserAuthorization.bind(this)));
  }

  setUserData(userData: UserProfile) {
    this._user = userData;

    this.user.next(userData);
  }

  mergeUserData(data: Partial<UserProfile>) {
    this._user = { ...(this._user || ({} as UserProfile)), ...data };

    this.user.next(this._user);
  }

  login(loginFormObj: LoginFormData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('', loginFormObj).pipe(tap(this.handleUserAuthorization.bind(this)));
  }

  handleUserAuthorization(data: LoginResponse) {
    const { accessToken, refreshToken, profile } = data;

    this.handleAccessTokenUpdate(accessToken);
    this.handleRefreshTokenUpdate(refreshToken);
    this.setUserData(profile);
  }

  handleAccessTokenUpdate(token) {
    this._accessToken = token;
    setTokens(ACCESS_TOKEN_NAME, token);
  }

  handleRefreshTokenUpdate(token) {
    this._accessToken = token;
    setTokens(REFRESH_TOKEN_NAME, token);
  }

  logout(withRedirect = true): void {
    this._user = undefined;
    this._refreshToken = undefined;
    this._accessToken = undefined;
    this.user.next(undefined);

    if (withRedirect) {
      this.router.navigate(['login']);
    }
  }

  isAuthenticated(): boolean {
    return !!this._user;
  }
}
