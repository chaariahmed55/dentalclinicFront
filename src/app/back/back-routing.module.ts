import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DocteurComponent } from '../docteur/docteur.component';
import { FicheComponent } from '../fiche/fiche.component';
import { PatientComponent } from '../patient/patient.component';
import { SecretaireComponent } from '../secretaire/secretaire.component';
// import { PatientComponent } from '../patient/patient.component';
import { BackComponent } from './back.component';

// const routes: Routes = [
//   { path: 'back', component: BackComponent },
  
// ];

const routes: Routes = [
  {
    path: 'back',
    component: BackComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'patient', // child route path
        component: PatientComponent, // child route component that the router renders
        
      },
      {
        path: 'dashboard', // child route path
        component: DashboardComponent, // child route component that the router renders
      },
      {
        path: 'docteur', // child route path
        component: DocteurComponent, // child route component that the router renders
      },
      {
        path: 'secretaire', // child route path
        component: SecretaireComponent, // child route component that the router renders
      },
      {
        path: 'patient/fiche/:patientid', // child route path
        component: FicheComponent, // child route component that the router renders
      }



    ],
  },
];







@NgModule({
  imports: [RouterModule.forChild(routes),
    
  ],
  exports: [RouterModule]
})
export class BackRoutingModule { }
