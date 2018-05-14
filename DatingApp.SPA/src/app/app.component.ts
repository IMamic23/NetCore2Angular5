import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { User } from './_models/User';

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
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this._authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this._authService.currentUser = user;
      if (this._authService.currentUser.photoUrl !== null)
        this._authService.changeMemberPhoto(user.photoUrl);
      else
        this._authService.changeMemberPhoto('../assets/user.png');
    }
  }
}
