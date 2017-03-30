import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Advertisement } from '../data-classes/advertisement';

@Injectable()
export class AdvertisementService {
    private advertisementsUrl = 'api/advertisements';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getAdvertisements(): Promise<Advertisement[]> {
        return this.http.get(this.advertisementsUrl)
            .toPromise()
            .then(response => response.json().data as Advertisement[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    // TODO: getSingleAd, create, update, delete
}
