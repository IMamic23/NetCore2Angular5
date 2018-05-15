import { Observable } from 'rxjs/Observable';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import 'rxjs/add/operator/catch';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  pageSize = 10;
  pageNumber = 1;

  /**
   *
   */
  constructor(
    private _userService: UserService,
    private _ruter: Router,
    private _alertify: AlertifyService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this._userService.getUsers(this.pageNumber, this.pageSize)
      .catch(err => {
        this._alertify.error('Problem retrieving data');
        this._ruter.navigate(['/members']);
        return Observable.from([null]);
      });
  }
}
