import { NgModule } from '@angular/core';
import { FrontRoutingModule } from './front-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // HeaderfrontComponent
  ],
  imports: [
    BrowserModule,
    FrontRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})

export class FrontModule { }
