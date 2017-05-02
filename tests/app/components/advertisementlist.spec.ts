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
import { CategoryService } from "../../../src/app/_services/category.service";
import { AdvertisementListComponent } from "../../../src/app/advertisementlist/advertisementlist.component";
import { getAdvertisementMocks } from "./mock-advertisements";
import { ActivatedRouteStub } from "../../activated-route-stub";


let translations: any = {"TEST": "This is a test"};
class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of(translations);
  }
}

class AdvertisementServiceStub {
  getAdvertisementsQuery(string: string) {
    return Observable.of(getAdvertisementMocks());
  }
}

class CategoryServiceStub {

}

describe('AdvertisementListComponent', () => {
  const appRoutes: Routes = [
    {path: '', redirectTo: 'advertisements', pathMatch: 'full'}
  ];
  let comp: AdvertisementListComponent;
  let fixture: ComponentFixture<AdvertisementListComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertisementListComponent],
      providers: [
        {provide: AdvertisementService, useValue: AdvertisementServiceStub},
        //{provide: CategoryService, useValue: CategoryServiceStub},
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
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
    })
      .compileComponents();  // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementListComponent);
    comp = fixture.componentInstance;
  });

  it('should get advertisements from service', () => {
    fakeAsync(() => {
      comp.ngOnInit();
      tick();
      expect(this.advertisements.toEqual(getAdvertisementMocks()));
      expect(this.advertisementService.getAdvertisementsQuery).toHaveBeenCalledWith('/?advertisementState=2');
    });
  });

  it('should get ads with tagId 1', ()=>{
    fixture.debugElement.injector.get(ActivatedRoute).testParams = { tagId: 1 };
    fakeAsync(() => {
      comp.ngOnInit();
      tick();
      expect(this.advertisementService.getAdvertisementsQuery).toHaveBeenCalledWith('/?tagId=1');
    });
  });

  it('should get ads with categoryId 1', ()=>{
    fixture.debugElement.injector.get(ActivatedRoute).testParams = { categoryId: 1 };
    fakeAsync(() => {
      comp.ngOnInit();
      tick();
      expect(this.advertisementService.getAdvertisementsQuery).toHaveBeenCalledWith('/?categoryId=1');
    });
  });

  it('should navigate to info if ad is clicked', () => {
    fakeAsync(() => {
      comp.ngOnInit();
      tick();
      de = fixture.debugElement.query(By.css('.advertisement'));
      el = de.nativeElement;
      el.click();
      let currentAd = getAdvertisementMocks()[0];
      expect(this.gotoInfo).toHaveBeenCalledWith(currentAd);
      expect(this.advertisementService.currentAdvertisement).toEqual(currentAd);
      expect(this.router.navigate).toHaveBeenCalledWith(['/advertisementinfo', currentAd.id])
    });
  });
});