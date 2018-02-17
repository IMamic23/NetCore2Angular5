import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;

  constructor(
    private _http: Http
  ) { }

  ngOnInit() {

  }

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode = (regModeBool: boolean) => {
    this.registerMode = regModeBool;
  }

}
