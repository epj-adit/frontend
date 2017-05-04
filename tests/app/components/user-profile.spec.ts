import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { ActivatedRoute, Router, Routes } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpModule } from "@angular/http";
import { Angular2FontawesomeModule } from "angular2-fontawesome";
import { Observable } from "rxjs/Observable";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdvertisementService } from "../../../src/app/services/advertisement.service";
import { AdvertisementListComponent } from "../../../src/app/components/advertisement-list/advertisement-list.component";
import { getAdvertisementMocks } from "../data/mock-advertisements";
import { FakeTranslationLoader } from "../../fake-translation-loader";
import { RouterStub } from "../../router-stub";
import { UserServiceStub } from "../../user-service-stub";
import { UserService } from "../../../src/app/services/user.service";
import { AuthenticationService } from "../../../src/app/utils/authentication.service";
import { AuthenticationServiceStub } from "../../authentication-service-stub";
import { UserProfileComponent } from "../../../src/app/components/user-profile/user-profile.component";
import { getUsersMocks } from "../data/mock-users";


describe('UserProfileComponent', () => {
  let comp: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService;
  let de: DebugElement;
  let el: HTMLElement;

  const createComponent = () => {
    const fixture = TestBed.createComponent(UserProfileComponent);

    comp = fixture.componentInstance;
    fixture.detectChanges();
  };

  // async beforeEach
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
      userService = fixture.debugElement.injector.get(UserService);
    });
  }));

  /*
  it('should not have a user before ngOnInit', () => {
    expect(comp.user).toBeUndefined();
  });*/

  describe('after get user', () => {
    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges());
    }));

    it('should have a user', () => {
      expect(comp.user).toEqual(getUsersMocks()[0]);
    });
  });
});
