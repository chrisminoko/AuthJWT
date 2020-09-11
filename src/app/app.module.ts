import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http'; 
import {JwtModule} from '@auth0/angular-jwt';
import { AuthGaurdService } from './guards/auth-gaurd.service';

export function tokkenGetter(){
  return localStorage.getItem("jwt");
}
@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path:'login',component:LoginComponent},
      {path:'customers',component:CustomersComponent,canActivate:[AuthGaurdService]}
    ]),
    JwtModule.forRoot({
      config:{
        tokenGetter:tokkenGetter,
        whitelistedDomains:["localhost:52802"],
        blacklistedRoutes:[]
      }
    })
  ],
  providers: [AuthGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
