import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';


import { Tag } from "../data-classes/tag";
import { Observable } from "rxjs";

@Injectable()
export class TagService {
  private apiUrl = 'https://develop.adit.qo.is/api/';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http) {
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  create(tags: Tag[]): Observable<Tag[]>{
   return this.http
        .post(this.apiUrl + "tags", JSON.stringify(tags), {headers: this.headers})
        .map(res => {
          return res.json() as Tag[]
        })
        .catch(err => this.handleError(err));
    }
}
