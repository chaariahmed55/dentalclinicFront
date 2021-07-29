import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PatientComponent } from '../patient/patient.component';
import { BackComponent } from './back.component';
import {ArticleComponent} from '../article/article.component';
import {AddArticleComponent} from '../article/add-article/add-article.component';
import {DetailsArticleComponent} from '../article/details-article/details-article.component';
import {UpdateArticleComponent} from '../article/update-article/update-article.component';

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
        path: 'article', // child route path
        component: ArticleComponent, // child route component that the router renders

      },
      {
        path: 'dashboard', // child route path
        component: DashboardComponent, // child route component that the router renders
      },
      {
        path: 'article/detailsArticle/:id', // child route path
        component: DetailsArticleComponent, // child route component that the router renders
      },
      {
        path: 'article/updateArticle/:id', // child route path
        component: UpdateArticleComponent, // child route component that the router renders
      },
    ],
  },
];







@NgModule({
  imports: [RouterModule.forChild(routes),

  ],
  exports: [RouterModule]
})
export class BackRoutingModule { }
