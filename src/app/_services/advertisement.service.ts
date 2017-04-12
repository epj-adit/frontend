import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Advertisement } from '../data-classes/advertisement';
import { Category } from "../data-classes/category";
import { Media } from "../data-classes/media";
import { Tag } from "../data-classes/tag";
import { User } from "../data-classes/user";
import { AdvertisementState } from "../data-classes/advertisementState";
import { Observable } from "rxjs";

@Injectable()
export class AdvertisementService {
  private advertisementsUrl = 'https://develop.adit.qo.is/api/';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  currentAdvertisement: Advertisement = null;

  constructor(private http: Http) {
  }

  getAdvertisements(): Observable<Advertisement[]> {
    return this.http.get(this.advertisementsUrl + "advertisements")
      .map(response => response.json() as Advertisement[])
      .catch(err => this.handleError(err));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getAdvertisement(id: number): Observable<Advertisement> {
    return this.http.get(this.advertisementsUrl + "advertisement/" + id)
      .map(response => response.json() as Advertisement)
      .catch(err => this.handleError(err));
  }

  // TODO: add advertiser, created, updated
  testuser: User = {
    id: 3,
    role: {id: 3, name: "user", permissions: []},
    username: "student",
    email: "student@hsr.ch",
    passwordHash: "abcde",
    isPrivate: true,
    wantsNotification: true,
    isActive: true,
    created: "Apr 6, 2017 2:12:33 PM",
    subscriptions: []
  };
  testcategory = { id: 1, name: "Bücher" };


  // created set bei server -> don't send it!
  create(advertisement: Advertisement): Observable<Advertisement> {
    //TODO: first: send all tagstrings to api/tags, then send returned tag-object with ad
    let media = advertisement.media ? advertisement.media : [];
    // TODO: change userid,categoryid, tags
    return this.http
      .post(this.advertisementsUrl + "advertisement", JSON.stringify({
        title: advertisement.title,
        user: {id: this.testuser.id},
        price: advertisement.price,
        description: advertisement.description,
        category: {id: this.testcategory.id},
        tags: [],
        media: media,
        advertisementState: AdvertisementState.active,
      }), {headers: this.headers})
      .map(res => res.json())
      .catch(this.handleError);
  }
  // TODO: update, delete
}
