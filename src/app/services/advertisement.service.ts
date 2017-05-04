import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { ApiCallService } from '../utils/api-call.service';
import { Advertisement } from '../data/advertisement';

import { Category } from "../data/category";
import { Media } from "../data/media";
import { Tag } from "../data/tag";
import { User } from "../data/user";
import { AdvertisementState } from "../data/advertisementState";
import { TagService } from "./tag.service";

@Injectable()
export class AdvertisementService {
  currentAdvertisement: Advertisement = null;

  constructor(private apiCall: ApiCallService, private tagService: TagService) { }

  getAdvertisements(): Observable<Advertisement[]> {
    return this.apiCall.get('advertisements/').map(response => response as Advertisement[]);
  }

  getAdvertisement(id: number): Observable<Advertisement> {
    return this.apiCall.get("advertisement/" + id).map(response => response as Advertisement);
  }

  getAdvertisementsQuery(query: string): Observable<Advertisement[]> {
    return this.apiCall.get('advertisements' + query)
      .map(response => response as Advertisement[]);
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
    passwordPlaintext: "test",
    isPrivate: true,
    wantsNotification: true,
    isActive: true,
    created: "Apr 6, 2017 2:12:33 PM",
    updated: "",
    jwtToken: ""
  };


  // created set bei server -> don't send it!
  createOrUpdate(advertisement: Advertisement, tags: Tag[], state:AdvertisementState=AdvertisementState.to_review): Observable<Advertisement> {
    // TODO: Make sure that the to_review state is enforced on the server side.
    let media = advertisement.media ? advertisement.media : [];
    let ad: any = {
      title: advertisement.title,
      user: {id: this.testuser.id},
      price: advertisement.price,
      description: advertisement.description,
      category: {id: advertisement.category.id},
      tags: tags,
      media: media,
      advertisementState: state,
    };

    if (advertisement.id) {
      ad.id = advertisement.id;
      return this.apiCall.put("advertisement/" + advertisement.id, ad).map(res => res as Advertisement)
        .catch(err => this.handleError(err));
    } else {
      return this.apiCall
        .post("advertisement", ad).map(res => res as Advertisement)
        .catch(err => this.handleError(err));
    }
  }

  createAdvertisementAndTags(advertisement: Advertisement) {
    return this.tagService.create(advertisement.tags)
      .flatMap(
        res => {
          return this.createOrUpdate(advertisement, res)
        }
      )
  }

  deleteAd(advertisement: Advertisement): Observable<Advertisement> {
    advertisement.advertisementState = AdvertisementState.closed;
    return this.apiCall.put("advertisement/" + advertisement.id, advertisement).map(res => res as Advertisement)
      .catch(err => this.handleError(err));
  }
}
