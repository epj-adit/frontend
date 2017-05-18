import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpModule } from "@angular/http";
import { Angular2FontawesomeModule } from "angular2-fontawesome";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FakeTranslationLoader } from "../_mocks/fake-translation-loader";
import { RegisterComponent } from "../../../src/app/components/register/register.component";
import { UserService } from "../../../src/app/services/user.service";
import { UserServiceStub } from "../_mocks/user-service-stub";
import { User } from "../../../src/app/data/user";
import { Router, Routes } from "@angular/router";
import { RouterStub } from "../_mocks/router-stub";
import { LoginComponent } from "../../../src/app/components/login/login.component";
import { AuthenticationServiceStub } from "../_mocks/authentication-service-stub";
import { AuthenticationService } from "../../../src/app/utils/authentication.service";
import { Credential } from "../../../src/app/data/credential";
import { RouterTestingModule } from "@angular/router/testing";


describe('LoginComponent', () => {
    const appRoutes: Routes = [
        {path: '', redirectTo: 'advertisements', pathMatch: 'full'}
    ];
    let comp: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authenticationService: AuthenticationService;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [
                {provide: AuthenticationService, useClass: AuthenticationServiceStub}
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
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.componentInstance;
        authenticationService = TestBed.get(AuthenticationService);
    });

    function updateForm(email, password) {
        comp.form.controls['email'].setValue(email);
        comp.form.controls['plaintextPassword'].setValue(password);
    }

    it('should mark form and fields as invalid when input invalid', () => {
        updateForm('a', 'a');
        expect(comp.form.valid).toBe(false);
        expect(comp.form.controls['email'].valid).toBe(false);
        expect(comp.form.controls['plaintextPassword'].valid).toBe(false);
    });

    it('should mark form as valid when input is valid', () => {
        updateForm('amuster', '123muster');
        expect(comp.form.valid).toBe(true);
        expect(comp.form.controls['email'].valid).toBe(true);
        expect(comp.form.controls['plaintextPassword'].valid).toBe(true);
    });

    it('should submit changes', () => {
        spyOn(authenticationService, 'login').and.callThrough();
        comp.onSubmit(comp.form.value);
        let credentials = {
            email: comp.form.controls['email'].value+"@hsr.ch",
            plaintextPassword: comp.form.controls['plaintextPassword'].value
        };
        expect(authenticationService.login).toHaveBeenCalledWith(credentials);
    });

    it('should display the email-help-text, when clicking on help', () => {
        de = fixture.debugElement.query(By.css('.help'));
        el = de.nativeElement;
        spyOn(comp, 'displayHelp').and.callThrough();
        expect(comp.emailHelpDisplay).toEqual('none');
        el.click();
        expect(comp.displayHelp).toHaveBeenCalled();
        expect(comp.emailHelpDisplay).toEqual('inline-block')
    });

    it('should hide email-help-text, when clicking twice on help', () => {
        de = fixture.debugElement.query(By.css('.help'));
        el = de.nativeElement;
        expect(comp.emailHelpDisplay).toEqual('none');
        el.click();
        el.click();
        expect(comp.emailHelpDisplay).toEqual('none');
    });
});

