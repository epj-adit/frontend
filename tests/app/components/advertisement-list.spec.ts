import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { ActivatedRoute, Router } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpModule } from "@angular/http";
import { Angular2FontawesomeModule } from "angular2-fontawesome";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdvertisementService } from "../../../src/app/services/advertisement.service";
import { AdvertisementListComponent } from "../../../src/app/components/advertisement-list/advertisement-list.component";
import { getAdvertisementMocks } from "../data/mock-advertisements";
import { ActivatedRouteStub } from "../_mocks/activated-route-stub";
import { FakeTranslationLoader } from "../_mocks/fake-translation-loader";
import { AdvertisementServiceStub } from "../_mocks/advertisement-service-stub";
import { RouterStub } from "../_mocks/router-stub";


describe('AdvertisementListComponent', () => {
  let comp: AdvertisementListComponent;
  let fixture: ComponentFixture<AdvertisementListComponent>;
  let activatedRoute;
  let advertisementService;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertisementListComponent],
      providers: [
        {provide: AdvertisementService, useClass: AdvertisementServiceStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
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
      fixture = TestBed.createComponent(AdvertisementListComponent);
      comp = fixture.componentInstance;
      activatedRoute = TestBed.get(ActivatedRoute);
      activatedRoute.testParams = {tagId: 1};
      advertisementService = TestBed.get(AdvertisementService);
    });
  }));

  it('should not have advertisements before ngOnInit', () => {
    expect(comp.advertisements.length).toBe(0);
  });

  describe('after get advertisements', () => {
    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges());
    }));

    it('should have advertisements', () => {
      expect(comp.advertisements.length).toBeGreaterThan(0, 'advertisements length should be greater than 0');
      expect(comp.advertisements).toEqual(getAdvertisementMocks(), 'advertisements array should equal mock data');
    });

    it('should render advertisements', () => {
      de = fixture.debugElement.query(By.css('.advertisement'));
      el = de.nativeElement;
      expect(el).toBeDefined();
    });

    it('should call gotoInfo when advertisement is clicked', () => {
      de = fixture.debugElement.query(By.css('.advertisement'));
      el = de.nativeElement;
      spyOn(comp, 'gotoInfo');
      el.click();
      expect(comp.gotoInfo).toHaveBeenCalledWith(getAdvertisementMocks()[0]);
    });

    it('should set clicked advertisement as current advertisement', () => {
      de = fixture.debugElement.query(By.css('.advertisement'));
      el = de.nativeElement;
      expect(advertisementService.currentAdvertisement).toBeUndefined('current Advertisement in Service should be undefined');
      el.click();
      expect(advertisementService.currentAdvertisement).toEqual(getAdvertisementMocks()[0]);
    })
  });
});
