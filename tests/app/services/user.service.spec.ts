import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ApiCallService } from "../../../src/app/utils/api-call.service";
import { TagService } from "../../../src/app/services/tag.service";
import { ApiCallServiceStub } from "../_mocks/api-call-service-stub";
import { Observable } from "rxjs/Observable";
import { getTagMocks } from "../data/mock-tags";
import { Tag } from "../../../src/app/data/tag";
import { UserService } from "../../../src/app/services/user.service";
import { User } from "../../../src/app/data/user";
import { AuthenticationService } from "../../../src/app/utils/authentication.service";
import { AuthenticationServiceStub } from "../_mocks/authentication-service-stub";
import { getUsersMocks } from "../data/mock-users";
import { RequestOptionsArgs, Headers } from "@angular/http";


describe('UserService', () => {
    let service: UserService;
    let apiCallService: ApiCallService;
    let authenticationService: AuthenticationService;
    let users: User[];
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {provide: ApiCallService, useClass: ApiCallServiceStub},
                {provide: AuthenticationService, useClass: AuthenticationServiceStub}
            ]
        });
        apiCallService = TestBed.get(ApiCallService);
        authenticationService = TestBed.get(AuthenticationService);
        service = new UserService(apiCallService, authenticationService);
        users = getUsersMocks();
    });

    it('should get users via ApiCall with the right endpoint', () => {
        spyOn(apiCallService, 'get').and.callThrough();
        service.getUsers();
        expect(apiCallService.get).toHaveBeenCalledWith("users/");
    });

    it('should map returned tags', fakeAsync(() => {
        spyOn(apiCallService, 'get').and.callFake(() => {
            return Observable.of(users);
        });
        let reveicedUsers: User[];
        service.getUsers().subscribe(res => reveicedUsers = res);
        tick();
        expect(reveicedUsers).toEqual(users);
    }));

    it('should catch http errors', fakeAsync(() => {
        let reveicedUsers: User[] = [];
        let error = new Error('error');
        spyOn(apiCallService, 'get').and.callFake(() => {
            return Observable.throw('error');
        });
        service.getUsers().subscribe(
            res => {
                reveicedUsers = res;
            },
            err => {
                error = err;
            }
        );
        tick();
        expect(reveicedUsers).toEqual([]);
        expect(error).toEqual(error);
    }));

    it('should get user with id via ApiCallService', () => {
        spyOn(apiCallService, 'get').and.callThrough();
        service.getUser(1);
        expect(apiCallService.get).toHaveBeenCalledWith("user/1");
    });

    it('should post user via ApiCallService', () => {
        spyOn(apiCallService, 'post').and.callThrough();
        spyOn(authenticationService, 'authenticationActive').and.callThrough();
        let options : RequestOptionsArgs = { headers: new Headers({ "Content-Type" : "application/json" }) };
        options.headers = apiCallService.appendAuthorizationHeader(options.headers);
        service.create(users[0]);
        expect(apiCallService.post).toHaveBeenCalledWith("user", users[0], options);
    });

    it('should post user without Authorization header', () => {
        spyOn(apiCallService, 'post').and.callThrough();
        spyOn(authenticationService, 'authenticationActive').and.callFake(() => {return false});
        let options : RequestOptionsArgs = { headers: new Headers({ "Content-Type" : "application/json" }) };
        service.create(users[0]);
        expect(apiCallService.post).toHaveBeenCalledWith("user", users[0], options);
    });

    it('should put user via ApiCallServie', () => {
        spyOn(apiCallService, 'put').and.callThrough();
        service.update(users[0]);
        expect(apiCallService.put).toHaveBeenCalledWith("user/" + users[0].id, users[0]);
    })
});
