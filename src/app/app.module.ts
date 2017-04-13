import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { routing, appRoutingProviders }  from './app.routing';

import { AdvertisementService } from './_services/advertisement.service';
import { TagService } from "./_services/tag.service";
import { CategoryService } from "./_services/category.service";

import { NoTagsValidatorDirective } from "./_directives/no-tags.directive";

import { AppComponent } from './app.component';
import { AdvertisementSearchComponent } from './search/advertisement-search.component';
import { AdvertisementListComponent } from './advertisementlist/advertisementlist.component';
import { AdvertisementInfoComponent } from './advertisementinfo/advertisement-info.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { UserAdvertisementsComponent } from "./useradvertisements/user-advertisements.component";


export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    Angular2FontawesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    routing
  ],
  declarations: [
    AppComponent,
    AdvertisementSearchComponent,
    AdvertisementComponent,
    AdvertisementListComponent,
    AdvertisementInfoComponent,
    UserAdvertisementsComponent,
    NoTagsValidatorDirective
  ],
  exports: [NoTagsValidatorDirective],
  providers: [appRoutingProviders, AdvertisementService, TagService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
