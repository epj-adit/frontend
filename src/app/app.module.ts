import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { routing, appRoutingProviders }  from './app.routing';
import { AdvertisementService } from './_services/advertisement.service';
import { TagService } from "./_services/tag.service";
import { CategoryService } from "./_services/category.service";
import { UserService } from "./_services/user.service";
import { AuthenticationService } from "./utils/authentication.service";
import { AuthenticationGuardService } from "./utils/authentication-guard.service";
import { ApiCallService } from "./utils/api-call.service";

import { AppComponent } from './app.component';
import { AdvertisementSearchComponent } from './search/advertisement-search.component';
import { AdvertisementListComponent } from './advertisementlist/advertisementlist.component';
import { AdvertisementInfoComponent } from './advertisementinfo/advertisement-info.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { RegisterComponent } from "./register/register.component";
import { UserAdvertisementsComponent } from "./useradvertisements/user-advertisements.component";
import { SupervisorPanelComponent } from "./supervisorpanel/supervisorpanel.component";
import { ManageAdvertisementComponent } from "./manageAdvertisements/manageAdvertisement.component";
import { ManageCategoriesComponent } from "./manageCategories/manageCategories.component";
import { LoginComponent } from "./components/login/login.component";

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    Angular2FontawesomeModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
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
    RegisterComponent,
    UserAdvertisementsComponent,
    SupervisorPanelComponent,
    ManageAdvertisementComponent,
    ManageCategoriesComponent,
    LoginComponent
  ],
  providers: [appRoutingProviders, AdvertisementService, TagService, CategoryService, UserService, AuthenticationService, AuthenticationGuardService, ApiCallService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
