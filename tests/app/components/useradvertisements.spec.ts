import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpModule } from "@angular/http";
import { Angular2FontawesomeModule } from "angular2-fontawesome";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdvertisementService } from "../../../src/app/services/advertisement.service";
import { getAdvertisementMocks } from "../data/mock-advertisements";
import { AditCurrencyPipe } from "../../../src/app/utils/adit-currency.pipe";
import { FakeTranslationLoader } from "../../fake-translation-loader";
import { AdvertisementServiceStub } from "../../advertisement-service-stub";
import { RouterStub } from "../../router-stub";
import { UserAdvertisementsComponent } from "../../../src/app/components/user-advertisements/user-advertisements.component";
import { OverlayStub, ViewContainerRefStub } from "../../modal-stub";
import { Overlay } from "angular2-modal";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ViewContainerRef } from "@angular/core";


let modal = {
  create: jasmine.createSpy('create'),
  confirm: jasmine.createSpy('confirm')
};

describe('UserAdvertisementComponent', () => {
  let comp: UserAdvertisementsComponent;
  let fixture: ComponentFixture<UserAdvertisementsComponent>;
  let advertisementService;

  const createComponent = () => {
    const fixture = TestBed.createComponent(UserAdvertisementsComponent);

    comp = fixture.componentInstance;
    fixture.detectChanges();
  };

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserAdvertisementsComponent, AditCurrencyPipe],
      providers: [
        {provide: AdvertisementService, useClass: AdvertisementServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: Overlay, useClass: OverlayStub},
        {provide: ViewContainerRef, useClass: ViewContainerRefStub},
        {provide: Modal, useValue: modal}
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
      fixture = TestBed.createComponent(UserAdvertisementsComponent);
      comp = fixture.componentInstance;
      advertisementService = fixture.debugElement.injector.get(AdvertisementService);
    });
  }));

  it('should not have advertisements before ngOnInit', () => {
    expect(comp.advertisements).toBeUndefined();
  });

  describe('after get advertisement from server', () => {
    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges());
    }));

    it('should have advertisements after ngOnInit', () => {
      expect(comp.advertisements).toEqual(getAdvertisementMocks());
    });

    it('should set current advertisement when edit is called', () => {
      expect(advertisementService.currentAdvertisement).toBeUndefined();
      comp.edit(getAdvertisementMocks()[0]);
      expect(advertisementService.currentAdvertisement).toEqual(getAdvertisementMocks()[0]);
    });
  });
});