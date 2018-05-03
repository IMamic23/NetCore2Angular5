import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private _route: ActivatedRoute,
    private _alertify: AlertifyService,
    private _userService: UserService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this._userService.updateUser(this._authService.decodedToken.nameid, this.user)
      .subscribe(res => {
        this._alertify.success('Profile updated successfully');
        this.editForm.resetForm(this.user);
      }, err => {
        this._alertify.error(err);
      });
  }

}
