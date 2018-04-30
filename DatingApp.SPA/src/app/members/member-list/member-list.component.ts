import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(
    private _userService: UserService,
    private _alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this._userService.getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
      }, error => {
        this._alertify.error(error);
      });
  }

}
