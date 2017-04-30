import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiCallService } from '../utils/api-call.service';
import { Advertisement } from '../data-classes/advertisement';
import { Category } from "../data-classes/category";
import { Tag } from "../data-classes/tag";
import { SearchProposal } from "../data-classes/search-proposal";

@Injectable()
export class AdvertisementSearchService {

  constructor(private apiCall: ApiCallService) { }

  search(term: string): Observable<SearchProposal[]> {

    let advertisementsRequest = this.apiCall.get(`advertisements/?title=${term}&description=${term}`)
      .map(res => res as Advertisement[]);
    let tagsRequest = this.apiCall.get(`tags/?name=${term}`)
      .map(res => res as Tag[]);
    let categoriesRequest = this.apiCall.get(`categories/?name=${term}`)
      .map(res => res as Category[]);

    return Observable.forkJoin([advertisementsRequest, tagsRequest, categoriesRequest]);
  }

}
