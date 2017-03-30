import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ArticleComponent } from './article/article.component';

import { AdvertisementSearchComponent } from './search/advertisement-search.component';
import { AdvertisementComponent } from './advertisements/advertisements.component';
import { AdvertisementInfoComponent } from './advertisementinfo/advertisement-info.component'

const appRoutes: Routes = [
  {path: '', redirectTo: 'advertisements', pathMatch: 'full'},
  {path: 'search', component: AdvertisementSearchComponent},
  {path: 'advertisements', component: AdvertisementComponent},
  {path: 'advertisement/:id', component: AdvertisementInfoComponent},
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
