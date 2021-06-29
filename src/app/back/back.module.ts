import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackRoutingModule } from './back-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PatientComponent } from '../patient/patient.component';


@NgModule({
  declarations: [
    PatientComponent
  ],
  imports: [
    CommonModule,
    BackRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class BackModule { }
