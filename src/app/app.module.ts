import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, JsonpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';

import {routing, appRoutingProviders}  from './app.routing';
import {InMemoryAdvertisementService} from './mock-data/in-memory-advertisement.service';
import {AdvertisementService} from './advertisements/advertisement.service';

import {AppComponent} from './app.component';
import {AdvertisementSearchComponent} from './search/advertisement-search.component';
import {AdvertisementComponent} from './advertisements/advertisements.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        InMemoryWebApiModule.forRoot(InMemoryAdvertisementService),
        routing
    ],
    declarations: [
        AppComponent,
        AdvertisementSearchComponent,
        AdvertisementComponent
    ],
    providers: [appRoutingProviders, AdvertisementService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
