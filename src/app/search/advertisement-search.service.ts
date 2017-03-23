import {Injectable} from '@angular/core';
import {Http}       from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import {Advertisement}           from '../data-classes/advertisement';

@Injectable()
export class AdvertisementSearchService {
  constructor(private http: Http) {
  }

  search(term: string): Observable<Advertisement[]> {
    return this.http
      .get(`app/advertisements/?title=${term}`)
      .map(response => response.json().data as Advertisement[]);
  }
}
