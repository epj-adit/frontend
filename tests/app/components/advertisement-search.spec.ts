import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Router, Routes } from "@angular/router";
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
import { AdvertisementSearchComponent } from "../../../src/app/components/search/advertisement-search.component";
import { AdvertisementSearchService } from "../../../src/app/services/advertisement-search.service";
import { AdvertisementSearchServiceStub } from "../_mocks/advertisement-search-service-stub";
import { RouterStub } from "../_mocks/router-stub";
import { ApiCallServiceStub } from "../_mocks/api-call-service-stub";
import { ApiCallService } from "../../../src/app/utils/api-call.service";


describe('AdvertisementSearchComponent', () => {
    const appRoutes: Routes = [
        {path: '', redirectTo: 'advertisements', pathMatch: 'full'}
    ];
    let comp: AdvertisementSearchComponent;
    let fixture: ComponentFixture<AdvertisementSearchComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdvertisementSearchComponent],
            providers: [
                {provide: AdvertisementSearchService, useClass: AdvertisementSearchServiceStub},
                {provide: Router, useClass: RouterStub},
                {provide: ApiCallService, useClass: ApiCallServiceStub}
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
        fixture = TestBed.createComponent(AdvertisementSearchComponent);
        comp = fixture.componentInstance;
    });

    it('should not have an inital searchProposal', () => {
        expect(comp.searchProposals).toBeUndefined();
    });


});
