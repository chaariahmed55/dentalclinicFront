import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    BrowserModule,
    HttpClientModule
  ]
})
export class LoginModule { }
