import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
  }

  register() {
    this._authService.httpRegister(this.model).subscribe(() => {
      console.log('Registration successful');
    }, err => {
      console.log(err);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
