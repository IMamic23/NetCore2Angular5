import { Observable } from 'rxjs/Observable';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import 'rxjs/add/operator/catch';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

  /**
   *
   */
  constructor(
    private _userService: UserService,
    private _ruter: Router,
    private _alertify: AlertifyService,
    private _authService: AuthService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this._userService.getUser(this._authService.decodedToken.nameid)
      .catch(err => {
        this._alertify.error('Problem retriveing data');
        this._ruter.navigate(['/members']);
        return Observable.from([null]);
      });
  }
}
