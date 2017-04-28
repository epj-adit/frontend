import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertisementSearchComponent } from './search/advertisement-search.component';
import { AdvertisementInfoComponent } from './advertisementinfo/advertisement-info.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { AdvertisementListComponent } from "./advertisementlist/advertisementlist.component";
import { RegisterComponent } from "./register/register.component";
import { UserAdvertisementsComponent } from "./useradvertisements/user-advertisements.component";
import { UserProfilComponent } from "./userprofil/userprofil.component";
import { AccountComponent } from "./account/account.component";
import { SupervisorPanelComponent } from "./supervisorpanel/supervisorpanel.component";
import { ManageAdvertisementComponent } from "./manageAdvertisements/manageAdvertisement.component";
import { ManageCategoriesComponent } from "./manageCategories/manageCategories.component";


const appRoutes: Routes = [
  {path: '', redirectTo: 'advertisements', pathMatch: 'full'},
  //{path: 'search', component: AdvertisementSearchComponent},
  {path: 'advertisements', component: AdvertisementListComponent},
  {path: 'advertisementinfo/:id', component: AdvertisementInfoComponent},
  {path: 'advertisement/:id', component: AdvertisementComponent},
  {path: 'advertisement', component: AdvertisementComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'account', component: AccountComponent, children: [
    {path:'', redirectTo: 'profile', pathMatch: 'full'},
    {path: 'profile', component: UserProfilComponent},
    {path: 'advertisements', component: UserAdvertisementsComponent}
  ]},
  {path: 'supervisorpanel', component: SupervisorPanelComponent, children: [
    {path: '', redirectTo: 'manageAdvertisements', pathMatch: 'full'},
    {path: 'manageAdvertisements', component: ManageAdvertisementComponent},
    {path: 'manageCategories', component: ManageCategoriesComponent}
  ]}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
