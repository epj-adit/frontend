import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Advertisement } from '../data-classes/advertisement';
import { Category } from "../data-classes/category";
import { Media } from "../data-classes/media";
import { Tag } from "../data-classes/tag";

@Injectable()
export class AdvertisementService {
  private advertisementsUrl = 'https://develop.adit.qo.is/api/';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getAdvertisements(): Promise<Advertisement[]> {
    return this.http.get(this.advertisementsUrl + "advertisements")
      .toPromise()
      .then(response => response.json() as Advertisement[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getAdvertisement(id: number): Promise<Advertisement> {
    return this.getAdvertisements()
      .then(advertisements => advertisements.find(advertisement => advertisement.id === id));
  }

  // TODO: add advertiser, created, updated

  // created set bei server -> don't send it!
  create(advertisement: Advertisement): Promise<Advertisement> {
    let media = advertisement.media ? advertisement.media : [];
    console.log(advertisement);
    // TODO: change userid,categoryid, tags
    return this.http
      .post(this.advertisementsUrl + "advertisement", JSON.stringify({
        title: advertisement.title,
        userId: 1,
        price: advertisement.price,
        description: advertisement.description,
        categoryId: 1,
        tags: advertisement.tags,
        media: media
      }), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  // TODO: update, delete
}
