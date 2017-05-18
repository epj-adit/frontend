import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthenticationService } from "../../../src/app/utils/authentication.service";
import { MockBackend } from "@angular/http/testing";
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from "@angular/http";
import { getUsersMocks } from "../data/mock-users";
import { ReflectiveInjector } from "@angular/core";

/* needed because PhantomJS does not support Array.includes(),
 * which is being testet via service.hasPermission
 * https://github.com/Semantic-Org/Semantic-UI-Ember/issues/155
 */
import '../_mocks/includes.polyfill.js';


describe('AuthenticationService', () => {

    beforeEach(() => {
        this.injector = ReflectiveInjector.resolveAndCreate([
            {provide: ConnectionBackend, useClass: MockBackend},
            {provide: RequestOptions, useClass: BaseRequestOptions},
            Http,
            AuthenticationService,
        ]);
        this.service = this.injector.get(AuthenticationService);
        this.backend = this.injector.get(ConnectionBackend) as MockBackend;
        this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
        this.user = getUsersMocks()[0];
    });


    it('should set user and activate Authentication', fakeAsync(() => {
        let isActive: boolean;
        this.service.setUser(this.user).subscribe(res => isActive = res);
        tick();
        expect(isActive).toBe(true);
    }));

    describe('after set User', () => {
        beforeEach(() => {
            this.service.setUser(this.user);
        });

        it('should get user', fakeAsync(() => {
            let actualUser;
            this.service.getUser().subscribe(res => actualUser = res);
            tick();
            expect(actualUser).toEqual(this.user);
        }));

        it('should login the user', fakeAsync(() => {
            let credentials = {
                email: "mmuster@hsr.ch",
                plaintextPassword: "123456"
            };
            this.service.login(credentials);
            tick();
            expect(this.lastConnection).toBeDefined();
            expect(this.lastConnection.request.url).toMatch('https://develop.adit.qo.is/api/authenticate');
        }));

        it('should logout the user', fakeAsync(() => {
            let isActive: boolean;
            this.service.logout().subscribe(res => isActive = res);
            tick();
            expect(isActive).toBe(false);
            expect(localStorage.getItem(this.service.LS_AUTHENTICATED_USER)).toBeNull();
        }));

        it('should check permissions', fakeAsync(() => {

            let hasPersmission: boolean;
            this.service.hasPermission('basic_permission').subscribe(res => hasPersmission = res);
            tick();
            expect(hasPersmission).toBe(true);
        }));
    });


});
