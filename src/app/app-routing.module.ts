import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BackComponent } from './back/back.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'back' ,component:BackComponent},
  { path: 'login' ,component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule,BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule {




}
