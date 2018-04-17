import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private _aleftify: AlertifyService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.httpLogin(this.model).subscribe(
      data => {
          this._aleftify.success('Logged in successfully');
        }, err => {
          this._aleftify.error('Failed to login');
        throw err;
      }, () => {
        this._router.navigate(['/members']);
      }
    );
  }

  logout() {
    this.authService.userToken = null;
    this._aleftify.message('Logged out');
    localStorage.removeItem('token');
    this._router.navigate(['/home']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
