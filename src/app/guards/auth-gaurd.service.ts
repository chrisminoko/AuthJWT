import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private jwtHelper:JwtHelperService,private router:Router ,private http:HttpClient) { }

  //In side the CanActivate method, it will check if the token is expired, 
  // jwthelper helps to identify the validatity of the token
  //if the token is not valid then it sends you back to the login page
  async canActivate() {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token));
      return true;
    }

    const isRefreshSuccess = await this.tryRefreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigate(["login"]);
    }

    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string = localStorage.getItem("refreshToken");
    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

    let isRefreshSuccess: boolean;
    try {
      const response = await this.http.post("http://localhost:52803/api/Token/refresh", credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        observe: 'response'
      }).toPromise();
      // If token refresh is successful, set new tokens in local storage.
      const newToken = (<any>response).body.accessToken;
      const newRefreshToken = (<any>response).body.refreshToken;
      localStorage.setItem("jwt", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      isRefreshSuccess = true;
    }
    catch (ex) {      
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
}
