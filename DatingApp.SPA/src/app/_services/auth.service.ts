import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelperService  = new JwtHelperService ();

  constructor(
    private _http: HttpClient
    ) { }

  httpLogin(model: any) {
    return this._http.post(this.baseUrl + 'login', model)
      .map((res: Response) => {
        const user = res.json();
        if (user && user.tokenString)
          localStorage.setItem('token', user.tokenString);
          this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
          this.userToken = user.tokenString;
      }).catch(this.handleError);
  }

  httpRegister(model: any) {
    return this._http
    .post(this.baseUrl + 'register', model)
    .catch(this.handleError);
  }

  loggedIn() {
    if (this.userToken)
      return !this.jwtHelper.isTokenExpired(this.userToken);
    else
      return false;
  }

  private handleError(error: any) {
    const applicationError = error.Headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStateErrors || 'Server error'
    );
  }

}
