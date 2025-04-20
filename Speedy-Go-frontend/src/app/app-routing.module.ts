import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllTemplateFrontComponent } from './FrontOffices/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './BackOffices/all-template-back/all-template-back.component'; // Ajout de l'importation
import { LoginComponent } from './BackOffices/login/login.component';
import { LoginclientComponent } from './FrontOffices/login/login.component';
import { authGuard } from './FrontOffices/guards/auth.guard';
import { RegisterComponent } from './FrontOffices/register/register.component';
import { RegisterAdminComponent } from './BackOffices/register-admin/register-admin.component';
import { GestionUserComponent } from './BackOffices/gestion-user/gestion-user.component';
import { BodyBackComponent } from './BackOffices/body-back/body-back.component';
import { UpdateUserComponent } from './BackOffices/update-user/update-user.component';
import { AddUserComponent } from './BackOffices/add-user/add-user.component';
import { BackofficeAuthGuard } from './backoffice-auth.guard';
import { StoreListComponent } from './FrontOffices/modules/store/store/store.component';
import { DiscountOfferComponent } from './FrontOffices/modules/store/Component/discount/discount.component';
import { OffresComponent } from './FrontOffices/modules/store/offres/offres.component';
import { TripDetailComponent } from './FrontOffices/modules/trips/trip-detail/trip-detail.component';
import { TripFormComponent } from './FrontOffices/modules/trips/trip-form/trip-form.component';
import { TripListComponent } from './FrontOffices/modules/trips/trip-list/trip-list.component';
import { SpecificTripFormComponent } from './FrontOffices/modules/trips/specific-trip-form/specific-trip-form.component';
import { addstoreComponent } from './FrontOffices/modules/store/Component/add-store/add-store.component';
import { SpecificTripDetailComponent } from './FrontOffices/modules/trips/specific-trip-detail/specific-trip-detail.component';
import { AddOfferComponent } from './FrontOffices/modules/store/Component/add-offer/add-offer.component';
import { TunisiaRouteAnalyzerComponent } from './FrontOffices/modules/tunisia-route/tunisia-route-analyzer.component';
import { TrakingComponent } from './FrontOffices/modules/trips/traking/traking.component';

const routes: Routes = [
  {
    path: '',
    component: AllTemplateFrontComponent,
    canActivate: [authGuard]
  },
  {
    path: 'home',
    component: AllTemplateFrontComponent,
  },
   {
    path: 'storlist',
    component: StoreListComponent,
   },
   {
    path: 'offres/:id',
    component: OffresComponent,
   },
   {
    path: 'add-offer',
    component: AddOfferComponent,
   },
   {
    path: 'tripdetail/:id',
    component: TripDetailComponent,
   },
   {
    path: 'ajout_trip',
    component: TripFormComponent,
   },
   {
    path: 'trips',
    component: TripListComponent,
   },
   {
    path: 'spesific_trip',
    component: SpecificTripFormComponent,
   },
   {
    path: 'add-store',
    component: addstoreComponent,
   },
   {
    path: 'edit-store/:id',
    component: addstoreComponent,
   },
   {
    path: 'specific-trip-detail/:id',
    component: SpecificTripDetailComponent,
   },
   {
    path: 'tunisia-route',
    component: TunisiaRouteAnalyzerComponent,
   },
   {
    path: 'tracking',
    component: TrakingComponent,
   },
   {
    path: 'statistique',
    loadChildren: () => import('./FrontOffices/modules/statistique/statistique/statistique.module').then(m => m.StatistiqueModule)
   },
   {
    path: 'fidelite',
    loadChildren: () => import('./FrontOffices/modules/cartes-fidelite/cartes-fidelite.module').then(m => m.CartesFideliteModule)
   },
  
  
  {
    path: 'admin',
    component: AllTemplateBackComponent, children: [
      { path: 'users', component: GestionUserComponent, canActivate: [BackofficeAuthGuard] },
      { path: 'home',component:BodyBackComponent,canActivate: [BackofficeAuthGuard]} ,
      { path: 'update-user/:id', component: UpdateUserComponent,canActivate: [BackofficeAuthGuard] },
      { path: 'add-user', component: AddUserComponent ,canActivate: [BackofficeAuthGuard]}  // Route to AddUserComponent


  ] },
  {path: 'loginAdmin', component:LoginComponent,},
  {path: 'login', component:LoginclientComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'registerAdmin', component:RegisterAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
