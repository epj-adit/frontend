import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ApiCallService } from "../../../src/app/utils/api-call.service";
import { TagService } from "../../../src/app/services/tag.service";
import { ApiCallServiceStub } from "../_mocks/api-call-service-stub";
import { Observable } from "rxjs/Observable";
import { getTagMocks } from "../data/mock-tags";
import { Tag } from "../../../src/app/data/tag";


describe('TagService', () => {
    let service: TagService;
    let apiCallService: ApiCallService;
    let tags: Tag[];
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: ApiCallService, useClass: ApiCallServiceStub}
            ]
        });
        apiCallService = TestBed.get(ApiCallService);
        service = new TagService(apiCallService);
        tags = getTagMocks();
    });

    it('should post tags via ApiCall with the right endpoint', () => {
        spyOn(apiCallService, 'post').and.callThrough();
        service.create(tags);
        expect(apiCallService.post).toHaveBeenCalledWith("tags/", tags);
    });

    it('should map returned tags', fakeAsync(() => {
        spyOn(apiCallService, 'post').and.callFake(() => {
            return Observable.of(tags);
        });
        let reveicedTags: Tag[];
        service.create(tags).subscribe(res => reveicedTags = res);
        tick();
        expect(reveicedTags).toEqual(tags);
    }));

    it('should catch http errors', fakeAsync(() => {
        let reveicedTags: Tag[] = [];
        let error = new Error('error');
        spyOn(apiCallService, 'post').and.callFake(() => {
            return Observable.throw('error');
        });
        service.create(tags).subscribe(
            res => {
                reveicedTags = res;
            },
            err => {
                error = err;
            }
        );
        tick();
        expect(reveicedTags).toEqual([]);
        expect(error).toEqual(error);
    }));
});
