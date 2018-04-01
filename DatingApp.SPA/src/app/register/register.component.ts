import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private _authService: AuthService,
    private _alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  register() {
    this._authService.httpRegister(this.model).subscribe(() => {
      this._alertify.success('Registration successful');
    }, err => {
      this._alertify.error(err);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
