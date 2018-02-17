import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/map';

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
      });
  }

  httpRegister(model: any) {
    return this._http.post(this.baseUrl + 'register', model, this.RequestOptions());
  }

  private RequestOptions() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }

}
