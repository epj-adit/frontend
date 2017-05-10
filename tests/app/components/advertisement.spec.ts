import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Routes } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpModule } from "@angular/http";
import { Angular2FontawesomeModule } from "angular2-fontawesome";
import { AdvertisementComponent } from "../../../src/app/components/advertisement/advertisement.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdvertisementService } from "../../../src/app/services/advertisement.service";
import { CategoryService } from "../../../src/app/services/category.service";
import { Tag } from "../../../src/app/data/tag";
import { FakeTranslationLoader } from "../_mocks/fake-translation-loader";
import { CategoryServiceStub } from "../_mocks/category-service-stub";
import { AdvertisementServiceStub } from "../_mocks/advertisement-service-stub";


describe('AdvertisementComponent', () => {
  const appRoutes: Routes = [
    {path: '', redirectTo: 'advertisements', pathMatch: 'full'}
  ];
  let comp: AdvertisementComponent;
  let fixture: ComponentFixture<AdvertisementComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertisementComponent],
      providers: [
        {provide: AdvertisementService, useClass: AdvertisementServiceStub},
        {provide: CategoryService, useClass: CategoryServiceStub}
        ],
      imports: [
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        Angular2FontawesomeModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeTranslationLoader}
        }),
        RouterTestingModule.withRoutes(appRoutes)
      ]
    })
      .compileComponents();
  }));

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
  it('should hide tag-help-text, when clicking twice on help', () => {
    de = fixture.debugElement.query(By.css('.help'));
    el = de.nativeElement;
    expect(comp.taghelpDisplay).toEqual('none');
    el.click();
    el.click();
    expect(comp.taghelpDisplay).toEqual('none');
  });

  describe('Tag Validation',() => {
    it('should initially have an invalid Tag field with an empty Tag[]', () => {
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
    it('should not remove any tags, if tag doesnt exist', () => {
      let testValue = 'test';
      let testTag = new Tag(testValue);
      let tagTermiantor = ";";
      comp.form.controls['tagValue'].setValue(testValue+tagTermiantor);
      comp.addTag();
      comp.removeTag(new Tag('nonexistent'));
      expect(comp.tags.length).toBe(1);
    });
    it('should not add invalid tags', ()=>{
      let testValue = 'test!';
      let testTag = new Tag(testValue);
      let tagTermiantor = ";";
      comp.form.controls['tagValue'].setValue(testValue+tagTermiantor);
      expect(comp.form.controls['tagValue'].value).toBe(testValue+tagTermiantor);
      comp.addTag();
      expect(comp.form.controls['tagValue'].value).toBe(testValue+tagTermiantor);
      expect(comp.tags.length).toBe(0);
      expect(comp.form.controls['tagValue'].valid).toBe(false);
    })
  });

});
