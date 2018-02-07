import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this._authService.httpLogin(this.model).subscribe(
      data => {
        console.log('Logged in');
      }, err => {
        console.log('Cant login');
        throw err;
      }
    );
  }

  logout() {
    this._authService.userToken = null;
    localStorage.removeItem('token');
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

}
