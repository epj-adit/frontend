import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { ActivatedRoute, Router, Routes } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpModule } from "@angular/http";
import { Angular2FontawesomeModule } from "angular2-fontawesome";
import { Observable } from "rxjs/Observable";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdvertisementService } from "../../../src/app/_services/advertisement.service";
import { AdvertisementListComponent } from "../../../src/app/advertisementlist/advertisementlist.component";
import { getAdvertisementMocks } from "./mock-advertisements";
import { ActivatedRouteStub } from "../../activated-route-stub";
import { Advertisement } from "../../../src/app/data-classes/advertisement";
import { AdvertisementInfoComponent } from "../../../src/app/advertisementinfo/advertisement-info.component";


let translations: any = {"TEST": "This is a test"};
class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of(translations);
  }
}

class AdvertisementServiceStub {
  currentAdvertisement: Advertisement;
  getAdvertisement(id:number): Observable<Advertisement>{
    return Observable.of(getAdvertisementMocks()[0]);
  }
}


describe('AdvertisementInfoComponent', () => {
  let comp: AdvertisementInfoComponent;
  let fixture: ComponentFixture<AdvertisementInfoComponent>;
  let activatedRoute;
  let advertisementService;
  let de: DebugElement;
  let el: HTMLElement;

  const createComponent = () => {
    const fixture = TestBed.createComponent(AdvertisementInfoComponent);

    comp = fixture.componentInstance;
    fixture.detectChanges();
  };

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertisementInfoComponent],
      providers: [
        {provide: AdvertisementService, useClass: AdvertisementServiceStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ],
      imports: [
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        Angular2FontawesomeModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader}
        })
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AdvertisementInfoComponent);
      comp = fixture.componentInstance;
      activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
      activatedRoute.testParams = {id: 1};
      advertisementService = fixture.debugElement.injector.get(AdvertisementService);
    });
  }));

/*  it('should not have advertisement before ngOnInit', () => {
    expect(comp.advertisement).toBeUndefined();
  });*/

  describe('after get advertisement', () => {
    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges());
    }));

    it('should have advertisement after ngOnInit', () => {
      expect(comp.advertisement).toEqual(getAdvertisementMocks()[0]);
    })
  });
});