import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private _aleftify: AlertifyService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.httpLogin(this.model).subscribe(
      data => {
          this._aleftify.success('Logged in successfully');
        }, err => {
          this._aleftify.error(err);
        throw err;
      }
    );
  }

  logout() {
    this.authService.userToken = null;
    this._aleftify.message('Logged out');
    localStorage.removeItem('token');
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
