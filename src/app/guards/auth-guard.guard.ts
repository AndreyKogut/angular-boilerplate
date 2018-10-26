import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';

import { AuthenticationService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authenticationService: AuthenticationService) {}

  canActivate() {
    return this.authenticationService.isAuthenticated();
  }

  canActivateChild() {
    return this.canActivate();
  }

  canLoad() {
    return this.canActivate();
  }
}
