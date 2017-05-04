import { Injectable, OnInit } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';

import { AppSettings } from '../app.settings';
import { Credential } from '../data/credential';
import { User } from '../data-classes/user';
import { JwtToken } from '../data/jwt-token';

@Injectable()
export class AuthenticationService implements OnInit {
    public static AUTHENTICATION_ENDPOINT = '/authenticate';
    public static LS_AUTHENTICATED_USER = 'authenticated_user';

    jwtHelper: JwtHelper = new JwtHelper();

    private user: User;
    private decodedToken: JwtToken;

    constructor(private http: Http) { }

    ngOnInit(): void {
        if(!this.user) {
            this.loadUserFromLocalStorage();
        }
    }

    private loadUserFromLocalStorage() : boolean {
        let userString = localStorage.getItem(AuthenticationService.LS_AUTHENTICATED_USER);
        if(userString != null && userString.length != 0 && userString != "undefined") {
            this.user = JSON.parse(userString) as User;
            this.setToken(this.user.jwtToken);
            return true;
        }

        return false;
    }

    private setToken(token: string): void {
        this.decodedToken = this.jwtHelper.decodeToken(token);
    }

    getToken(): string {
        return this.user.jwtToken;
    }

    setUser(user: User): Observable<boolean> {
        localStorage.setItem(AuthenticationService.LS_AUTHENTICATED_USER, JSON.stringify(user));
        this.user = user;
        this.setToken(user.jwtToken);
        return Observable.of(this.authenticationActive());
    }

    getUser(): Observable<User> {
        if(!this.authenticationActive()) {
            return Observable.throw("No authentication currently active");
        }
        return Observable.of(this.user);
    }

    login(credential: Credential): Observable<boolean> {
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json' })
        });

        return this.http
            .post(AppSettings.API_ENDPOINT + AuthenticationService.AUTHENTICATION_ENDPOINT,
                JSON.stringify(credential), options)
            .map(response => {
                let user = response.json() as User;
                return this.setUser(user).valueOf();
            }).catch(res => {
                return Observable.throw(res.json()); // TODO: Proper error handling with different error cases.
            });
    }

    logout(): Observable<boolean> {
        localStorage.removeItem(AuthenticationService.LS_AUTHENTICATED_USER);
        this.user = null;
        this.decodedToken = null;
        return Observable.of(this.authenticationActive());
    }

    authenticationActive(): boolean {
        if(this.user && this.user.jwtToken) {
            return tokenNotExpired(null, this.user.jwtToken);
        }
        return false;
    }

    hasPermission(permissionName: string): Observable<boolean> {

        if(!this.authenticationActive()) {
            return Observable.of(false);
        }

        return Observable.of(this.decodedToken.permissions.includes(permissionName));
    }
}
