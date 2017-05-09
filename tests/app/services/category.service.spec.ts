import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpModule } from "@angular/http";
import { Angular2FontawesomeModule } from "angular2-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FakeTranslationLoader } from "../_mocks/fake-translation-loader";
import { AdvertisementService } from "../../../src/app/services/advertisement.service";
import { ApiCallService } from "../../../src/app/utils/api-call.service";
import { TagService } from "../../../src/app/services/tag.service";
import { ApiCallServiceStub } from "../_mocks/api-call-service-stub";
import { TagServiceStub } from "../_mocks/tag-service-stub";
import { AuthenticationService } from "../../../src/app/utils/authentication.service";
import { getAdvertisementMocks } from "../data/mock-advertisements";
import { Advertisement } from "../../../src/app/data/advertisement";
import { CategoryService } from "../../../src/app/services/category.service";
import { Category } from "../../../src/app/data/category";
import { getCategoriesMocks } from "../data/mock-categories";
import { Observable } from "rxjs/Observable";


describe('CategoryService', () => {
    let service: CategoryService;
    let apiCallService: ApiCallService;
    let category: Category;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: ApiCallService, useClass: ApiCallServiceStub},
                {provide: TagService, useClass: TagServiceStub},
            ]
        });
        apiCallService = TestBed.get(ApiCallService);
        service = new CategoryService(apiCallService);
        category = getCategoriesMocks()[0];
    });

    it('should post Categories via ApiCall with the right endpoint', () => {
        spyOn(apiCallService, 'post').and.callThrough();
        service.create(category);
        expect(apiCallService.post).toHaveBeenCalledWith("category", category);
    });

    it('should map returned categry', fakeAsync(() => {
        spyOn(apiCallService, 'post').and.callFake(() => {
            return Observable.of(category);
        });
        let reveicedCategory: Category;
        service.create(category).subscribe(res => reveicedCategory = res);
        tick();
        expect(reveicedCategory).toEqual(category);
    }));

    it('should catch http errors', fakeAsync(() => {
        let receivedCategory: Category;
        let error = new Error('error');
        spyOn(apiCallService, 'post').and.callFake(() => {
            return Observable.throw('error');
        });
        service.create(category).subscribe(
            res => {
                receivedCategory = res;
            },
            err => {
                error = err;
            }
        );
        tick();
        expect(receivedCategory).toBeUndefined();
        expect(error).toEqual(error);
    }));

    it('should get Categories from API Call Service', () => {
        spyOn(apiCallService, 'get').and.callThrough();
        service.getCategories();
        expect(apiCallService.get).toHaveBeenCalledWith("categories/")
    });

    it('should put categories with an ID to the API Call Service', () => {
        spyOn(apiCallService, 'put').and.callThrough();
        spyOn(apiCallService, 'post').and.callThrough();
        service.createOrUpdate(getCategoriesMocks());
        expect(apiCallService.put).toHaveBeenCalledTimes(getCategoriesMocks().length);
        expect(apiCallService.post).toHaveBeenCalledTimes(0);
    });

    it('should post categories with no ID to the API Call Service', () => {
        spyOn(apiCallService, 'post').and.callThrough();
        spyOn(apiCallService, 'put').and.callThrough();
        let catWithoutID = getCategoriesMocks();
        for (let c of catWithoutID){
            c.id = null;
        }
        service.createOrUpdate(catWithoutID);
        expect(apiCallService.post).toHaveBeenCalledTimes(getCategoriesMocks().length);
        expect(apiCallService.put).toHaveBeenCalledTimes(0);
    });

    it('should delete categories via Api Call Service', () => {
       spyOn(apiCallService, 'delete').and.callThrough();
       service.deleteCat(category);
       expect(apiCallService.delete).toHaveBeenCalledWith("category/"+category.id);
    });



});
