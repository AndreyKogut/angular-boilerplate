import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, switchMapTo } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept = (request: HttpRequest<any>, next: HttpHandler) =>
    next.handle(request).pipe(
      // Handle https request errors (transform response for translations for example)
      catchError((err: HttpResponse<any>, obs) => {
        if (err.status === 401) {
          return this.authenticationService.refreshAccessToken().pipe(switchMapTo(obs));
        }
      }),
    );
}
