import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpModule } from "@angular/http";
import { Angular2FontawesomeModule } from "angular2-fontawesome";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Category } from "../../../src/app/data-classes/category";
import { getCategoriesMocks } from "../data/mock-categories";
import { ManageCategoriesComponent } from "../../../src/app/manageCategories/manageCategories.component";
import { CategoryService } from "../../../src/app/_services/category.service";
import { FakeTranslationLoader } from "../../fake-translation-loader";
import { CategoryServiceStub } from "../../category-service-stub";


describe('ManageCategoriesComponent', () => {
  let comp: ManageCategoriesComponent;
  let fixture: ComponentFixture<ManageCategoriesComponent>;
  let categoryService;
  let de: DebugElement;
  let el: HTMLElement;

  const createComponent = () => {
    const fixture = TestBed.createComponent(ManageCategoriesComponent);

    comp = fixture.componentInstance;
    fixture.detectChanges();
  };

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCategoriesComponent],
      providers: [
        {provide: CategoryService, useClass: CategoryServiceStub}
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
      fixture = TestBed.createComponent(ManageCategoriesComponent);
      comp = fixture.componentInstance;
      categoryService = fixture.debugElement.injector.get(CategoryService);
    });
  }));

  it('should not have categories before ngOnInit', () => {
    expect(comp.categories.length).toBe(0);
  });

  describe('after get categories', () => {
    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable()
        .then(() => fixture.detectChanges());
    }));

    it('should have categories', () => {
      expect(comp.categories.length).toBeGreaterThan(0);
      expect(comp.categories).toEqual(getCategoriesMocks());
    });

    it('should render categories', () => {
      de = fixture.debugElement.query(By.css('.category'));
      el = de.nativeElement;
      expect(el).toBeDefined();
    });

    it('should edit clicked category and mark it as current', () => {
      expect(comp.currCat).toEqual(new Category(""));
      de = fixture.debugElement.query(By.css('.currcat'));
      expect(de).toBeNull();
      de = fixture.debugElement.query(By.css('.category'));
      el = de.nativeElement;
      el.click();
      expect(comp.currCat).toEqual(getCategoriesMocks()[0]);
      de = fixture.debugElement.query(By.css('.currcat'));
      expect(de).toBeDefined();
    });

    it('should delete an existing category',() => {
      expect(comp.categories.length).toBe(2);
      comp.deleteCat(comp.categories[0]);
      expect(comp.currCat).toEqual(new Category(""));
      expect(comp.categories.length).toBe(1, 'deleting should decrease array length');
      let categories = [getCategoriesMocks()[1]];
      expect(comp.categories).toEqual(categories, 'deleting should cut deleted category from array');
    });

    it('should not delete nonexisting categories', () => {
      expect(comp.categories.length).toBe(2);
      comp.deleteCat(new Category("test"));
      expect(comp.categories.length).toBe(2);
      expect(comp.categories).toEqual(getCategoriesMocks());
    });

    it('should add a new category', () => {
      expect(comp.categories.length).toBe(2);
      de = fixture.debugElement.query(By.css('.newCat'));
      el = de.nativeElement;
      el.click();
      expect(comp.categories.length).toBe(3);
      let categories = getCategoriesMocks();
      categories.push(new Category("new Category"));
      expect(comp.categories).toEqual(categories);
    });

    it('should submit categories', () => {
      comp.onSubmit();
      expect(comp.isSubmitted).toBe(true);
    });
  });
});