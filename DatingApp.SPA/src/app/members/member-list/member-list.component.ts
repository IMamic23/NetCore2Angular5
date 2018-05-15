import { Pagination, PaginatedResult } from './../../_models/pagination';
import { ActivatedRoute } from '@angular/router';
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
  pagination: Pagination;

  constructor(
    private _userService: UserService,
    private _alertify: AlertifyService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
  }

  loadUsers() {
    this._userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, err => {
        this._alertify.error(err);
      });
  }

  pageChanged(event): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
