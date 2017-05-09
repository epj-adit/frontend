import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Router } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpModule } from "@angular/http";
import { Angular2FontawesomeModule } from "angular2-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FakeTranslationLoader } from "../_mocks/fake-translation-loader";
import { RouterStub } from "../_mocks/router-stub";
import { UserServiceStub } from "../_mocks/user-service-stub";
import { UserService } from "../../../src/app/services/user.service";
import { AuthenticationService } from "../../../src/app/utils/authentication.service";
import { AuthenticationServiceStub } from "../_mocks/authentication-service-stub";
import { UserProfileComponent } from "../../../src/app/components/user-profile/user-profile.component";
import { getUsersMocks } from "../data/mock-users";
import { User } from "../../../src/app/data/user";


describe('UserProfileComponent', () => {
  let comp: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let userService : UserServiceStub;
  let user: User;
  let authenticationService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [
        {provide: UserService, useClass: UserServiceStub},
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
        })
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(UserProfileComponent);
      comp = fixture.componentInstance;
      userService = TestBed.get(UserService);
      authenticationService = TestBed.get(AuthenticationService);
      user = getUsersMocks()[0];
    });
  }));

  beforeEach(async(() => {
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => fixture.detectChanges());
  }));

  function updateForm(username, email, password) {
    comp.form.controls['username'].setValue(username);
    comp.form.controls['email'].setValue(email);
    comp.form.controls['password'].setValue(password);
  }

  it('should have a user', () => {
    expect(comp.user).toEqual(user);
  });

  it('should show user credentials in form', () => {
    let shortEmail = user.email.slice(0, -7);
    expect(comp.form.value).toEqual({username: user.username, email: shortEmail, password: ''});
  });

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
    spyOn(userService, 'update').and.callThrough();
    spyOn(authenticationService, 'setUser').and.callThrough();
    comp.onSubmit(comp.form.value);
    expect(userService.update).toHaveBeenCalledWith(comp.user);
    expect(authenticationService.setUser).toHaveBeenCalledWith(comp.user);
    expect(comp.isSubmitted).toBe(true);
  });

  it('should display the email-help-text, when clicking on help', () => {
    de = fixture.debugElement.query(By.css('.help'));
    el = de.nativeElement;
    expect(comp.emailHelpDisplay).toEqual('none');
    el.click();
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
