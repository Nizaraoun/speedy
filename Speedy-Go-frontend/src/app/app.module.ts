import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateFrontComponent } from './FrontOffices/all-template-front/all-template-front.component';
import { FooterFrontComponent } from './FrontOffices/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffices/header-front/header-front.component';
import { BodyComponent } from './FrontOffices/body/body.component';
import { AllTemplateBackComponent } from './BackOffices/all-template-back/all-template-back.component';
import { FooterBackComponent } from './BackOffices/footer-back/footer-back.component';
import { NavbarBackComponent } from './BackOffices/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffices/sidebar-back/sidebar-back.component';
import { BodyBackComponent } from './BackOffices/body-back/body-back.component';
import { LoginComponent } from './BackOffices/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginclientComponent } from './FrontOffices/login/login.component';
import { RegisterComponent } from './FrontOffices/register/register.component';
import { RegisterAdminComponent } from './BackOffices/register-admin/register-admin.component';
import { GestionUserComponent } from './BackOffices/gestion-user/gestion-user.component';
import { UpdateUserComponent } from './BackOffices/update-user/update-user.component';
import { AddUserComponent } from './BackOffices/add-user/add-user.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { StoreFilterComponent } from './FrontOffices/modules/store/Component/store-filter/store-filter.component';
import { StoreListComponent } from "./FrontOffices/modules/store/store/store.component";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { OffresComponent } from './FrontOffices/modules/store/offres/offres.component';
import {  DiscountOfferComponent } from './FrontOffices/modules/store/Component/discount/discount.component';
import { HttpErrorInterceptor } from 'src/app/FrontOffices/services/interceptors/http-error.interceptor';
import { TripFormComponent } from './FrontOffices/modules/trips/trip-form/trip-form.component';
import { TripListComponent } from './FrontOffices/modules/trips/trip-list/trip-list.component';
import { TripDetailComponent } from './FrontOffices/modules/trips/trip-detail/trip-detail.component';
import { SpecificTripFormComponent } from './FrontOffices/modules/trips/specific-trip-form/specific-trip-form.component';
import { TripEditDialogComponent } from './FrontOffices/modules/trips/trip-edit-dialog/trip-edit-dialog.component';
import { addstoreComponent } from './FrontOffices/modules/store/Component/add-store/add-store.component';
import { SpecificTripDetailComponent } from './FrontOffices/modules/trips/specific-trip-detail/specific-trip-detail.component';
import { AddOfferComponent } from './FrontOffices/modules/store/Component/add-offer/add-offer.component';


@NgModule({
  declarations: [
    AppComponent,
    AllTemplateFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    BodyComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    BodyBackComponent,
    LoginComponent,
    LoginclientComponent,
    RegisterComponent,
    RegisterAdminComponent,
    GestionUserComponent,
    UpdateUserComponent,
    AddUserComponent,
    StoreListComponent,
    OffresComponent,
DiscountOfferComponent,
TripFormComponent,
TripListComponent,
TripDetailComponent,
SpecificTripFormComponent    ,
TripEditDialogComponent,
addstoreComponent,
SpecificTripDetailComponent,
AddOfferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,CommonModule, RouterModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule, MatDialogModule
],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
