import { HttpClient } from '@angular/common/http/src/client';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import { RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(
    private _http: Http
  ) { }

  getUsers(): Observable<User[]> {
    return this._http.get(this.baseUrl + 'users', this.jwt())
      .map(response => <User[]>response.json())
      .catch(this.handleError);
  }

  private jwt() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers: any = ({'Authorization': 'Bearer ' + token});
      headers.append('Content-Type', 'application/json');
      return headers;
    }
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
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
    return Observable.throw(modelStateErrors || 'Server error');
  }


}
