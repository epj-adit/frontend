import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Router, Routes } from "@angular/router";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpModule } from "@angular/http";
import { Angular2FontawesomeModule } from "angular2-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FakeTranslationLoader } from "../_mocks/fake-translation-loader";
import { AdvertisementSearchComponent } from "../../../src/app/components/search/advertisement-search.component";
import { AdvertisementSearchService } from "../../../src/app/services/advertisement-search.service";
import { AdvertisementSearchServiceStub } from "../_mocks/advertisement-search-service-stub";
import { RouterStub } from "../_mocks/router-stub";
import { ApiCallServiceStub } from "../_mocks/api-call-service-stub";
import { ApiCallService } from "../../../src/app/utils/api-call.service";
import { ProposalType, SearchProposal } from "../../../src/app/data/search-proposal";
import { getAdvertisementMocks } from "../data/mock-advertisements";


describe('AdvertisementSearchComponent', () => {
    const appRoutes: Routes = [
        {path: '', redirectTo: 'advertisements', pathMatch: 'full'}
    ];
    let comp: AdvertisementSearchComponent;
    let fixture: ComponentFixture<AdvertisementSearchComponent>;
    let searchService: AdvertisementSearchService;
    let router: Router;
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
        searchService = TestBed.get(AdvertisementSearchService);
        router = TestBed.get(Router);
    });

    it('should not have an inital searchProposal', () => {
        expect(comp.searchProposals).toBeUndefined();
    });

    describe('after ngOnInit', () => {
        beforeEach(async(() => {
            fixture.detectChanges();
            fixture.whenStable()
                .then(() => fixture.detectChanges());
        }));

        it('should have a searchProposal', () => {
            expect(comp.searchProposals).toBeDefined();
        });

        it('should search keyed in terms', fakeAsync(() => {
            spyOn(comp, 'search').and.callThrough();
            spyOn(comp, 'addToProposals').and.callFake(
                () => {
                    let ad = getAdvertisementMocks()[0];
                    let proposals: SearchProposal[] = [];
                    console.log("addtoproposal");
                    proposals.push(
                        {
                            id: ad.id,
                            name: ad.title,
                            type: ProposalType.Advert,
                            displayName: ProposalType[ProposalType.Advert]
                        }
                    );
                    return proposals;
                }
            );
            let searchString = 'test';
            comp.search(searchString);
            de = fixture.debugElement.query(By.css('#search-box'));
            el = de.nativeElement;
            (<HTMLInputElement>el).value = searchString;
            tick(300);
            expect(comp.search).toHaveBeenCalledWith(searchString);
        }));

        describe('gotoInfo', ()=> {
            it('should route to advertisementinfo for advertisements', () => {
                spyOn(router, 'navigate');
                let sp = new SearchProposal();
                sp.type = ProposalType.Advert;
                sp.id = 1;
                let link = ['/advertisementinfo', sp.id];
                comp.gotoInfo(sp);
                expect(router.navigate).toHaveBeenCalledWith(link);
            });
            it('should route to advertisements with tagfilter for tags', () => {
                spyOn(router, 'navigate');
                let sp = new SearchProposal();
                sp.type = ProposalType.Tag;
                sp.id = 1;
                let link = ['advertisements', {tagId: sp.id}];
                comp.gotoInfo(sp);
                expect(router.navigate).toHaveBeenCalledWith(link);
            });
            it('should route to advertisements with categoryfilter for categories', () => {
                spyOn(router, 'navigate');
                let sp = new SearchProposal();
                sp.type = ProposalType.Category;
                sp.id = 1;
                let link = ['advertisements', {categoryId: sp.id}];
                comp.gotoInfo(sp);
                expect(router.navigate).toHaveBeenCalledWith(link);
            });
        });

    });
});
