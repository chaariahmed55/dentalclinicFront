import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FrontComponent } from './front/front.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FrontModule } from './front/front.module';
import { BackComponent } from './back/back.component';
import { HeaderfrontComponent } from './headerfront/headerfront.component';
import { FooterComponent } from './footer/footer.component';
import { Section6Component } from './section6/section6.component';
import { Section5Component } from './section5/section5.component';
import { Section4Component } from './section4/section4.component';
import { Section3Component } from './section3/section3.component';
import { Section2Component } from './section2/section2.component';
import { HeaderbackComponent } from './headerback/headerback.component';
import { MenuComponent } from './menu/menu.component';
import { FooterbackComponent } from './footerback/footerback.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Section1Component } from './section1/section1.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { BackModule } from './back/back.module';
import { ArticleComponent } from './article/article.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { DetailsArticleComponent } from './article/details-article/details-article.component';
import { UpdateArticleComponent } from './article/update-article/update-article.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {TimeagoModule, TimeagoPipe} from 'ngx-timeago';
import { UpdateCommentComponent } from './article/update-comment/update-comment.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    FrontComponent,
    BackComponent,
    LoginComponent,
    AppComponent,
    LoginComponent,
    Section2Component,
    Section3Component,
    Section4Component,
    Section5Component,
    Section6Component,
    FooterComponent,
    HeaderfrontComponent,
    HeaderbackComponent,
    MenuComponent,
    FooterbackComponent,
    DashboardComponent,
    Section1Component,
    ArticleComponent,
    AddArticleComponent,
    DetailsArticleComponent,
    UpdateArticleComponent,
    UpdateCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FrontModule,
    BackModule,
    LoginModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MDBBootstrapModule.forRoot(),
    NgxPaginationModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatChipsModule,
    MatDividerModule,
    MatSnackBarModule,
    Ng2SearchPipeModule,
    TimeagoModule.forRoot(),
  ],
  providers: [ NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
