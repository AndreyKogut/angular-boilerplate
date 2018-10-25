import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { switchMapTo, tap } from 'rxjs/operators';

import { REFRESH_TOKEN_NAME } from '../constants';

@Injectable()
export class AuthenticationService {
  private _accessToken;
  private _refreshToken;
  private _user;
  user = new ReplaySubject();

  constructor(private http: HttpClient, private router: Router) {}

  getRefreshToken(): string | null {
    return this._refreshToken || localStorage.getItem(REFRESH_TOKEN_NAME) || sessionStorage.getItem(REFRESH_TOKEN_NAME);
  }

  get accessToken() {
    return this._accessToken;
  }

  get refreshToken() {
    return this._refreshToken;
  }

  register(userObj: any) {
    return this.http.post('', userObj).pipe(
      tap((token: any) => {
        this.accessToken(token.accessToken);
        this.refreshToken(token.refreshToken);
      }),
      switchMapTo(this.loginWithToken()),
    );
  }

  loginWithToken() {
    return this.http.get('').pipe(tap(this.setUserData.bind(this)));
  }

  setUserData(userData) {
    this._user = userData;

    this.user.next(userData);
  }

  mergeUserData(data: Partial<any>) {
    this._user = { ...(this._user || {}), ...data };

    this.user.next(this._user);
  }

  login(loginFormObj: any): any {
    return this.http.post('', loginFormObj).pipe(
      tap((token: any) => {
        this.accessToken(token.accessToken);
        this.refreshToken(token.refreshToken);
      }),
      switchMapTo(this.loginWithToken()),
    );
  }

  logout(withRedirect = true): void {
    this._user = undefined;
    this._refreshToken = undefined;
    this._accessToken = undefined;

    if (withRedirect) {
      this.router.navigate(['login']);
    }
  }

  isAuthenticated(): boolean {
    return !!this._user;
  }
}
