import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import { RequestOptions, Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { PaginatedResult } from '../_models/pagination';


@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient
  ) { }

  getUsers(page?: number, itemsPerPage?: number) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let queryString = '?';

    if (page !== null && itemsPerPage !== null)
      queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage;

    return this._http.get(this.baseUrl + 'users' + queryString)
      .map((response: Response) =>  {
        paginatedResult.result = response.json();

        if (response.headers.get('Pagination') !== null)
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));

        return paginatedResult;
      }).catch(this.handleError);
  }

  getUser(id: number): Observable<User> {
    return this._http.get(this.baseUrl + 'users/' + id)
      .map(res => {
        return res;
      }).catch(this.handleError);
  }

  updateUser(id: number, user: User) {
    return this._http.put(this.baseUrl + '/users/' + id, user)
      .catch(this.handleError);
  }

  setMainPhoto(userId: number, id: number) {
    return this._http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {})
      .catch(this.handleError);
  }

  deletePhoto(userId: number, id: number) {
    return this._http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id)
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
