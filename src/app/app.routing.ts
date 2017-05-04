import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertisementSearchComponent } from './search/advertisement-search.component';
import { AdvertisementInfoComponent } from './components/advertisementinfo/advertisement-info.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { AdvertisementListComponent } from "./components/advertisementlist/advertisementlist.component";
import { RegisterComponent } from "./register/register.component";
import { UserAdvertisementsComponent } from "./useradvertisements/user-advertisements.component";
import { UserProfileComponent } from "./components/userprofile/userprofile.component";
import { AccountComponent } from "./components/account/account.component";
import { SupervisorPanelComponent } from "./supervisorpanel/supervisorpanel.component";
import { ManageCategoriesComponent } from "./manageCategories/manageCategories.component";
import { LoginComponent } from "./components/login/login.component"

import { AuthenticationGuardService } from "./utils/authentication-guard.service";
import { NotAuthenticatedGuardService } from "./utils/not-authenticated-guard.service";

const appRoutes: Routes = [
  {path: '', redirectTo: 'advertisements', pathMatch: 'full'},
  //{path: 'search', component: AdvertisementSearchComponent},
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
  ]}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
