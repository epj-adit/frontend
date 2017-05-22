import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertisementInfoComponent } from './components/advertisement-info/advertisement-info.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { AdvertisementListComponent } from "./components/advertisement-list/advertisement-list.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserAdvertisementsComponent } from "./components/user-advertisements/user-advertisements.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { AccountComponent } from "./components/account/account.component";
import { SupervisorPanelComponent } from "./components/supervisor-panel/supervisor-panel.component";
import { ManageCategoriesComponent } from "./components/manage-categories/manage-categories.component";
import { LoginComponent } from "./components/login/login.component"

import { AuthenticationGuardService } from "./utils/authentication-guard.service";
import { NotAuthenticatedGuardService } from "./utils/not-authenticated-guard.service";
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";

const appRoutes: Routes = [
  {path: '', redirectTo: 'advertisements', pathMatch: 'full'},
  {path: 'advertisements', component: AdvertisementListComponent, canActivate: [ AuthenticationGuardService ]},
  {path: 'advertisementinfo/:id', component: AdvertisementInfoComponent, canActivate: [ AuthenticationGuardService ]},
  {path: 'advertisement/:id', component: AdvertisementComponent, canActivate: [ AuthenticationGuardService ]},
  {path: 'advertisement', component: AdvertisementComponent, canActivate: [ AuthenticationGuardService ]},
  {path: 'register', component: RegisterComponent, canActivate: [ NotAuthenticatedGuardService ]},
  {path: 'login', component: LoginComponent, canActivate: [ NotAuthenticatedGuardService ]},
  {path: 'account', component: AccountComponent, children: [
    {path:'', redirectTo: 'profile', pathMatch: 'full', canActivate: [ AuthenticationGuardService ]},
    {path: 'profile', component: UserProfileComponent, canActivate: [ AuthenticationGuardService ]},
    {path: 'advertisements', component: UserAdvertisementsComponent, canActivate: [ AuthenticationGuardService ]}
  ]},
  {path: 'supervisorpanel', component: SupervisorPanelComponent, children: [
    {path: '', redirectTo: 'manageAdvertisements', pathMatch: 'full', canActivate: [ AuthenticationGuardService ]},
    {path: 'manageAdvertisements', component: AdvertisementListComponent,
      canActivate: [ AuthenticationGuardService ]},
    {path: 'manageAdvertisements/:id', component: AdvertisementInfoComponent,
      canActivate: [ AuthenticationGuardService ]},
    {path: 'manageCategories', component: ManageCategoriesComponent, canActivate: [ AuthenticationGuardService ]}
  ]},
  {path: 'adminpanel', component: AdminPanelComponent, canActivate:[ AuthenticationGuardService ]},
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
