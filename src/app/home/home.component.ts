import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route:Router, private jwtHelper:JwtHelperService) { }

  ngOnInit(): void {
  }

  IsAuthenticated(){
    const token :string   = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }else{
      return false;
    }
  }



  logout(){
    localStorage.removeItem("jwt");
  localStorage.removeItem("refreshToken");
  }

}
