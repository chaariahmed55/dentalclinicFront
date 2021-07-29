import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackRoutingModule } from './back-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PatientComponent } from '../patient/patient.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    PatientComponent
  ],
  imports: [
    CommonModule,
    BackRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ]
})
export class BackModule { }
