import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;

  constructor(
    private _http: Http
    ) { }

  httpLogin(model: any) {
    return this._http.post(this.baseUrl + 'login', model, this.RequestOptions())
      .map((res: Response) => {
        const user = res.json();
        if (user)
          localStorage.setItem('token', user.tokenString);
      }).catch(this.handleError);
  }

  httpRegister(model: any) {
    return this._http
    .post(this.baseUrl + 'register', model, this.RequestOptions())
    .catch(this.handleError);
  }

  private RequestOptions() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
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
