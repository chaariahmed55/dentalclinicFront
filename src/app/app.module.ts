import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FrontComponent } from './front/front.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListAddEditEquipementComponent } from './stock/list-add-edit-equipement/list-add-edit-equipement.component';
import { ListBoncommandeComponent } from './stock/list-boncommande/list-boncommande.component';
import { AddEditBoncommandeComponent } from './stock/add-edit-boncommande/add-edit-boncommande.component';

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
    ListAddEditEquipementComponent,
    ListBoncommandeComponent,
    AddEditBoncommandeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FrontModule,
    BackModule,
    LoginModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
