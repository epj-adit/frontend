import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AppSettings } from '../app.settings';
import { Advertisement } from '../data-classes/advertisement';

@Injectable()
export class AdvertisementService {
  private advertisementsUrl = AppSettings.API_ENDPOINT+'/advertisements';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getAdvertisements(): Promise<Advertisement[]> {
    return this.http.get(this.advertisementsUrl)
      .toPromise()
      .then(response => response.json() as Advertisement[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getAdvertisement(id: number): Promise<Advertisement> {
        // TODO: Get '/advertisement/:id
      return this.getAdvertisements()
      .then(advertisements => advertisements.find(advertisement => advertisement.id === id));
  }

  // TODO: add advertiser, created, updated
  create(advertisement: Advertisement): Promise<Advertisement> {
    let media = advertisement.media ? advertisement.media : [];
    return this.http
      .post(this.advertisementsUrl, JSON.stringify({
        id: advertisement.id,
        title: advertisement.title,
        price: advertisement.price,
        description: advertisement.description,
        category: advertisement.category,
        tags: advertisement.tags,
        media: media
      }), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  // TODO: update, delete
}
