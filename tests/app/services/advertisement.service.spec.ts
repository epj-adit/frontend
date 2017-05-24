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
import { AuthenticationServiceStub } from "../_mocks/authentication-service-stub";
import { getAdvertisementMocks } from "../data/mock-advertisements";
import { Advertisement } from "../../../src/app/data/advertisement";
import { Observable } from "rxjs/Observable";


describe('AdvertisementService', () => {
  let service: AdvertisementService;
  let apiCallService: ApiCallService;
  let tagService: TagService;
  let authenticationService: AuthenticationService;
  let ad: Advertisement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ApiCallService, useClass: ApiCallServiceStub},
        {provide: TagService, useClass: TagServiceStub},
        {provide: AuthenticationService, useClass: AuthenticationServiceStub}
      ]
    });
    apiCallService = TestBed.get(ApiCallService);
    tagService = TestBed.get(TagService);
    authenticationService = TestBed.get(AuthenticationService);
    service = new AdvertisementService(apiCallService, tagService, authenticationService);
    ad = getAdvertisementMocks()[0];
  });

  it('should not have a current Advertisement', () => {
    expect(service.currentAdvertisement).toBe(null);
  });

  it('should get Advertisements via ApiCall with the right endpoint', () => {
    spyOn(apiCallService, 'get').and.callThrough();
    service.getAdvertisements();
    expect(apiCallService.get).toHaveBeenCalledWith("advertisements/");
  });

  it('should get Advertisement with id via ApiCall', () => {
    spyOn(apiCallService, 'get').and.callThrough();
    service.getAdvertisement(1);
    expect(apiCallService.get).toHaveBeenCalledWith("advertisement/1");
  });

  it('should get Advertisements with queries via ApiCall', () => {
    spyOn(apiCallService, 'get').and.callThrough();
    service.getAdvertisementsQuery("/?query=testquery");
    expect(apiCallService.get).toHaveBeenCalledWith("advertisements/?query=testquery");
  });

  it('should post advertisements without an id', () => {
    spyOn(apiCallService, 'post').and.callThrough();
    let adWithoutId = ad;
    adWithoutId.id = null;
    service.createOrUpdate(adWithoutId, adWithoutId.tags);
    expect(apiCallService.post).toHaveBeenCalled();
  });

  it('should put advertisements with an id', () => {
    spyOn(apiCallService, 'put').and.callThrough();
    service.createOrUpdate(ad, ad.tags);
    expect(apiCallService.put).toHaveBeenCalled();
  });

  it('should create tags of an advertisement', () => {
    spyOn(tagService, 'create').and.callThrough();
    service.createAdvertisementAndTags(ad);
    expect(tagService.create).toHaveBeenCalledWith(ad.tags);
  });

  it('should delete an ad via apiCall', () => {
    spyOn(apiCallService, 'put').and.callThrough();
    service.deleteAd(ad);
    expect(apiCallService.put).toHaveBeenCalledWith("advertisement/" + ad.id, ad);
  });

  it('should map returned advertisement', fakeAsync(() => {
    spyOn(apiCallService, 'put').and.callFake(() => {
      return Observable.of(ad);
    });
    let reveicedAd: Advertisement;
    service.deleteAd(ad).subscribe(res => reveicedAd = res);
    tick();
    expect(reveicedAd).toEqual(ad);
  }));

  it('should catch http errors', fakeAsync(() => {
    let reveicedAd: Advertisement;
    let error = new Error('error');
    spyOn(apiCallService, 'put').and.callFake(() => {
      return Observable.throw('error');
    });
    spyOn(console, 'error').and.returnValue(true);
    service.deleteAd(ad).subscribe(
        res => {
          reveicedAd = res;
        },
        err => {
          error = err;
        }
    );
    tick();
    expect(reveicedAd).toBeUndefined();
    expect(error).toEqual(error);
    expect(console.error).toHaveBeenCalled();
  }));
});
