import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { AppSettings } from '../app.settings';
import { Advertisement }           from '../data-classes/advertisement';
import { Category } from "../data-classes/category";
import { Tag } from "../data-classes/tag";
import { SearchProposal } from "../data-classes/search-proposal";

@Injectable()
export class AdvertisementSearchService {

  private apiUrlAdvertisements = AppSettings.API_ENDPOINT + '/advertisements';
  private apiUrlTags = AppSettings.API_ENDPOINT + '/tags';
  private apiUrlCategories = AppSettings.API_ENDPOINT + '/categories';

  constructor(private http: Http) {
  }

  search(term: string): Observable<SearchProposal[]> {

    let advertisementsRequest = this.http.get(`${this.apiUrlAdvertisements}/?title=${term}&description=${term}`).map(res => res.json() as Advertisement[]);
    let tagsRequest = this.http.get(`${this.apiUrlTags}/?name=${term}`).map(res => res.json() as Tag[]);
    let categoriesRequest = this.http.get(`${this.apiUrlCategories}/?name=${term}`).map(res => res.json() as Category[]);

    return Observable.forkJoin([advertisementsRequest, tagsRequest, categoriesRequest]);

  }

}
