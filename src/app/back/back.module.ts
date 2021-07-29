import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackRoutingModule } from './back-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PatientComponent } from '../patient/patient.component';
import { DocteurComponent } from '../docteur/docteur.component';
import { SecretaireComponent } from '../secretaire/secretaire.component';


@NgModule({
  declarations: [
    PatientComponent,
    DocteurComponent,
    SecretaireComponent
  ],
  imports: [
    CommonModule,
    BackRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class BackModule { }
