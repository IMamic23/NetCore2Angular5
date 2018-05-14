import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private _authService: AuthService,
    private _alertify: AlertifyService,
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('conformPassword').value ? null : {'mismatch': true};
  }

  createRegisterForm() {
    this.registerForm = this._fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)]
      ],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      this._authService.httpRegister(this.user).subscribe(() => {
        this._alertify.success('Registration successful');
      }, err => {
        this._alertify.error(err);
      },
      () => {
        this._authService.httpLogin(this.user).subscribe(() => {
          this._router.navigate(['/members']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
