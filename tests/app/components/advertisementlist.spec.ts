import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRoute, Routes } from "@angular/router";
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


let translations: any = {"TEST": "This is a test"};
class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of(translations);
  }
}

class AdvertisementServiceStub {
  getAdvertisementsQuery(string: string): Observable<Advertisement[]> {
    return Observable.of(getAdvertisementMocks());
  }
}


describe('AdvertisementListComponent', () => {
  const appRoutes: Routes = [
    {path: '', redirectTo: 'advertisements', pathMatch: 'full'}
  ];
  let comp: AdvertisementListComponent;
  let fixture: ComponentFixture<AdvertisementListComponent>;
  let activatedRoute;
  let de: DebugElement;
  let el: HTMLElement;

  const createComponent = () => {
    const fixture = TestBed.createComponent(AdvertisementListComponent);

    comp = fixture.componentInstance;
    fixture.detectChanges();
  };

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertisementListComponent],
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
        }),
        RouterTestingModule.withRoutes(appRoutes)
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AdvertisementListComponent);
      comp = fixture.componentInstance;
      activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
      activatedRoute.testParams = { tagId: 1};
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
  });
});