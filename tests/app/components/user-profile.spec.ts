import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

  function updateForm(username, password) {
    comp.form.controls['username'].setValue(username);
    comp.form.controls['password'].setValue(password);
  }

  it('should have a user', () => {
    expect(comp.user).toEqual(user);
  });

  it('should show user credentials in form', () => {
    expect(comp.form.value).toEqual({username: user.username, password: ''});
  });

  it('should mark form and fields as invalid when input invalid', () => {
    updateForm('a', 'a');
    expect(comp.form.valid).toBe(false);
    expect(comp.form.controls['username'].valid).toBe(false);
    expect(comp.form.controls['password'].valid).toBe(false);
  });

  it('should mark form as valid when input is valid', () => {
    updateForm('amuster', '123muster');
    expect(comp.form.valid).toBe(true);
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
});
