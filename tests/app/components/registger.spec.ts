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
import { Router } from "@angular/router";
import { RouterStub } from "../_mocks/router-stub";


describe('RegisterComponent', () => {
    let comp: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let userService;
    let de: DebugElement;
    let el: HTMLElement;

    const createComponent = () => {
        const fixture = TestBed.createComponent(RegisterComponent);

        comp = fixture.componentInstance;
        fixture.detectChanges();
    };

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterComponent],
            providers: [
                {provide: UserService, useClass: UserServiceStub},
                {provide: Router, useClass: RouterStub}
            ],
            imports: [
                HttpModule,
                FormsModule,
                ReactiveFormsModule,
                Angular2FontawesomeModule,
                TranslateModule.forRoot({
                    loader: {provide: TranslateLoader, useClass: FakeTranslationLoader}
                })
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(RegisterComponent);
            comp = fixture.componentInstance;
            userService = TestBed.get(UserService);
        });
    }));

    function updateForm(username, email, password) {
        comp.form.controls['username'].setValue(username);
        comp.form.controls['email'].setValue(email);
        comp.form.controls['password'].setValue(password);
    }
    it('should mark form and fields as invalid when input invalid', () => {
        updateForm('a', 'a', 'a');
        expect(comp.form.valid).toBe(false);
        expect(comp.form.controls['email'].valid).toBe(false);
        expect(comp.form.controls['username'].valid).toBe(false);
        expect(comp.form.controls['password'].valid).toBe(false);
    });

    it('should mark form as valid when input is valid', () => {
        updateForm('amuster', 'amuster', '123muster');
        expect(comp.form.valid).toBe(true);
        expect(comp.form.controls['email'].valid).toBe(true);
        expect(comp.form.controls['username'].valid).toBe(true);
        expect(comp.form.controls['password'].valid).toBe(true);
    });

    it('should submit changes', () => {
        spyOn(userService, 'register').and.callThrough();
        comp.onSubmit(comp.form.value);
        let newUser = new User(comp.form.value.username, comp.form.value.email + "@hsr.ch", comp.form.value.password);
        expect(userService.register).toHaveBeenCalledWith(newUser);
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

