import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorsHandlerInterceptor implements HttpInterceptor {
  intercept = (request: HttpRequest<any>, next: HttpHandler) =>
    next.handle(request).pipe(
      // Handle https request errors (transfrom response for translations for example)
      catchError(err => of(err)),
    );
}
