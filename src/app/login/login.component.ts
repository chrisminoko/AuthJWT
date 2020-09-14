import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private http:HttpClient) { }
  invalidLogin:boolean;
  ngOnInit(): void {
  }

  Login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.http.post("http://localhost:52803/api/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      const refreshToken=(<any>response).refreshToken;

      localStorage.setItem("jwt", token);
      localStorage.setItem("refreshToken",refreshToken);
      
      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }

}
