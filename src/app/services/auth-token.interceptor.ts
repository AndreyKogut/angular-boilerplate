import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const interceptedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.accessToken}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    return next.handle(interceptedRequest);
  }
}
