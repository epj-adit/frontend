import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routing, appRoutingProviders }  from './app.routing';
import { InMemoryAdvertisementService } from './mock-data/in-memory-advertisement.service';
import { AdvertisementService } from './_services/advertisement.service';

import { AppComponent } from './app.component';
import { AdvertisementSearchComponent } from './search/advertisement-search.component';
import { AdvertisementComponent } from './advertisements/advertisements.component';
import { AdvertisementInfoComponent } from './advertisementinfo/advertisement-info.component';


export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    InMemoryWebApiModule.forRoot(InMemoryAdvertisementService, {passThruUnknownUrl: true}),
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
    AdvertisementInfoComponent
  ],
  providers: [appRoutingProviders, AdvertisementService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
