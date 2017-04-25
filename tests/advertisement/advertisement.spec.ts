import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Router, Routes } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { Http, HttpModule } from "@angular/http";
import { Angular2FontawesomeModule } from "angular2-fontawesome";
import { Observable } from "rxjs/Observable";
import { AdvertisementComponent } from "../../src/app/advertisement/advertisement.component";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdvertisementService } from "../../src/app/_services/advertisement.service";
import { CategoryService } from "../../src/app/_services/category.service";
import { Tag } from "../../src/app/data-classes/tag";

let translations: any = {"TEST": "This is a test"};
class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of(translations);
  }
}

class AdvertisementServiceStub {

}

class CategoryServiceStub {

}

describe('AdvertisementComponent', () => {
  const appRoutes: Routes = [
    {path: '', redirectTo: 'advertisements', pathMatch: 'full'}
  ];
  let comp: AdvertisementComponent;
  let fixture: ComponentFixture<AdvertisementComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertisementComponent],
      providers: [
        {provide: AdvertisementService, useValue: AdvertisementServiceStub},
        {provide: CategoryService, useValue: CategoryServiceStub}
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
    fixture = TestBed.createComponent(AdvertisementComponent);
    comp = fixture.componentInstance;
  });

  it('should display the tag-help-text, when clicking on help', () => {
    de = fixture.debugElement.query(By.css('.help'));
    el = de.nativeElement;
    expect(comp.taghelpDisplay).toEqual('none');
    el.click();
    expect(comp.taghelpDisplay).toEqual('inline-block')
  });

  describe('Tag Validation',() => {
    it('should have an invalid Tag field with an empty Tag[]', () => {
      expect(comp.tags).toEqual([]);
      expect(comp.form.controls['tagValue'].valid).toBe(false);
    });
    it('should have a valid Tag filed with a nonempty Tag[]', () => {
      let testValue = 'test';
      let testTag = new Tag(testValue);
      let tagTermiantor = ";";
      comp.form.controls['tagValue'].setValue(testValue+tagTermiantor);
      expect(comp.form.controls['tagValue'].value).toBe(testValue+tagTermiantor);
      comp.addTag();
      expect(comp.form.controls['tagValue'].value).toBe('');
      expect(comp.tags.length).toBe(1);
      expect(comp.tags[0]).toEqual(testTag);
      expect(comp.form.controls['tagValue'].valid).toBe(true);
    });
    it('should have an invalid Tag field after deleting all existing tags', () => {
      let testValue = 'test';
      let tagTermiantor = ";";
      comp.form.controls['tagValue'].setValue(testValue+tagTermiantor);
      comp.addTag();
      comp.removeTag(comp.tags[0]);
      expect(comp.tags.length).toBe(0);
      expect(comp.form.controls['tagValue'].valid).toBe(false);
    });
  });

});