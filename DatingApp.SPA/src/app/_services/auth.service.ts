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
  const headers = new Headers({'Content-Type': 'application/json'});
  const options = new RequestOptions({headers: headers});

  return this._http.post(this.baseUrl + 'login', model, options)
    .map((res: Response) => {
      const user = res.json();
      if (user)
        localStorage.setItem('token', user.tokenString);
    });
}

}
