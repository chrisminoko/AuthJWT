import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private jwtHelper:JwtHelperService,private router:Router) { }

  //In side the CanActivate method, it will check if the token is expired, 
  // jwthelper helps to identify the validatity of the token
  //if the token is not valid then it sends you back to the login page
  canActivate(){
    const token=localStorage.getItem("jwt");
    
    console.log(this.jwtHelper.decodeToken(token));

    if(token &&!this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(["login"])
    return false;
  }
}
