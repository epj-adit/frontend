import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { ArticleComponent } from './article/article.component';


const appRoutes: Routes = [
  //  { path: 'articles/:id', component: ArticleComponent },
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
