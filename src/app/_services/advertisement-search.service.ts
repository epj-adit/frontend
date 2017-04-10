import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { AppSettings } from '../app.settings';
import { Advertisement }           from '../data-classes/advertisement';
import {Category} from "../data-classes/category";
import {Tag} from "../data-classes/tag";

@Injectable()
export class AdvertisementSearchService {

  private apiUrl = AppSettings.API_ENDPOINT;  // URL to web api

  constructor(private http: Http) {
  }

  search(term: string): Observable<Advertisement[]> {
    let advertisements : Advertisement[] = [];
    let tags : Tag[] = [];
    let categories : Category[] = [];
    let advertisementsRequest = this.http.get(`${this.apiUrl}/advertisements/?description=${term}&title=${term}`).map(res => res.json().data as Advertisement[]);
    let tagsRequest = this.http.get(`${this.apiUrl}/tags/?name=${term}`).map(res => res.json().data as Tag[]);
    let categoriesRequest = this.http.get(`${this.apiUrl}/categories/?name=${term}`).map(res => res.json().data as Category[]);

    Observable.forkJoin([advertisementsRequest, tagsRequest, categoriesRequest]).subscribe(results => {
      advertisements.concat(results[0].json().data as Advertisement[]);
      tags.concat(results[1].json().data as Tag[]);
      categories.concat(results[2].json().data as Category[]);
    });


    for(let i = 0; i<tags.length; i++){
      // advertisements.concat(this.http.get(`{this.apiUrl}/advertisements/?tag[]=${tags[i]}`).map(res => res.json().data as Advertisement[]));
    }

    for(let i = 0; i<categories.length; i++){
      // advertisements.concat(this.http.get(`{this.apiUrl}/advertisements/?category[]=${categories[i]}`).map(res => res.json().data as Advertisement[]));
    }

    // TODO: Find a way to get an Observable<Advertisement[]> out of it and return it

    return this.http
      .get(`api/advertisements/?description=${term}`)
      .map(response => response.json().data as Advertisement[]);
  }
}
