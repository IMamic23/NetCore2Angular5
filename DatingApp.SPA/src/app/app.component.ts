import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dating app';
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private _authService: AuthService
    ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this._authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
