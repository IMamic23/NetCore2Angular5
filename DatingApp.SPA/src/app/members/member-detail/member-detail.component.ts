import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;

  constructor(
    private _userService: UserService,
    private _alertify: AlertifyService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this._userService.getUser(+this._route.snapshot.params['id'])
      .subscribe((res: User) => {
        this.user = res;
      }, err => {
        this._alertify.error(err);
      });
  }

}
