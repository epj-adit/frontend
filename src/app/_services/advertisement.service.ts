import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from "rxjs";

import { AppSettings } from '../app.settings';
import { Advertisement } from '../data-classes/advertisement';

import { Category } from "../data-classes/category";
import { Media } from "../data-classes/media";
import { Tag } from "../data-classes/tag";
import { User } from "../data-classes/user";
import { AdvertisementState } from "../data-classes/advertisementState";
import { TagService } from "./tag.service";

@Injectable()
export class AdvertisementService {
  private advertisementsUrl = AppSettings.API_ENDPOINT+'/advertisements';  // URL to web api
  private advertisementUrl = AppSettings.API_ENDPOINT+'/advertisement/';  // URL to web api

  private headers = new Headers({'Content-Type': 'application/json'});

  currentAdvertisement: Advertisement = null;

  constructor(private http: Http, private tagService: TagService) {
  }

  getAdvertisements(): Observable<Advertisement[]> {
    return this.http.get(this.advertisementsUrl)
        .map(response => response.json() as Advertisement[]);
  }
  getAdvertisement(id: number): Observable<Advertisement> {
    return this.http.get(this.advertisementUrl + id)
        .map(response => response.json() as Advertisement);
  }
  getAdvertisementsActive():Observable<Advertisement[]> {
    return this.http.get(this.advertisementsUrl + "/?advertisementState=2")
        .map(response => response.json() as Advertisement[]);
  }

  getAdvertisementsQuery(query: string): Observable<Advertisement[]>{
    return this.http.get(this.advertisementsUrl+query)
        .map(response => response.json() as Advertisement[]);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }



  // TODO: add advertiser, created, updated
  testuser: User = {
    id: 3,
    role: {id: 3, name: "user", permissions: []},
    username: "student",
    email: "student@hsr.ch",
    passwordHash: "abcde",
    passwordPlainText: "test",
    isPrivate: true,
    wantsNotification: true,
    isActive: true,
    created: "Apr 6, 2017 2:12:33 PM",
    updated: "",
    jwtToken: ""
  };


  // created set bei server -> don't send it!
  createOrUpdate(advertisement: Advertisement, tags: Tag[]): Observable<Advertisement> {
    // TODO: change State to ToReview, as soon as there are superusers
    let media = advertisement.media ? advertisement.media : [];
    let ad: any = {
      title: advertisement.title,
      user: {id: this.testuser.id},
      price: advertisement.price,
      description: advertisement.description,
      category: {id: advertisement.category.id},
      tags: tags,
      media: media,
      advertisementState: AdvertisementState.active,
    };
    if (advertisement.id) {
      ad.id = advertisement.id;
      return this.http.put(this.advertisementUrl + advertisement.id, JSON.stringify(ad), {headers: this.headers})
        .map(res => res.json())
        .catch(err => this.handleError(err));
    } else {
      return this.http
        .post(this.advertisementUrl, JSON.stringify(ad), {headers: this.headers})
        .map(res => res.json())
        .catch(err => this.handleError(err));
    }
  }

  createAdvertisementAndTags(advertisement: Advertisement) {
    return this.tagService.create(advertisement.tags)
      .flatMap(
        res => {
          console.log(res);
          return this.createOrUpdate(advertisement, res)
        }
      )
  }

  deleteAd(advertisement: Advertisement): Observable<Advertisement> {
    advertisement.advertisementState = AdvertisementState.closed;
    return this.http.put(this.advertisementUrl + advertisement.id, JSON.stringify(advertisement), {headers: this.headers})
      .map(res => res.json())
      .catch(err => this.handleError(err));
  }
}
