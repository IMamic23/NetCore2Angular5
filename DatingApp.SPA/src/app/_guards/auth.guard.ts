import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _alertify: AlertifyService
  ) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.loggedIn()) {
      return true;
    }
    this._alertify.error('You need to be logged in to access this area');
    this._router.navigate(['/home']);
    return false;
  }
}
