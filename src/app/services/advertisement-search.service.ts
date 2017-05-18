import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiCallService } from '../utils/api-call.service';
import { Advertisement } from '../data/advertisement';
import { Category } from "../data/category";
import { Tag } from "../data/tag";
import { SearchProposal } from "../data/search-proposal";

@Injectable()
export class AdvertisementSearchService {

  constructor(private apiCall: ApiCallService) { }

  search(term: string): Observable<any[]> {
    let activeState: number = 2;
    let advertisementsRequest = this.apiCall
      .get(`advertisements/?title=${term}&description=${term}&advertisementState=${activeState}`)
      .map(res => res as Advertisement[]);
    let tagsRequest = this.apiCall
      .get(`tags/?name=${term}`)
      .map(res => res as Tag[]);
    let categoriesRequest = this.apiCall
      .get(`categories/?name=${term}`)
      .map(res => res as Category[]);

        //returns an array of advertisement[], tag[] and category[]
        return Observable.forkJoin([advertisementsRequest, tagsRequest, categoriesRequest]);
    }

}
