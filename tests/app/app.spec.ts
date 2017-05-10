import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Router, Routes } from "@angular/router";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpModule } from "@angular/http";
import { Angular2FontawesomeModule } from "angular2-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "../../src/app/app.component";
import { AuthenticationServiceStub } from "./_mocks/authentication-service-stub";
import { AuthenticationService } from "../../src/app/utils/authentication.service";
import { RouterStub } from "./_mocks/router-stub";
import { FakeTranslationLoader } from "./_mocks/fake-translation-loader";


describe('AppComponent', () => {
    const appRoutes: Routes = [
        {path: '', redirectTo: 'advertisements', pathMatch: 'full'}
    ];
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let translate: TranslateService;
    let authenticationService: AuthenticationService;
    let router: Router;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
                {provide: AuthenticationService, useClass: AuthenticationServiceStub},
                {provide: Router, useClass: RouterStub}
            ],
            imports: [
                HttpModule,
                FormsModule,
                ReactiveFormsModule,
                Angular2FontawesomeModule,
                TranslateModule.forRoot({
                    loader: {provide: TranslateLoader, useClass: FakeTranslationLoader}
                }),
                RouterTestingModule.withRoutes(appRoutes)
            ],
            // don't load subcomponents (i.e. AdvertisementSearchComponent)
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
        translate = TestBed.get(TranslateService);
        authenticationService = TestBed.get(AuthenticationService);
        router = TestBed.get(Router);
    });


    it('should set default language to DE', () => {
        expect(translate.defaultLang).toEqual('de');
    });

    it('should set current language to DE', () => {
        expect(translate.currentLang).toEqual('de');
    });

    it('should have two languages', () => {
       expect(translate.getLangs()).toEqual(['de', 'en']);
    });

    it('should change current languages', () => {
        let langString = 'test';
        comp.changeLang(langString);
        expect(translate.defaultLang).toEqual('de');
        expect(translate.currentLang).toEqual(langString);
    });

    it('should get authentication status from service', () => {
        spyOn(authenticationService, 'authenticationActive').and.callThrough();
        comp.isAuthenticated();
        expect(authenticationService.authenticationActive).toHaveBeenCalled();
    });

    it('should logout the user and reroute to login', () => {
       spyOn(authenticationService, 'logout').and.callThrough();
       spyOn(router, 'navigate').and.callThrough();
       comp.logout();
       expect(authenticationService.logout).toHaveBeenCalled();
       expect(router.navigate).toHaveBeenCalledWith(["login"]);
    });
});
