import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import { AuthenticationService } from './authentication.service';

import { AppSettings } from '../app.settings';

@Injectable()
export class ApiCallService {
    public static CONTENT_TYPE = 'application/json';

    private apiEndpoint;

    constructor(private http: Http, private authenticationService: AuthenticationService) {
        this.apiEndpoint = AppSettings.API_ENDPOINT;
        if(this.apiEndpoint.charAt(this.apiEndpoint.length - 1) != "/") {
            // The API URL should always end with a slash.
            this.apiEndpoint += "/";
        }
    }

    /**
     * Performs a request with `get` http method.
     */
    get(url: string, options?: RequestOptionsArgs): Observable<object> {
        if(!options) {
            options = this.buildRequestOptionsArgs();
        }
        return this.http.get(this.apiEndpoint + url, options).map(res => res.json());
    }

    /**
     * Performs a request with `post` http method.
     */
    post(url: string, body: object, options?: RequestOptionsArgs): Observable<object> {
        if(!options) {
            options = this.buildRequestOptionsArgs();
        }
        options.headers.append('Content-Type', ApiCallService.CONTENT_TYPE);
        return this.http.post(this.apiEndpoint + url, JSON.stringify(body), options)
            .map(res => res.json());
    }

    /**
     * Performs a request with `put` http method.
     */
    put(url: string, body: object, options?: RequestOptionsArgs): Observable<object> {
        if(!options) {
            options = this.buildRequestOptionsArgs();
        }
        options.headers.append('Content-Type', ApiCallService.CONTENT_TYPE);
        return this.http.put(this.apiEndpoint + url, JSON.stringify(body), options)
            .map(res => res.json());
    }

    /**
     * Performs a request with `delete` http method.
     */
    delete(url: string, options?: RequestOptionsArgs): Observable<object> {
        if(!options) {
            options = this.buildRequestOptionsArgs();
        }
        return this.http.delete(this.apiEndpoint + url, options).map(res => res.json());
    }

    /**
     * Performs a request with `patch` http method.
     */
    patch(url: string, body: object, options?: RequestOptionsArgs): Observable<object> {
        if(!options) {
            options = this.buildRequestOptionsArgs();
        }
        options.headers.append('Content-Type', ApiCallService.CONTENT_TYPE);
        return this.http.patch(this.apiEndpoint + url, JSON.stringify(body), options)
            .map(res => res.json());
    }

    /**
     * Performs a request with `head` http method.
     */
    head(url: string, options?: RequestOptionsArgs): Observable<object> {
        if(!options) {
            options = this.buildRequestOptionsArgs();
        }
        return this.http.head(this.apiEndpoint + url, options).map(res => res.json());
    }

    buildRequestOptionsArgs(): RequestOptionsArgs {
        return { headers: this.appendAuthorizationHeader(new Headers()) };
    }

    appendAuthorizationHeader(header: Headers): Headers {
        header.append('Authorization', this.authenticationService.getToken());
        return header;
    }
}
