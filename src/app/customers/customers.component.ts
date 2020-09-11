import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://localhost:52803/api/Customers",{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response=>{
      this.customers=response;
      console.log(this.customers)
    },err=>{
      console.log(err);
    })
  }

}
