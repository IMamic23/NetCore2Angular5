import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http/src/base_request_options';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  values: any;

  constructor(
    private _http: Http
  ) { }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this._http.get('http://localhost:5000/api/values')
      .map(res => res.json())
      .subscribe(response => {
        console.log(response);
      this.values = response;
    });
  }

}
