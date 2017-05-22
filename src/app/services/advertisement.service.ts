import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { ApiCallService } from '../utils/api-call.service';
import { Advertisement } from '../data/advertisement';

import { Tag } from "../data/tag";
import { AdvertisementState } from "../data/advertisement-state";
import { TagService } from "./tag.service";

import { AuthenticationService } from "../utils/authentication.service";

@Injectable()
export class AdvertisementService {
  currentAdvertisement: Advertisement = null;
  userId: number;

  constructor(private apiCall: ApiCallService, private tagService: TagService,
              private authenticationService: AuthenticationService) {
    this.authenticationService.getUser().subscribe(user => this.userId = user.id)
  }

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

  // created set bei server -> don't send it!
  createOrUpdate(advertisement: Advertisement, tags: Tag[], state:AdvertisementState=AdvertisementState.to_review): Observable<Advertisement> {
    let ad: any = {
      title: advertisement.title,
      user: {
        id: this.userId
      },
      price: advertisement.price,
      description: advertisement.description,
      category: {
        id: advertisement.category.id
      },
      tags: tags,
      media: [],
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
