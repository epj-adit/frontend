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
import { AdvertisementService } from './services/advertisement.service';
import { TagService } from "./services/tag.service";
import { CategoryService } from "./services/category.service";
import { UserService } from "./services/user.service";
import { AuthenticationService } from "./utils/authentication.service";
import { AuthenticationGuardService } from "./utils/authentication-guard.service";
import { NotAuthenticatedGuardService } from "./utils/not-authenticated-guard.service";

import { ApiCallService } from "./utils/api-call.service";

import { AppComponent } from './app.component';
import { AdvertisementSearchComponent } from './components/search/advertisement-search.component';
import { AdvertisementListComponent } from './components/advertisementlist/advertisementlist.component';
import { AdvertisementInfoComponent } from './components/advertisementinfo/advertisement-info.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { RegisterComponent } from "./components/register/register.component";
import { UserAdvertisementsComponent } from "./components/useradvertisements/user-advertisements.component";
import { UserProfileComponent } from "./components/userprofile/userprofile.component";
import { AccountComponent } from "./components/account/account.component";
import { SupervisorPanelComponent } from "./components/supervisorpanel/supervisorpanel.component";
import { ManageCategoriesComponent } from "./components/manageCategories/manageCategories.component";
import { LoginComponent } from "./components/login/login.component";
import { AditCurrencyPipe } from "./utils/adit-currency.pipe";


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
    UserProfileComponent,
    UserAdvertisementsComponent,
    AccountComponent,
    SupervisorPanelComponent,
    ManageCategoriesComponent,
    LoginComponent,
    AditCurrencyPipe
  ],
  providers: [appRoutingProviders, AdvertisementService, TagService, CategoryService, UserService, AuthenticationService, AuthenticationGuardService, NotAuthenticatedGuardService, ApiCallService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
