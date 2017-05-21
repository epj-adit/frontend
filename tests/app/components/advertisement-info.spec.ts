import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Router } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpModule } from "@angular/http";
import { Angular2FontawesomeModule } from "angular2-fontawesome";
import { Observable } from "rxjs/Observable";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdvertisementService } from "../../../src/app/services/advertisement.service";
import { getAdvertisementMocks } from "../data/mock-advertisements";
import { ActivatedRouteStub } from "../_mocks/activated-route-stub";
import { AdvertisementInfoComponent } from "../../../src/app/components/advertisement-info/advertisement-info.component";
import { AditCurrencyPipe } from "../../../src/app/utils/adit-currency.pipe";
import { FakeTranslationLoader } from "../_mocks/fake-translation-loader";
import { AdvertisementServiceStub } from "../_mocks/advertisement-service-stub";
import { RouterStub } from "../_mocks/router-stub";
import { StatusMessageService } from "../../../src/app/utils/status-message.service";
import { StatusMessageServiceStub } from "../_mocks/status-message-service-stub";
import { StatusMessageComponent } from "../../../src/app/widgets/status-message/status-message.component";


describe('AdvertisementInfoComponent', () => {
  let comp: AdvertisementInfoComponent;
  let fixture: ComponentFixture<AdvertisementInfoComponent>;
  let activatedRoute;
  let advertisementService;
  let statusMessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertisementInfoComponent, AditCurrencyPipe, StatusMessageComponent],
      providers: [
        {provide: AdvertisementService, useClass: AdvertisementServiceStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: Router, useClass: RouterStub},
        {provide: StatusMessageService, useClass: StatusMessageServiceStub},
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
      fixture = TestBed.createComponent(AdvertisementInfoComponent);
      comp = fixture.componentInstance;
      activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
      activatedRoute.testParams = {id: 1};
      advertisementService = fixture.debugElement.injector.get(AdvertisementService);
      statusMessageService = fixture.debugElement.injector.get(StatusMessageService);
    });
  }));

  it('should not have advertisement before ngOnInit', () => {
    expect(comp.advertisement).toBeUndefined();
  });

  describe('after get advertisement from server', () => {
    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges());
    }));

    it('should have advertisement after ngOnInit', () => {
      expect(comp.advertisement).toEqual(getAdvertisementMocks()[0]);
    });
  });

  describe('after get current advertisement from service', () => {
    beforeEach(async(() => {
      advertisementService.currentAdvertisement = getAdvertisementMocks()[1];
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges());
    }));
    it('should load current Advertisement from service, if defined', () => {
      expect(comp.advertisement).toEqual(getAdvertisementMocks()[1]);
    })
  })
});
