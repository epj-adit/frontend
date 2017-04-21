import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertisementSearchComponent } from './search/advertisement-search.component';
import { AdvertisementInfoComponent } from './advertisementinfo/advertisement-info.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { AdvertisementListComponent } from "./advertisementlist/advertisementlist.component";
import { RegisterComponent } from "./register/register.component";
import { UserAdvertisementsComponent } from "./useradvertisements/user-advertisements.component";


const appRoutes: Routes = [
  {path: '', redirectTo: 'advertisements', pathMatch: 'full'},
  {path: 'search', component: AdvertisementSearchComponent},
  {path: 'advertisements', component: AdvertisementListComponent},
  {path: 'advertisementinfo/:id', component: AdvertisementInfoComponent},
  {path: 'advertisement/:id', component: AdvertisementComponent},
  {path: 'advertisement', component: AdvertisementComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user/:id/advertisements', component: UserAdvertisementsComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
